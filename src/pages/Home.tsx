import React, { useState } from 'react';
import Navbar from '../components/Navbar/navbar';

const Home: React.FC = () => {
  const paragrafoClasses =
    "text-lg font-[signika] text-[#293296] text-justify leading-relaxed";
  const formClasses =
    "w-full p-3 border border-[#293296] rounded-md box-border text-base outline-none font-['Signika'] text-black placeholder:text-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-[#293296]";
  const labelClasses = "block font-[signika] font-medium text-[#293296] mb-1";
  const progresso = 30;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      nome: (e.currentTarget.elements.namedItem('nome') as HTMLInputElement)
        .value,
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement)
        .value,
      descricao: (
        e.currentTarget.elements.namedItem('descricao') as HTMLTextAreaElement
      ).value,
    };

    try {
      const response = await fetch('http://seu-backend.com/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro ao enviar dados');

      alert('Mensagem enviada com sucesso!');
      e.currentTarget.reset(); // limpa formulário
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-20 pb-20">
      <Navbar />

      {/* HOME */}
      <section
        id="home"
        className="flex flex-col justify-center items-center p-4 pt-32 pb-10"
      >
        <div className="border-1 border-[#293296] rounded-xl p-6 w-full max-w-[800px] h-auto md:h-[250px] flex flex-col justify-center items-center">
          <h1 className="text-3xl font-['Permanent_Marker'] text-[#293296] mb-2 text-center">
            EDUTRACK
          </h1>
          <p className="text-lg font-[signika] text-[#293296] mb-4 text-center">
            Transforme esforço em progresso
          </p>

          <div className="relative w-full h-10 rounded-full border-2 border-[#293296] overflow-hidden mt-4">
            <div
              className="h-full bg-[#CABC1E] rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
            <img
              src="/bonequinho.svg"
              alt="Progresso"
              className="absolute top-1/2 -translate-y-1/2 w-10 h-10"
              style={{ left: `${progresso}%` }}
            />
          </div>
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section
        id="sobre"
        className="flex flex-col justify-center items-center p-4 pt-32 pb-10"
      >
        <div className="w-full max-w-3xl text-center space-y-4 px-2 md:px-0">
          <h2 className="text-3xl font-['Permanent_Marker'] text-[#293296] border-gray-300 inline-block pb-0">
            SOBRE NÓS
          </h2>
          <img
            src="/sobre.svg"
            className="w-auto h-auto mx-auto mt-[-6px] mb-4"
            style={{ maxWidth: '150px' }}
            alt="Sublinhado"
          />
          <div className="border-1 border-[#293296] rounded-lg p-4 md:p-6 space-y-4">
            <p className={paragrafoClasses}>
              Aprender é um processo, e organizar esse processo faz toda a
              diferença. Com essa ideia criamos esta plataforma, um espaço
              pensado para ajudar você a ter mais clareza e controle sobre seus
              estudos.
            </p>
            <p className={paragrafoClasses}>
              Aqui, você pode adicionar suas disciplinas, registrar atividades,
              acompanhar suas notas e visualizar seu progresso de forma simples
              e intuitiva. Mais do que um painel de tarefas, somos uma ferramenta
              feita para apoiar sua rotina de aprendizado, tornando o estudo
              menos caótico e mais estratégico.
            </p>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section
        id="contato"
        className="flex flex-col justify-center items-center p-4 pt-32 pb-10"
      >
        <div className="w-full max-w-3xl text-center space-y-4 px-2 md:px-0">
          <h2 className="text-3xl font-['Permanent_Marker'] text-[#293296] inline-block pb-0">
            CONTATO
          </h2>
          <img
            src="/sobre.svg"
            className="w-auto h-auto mx-auto mt-[-6px] mb-4"
            style={{ maxWidth: '150px' }}
            alt="Sublinhado"
          />
          <div className="border-1 border-[#293296] rounded-lg p-4 md:p-6 space-y-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg mx-auto flex flex-col gap-4 text-left"
            >
              <div>
                <label htmlFor="nome" className={labelClasses}>
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu Nome"
                  className={formClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  className={formClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="descricao" className={labelClasses}>
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  rows={5}
                  placeholder="Digite uma descrição"
                  className={formClasses}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#293296] text-white py-3 px-10 rounded-full text-lg cursor-pointer transition-colors duration-300 block w-auto mx-auto mt-2 font-[signika] hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
