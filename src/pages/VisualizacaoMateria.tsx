import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/navbar";

const atividadesMock = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  nome: "",
}));

export default function VisualizacaoMateria() {
  const [atividades] = useState(atividadesMock);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const target = 30;
    let current = 0;
    const interval = setInterval(() => {
      if (current < target) {
        current += 2;
        setProgresso(current);
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#EBEBEB] flex flex-col items-center pt-[110px] pb-[110px]">
      <Navbar />

      {/* Título */}
      <section className="flex flex-col justify-center items-center w-full max-w-[800px] px-4">
        <h1 className="text-[3rem] md:text-[2.5rem] font-['Permanent_Marker'] text-[#293296] mb-2 text-center">
          Python
        </h1>
        <img
          src="/underline2.svg"
          className="w-auto h-auto mx-auto -mt-2 mb-8"
          style={{ maxWidth: "230px" }}
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

      {/* Atividades */}
      <div className="border-2 border-[#293296] rounded-lg bg-[#EBEBEB] w-full max-w-[490px] h-[255px] mx-auto flex flex-col justify-center px-6 md:px-10 mb-6">
        {atividades.map((atividade) => (
          <div className="flex items-center mb-4" key={atividade.id}>
            <input
              type="checkbox"
              disabled
              className="appearance-none checked:bg-[#293296] bg-transparent border-2 border-[#293296] rounded w-5 h-5 mr-6 cursor-default"
            />
          </div>
        ))}
      </div>

      {/* Ações */}
      <div className="w-full max-w-[490px] flex justify-between px-2 mb-1 text-center">
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
      <div className="w-full max-w-[490px] text-center">
        <a
          href="#!"
          className="text-[#293296] text-[1.09rem] font-['Nunito'] underline active:text-[#232884]"
        >
          Editar Atividade
        </a>
      </div>
    </main>
  );
}
