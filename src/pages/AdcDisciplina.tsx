import { useId, useState } from "react"
import "../styles/AdcDisciplina.css"
import Navbar from "../components/Navbar/navbar"

const AdcDisciplina: React.FC = () => {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [loading, setLoading] = useState(false)

  const nomeDisciplina = useId()
  const descricaoDisciplina = useId()

  const handleSave = async () => {
    if (!nome.trim()) {
      alert("O nome da disciplina é obrigatório!")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("URL_DO_BACKEND/api/disciplinas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          descricao: descricao,
        }),
      })

      if (!response.ok) throw new Error("Erro ao salvar disciplina")

      const data = await response.json()
      console.log("Disciplina salva:", data)
      alert("Disciplina salva com sucesso!")
      setNome("")
      setDescricao("")
    } catch (error) {
      console.error(error)
      alert("Erro ao salvar disciplina. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setNome("")
    setDescricao("")
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="title">ADICIONAR DISCIPLINA</h1>

        <div className="form-card">
          <div className="form-group">
            <label htmlFor="nomeDisciplina">Nome*</label>
            <input
              type="text"
              id={nomeDisciplina}
              placeholder="Digite o nome da disciplina"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricaoDisciplina">Descrição</label>
            <textarea
              id={descricaoDisciplina}
              rows={5}
              placeholder="Digite uma descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="form-actions-centralized">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </>
  )
}

export default AdcDisciplina
