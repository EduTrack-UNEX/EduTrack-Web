import React, { useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import { useId } from "react"

const Cadastro: React.FC = () => {
  const email = useId()
  const password = useId()

const inputClasses = "w-full p-3 border border-[#293296] rounded-md box-border text-base outline-none font-[signika] text-black placeholder:text-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-[#293296]";
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch("URL_DO_BACKEND/api/disciplinas", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      
      localStorage.setItem('token', data.token);
      console.log('Login bem-sucedido', data);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-200px)] pt-55 px-5 py-10 sm:px-10">
        <div className="rounded-lg shadow-md p-6 sm:p-10 w-full max-w-sm text-center box-border border border-[#293296] z-10">
         <h1 className="font-['Permanent_Marker'] text-4xl text-[#293296] mb-3 relative font-normal">
            Login
          </h1>
          <img 
            src="/underline-scribble.svg"
            className="w-auto h-auto mx-auto mt-[-10px] mb-8" 
            style={{maxWidth: '150px'}} 
          />
          <form onSubmit={handleLogin}>
            <div className="text-left mb-6">
              <label htmlFor="email" className="block mb-2 font-[signika]  text-[#293296]">Login</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                required
              />
            </div>
            <div className="text-left mb-6">
              <label htmlFor="password" className="block mb-2 font-[signika] text-[#293296]">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                required
              />
              <a href="#" className="block text-right mt-3 text-black no-underline text-xs font-[signika] hover:underline">Esqueceu a senha?</a>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#293296] text-white py-3 px-10 border-none rounded-full text-base cursor-pointer transition-colors duration-300 block w-auto mx-auto mt-4 font-[signika] hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      
    </>
  )
}

export default Cadastro
