import { useState } from "react"
import Navbar from "../components/Navbar/navbar";


const fieldClasses = "w-full p-3 border border-[#293296] rounded-md box-border text-base outline-none font-['Signika'] text-black placeholder:text-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-[#293296]";

const AdcAtividade: React.FC = () => {
 
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [valorAtividade, setValorAtividade] = useState("");
  const [status, setStatus] = useState<'concluida' | 'incompleta' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !valorAtividade.trim()) {
      alert("Os campos com * são obrigatórios!");
      return;
    }
    
    setLoading(true);
    console.log("Salvando:", { nome, descricao, dataEntrega, valorAtividade, status: status });
    
    setTimeout(() => {
      alert("Atividade salva com sucesso! (simulado)");
      setLoading(false);
      handleCancel();
    }, 1000);
  };


  const handleCancel = () => {
    setNome("");
    setDescricao("");
    setDataEntrega("");
    setValorAtividade("");
    setStatus(null);
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setDataEntrega(value);
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let valorFiltrado = value.replace(/[^0-9.,]/g, '');
    
    valorFiltrado = valorFiltrado.replace(/,/g, '.');

    const partes = valorFiltrado.split('.');
    if (partes.length > 2) {
      valorFiltrado = partes[0] + '.' + partes.slice(1).join('');
    }

    setValorAtividade(valorFiltrado);
  };


  return (
    <div className="flex flex-col min-h-screen bg-[#EBEBEB] font-sans">
      <Navbar />

      <div className="flex flex-col items-center justify-start flex-grow pt-28 pb-40 px-4 overflow-y-auto">
        <h1 className="font-['Permanent_Marker'] text-3xl text-[#293296] mb-2 text-center">
          Atividade
        </h1>

        <img
          src="/underline2.svg"
          alt="Sublinhado"
          className="w-auto h-auto mx-auto mt-[-10px] mb-8"
          style={{ maxWidth: "150px" }}
        />

        <div className="p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-lg border-2 border-[#293296] font-['Signika']">
          <form onSubmit={handleSave} id="atividadeForm">
            <div className="mb-4">
              <label htmlFor="nome" className="block mb-2 text-[#293296]">
                Nome*
              </label>
              <input
                type="text"
                id="nome"
                placeholder="Digite o nome da atividade"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={fieldClasses}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descricao" className="block mb-2 text-[#293296]">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={3}
                placeholder="Digite uma descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className={`${fieldClasses} resize-y`}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dataEntrega"
                className="block mb-2 text-[#293296]"
              >
                Data de Entrega
              </label>
              <input
                type="text"
                id="dataEntrega"
                placeholder="Dia/Mês/Ano"
                value={dataEntrega}
                onChange={handleDataChange}
                className={fieldClasses}
                maxLength={10}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="valorAtividade"
                className="block mb-2 text-[#293296]"
              >
                Valor da Atividade (Nota)*
              </label>
              <input
                id="valorAtividade"
                type="text"
                inputMode="decimal"
                placeholder="Digite quanto vale a atividade"
                value={valorAtividade}
                onChange={handleValorChange}
                className={fieldClasses}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="concluida" className="block mb-2 text-[#293296]">
                Status da Atividade
              </label>
              <div className="flex flex-col gap-3 mt-3">
                <label
                  htmlFor="concluida"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="concluida"
                    checked={status === "concluida"}
                    onChange={() =>
                      setStatus(status === "concluida" ? null : "concluida")
                    }
                    className="sr-only"
                  />
                  <div
                    className={`
                    h-4 w-4 flex-shrink-0 
                    border-2 border-[#293296] 
                    rounded-sm
                    flex items-center justify-center 
                    transition-colors
                    ${status === "concluida" ? "bg-[#293296]" : ""}
                  `}
                  >
                    {status === "concluida" && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <span className="text-[#293296]">Concluída</span>
                </label>

                <label
                  htmlFor="incompleta"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="incompleta"
                    checked={status === "incompleta"}
                    onChange={() =>
                      setStatus(status === "incompleta" ? null : "incompleta")
                    }
                    className="sr-only"
                  />
                  <div
                    className={`
                    h-4 w-4 flex-shrink-0 
                    border-2 border-[#293296] 
                    rounded-sm
                    flex items-center justify-center 
                    transition-colors
                    ${status === "incompleta" ? "bg-[#293296]" : ""}
                  `}
                  >
                    {status === "incompleta" && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <span className="text-[#293296]">Incompleta</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full max-w-lg">
          <button
            type="button"
            className="px-6 py-3 border-2 border-[#962929] text-[#962929] bg-white rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#962929] hover:text-white hover:scale-105 w-full sm:w-auto sm:min-w-[125px]"
            onClick={handleCancel}
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="atividadeForm"
            className="px-6 py-3 border-2 border-[#968D29] text-[#968D29] bg-white rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#968D29] hover:text-white hover:scale-105 w-full sm:w-auto sm:min-w-[125px]"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  )
};

export default AdcAtividade;