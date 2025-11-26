import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Edit2, Trash2 } from "lucide-react"
import Swal from "sweetalert2"
import Navbar from "../components/Navbar/navbar"
import { useAuth } from "../hooks/AuthContext"
import Loader from "../components/Loader"
import ModalDialog from "../components/ModalDialog"

interface Subject {
  id: number
  name: string
  progress: number
  average: number | null
  createdAt: string
  updatedAt: string
}

interface Task {
  id: number
  name: string
  grade: number
  isCompleted: boolean
  dueDate: string
  createdAt: string
  updatedAt: string
}

export default function VisualizacaoMateria() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { token } = useAuth()
  const [materia, setMateria] = useState<Subject | null>(null)
  const [atividades, setAtividades] = useState<Task[]>([])
  const [progresso, setProgresso] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"alert" | "success">("alert")

  useEffect(() => {
    if (!token || !id) return
    fetch(`/api/v1/subjects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMateria(res.data)
      })
      .catch(() => {
        setMateria(null)
      })
  }, [token, id])

  useEffect(() => {
    if (!token || !id) return
    fetch(`/api/v1/subjects/${id}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAtividades(res.data.content ?? [])
      })
      .catch(() => setAtividades([]))
      .finally(() => setIsLoading(false))
  }, [token, id])

  useEffect(() => {
    if (atividades.length > 0) {
      const completas = atividades.filter((a) => a.isCompleted).length
      const percentual = Math.round((completas / atividades.length) * 100)

      let current = 0
      const interval = setInterval(() => {
        if (current < percentual) {
          current += 2
          setProgresso(current)
        } else {
          setProgresso(percentual)
          clearInterval(interval)
        }
      }, 15)
      return () => clearInterval(interval)
    } else {
      setProgresso(0)
    }
  }, [atividades])

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  const handleCheckboxChange = async (
    taskId: number,
    currentStatus: boolean,
  ) => {
    if (!token || !id) return

    const atividade = atividades.find((a) => a.id === taskId)
    if (!atividade) return

    try {
      const response = await fetch(`/api/v1/subjects/${id}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: atividade.name,
          grade: atividade.grade,
          dueDate: atividade.dueDate,
          isCompleted: !currentStatus,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar atividade")
      }

      setAtividades((prevAtividades) =>
        prevAtividades.map((a) =>
          a.id === taskId ? { ...a, isCompleted: !currentStatus } : a,
        ),
      )
    } catch (error) {
      setModalTitle("Erro")
      setModalMessage("Erro ao atualizar atividade. Tente novamente.")
      setModalType("alert")
      setModalOpen(true)
      console.error(error)
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    if (!token || !id) return

    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você tem certeza que deseja apagar esta atividade? Esta ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#968D29",
      cancelButtonColor: "#962929",
      confirmButtonText: "Sim, apagar!",
      cancelButtonText: "Cancelar",
      customClass: {
        title: "font-['Permanent_Marker'] text-[#293296]",
        htmlContainer: "font-['Signika'] text-[#293296]",
        confirmButton: "font-['Signika'] font-bold",
        cancelButton: "font-['Signika'] font-bold",
      },
    })

    if (!result.isConfirmed) return

    try {
      const response = await fetch(`/api/v1/subjects/${id}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao apagar atividade")
      }

      setAtividades((prevAtividades) =>
        prevAtividades.filter((a) => a.id !== taskId),
      )

      Swal.fire({
        title: "Sucesso!",
        text: "Atividade apagada com sucesso!",
        icon: "success",
        confirmButtonColor: "#968D29",
        customClass: {
          title: "font-['Permanent_Marker'] text-[#293296]",
          htmlContainer: "font-['Signika'] text-[#293296]",
          confirmButton: "font-['Signika'] font-bold",
        },
      })
    } catch (error) {
      setModalTitle("Erro")
      setModalMessage("Erro ao apagar atividade. Tente novamente.")
      setModalType("alert")
      setModalOpen(true)
      console.error(error)
    }
  }

  const handleEditTask = (taskId: number) => {
    navigate(`/editar-atividade/${id}/${taskId}`)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#EBEBEB] flex flex-col items-center pt-[110px] pb-[110px]">
        <Navbar />
        <Loader text="Carregando matéria..." />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#EBEBEB] flex flex-col items-center pt-[110px] pb-[110px]">
      <Navbar />

      <ModalDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />

      <section className="flex flex-col justify-center items-center w-full max-w-[800px] px-4 mb-8">
        <h1 className="text-5xl font-['Permanent_Marker'] text-[#293296] mb-2 text-center break-words">
          {materia ? materia.name : "Carregando..."}
        </h1>
        <img
          src="/underline2.svg"
          className="w-auto h-auto mx-auto -mt-3 mb-2"
          style={{ maxWidth: "200px" }}
          alt="Sublinhado"
        />
      </section>

      <div className="w-full flex justify-center mb-12 px-4">
        <div className="relative w-full max-w-[800px] h-10 rounded-full border-2 border-[#293296] overflow-hidden flex items-center bg-transparent">
          <div
            className="h-full bg-[#CABC1E] rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progresso}%` }}
          />
          <img
            src="/bonequinho.svg"
            alt="Progresso"
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 transition-all duration-500 ease-in-out"
            style={{ left: `calc(${progresso}% - 20px)` }}
          />
          <span className="absolute right-4 font-['Jersey_20'] text-[#293296] text-[1.6rem] select-none">
            {`${progresso}%`}
          </span>
        </div>
      </div>

      <div className="border-2 border-[#293296] rounded-lg bg-[#EBEBEB] w-full max-w-[800px] mx-auto flex flex-col justify-start px-6 md:px-10 py-6 mb-6 overflow-y-auto max-h-[400px]">
        {atividades.length > 0 ? (
          atividades.map((atividade) => (
            <div
              className="flex items-center mb-4 gap-3 hover:bg-[#E0E0E0] p-2 rounded transition-colors"
              key={atividade.id}
            >
              <input
                type="checkbox"
                checked={atividade.isCompleted}
                onChange={() =>
                  handleCheckboxChange(atividade.id, atividade.isCompleted)
                }
                className="w-4 h-4 border border-default-medium rounded-xs bg-transparent cursor-pointer flex-shrink-0"
              />
              <span
                className={`text-[#293296] font-['Signika'] font-semibold flex-1 truncate ${
                  atividade.isCompleted ? "line-through opacity-60" : ""
                }`}
              >
                {atividade.name}
              </span>
              <span className="text-[#968D29] font-['Signika'] text-sm font-semibold whitespace-nowrap">
                Nota: {atividade.grade}
              </span>
              <span className="text-[#293296] font-['Signika'] text-sm whitespace-nowrap">
                {formatarData(atividade.dueDate)}
              </span>
              <button
                type="button"
                onClick={() => handleEditTask(atividade.id)}
                className="text-[#293296] hover:text-[#968D29] transition-colors flex-shrink-0"
                title="Editar atividade"
              >
                <Edit2 size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteTask(atividade.id)}
                className="text-[#962929] hover:text-[#7a1f1f] transition-colors flex-shrink-0"
                title="Apagar atividade"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <span className="text-[#968D29] text-center mt-8">
            Nenhuma atividade cadastrada
          </span>
        )}
      </div>

      <div className="w-full max-w-[800px] flex justify-center px-2 gap-4">
        <Link
          to={`/adicionar-atividade/${id}`}
          className="text-[#293296] text-[1.09rem] font-['Nunito'] underline active:text-[#232884] cursor-pointer"
        >
          Adicionar Atividade
        </Link>
      </div>
    </main>
  )
}
