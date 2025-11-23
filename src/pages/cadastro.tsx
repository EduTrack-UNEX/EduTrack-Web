import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/navbar"
import { z } from "zod"
import ModalDialog from "../components/ModalDialog"

const inputClasses =
  "w-full h-[61px] p-3 border border-[#293296] rounded-[10px] box-border text-base outline-none font-[signika] text-black placeholder:text-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-[#293296]"

const cadastroSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.email("Por favor, insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
})

type FormData = z.infer<typeof cadastroSchema>
type FormErrors = Partial<Record<keyof FormData, string>>

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"alert" | "success">("alert")
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setApiError("")

    const validationResult = cadastroSchema.safeParse(formData)
    if (!validationResult.success) {
      const errors = z.flattenError(validationResult.error).fieldErrors
      setFormErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
      })

      setModalTitle("Cadastro inválido")
      setModalMessage("Preencha corretamente todos os campos obrigatórios.")
      setModalType("alert")
      setModalOpen(true)
      setTimeout(() => setModalOpen(false), 2500)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/v1/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      })

      let data: any = {}
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        data = null
      }

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao fazer cadastro")
      }

      setModalTitle("Cadastro realizado!")
      setModalMessage("Seu cadastro foi concluído com sucesso.")
      setModalType("success")
      setModalOpen(true)

      setTimeout(() => {
        setModalOpen(false)
        navigate("/login")
      }, 3000)
    } catch (err) {
      setModalTitle("Erro ao cadastrar")
      setModalMessage(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro inesperado. Tente novamente.",
      )
      setModalType("alert")
      setModalOpen(true)
      setTimeout(() => setModalOpen(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-auto min-h-[calc(100vh-100px)] pt-40 pb-[180px] px-4 sm:px-6 md:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-['Permanent_Marker'] text-5xl text-[#293296] mb-3 relative font-normal">
            Cadastro de Usuário
          </h1>
          <img
            src="/underline2.svg"
            className="w-auto h-auto mx-auto mt-[-10px] mb-8"
            style={{ maxWidth: "230px" }}
            alt="Sublinhado"
          />
        </div>

        <form
          onSubmit={handleCadastro}
          className="rounded-lg shadow-md pb-9 pt-4 w-full max-w-[95vw] sm:max-w-lg md:max-w-xl text-center box-border border-[2px] border-[#293296] z-10"
        >
          <div className="w-full max-w-xs sm:max-w-md mx-auto text-left mb-2">
            <label
              htmlFor={nameId}
              className="block mb-1 ml-2 font-[signika] text-[#293296]"
            >
              Nome
            </label>
            <input
              type="text"
              id={nameId}
              placeholder="Digite seu Nome"
              value={formData.name}
              onChange={handleInputChange("name")}
              className={inputClasses}
              disabled={loading}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {formErrors.name}
              </p>
            )}
          </div>

          <div className="w-full max-w-xs sm:max-w-md pt-2 mx-auto text-left mb-2">
            <label
              htmlFor={emailId}
              className="block mb-1 ml-2 font-[signika] text-[#293296]"
            >
              E-mail
            </label>
            <input
              type="email"
              id={emailId}
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleInputChange("email")}
              className={inputClasses}
              disabled={loading}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {formErrors.email}
              </p>
            )}
          </div>

          <div className="w-full max-w-xs sm:max-w-md pt-2 mx-auto text-left">
            <label
              htmlFor={passwordId}
              className="block mb-1 ml-2 font-[signika] text-[#293296]"
            >
              Senha
            </label>
            <input
              type="password"
              id={passwordId}
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleInputChange("password")}
              className={inputClasses}
              disabled={loading}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {formErrors.password}
              </p>
            )}
          </div>

          {apiError && <p className="text-red-500 mt-4 mb-2">{apiError}</p>}

          <ModalDialog
            open={modalOpen}
            onOpenChange={setModalOpen}
            title={modalTitle}
            message={modalMessage}
            type={modalType}
          />
        </form>

        <div className="flex flex-row justify-center gap-4 mt-16 w-full max-w-[95vw] sm:max-w-lg md:max-w-xl flex-wrap">
          <button
            type="button"
            className="px-6 py-3 border-2 border-[#962929] text-[#962929] rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#962929] hover:text-white hover:scale-105 min-w-[125px]"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 border-2 border-[#968D29] text-[#968D29] rounded-full font-['Signika'] text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#968D29] hover:text-white hover:scale-105 min-w-[125px]"
            disabled={loading}
            onClick={handleCadastro}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Cadastro
