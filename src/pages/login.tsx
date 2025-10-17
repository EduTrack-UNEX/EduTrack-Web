import React, { useState } from 'react';
import Navbar from '../components/Navbar/navbar';

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
      <div className="flex justify-center items-center h-[calc(100vh-200px)] px-5 py-10 sm:px-10">
        <div className="bg-white rounded-lg shadow-md p-10 w-[400px] max-w-[90%] text-center box-border border border-[#293296] z-10">
          <h1 className="font-['Permanent_Marker'] text-3xl text-[#293296] mb-8 relative font-normal after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-3 after:w-[100px] after:h-[3px] after:bg-primary-blue after:rounded-sm">
            LOGIN
          </h1>
          <form onSubmit={handleLogin}>
            <div className="text-left mb-6">
              <label htmlFor="email" className="block mb-2 font-[signika]  text-[#293296]">Login</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-[#293296] rounded-md box-border text-base outline-none font-[signika] text-[#333] focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
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
                className="w-full p-3 border border-[#293296] rounded-md box-border text-base outline-none font-[signika] text-[#333] focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
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
      <div className="fixed bottom-0 left-0 w-full h-[100px] bg-[#293296] rounded-t-[50%_50%] z-0"></div>
    </>
  );
};

export default Login;
