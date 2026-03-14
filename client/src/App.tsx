import { Route, Routes } from 'react-router-dom'
import NavBar from './layouts/NavBar'
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import IngredientsPage from './pages/IngredientsPage'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
