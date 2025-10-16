import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdcDisciplina from "./pages/AdcDisciplina"
import Login from "./pages/login"
import Cadastro from "./pages/cadastro"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdcDisciplina />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  )
}

export default App
