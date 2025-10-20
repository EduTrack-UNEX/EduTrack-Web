<<<<<<< HEAD
import './Navbar.css';
=======
import React from "react";
>>>>>>> 4dae3be8ce2d5d48fce55f9249f8391f7d9b3ece

const links = [
  { label: "HOME", href: "#home" },
  { label: "SOBRE", href: "#sobre" },
  { label: "CONTATO", href: "#contato" },
];

const Navbar: React.FC = () => (
  <>
  <nav className="fixed top-0 left-0 z-10 w-full h-[80px] bg-[#293296] rounded-b-[40px] flex justify-center items-center shadow-md px-4 md:px-0">
    <div className="flex flex-wrap justify-center gap-4 md:gap-16">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          className="text-white font-['Permanent_Marker'] text-xl transition-colors duration-300 hover:text-[#e0e0e0]"
        >
          {link.label}
        </a>
      ))}
    </div>
  </nav>
  <footer className="fixed bottom-0 left-0 w-full h-[100px] bg-[#293296] rounded-t-[45px] z-0"></footer>
  </>
);

export default Navbar;
