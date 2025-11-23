import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import AdcAtividade from "./pages/AdcAtividade"
import Cadastro from "./pages/cadastro"
import VisualizacaoMateria from "./pages/VisualizacaoMateria"
import Home from "./pages/Home"
import { AuthProvider } from "./hooks/AuthContext"
import AdcDisciplina from "./pages/AdcDisciplina"
import ListagemDisciplina from "./pages/ListagemDisciplina"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listagem-disciplina" element={<ListagemDisciplina />} />
            <Route path="/visualizacao-materia/:id" element={<VisualizacaoMateria />} />
            <Route path="/adicionar-disciplina" element={<AdcDisciplina />} />
            <Route path="/adicionar-atividade" element={<AdcAtividade />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
