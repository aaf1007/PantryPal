import { useNavigate } from 'react-router-dom'

/** Landing page — introduces the app and directs users to the ingredients flow */
export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
        Welcome to PantryPal
      </h1>
      <p className="text-gray-400 text-base max-w-md mb-8">
        Tell us what's in your pantry and we'll generate recipes you can cook right now.
      </p>
      <button
        onClick={() => navigate('/ingredients')}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
      >
        Get Started
      </button>
    </div>
  )
}
