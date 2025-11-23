import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import AdcAtividade from "./pages/AdcAtividade"
import Cadastro from "./pages/cadastro"
import ListagemDisciplina from "./pages/ListagemDisciplina"
import VisualizacaoMateria from "./pages/VisualizacaoMateria"
import Home from "./pages/Home"
import { AuthProvider } from "./hooks/AuthContext"
import AdcDisciplina from "./pages/AdcDisciplina"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/adicionar-disciplina" element={<AdcDisciplina />} />
            <Route path="/adicionar-atividade" element={<AdcAtividade />} />
            <Route path="/listagem-disciplina" element={<ListagemDisciplina />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/visualizacao-materia" element={<VisualizacaoMateria />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
