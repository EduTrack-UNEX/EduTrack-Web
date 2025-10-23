import { useId, useState } from "react"
import Navbar from "../components/Navbar/navbar"

const inputClasses =
  "w-full h-[61px] p-3 border border-[#293296] rounded-[10px] box-border text-base outline-none font-[signika] text-black placeholder:text-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-[#293296]"

const Cadastro: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.message || "Erro ao fazer handleCadastro")

      localStorage.setItem("token", data.token)
      window.location.href = "/dashboard"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] pt-55">
        <div className="mb-10">
          <h1 className="font-['Permanent_Marker'] text-5xl text-[#293296] mb-3 relative font-normal text-center">
            Cadastro de Usuário
          </h1>
          <img
            src="/underline2.svg"
            className="w-auto h-auto mx-auto mt-[-10px] mb-8"
            style={{ maxWidth: "230px" }}
            alt="Sublinhado"
          />
        </div>
        <div className="rounded-lg shadow-md pb-9 pt-4 w-full max-w-[95vw] sm:max-w-lg md:max-w-xl text-center box-border border-[2px] border-[#293296] z-10">
          <form onSubmit={handleCadastro}>
            <div className="w-full max-w-xs sm:max-w-md mx-auto text-left">
              <label
                htmlFor="name"
                className="block mb-1 ml-2 font-[signika] text-[#293296]"
              >
                Nome
              </label>
              <input
                type="text"
                id={nameId}
                placeholder="Digite seu Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="w-full max-w-xs sm:max-w-md pt-2 mx-auto text-left">
              <label
                htmlFor="email"
                className="block mx-auto mb-1 ml-2 font-[signika] text-[#293296]"
              >
                E-mail
              </label>
              <input
                type="email"
                id={emailId}
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="w-full max-w-xs sm:max-w-md pt-2 mx-auto text-left">
              <label
                htmlFor="password"
                className="block mb-1 ml-2 font-[signika] text-[#293296]"
              >
                Senha
              </label>
              <input
                type="password"
                id={passwordId}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </form>
        </div>
        <div className="flex justify-center gap-4 mt-16">
          <button
            type="button"
            className="bg-transparent border-[2px] border-[#962929] text-[#962929] px-6 py-2.5 rounded-[30px] text-base font-['signika'] block cursor-pointer hover:opacity-90 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-transparent border-[2px] border-[#968D29] text-[#968D29] px-6 py-2.5 rounded-[30px] text-base font-['signika'] block w-auto cursor-pointer hover:opacity-90 transition"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </>
  )
}

export default Cadastro
