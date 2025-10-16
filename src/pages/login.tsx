import '../styles/Login.css';
import Navbar from '../components/Navbar/navbar';
import { useId } from "react"

const Cadastro: React.FC = () => {
  const email = useId()
  const password = useId()

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">LOGIN</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Login</label>
              <input type="email" id={email} placeholder="Digite seu e-mail" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id={password}
                placeholder="Digite sua senha"
              />
              <a href="#!" className="forgot-password">
                Esqueceu a senha?
              </a>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="bottom-wave"></div>
    </>
  )
}

export default Cadastro
