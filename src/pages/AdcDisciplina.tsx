import { useId, useState } from "react"
import Navbar from "../components/Navbar/navbar"

const inputClasses = "p-3 border border-[#293296] rounded-md text-black placeholder:text-[#C4C4C4] resize-y focus:outline-none focus:ring-1 focus:ring-[#293296] w-full"

const AdcDisciplina: React.FC = () => {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  const nomeDisciplinaId = useId()

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
        body: JSON.stringify({ nome }),
      });

      if (!response.ok) throw new Error("Erro ao salvar disciplina");

      const data = await response.json();
      console.log("Disciplina salva:", data);
      alert("Disciplina salva com sucesso!");
      setNome("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar disciplina. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNome("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="flex flex-col items-center justify-start flex-grow pt-28 overflow-y-auto px-4">
        <h1 className="font-['Permanent_Marker'] text-3xl text-[#293296] mb-2 text-center">
          Adicionar Disciplina
        </h1>

        <img
          src="/underline2.svg"
          className="w-auto h-auto mx-auto mt-[-10px] mb-8"
          style={{ maxWidth: "150px" }}
          alt="Sublinhado"
        />

        <div className="p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[500px] border-2 border-[#293296] font-['Signika']">
          <div className="mb-4 w-4/5 mx-auto">
            <label
              htmlFor="nomeDisciplina"
              className="block mb-2 font-['Signika'] text-[#293296]"
            >
              Nome*
            </label>
            <input
              type="text"
              id={nomeDisciplinaId}
              placeholder="Digite o nome da disciplina"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6 w-full max-w-[500px]">
          <button
            type="button"
            className="px-6 py-3 border-2 border-[#962929] text-[#962929] rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#962929] hover:text-white hover:scale-105 min-w-[125px]"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-6 py-3 border-2 border-[#968D29] text-[#968D29] rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#968D29] hover:text-white hover:scale-105 min-w-[125px]"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  )
};

export default AdcDisciplina;
