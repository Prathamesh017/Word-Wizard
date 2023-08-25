import InfoPage from './Pages/InfoPage'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GamePage from './Pages/GamePage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="info" element={<InfoPage />}></Route>
        <Route path="game" element={<GamePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
