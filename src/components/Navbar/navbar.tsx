import React from "react";

const links = [
  { label: "HOME", href: "#home" },
  { label: "SOBRE", href: "#sobre" },
  { label: "CONTATO", href: "#contato" },
];

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 z-10 w-full h-[80px] bg-[#293296] rounded-b-[40px] flex items-center shadow-md px-4 sm:px-6 md:px-8">
        {/* Logo à esquerda */}
        <img
          src="/logo.svg"
          alt="Logo EduTrack"
          className="h-8 sm:h-10 md:h-12 w-auto cursor-pointer select-none"
        />

        {/* Links centralizados */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-8 md:gap-16 text-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white font-['Permanent_Marker'] text-base sm:text-lg md:text-xl transition-colors duration-300 hover:text-[#e0e0e0]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Footer fixo */}
      <footer className="fixed bottom-0 left-0 w-full h-[100px] bg-[#293296] rounded-t-[45px] z-0"></footer>
    </>
  );
};

export default Navbar;
