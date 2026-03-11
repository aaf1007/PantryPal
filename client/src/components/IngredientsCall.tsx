import { useEffect, useRef, useState } from "react";

type RecipeResponse = {
  title: string;
  ingredients: string[];
  steps: string[];
  estimatedTime: number;
};

export default function IngredientsCall() {
  const [input, setInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [recipeVisible, setRecipeVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (recipe) {
      const id = requestAnimationFrame(() => setRecipeVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setRecipeVisible(false);
  }, [recipe]);

  /** Add the typed ingredient to the list, ignoring duplicates and empty values */
  function handleAddIngredient(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || selectedIngredients.includes(trimmed)) return;
    setSelectedIngredients((prev) => [...prev, trimmed]);
    setInput("");
    inputRef.current?.focus();
  }

  /** Remove an ingredient from the selected list */
  function handleRemoveIngredient(ingredient: string) {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient));
  }

  /** Post the selected ingredients to the recipe generator */
  async function handleGenerateRecipe() {
    if (selectedIngredients.length === 0) return;
    setIsGenerating(true);
    setGenerateError(null);
    setRecipe(null);

    try {
      const res = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });
      if (!res.ok) throw new Error();
      setRecipe(await res.json());
    } catch {
      setGenerateError("Could not generate recipe. Try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div
      className={[
        "flex items-start gap-4 w-full px-4 transition-[max-width] duration-500 ease-out",
        recipe ? "flex-row max-w-4xl" : "flex-col max-w-sm",
      ].join(" ")}
    >
      {/* Picker card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5 w-full lg:max-w-sm shrink-0">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            What's in your pantry?
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Add your ingredients to discover amazing recipes.
          </p>
        </div>

        {/* Input row */}
        <form onSubmit={handleAddIngredient} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 2 cups of Flour"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            Add
          </button>
        </form>

        {/* Selected ingredients */}
        {selectedIngredients.length > 0 && (
          <div className="flex flex-col gap-2">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2.5"
              >
                <span className="text-sm text-gray-800 truncate pr-4">
                  {ingredient}
                </span>
                <button
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label={`Remove ${ingredient}`}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Generate CTA */}
        <div className="flex flex-col items-center gap-1.5 mt-1">
          <button
            onClick={handleGenerateRecipe}
            disabled={selectedIngredients.length === 0 || isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white font-bold text-sm py-3.5 rounded-xl transition-colors cursor-pointer"
          >
            {isGenerating ? "Generating…" : "Generate Recipe"}
          </button>
          <p className="text-xs text-gray-400">
            We'll find recipes matching your current pantry.
          </p>
        </div>

        {generateError && (
          <p className="text-sm text-red-500 -mt-2 text-center">{generateError}</p>
        )}
      </div>

      {/* Recipe panel — fades and slides in beside the picker */}
      {recipe && (
        <div
          className={[
            "w-full lg:flex-1 transition-all duration-500 ease-out motion-reduce:transition-none",
            recipeVisible
              ? "opacity-100 translate-y-0 lg:translate-x-0"
              : "opacity-0 translate-y-3 lg:translate-y-0 lg:translate-x-3",
          ].join(" ")}
        >
          <RecipeCard data={recipe} />
        </div>
      )}
    </div>
  );
}

/** Minimal inline trash icon */
function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M5.333 4V2.667h5.334V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333h8L12.667 4" />
    </svg>
  );
}

function RecipeCard({ data }: { data: RecipeResponse }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Ingredients
        </h3>
        <ul className="flex flex-col gap-1">
          {data.ingredients.map((ing) => (
            <li key={ing} className="text-sm text-gray-700">{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Steps
        </h3>
        <ol className="flex flex-col gap-2 list-decimal list-inside">
          {data.steps.map((step) => (
            <li key={step} className="text-sm text-gray-700">{step}</li>
          ))}
        </ol>
      </div>

      <p className="text-xs text-gray-400">
        Estimated time: {data.estimatedTime} min
      </p>
    </div>
  );
}
