import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

interface LinkButton {
  label: string;
  route: string;
  showForLogged?: boolean; 
  allowedPaths?: string[]; 
}

const Navbar: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  
  const sections = [
    { label: "HOME", id: "home" },
    { label: "SOBRE", id: "sobre" },
    { label: "CONTATO", id: "contato" },
  ];

  const buttons: LinkButton[] = [
  {
    label: "CADASTRE-SE",
    route: "/cadastro",
    showForLogged: false,
    allowedPaths: ["/", "/login", "/home", "/cadastro"],
  },
  {
    label: "LOGIN",
    route: "/login",
    showForLogged: false,
    allowedPaths: ["/", "/login", "/home", "/cadastro"],
  },
  {
    label: "MINHAS MATÉRIAS",
    route: "/listagem-disciplina",
    showForLogged: true,
    allowedPaths: [
      "/listagem-disciplina",
      "/visualizacao-materia",
      "/adicionar-disciplina",
      "/adicionar-atividade",
    ],
  },
];

  const visibleButtons = buttons.filter((btn) => {
    if (btn.showForLogged && !token) return false;
    if (btn.showForLogged === false && token) return false;

    if (!btn.allowedPaths) return true;

    return btn.allowedPaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    );
  });

  
  const handleScroll = (sectionId: string) => {
    if (pathname !== "/home") {
      navigate("/home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-10 w-full h-[80px] bg-[#293296] rounded-b-[40px] flex items-center shadow-md px-4 sm:px-6 md:px-8">
        <img
          src="/logo.svg"
          alt="Logo EduTrack"
          className="h-8 sm:h-10 md:h-12 w-auto cursor-pointer select-none"
          onClick={() => handleScroll("home")}
        />

        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 sm:gap-8 md:gap-12 items-center">
          {sections.map((section) => (
            <span
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className="cursor-pointer text-white font-['Permanent_Marker'] text-base sm:text-lg md:text-xl transition-colors duration-300 hover:text-[#e0e0e0]"
            >
              {section.label}
            </span>
          ))}

          {visibleButtons.map((btn) => (
            <span
              key={btn.label}
              onClick={() => navigate(btn.route)}
              className="cursor-pointer text-white font-['Permanent_Marker'] text-base sm:text-lg md:text-xl transition-colors duration-300 hover:text-[#e0e0e0]"
            >
              {btn.label}
            </span>
          ))}
        </div>
      </nav>

      
      <footer className="fixed bottom-0 left-0 w-full h-[100px] bg-[#293296] rounded-t-[45px] z-0"></footer>
    </>
  );
};

export default Navbar;
