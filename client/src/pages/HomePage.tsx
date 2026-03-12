import { LuArrowRight, LuClock } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

const steps = [
  {
    number: '01',
    label: 'Add ingredients',
    description: 'Tell us what\'s in your pantry ',
  },
  {
    number: '02',
    label: 'Generate a recipe',
    description: 'AI picks the best recipe from what you already have.',
  },
  {
    number: '03',
    label: 'Start cooking',
    description: 'Get clear steps and timing, nothing else in the way.',
  },
]

const exampleRecipe = {
  title: 'Pasta Primavera',
  time: '25 min',
  ingredients: ['Cherry tomatoes', 'Pasta', 'Zucchini', 'Garlic', 'Olive oil'],
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-48 pb-28 bg-[url('/image.png')] bg-cover bg-center bg-no-repeat">
        {/* <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sage-600 mb-6">
          Pantry Pal
        </span> */}

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-sage-900 leading-[1.04] max-w-3xl mb-6">
          What's in your pantry?
        </h1>

        <p className="text-sage-600 text-lg md:text-xl max-w-md leading-relaxed mb-10">
          Add your ingredients. Get a recipe that actually uses what you have. Never waste any food again.
        </p>

        <button
          onClick={() => navigate('/ingredients')}
          className="inline-flex items-center gap-2.5 bg-sage-900 hover:bg-sage-700 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 cursor-pointer group"
        >
          Get Started
          <LuArrowRight className="group-hover:translate-x-0.5 transition-transform duration-200" size={16} />
        </button>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-warm-beige-200" />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-sage-600 mb-16">How it works</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map(step => (
              <div key={step.number} className="flex flex-col gap-4">
                <span className="text-sm font-medium text-warm-beige-300">{step.number}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-sage-900">{step.label}</h3>
                  <p className="text-sage-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-warm-beige-200" />
      </div>

      {/* Example output */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-16">

          {/* Left: label */}
          <div className="md:w-1/3">
            <p className="text-xs font-semibold tracking-widest uppercase text-sage-600 mb-4">Example output</p>
            <p className="text-sage-600 text-sm leading-relaxed max-w-xs">
              Recipes are structured, readable, and skip everything you didn't ask for.
            </p>
          </div>

          {/* Right: recipe card */}
          <div className="md:w-2/3 max-w-md">
            <div className="border border-warm-beige-200 rounded-2xl p-8">

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-sage-600 uppercase tracking-wider">Recipe</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-sage-600">
                  <LuClock size={12} />
                  <span>{exampleRecipe.time}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-sage-900 mb-6">{exampleRecipe.title}</h3>

              <ul className="space-y-2.5">
                {exampleRecipe.ingredients.map(ing => (
                  <li key={ing} className="flex items-center gap-3 text-sm text-sage-600">
                    <div className="w-1 h-1 rounded-full bg-warm-beige-300 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-warm-beige-200" />
      </div>

      {/* Video Demo */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold tracking-widest uppercase text-sage-600 mb-6">Demo Video</p>
        <video
          src="https://res.cloudinary.com/dkmpatozu/video/upload/v1773298485/Loom_Cropping_-_11_March_2026_ictqqs.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-xl"
        />
      </section>


      {/* Bottom strip */}
      <section className="bg-warm-beige-100 border-t border-warm-beige-200">
        <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-sage-900 mb-1">Ready to cook?</h2>
            <p className="text-sage-600 text-sm">No signup. Just ingredients.</p>
          </div>
          <button
            onClick={() => navigate('/ingredients')}
            className="inline-flex items-center gap-2.5 bg-sage-900 hover:bg-sage-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 cursor-pointer group shrink-0"
          >
            Get Started
            <LuArrowRight className="group-hover:translate-x-0.5 transition-transform duration-200" size={15} />
          </button>
        </div>
      </section>

    </div>
  )
}
