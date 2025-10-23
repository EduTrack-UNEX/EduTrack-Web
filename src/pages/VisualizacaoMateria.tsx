import { useEffect, useState } from "react"
import Navbar from "../components/Navbar/navbar"

const atividadesMock = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  nome: "",
}))

export default function VisualizacaoMateria() {
  const [atividades] = useState(atividadesMock)

  const [progresso, setProgresso] = useState(0)
  useEffect(() => {
    const target = 30
    let current = 0
    const interval = setInterval(() => {
      if (current < target) {
        current += 2
        setProgresso(current)
      } else {
        clearInterval(interval)
      }
    }, 0)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex flex-col items-center pt-[110px] pb-[110px]">
      <Navbar />
      <h1 className="text-[3rem] md:text-[2.5rem] font-['Permanent_Marker'] text-[#293296] mb-0 mt-2 text-center tracking-wide">
        Python
      </h1>
      <img
        src="/underline2.svg"
        className="w-auto h-auto mx-auto mt-[-10px] mb-8"
        style={{ maxWidth: "230px" }}
        alt="Sublinhado"
      />

      <div className="w-full flex justify-center mb-12">
        <div className="relative w-[900px] h-[50px] rounded-full border-[3px] border-[#1E2CCA] bg-transparent overflow-hidden flex items-center">
          <div
            className="h-full bg-[#CABC1E] rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${progresso}%` }}
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 text-[2rem] transition-all duration-700 ease-in-out"
            style={{ left: `calc(${progresso}% - 30px)` }}
          >
            🏃‍♂️
          </span>
          <span className="absolute right-8 font-['Jersey_20'] text-[#1E2CCA] text-[1.6rem] select-none">
            {`${progresso}%`}
          </span>
        </div>
      </div>
      <div className="border-[2px] border-[#293296] rounded-lg bg-[#EBEBEB] w-[490px] h-[255px] mx-auto flex flex-col justify-center px-10 mb-6">
        {atividades.map((atividade) => (
          <div className="flex items-center mb-4" key={atividade.id}>
            <input
              type="checkbox"
              disabled
              className="appearance-none checked:bg-[#293296] bg-transparent border-[1px] border-[#293296] rounded-[4px] w-[21px] h-[20px] mr-6 cursor-default"
            />
          </div>
        ))}
      </div>

      <div className="w-[490px] flex justify-between px-2 mb-1 text-center">
        <a
          href="#!"
          className="text-[#293296] font-['Nunito'] text-[1.09rem] underline active:text-[#232884]"
        >
          Apagar Atividade
        </a>
        <a
          href="#!"
          className="text-[#293296] text-[1.09rem] font-['Nunito'] underline active:text-[#232884]"
        >
          Adicionar Atividade
        </a>
      </div>
      <div className="w-[490px] text-center">
        <a
          href="#!"
          className="text-[#293296] text-[1.09rem] font-['Nunito'] underline active:text-[#232884]"
        >
          Editar Atividade
        </a>
      </div>
    </div>
  )
}
