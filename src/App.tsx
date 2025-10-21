import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Login from './pages/login';
import AdcDisciplina from './pages/AdcDisciplina';
import AdcAtividade from './pages/AdcAtividade';
import Cadastro from "./pages/cadastro"
import ListagemDisciplina from "./pages/ListagemDisciplina"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/adicionar-disciplina" element={<AdcDisciplina />} />
          <Route path="/adicionar-atividade" element={<AdcAtividade />} />
          <Route path="/listagem-disciplina" element={<ListagemDisciplina />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
