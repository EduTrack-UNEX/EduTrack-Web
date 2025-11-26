import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/navbar"
import { useAuth } from "../hooks/AuthContext"
import ModalDialog from "../components/ModalDialog"

const inputClasses =
  "p-3 border border-[#293296] rounded-md text-black placeholder:text-[#C4C4C4] resize-y focus:outline-none focus:ring-1 focus:ring-[#293296] w-full"

const AdcDisciplina: React.FC = () => {
  const [nome, setNome] = useState("")
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"alert" | "success">("alert")

  const API_ENDPOINT = "/api/v1/subjects"
  const nomeDisciplinaId = useId()

  const handleSave = async () => {
    if (!nome.trim()) {
      setModalTitle("Campo obrigatório")
      setModalMessage("O nome da disciplina é obrigatório!")
      setModalType("alert")
      setModalOpen(true)
      return
    }

    if (!token) {
      setModalTitle("Autenticação necessária")
      setModalMessage("Você precisa estar logado para adicionar disciplinas!")
      setModalType("alert")
      setModalOpen(true)
      return
    }

    setLoading(true)

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nome }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao salvar disciplina")
      }

      const data = await response.json()
      console.log("Disciplina salva:", data)

      setModalTitle("Sucesso!")
      setModalMessage("Disciplina salva com sucesso!")
      setModalType("success")
      setModalOpen(true)

      setNome("")

      setTimeout(() => {
        navigate("/listagem-disciplina")
      }, 1500)
    } catch (error) {
      console.error(error)
      setModalTitle("Erro ao salvar")
      setModalMessage(
        error instanceof Error
          ? error.message
          : "Erro ao salvar disciplina. Tente novamente.",
      )
      setModalType("alert")
      setModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setNome("")
    navigate("/listagem-disciplina")
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-[#EBEBEB]">
      <Navbar />

      <ModalDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />

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
              htmlFor={nomeDisciplinaId}
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
}

export default AdcDisciplina
