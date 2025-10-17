import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";

const AdcDisciplina: React.FC = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSave = async () => {
    if (!nome.trim()) {
      alert("O nome da disciplina é obrigatório!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("URL_DO_BACKEND/api/disciplinas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          descricao: descricao,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar disciplina");

      const data = await response.json();
      console.log("Disciplina salva:", data);
      alert("Disciplina salva com sucesso!");
      setNome("");
      setDescricao("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar disciplina. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNome("");
    setDescricao("");
  };

  return (
    
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Navbar /> 
      <div className="flex flex-col items-center justify-start flex-grow pt-8 overflow-y-auto">
        <h1 className="font-['Permanent_Marker'] text-2xl text-[#293296] mb-4 text-center relative pb-2 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-full after:h-1 after:bg-[#293296] after:rounded-sm md:after:w-[120%]">
          ADICIONAR DISCIPLINA
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] border-2 border-[#293296] font-['Signika']"> {/* Mantendo a largura original */}
          <div className="mb-4 w-4/5 mx-auto">
            <label htmlFor="nomeDisciplina" className="block mb-2 font-['Signika'] text-[#293296]">Nome*</label>
            <input
              type="text"
              id="nomeDisciplina"
              placeholder="Digite o nome da disciplina"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-3 border border-[#293296] rounded-md text-black focus:outline-none focus:ring-1 focus:ring-[#293296]" 
            />
          </div>
          <div className="mb-4 w-4/5 mx-auto">
            <label htmlFor="descricaoDisciplina" className="block mb-2 font-['Signika'] text-[#293296]">Descrição</label> 
            <textarea
              id="descricaoDisciplina"
              rows={3}
              placeholder="Digite uma descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="p-3 border border-[#293296] rounded-md text-black resize-y focus:outline-none focus:ring-1 focus:ring-[#293296] w-full" 
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-6 w-full max-w-sm">
          <button
            className="px-6 py-3 border-2 border-[#962929] text-[#962929] bg-white rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#962929] hover:text-white hover:scale-105 min-w-[125px]"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className="px-6 py-3 border-2 border-[#968D29] text-[#968D29] bg-white rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#968D29] hover:text-white hover:scale-105 min-w-[125px]"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdcDisciplina;