import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/navbar"
import ModalDialog from "../components/ModalDialog"
import { z } from "zod"
import { useAuth } from "../hooks/AuthContext"

const inputClasses =
  "w-full p-3 border border-[#293296] rounded-md box-border text-base outline-none font-[signika] text-black placeholder:text-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-[#293296]"

const loginSchema = z.object({
  email: z.email("Por favor, insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
})

type FormData = z.infer<typeof loginSchema>
type FormErrors = Partial<Record<keyof FormData, string>>

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"alert" | "success">("alert")
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const emailId = useId()
  const passwordId = useId()

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setLoading(true)

    const validationResult = loginSchema.safeParse(formData)
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      setFormErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      })
      setModalTitle("Login inválido")
      setModalMessage("Preencha corretamente todos os campos obrigatórios.")
      setModalType("alert")
      setModalOpen(true)
      setTimeout(() => setModalOpen(false), 2500)
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      })

      let data: any = {}
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      }

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao fazer login")
      }

      console.log("Resposta do login:", data)
      console.log("Token recebido:", data.data.token)

      setToken(data.data.token)

      console.log("Token após setToken:", localStorage.getItem("token"))

      setModalTitle("Login realizado!")
      setModalMessage("Você será redirecionado.")
      setModalType("success")
      setModalOpen(true)

      setTimeout(() => {
        setModalOpen(false)
        navigate("/adicionar-disciplina")
      }, 2000)
    } catch (err) {
      setModalTitle("Erro de login")
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

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-200px)] pt-55 px-5 py-10 sm:px-10">
        <div className="rounded-lg shadow-md p-6 sm:p-10 w-full max-w-sm text-center box-border border border-[#293296] z-10 mt-10 mb-10">
          <h1 className="font-['Permanent_Marker'] text-4xl text-[#293296] mb-3 relative font-normal">
            Login
          </h1>
          <img
            src="/underline-scribble.svg"
            className="w-auto h-auto mx-auto mt-[-10px] mb-8"
            style={{ maxWidth: "150px" }}
            alt="Sublinhado"
          />
          <form onSubmit={handleLogin} autoComplete="off">
            <div className="text-left mb-6">
              <label
                htmlFor={emailId}
                className="block mb-2 font-[signika] text-[#293296]"
              >
                Login
              </label>
              <input
                type="email"
                id={emailId}
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleInputChange("email")}
                className={inputClasses}
                disabled={loading}
                autoComplete="username"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div className="text-left mb-6">
              <label
                htmlFor={passwordId}
                className="block mb-2 font-[signika] text-[#293296]"
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
                autoComplete="current-password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {formErrors.password}
                </p>
              )}
              <a
                href="#!"
                className="block text-right mt-3 text-black no-underline text-xs font-[signika] hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#293296] text-white py-3 px-10 border-none rounded-full text-lg cursor-pointer transition-colors duration-300 block w-auto mx-auto mt-4 font-[signika] hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Login"}
            </button>
          </form>
        </div>
        <ModalDialog
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={modalTitle}
          message={modalMessage}
          type={modalType}
        />
      </div>
    </>
  )
}

export default Login
