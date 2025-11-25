import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/navbar"
import SubjectCard from "../components/subjectCard"
import { useAuth } from "../hooks/AuthContext"

export interface Subject {
  id: number
  name: string
  progress: number
  createdAt: string
  updatedAt: string
  average: number | null
}

export default function ListagemDisciplina() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return

    fetch("/api/v1/subjects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Não autorizado")
        return res.json()
      })
      .then((apiResponse) => {
        setSubjects(apiResponse.data)
      })
      .catch((err) => {
        console.error("Erro ao buscar matérias", err)
        setSubjects([])
      })
  }, [token])

  const handleCardClick = (id: string) => {
    navigate(`/visualizacao-materia/${id}`)
  }

  return (
    <div className="relative min-h-screen bg-[#EBEBEB] flex flex-col items-center pt-[110px] pb-[110px]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-8">
        <h1 className="text-6xl mt-10 mb-4 font-['Permanent_Marker'] text-[#293296] italic tracking-wide">
          Listagem de Matérias
        </h1>
        <img
          src="/underline-scribble.svg"
          className="w-auto h-auto mx-auto mt-[-10px] mb-12"
          style={{ maxWidth: "300px" }}
          alt="Sublinhado"
        />
     <button
  type="button"
  onClick={() => navigate("/adicionar-disciplina")}
  className="bg-[#293296] text-white py-3 px-10 border-none rounded-full text-lg cursor-pointer transition-colors duration-300 block w-auto mx-auto mt-[-20px] font-[signika] hover:opacity-90 disabled:opacity-50"
>
  Adicionar matéria
</button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center mb-24 w-full max-w-screen-xl">
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                name={subject.name}
                nota={subject.average !== null ? String(subject.average) : "-"}
                progresso={
                  subject.progress !== undefined ? `${subject.progress}%` : "-"
                }
                onClick={() => handleCardClick(subject.id.toString())}
              />
            ))
          ) : (
            <span className="col-span-5 text-center text-[#968D29] font-['Permanent_Marker']">
              Nenhuma matéria encontrada
            </span>
          )}
        </div>
      </main>
    </div>
  )
}
