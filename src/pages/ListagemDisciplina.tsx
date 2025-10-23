import Navbar from "../components/Navbar/navbar"
import SubjectCard from "../components/subjectCard"

export default function ListagemDisciplina() {
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

        <div className="grid grid-cols-5 gap-10 mb-24">
          {Array.from({ length: 15 }).map(() => {
            const uniqueKey = crypto.randomUUID()
            return (
              <SubjectCard
                key={uniqueKey}
                name="Python"
                nota="10/10"
                progresso="80%"
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
