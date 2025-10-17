import Navbar from "../components/Navbar/navbar"
import { useId } from "react"

const Cadastro: React.FC = () => {
  const email = useId()
  const password = useId()

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-200px)] py-10 px-5">
        <div className="bg-white border border-[#293296] rounded-[10px] shadow-xl p-10 w-[622px] max-w-[90%] text-center box-border z-10">
          <h1 className="relative font-permanent-marker text-2xl text-[#293296] font-normal mb-6 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[10px] after:w-[100px] after:h-[3px] after:bg-[#293296] after:rounded-[2px]" style={{fontFamily: "'Permanent Marker', cursive"}}>
            Cadastro de Usuário
          </h1>
          <form>
            <div className="text-left mb-6">
              <label htmlFor="name" className="block mb-2 font-signika font-bold text-[#293296]">
                Nome
              </label>
              <input
                type="text"
                id={email}
                placeholder="Digite seu nome"
                className="w-full p-3 border border-[#293296] rounded-[5px] box-border text-base outline-none font-signika text-[#333] transition focus:border-[#293296] focus:shadow-[0_0_0_2px_rgba(41,50,150,0.2)]"
              />
            </div>
            <div className="text-left mb-6">
              <label htmlFor="email" className="block mb-2 font-signika font-bold text-[#293296]">
                Email
              </label>
              <input
                type="email"
                id={email}
                placeholder="Digite seu e-mail"
                className="w-full p-3 border border-[#293296] rounded-[5px] box-border text-base outline-none font-signika text-[#333] transition focus:border-[#293296] focus:shadow-[0_0_0_2px_rgba(41,50,150,0.2)]"
              />
            </div>
            <div className="text-left mb-6">
              <label htmlFor="password" className="block mb-2 font-signika font-bold text-[#293296]">
                Senha
              </label>
              <input
                type="password"
                id={password}
                placeholder="Digite sua senha"
                className="w-full p-3 border border-[#293296] rounded-[5px] box-border text-base outline-none font-signika text-[#333] transition focus:border-[#293296] focus:shadow-[0_0_0_2px_rgba(41,50,150,0.2)]"
              />
            </div>
            <div className="flex justify-center gap-22 ">
              <button type="button" className="bg-transparent border border-[#968D29] text-[#968D29] px-10 py-2.5 rounded-[20px] text-base font-signika block w-auto mt-0 mb-0 cursor-pointer hover:opacity-90 transition backgro">
                Cancelar
              </button>
              <button type="submit" className="bg-transparent border border-[#962929] text-[#962929] px-10 py-2.5 rounded-[20px] text-base font-signika block w-auto mt-0 mb-0 cursor-pointer hover:opacity-90 transition">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-24 absolute left-0 bottom-0 z-0 rounded-t-[48%_54%_73%_27%/71%_100%_0%_29%] bg-gradient-to-t from-[#293296] to-transparent"></div>
    </>
  )
}

export default Cadastro
