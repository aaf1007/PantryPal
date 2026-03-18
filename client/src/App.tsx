import { Route, Routes } from 'react-router-dom'
import NavBar from './layouts/NavBar'
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import IngredientsPage from './pages/IngredientsPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
