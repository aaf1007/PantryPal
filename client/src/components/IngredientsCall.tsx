import { useEffect, useRef, useState } from 'react'
import { buildApiUrl } from '../lib/api'

type RecipeResponse = {
  title: string
  ingredients: string[]
  steps: string[]
  estimatedTime: number
}

async function readErrorMessage(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    try {
      const data = (await response.json()) as Record<string, unknown>
      const message = data.message ?? data.error
      return typeof message === 'string' ? message : null
    } catch {
      return null
    }
  }

  const text = await response.text()
  return text.trim() || null
}

function formatGenerateError(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Could not generate recipe. Try again.'
  }

  if (error.message === 'API_NOT_FOUND') {
    return 'Could not generate recipe. The recipe API returned 404. Check that the backend is running and that VITE_API_URL points to the server root, not .../api.'
  }

  if (error.message === 'API_UNAVAILABLE') {
    return 'Could not generate recipe. The backend is unreachable. Start the Spring Boot server or verify VITE_API_URL.'
  }

  if (error.message === 'Failed to fetch') {
    return 'Could not generate recipe. The backend is unreachable. Start the Spring Boot server or verify VITE_API_URL.'
  }

  return `Could not generate recipe. ${error.message}`
}

export default function IngredientsCall() {
  const [input, setInput] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generateError, setGenerateError] = useState<string | null>(null)
  const [recipeVisible, setRecipeVisible] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (recipe) {
      const id = requestAnimationFrame(() => setRecipeVisible(true))
      return () => cancelAnimationFrame(id)
    }
    setRecipeVisible(false)
  }, [recipe])

  function handleAddIngredient(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || selectedIngredients.includes(trimmed)) return
    setSelectedIngredients((prev) => [...prev, trimmed])
    setInput('')
    inputRef.current?.focus()
  }

  function handleRemoveIngredient(ingredient: string) {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient))
  }

  async function handleGenerateRecipe() {
    if (selectedIngredients.length === 0) return
    setIsGenerating(true)
    setGenerateError(null)
    setRecipe(null)

    try {
      const res = await fetch(buildApiUrl('/api/recipes/generate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      })

      if (!res.ok) {
        const message = await readErrorMessage(res)

        if (res.status === 404) {
          throw new Error('API_NOT_FOUND')
        }

        throw new Error(message ?? `Request failed with status ${res.status}.`)
      }

      setRecipe(await res.json())
    } catch (error) {
      const message =
        typeof navigator !== 'undefined' && !navigator.onLine
          ? 'Could not generate recipe. Your browser is offline.'
          : formatGenerateError(error)

      setGenerateError(message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div
      className={[
        "flex items-start gap-6 w-full px-4 transition-[max-width] duration-500 ease-out",
        recipe ? "flex-row max-w-4xl" : "flex-col max-w-sm",
      ].join(' ')}
    >
      <div className="bg-white border border-warm-beige-200 rounded-2xl p-6 flex flex-col gap-5 w-full lg:max-w-sm shrink-0">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sage-900 tracking-tight">
            What's in your pantry?
          </h1>
          <p className="text-sm text-sage-600 mt-1">
            Add your ingredients to discover amazing recipes.
          </p>
        </div>

        <form onSubmit={handleAddIngredient} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 2 cups of Flour"
            className="flex-1 border border-warm-beige-200 rounded-xl px-4 py-2.5 text-sm text-sage-900 placeholder-warm-beige-300 outline-none focus:border-sage-600 transition-colors bg-white"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center gap-1.5 bg-sage-900 hover:bg-sage-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            Add
          </button>
        </form>

        {selectedIngredients.length > 0 && (
          <div className="flex flex-col gap-2">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient}
                className="flex items-center justify-between bg-warm-beige-100 border border-warm-beige-200 rounded-xl px-4 py-2.5"
              >
                <span className="text-sm text-sage-900 truncate pr-4">
                  {ingredient}
                </span>
                <button
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="shrink-0 text-warm-beige-300 hover:text-sage-600 transition-colors cursor-pointer"
                  aria-label={`Remove ${ingredient}`}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-1.5 mt-1">
          <button
            onClick={handleGenerateRecipe}
            disabled={selectedIngredients.length === 0 || isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-sage-900 hover:bg-sage-700 text-white font-bold text-sm py-3.5 rounded-xl transition-colors cursor-pointer"
          >
            {isGenerating ? 'Generating…' : 'Generate Recipe'}
          </button>
          <p className="text-xs text-sage-600">
            We'll find recipes matching your current pantry.
          </p>
        </div>

        {generateError && (
          <p className="text-sm text-red-500 -mt-2 text-center">{generateError}</p>
        )}
      </div>

      {recipe && (
        <div
          className={[
            "w-full lg:flex-1 transition-all duration-500 ease-out motion-reduce:transition-none",
            recipeVisible
              ? "opacity-100 translate-y-0 lg:translate-x-0"
              : "opacity-0 translate-y-3 lg:translate-y-0 lg:translate-x-3",
          ].join(' ')}
        >
          <RecipeCard data={recipe} />
        </div>
      )}
    </div>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M5.333 4V2.667h5.334V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333h8L12.667 4" />
    </svg>
  )
}

function RecipeCard({ data }: { data: RecipeResponse }) {
  return (
    <div className="bg-white border border-warm-beige-200 rounded-2xl p-6 flex flex-col gap-5 h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-sage-900">{data.title}</h2>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-warm-beige-300 mb-3">
          Ingredients
        </h3>
        <ul className="flex flex-col gap-2">
          {data.ingredients.map((ing) => (
            <li key={ing} className="flex items-center gap-3 text-sm text-sage-600">
              <div className="w-1 h-1 rounded-full bg-warm-beige-300 shrink-0" />
              {ing}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-warm-beige-200 pt-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-warm-beige-300 mb-3">
          Steps
        </h3>
        <ol className="flex flex-col gap-3">
          {data.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-sage-600">
              <span className="text-warm-beige-300 font-medium shrink-0 w-4">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="text-xs text-warm-beige-300 border-t border-warm-beige-200 pt-4">
        Estimated time: {data.estimatedTime} min
      </p>
    </div>
  )
}
