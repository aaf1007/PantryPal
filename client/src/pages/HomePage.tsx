import { LuArrowRight, LuClock } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

const mockIngredients = ['Cherry tomatoes', 'Pasta', 'Zucchini', 'Garlic', 'Olive oil']

/** Landing page — introduces the app and directs users to the ingredients flow */
export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-b">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Section */}
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-sage-900 leading-[1.05]">
                Turn ingredients<br />into inspiration
              </h1>

              <p className="text-sage-600 text-xl max-w-md mb-10 leading-relaxed">
                Simply tell us what's in your pantry, and let AI create delicious recipes tailored just for you.
              </p>

              <button
                onClick={() => navigate('/ingredients')}
                className="inline-flex items-center gap-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
              >
                Get Started
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </div>

            {/* Right: decorative recipe card */}
            <div className="relative hidden lg:flex items-center justify-center py-12">
              <div className="absolute inset-0 bg-sage-600/10 blur-3xl rounded-full" />

              <div className="relative w-80">
                {/* Stacked depth shadow */}
                <div className="absolute top-3 left-3 w-full h-full bg-warm-beige-300/60 rounded-3xl" />

                {/* Main card */}
                <div className="relative bg-white rounded-3xl shadow-xl p-7 border border-warm-beige-300/40">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-xs font-semibold text-sage-600 uppercase tracking-wider">
                      Recipe Generated
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-sage-900 mb-4">Pasta Primavera</h3>

                  <div className="space-y-2.5 mb-5">
                    {mockIngredients.map(ing => (
                      <div key={ing} className="flex items-center gap-2.5 text-sm text-sage-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-sage-600 shrink-0" />
                        {ing}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-warm-beige-200">
                    <div className="flex items-center gap-1.5 text-xs text-sage-600">
                      <LuClock size={12} />
                      <span>25 min</span>
                    </div>
                    <div className="bg-sage-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      Start Cooking
                    </div>
                  </div>
                </div>

                {/* Floating ingredient chips */}
                <div className="absolute -top-4 -right-6 bg-sage-600 text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg">
                  + Tomato
                </div>
                <div className="absolute -bottom-3 -left-6 bg-white border border-warm-beige-300 text-sage-900 text-xs font-medium px-3.5 py-2 rounded-full shadow-md">
                  + Garlic
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TODO: Section placeholder ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="h-64 rounded-3xl border-2 border-dashed border-warm-beige-300 flex items-center justify-center">
            <p className="text-warm-beige-300 text-sm font-medium tracking-wide">Section placeholder</p>
          </div>
        </div>
      </section>

      {/* ── TODO: Section placeholder ── */}
      <section className="py-20 px-6 bg-warm-beige-100">
        <div className="max-w-5xl mx-auto">
          <div className="h-64 rounded-3xl border-2 border-dashed border-warm-beige-300 flex items-center justify-center">
            <p className="text-warm-beige-300 text-sm font-medium tracking-wide">Section placeholder</p>
          </div>
        </div>
      </section>

    </div>
  )
}
