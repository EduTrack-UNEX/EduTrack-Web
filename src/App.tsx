import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Login from './pages/login';
import AdcDisciplina from './pages/AdcDisciplina';
import AdcAtividade from './pages/AdcAtividade';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/adicionar-disciplina" element={<AdcDisciplina />} />
          <Route path="/adicionar-atividade" element={<AdcAtividade />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
