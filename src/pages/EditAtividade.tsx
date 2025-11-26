import { useId, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/navbar"
import { useAuth } from "../hooks/AuthContext"
import ModalDialog from "../components/ModalDialog"

const fieldClasses =
  "w-full p-3 border border-[#293296] rounded-md box-border text-base outline-none font-['Signika'] text-black placeholder:text-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-[#293296]"

function formatarDataParaISO(data: string) {
  const parts = data.split("/")
  if (parts.length === 3) {
    const [dia, mes, ano] = parts
    if (
      dia.length === 2 &&
      mes.length === 2 &&
      ano.length === 4 &&
      !isNaN(Number(dia)) &&
      !isNaN(Number(mes)) &&
      !isNaN(Number(ano))
    ) {
      return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`
    }
  }
  return ""
}

function formatarDataParaBR(data: string) {
  const parts = data.split("-")
  if (parts.length === 3) {
    const [ano, mes, dia] = parts
    return `${dia}/${mes}/${ano}`
  }
  return ""
}

const EditAtividade: React.FC = () => {
  const [nome, setNome] = useState("")
  const [dataEntrega, setDataEntrega] = useState("")
  const [valorAtividade, setValorAtividade] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [hasLoadedData, setHasLoadedData] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"alert" | "success">("alert")
  const [shouldNavigate, setShouldNavigate] = useState(false)

  const atividadeFormId = useId()
  const nameId = useId()
  const dataEntregaId = useId()
  const valorAtividadeId = useId()
  const concluidaId = useId()
  const incompletaId = useId()

  const { id, taskId } = useParams<{ id: string; taskId: string }>()
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    if (!token || !id || !taskId || hasLoadedData) return

    let isMounted = true

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/v1/subjects/${id}/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`)
        }

        const data = await res.json()
        console.log("Resposta da API:", data)

        const task = data.data || data
        console.log("Task extraído:", task)

        if (!task || !task.name) {
          throw new Error("Estrutura de dados inválida: 'name' não encontrado")
        }

        if (isMounted) {
          setNome(task.name || "")
          setDataEntrega(task.dueDate ? formatarDataParaBR(task.dueDate) : "")
          setValorAtividade(task.grade ? String(task.grade) : "")
          setIsCompleted(task.isCompleted || false)
          setHasLoadedData(true)
          console.log("Dados carregados com sucesso")
        }
      } catch (error) {
        console.error("Erro ao carregar atividade:", error)
        if (isMounted) {
          setModalTitle("Erro ao carregar")
          setModalMessage(
            `Erro ao carregar dados da atividade: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
          )
          setModalType("alert")
          setModalOpen(true)
          setShouldNavigate(true)
        }
      } finally {
        if (isMounted) {
          setIsLoadingData(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [token, id, taskId, hasLoadedData])

  useEffect(() => {
    if (shouldNavigate && !modalOpen) {
      const timer = setTimeout(() => {
        navigate(`/visualizacao-materia/${id}`)
        setShouldNavigate(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [shouldNavigate, modalOpen, navigate, id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !valorAtividade.trim()) {
      setModalTitle("Campos obrigatórios")
      setModalMessage("Os campos com * são obrigatórios!")
      setModalType("alert")
      setModalOpen(true)
      return
    }

    if (!id || !taskId || !token) {
      setModalTitle("Erro de autenticação")
      setModalMessage(
        "Erro de autenticação ou rota! Refaça o login ou recarregue a página.",
      )
      setModalType("alert")
      setModalOpen(true)
      return
    }

    const dataFormatada = formatarDataParaISO(dataEntrega)
    if (dataEntrega && !dataFormatada) {
      setModalTitle("Data inválida")
      setModalMessage(
        "A data de entrega deve estar no formato Dia/Mês/Ano (ex: 10/10/2020)",
      )
      setModalType("alert")
      setModalOpen(true)
      return
    }

    setLoading(true)

    try {
      const body = {
        name: nome,
        dueDate: dataFormatada,
        grade: valorAtividade,
        isCompleted: isCompleted,
      }

      const response = await fetch(`/api/v1/subjects/${id}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || "Erro ao atualizar atividade.")
      }

      setModalTitle("Sucesso!")
      setModalMessage("Atividade atualizada com sucesso!")
      setModalType("success")
      setModalOpen(true)

      setTimeout(() => {
        navigate(`/visualizacao-materia/${id}`)
      }, 1500)
    } catch (error) {
      setModalTitle("Erro ao salvar")
      setModalMessage(
        error instanceof Error ? error.message : "Erro ao atualizar atividade!",
      )
      setModalType("alert")
      setModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (id) navigate(`/visualizacao-materia/${id}`)
  }

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/\D/g, "")
    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
    }
    setDataEntrega(value)
  }

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.,]/g, "")
    value = value.replace(/,/g, ".")
    const partes = value.split(".")
    if (partes.length > 2) value = partes[0] + "." + partes.slice(1).join("")
    setValorAtividade(value)
  }

  if (isLoadingData) {
    return (
      <div className="flex flex-col min-h-screen bg-[#EBEBEB] font-sans items-center justify-center">
        <Navbar />
        <p className="text-[#293296] font-['Signika'] text-lg">
          Carregando dados da atividade...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#EBEBEB] font-sans">
      <Navbar />

      <ModalDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />

      <div className="flex flex-col items-center justify-start flex-grow pt-28 pb-40 px-4 overflow-y-auto">
        <h1 className="font-['Permanent_Marker'] text-3xl text-[#293296] mb-2 text-center">
          Editar Atividade
        </h1>

        <img
          src="/underline2.svg"
          alt="Sublinhado"
          className="w-auto h-auto mx-auto mt-[-10px] mb-8"
          style={{ maxWidth: "150px" }}
        />

        <div className="p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-lg border-2 border-[#293296] font-['Signika']">
          <form onSubmit={handleSave} id={atividadeFormId}>
            <div className="mb-4">
              <label htmlFor={nameId} className="block mb-2 text-[#293296]">
                Nome*
              </label>
              <input
                type="text"
                id={nameId}
                placeholder="Digite o nome da atividade"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={fieldClasses}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={dataEntregaId}
                className="block mb-2 text-[#293296]"
              >
                Data de Entrega
              </label>
              <input
                type="text"
                id={dataEntregaId}
                placeholder="Dia/Mês/Ano"
                value={dataEntrega}
                onChange={handleDataChange}
                className={fieldClasses}
                maxLength={10}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={valorAtividadeId}
                className="block mb-2 text-[#293296]"
              >
                Valor da Atividade (Nota)*
              </label>
              <input
                id={valorAtividadeId}
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
              <label
                htmlFor={concluidaId}
                className="block mb-2 text-[#293296]"
              >
                Status da Atividade
              </label>
              <div className="flex flex-col gap-3 mt-3">
                <label
                  htmlFor={concluidaId}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    id={concluidaId}
                    checked={isCompleted === true}
                    onChange={() => setIsCompleted(true)}
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 flex-shrink-0 border-2 border-[#293296] rounded-sm flex items-center justify-center transition-colors ${
                      isCompleted === true ? "bg-[#293296]" : ""
                    }`}
                  >
                    {isCompleted === true && (
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
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-[#293296]">Concluída</span>
                </label>

                <label
                  htmlFor={incompletaId}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    id={incompletaId}
                    checked={isCompleted === false}
                    onChange={() => setIsCompleted(false)}
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 flex-shrink-0 border-2 border-[#293296] rounded-sm flex items-center justify-center transition-colors ${
                      isCompleted === false ? "bg-[#293296]" : ""
                    }`}
                  >
                    {isCompleted === false && (
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
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-[#293296]">Incompleta</span>
                </label>
              </div>
            </div>
          </form>
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
            type="submit"
            form={atividadeFormId}
            className="px-6 py-3 border-2 border-[#968D29] text-[#968D29] rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#968D29] hover:text-white hover:scale-105 min-w-[125px]"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditAtividade
