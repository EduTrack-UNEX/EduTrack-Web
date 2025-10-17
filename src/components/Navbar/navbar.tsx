import React from 'react';

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="relative w-full h-[100px] bg-[#293296] rounded-b-[50%_50%] flex justify-center items-center box-border z-20 overflow-hidden">
        <ul className="list-none m-0 p-0 flex gap-10">
          <li><a href="home" className="no-underline text-white font-['Permanent_Marker'] text-2xl font-normal transition-colors duration-300 hover:text-[#f0f0f0]">HOME</a></li>
          <li><a href="sobre" className="no-underline text-white font-['Permanent_Marker'] text-2xl font-normal transition-colors duration-300 hover:text-[#f0f0f0]">SOBRE</a></li>
          <li><a href="contato" className="no-underline text-white font-['Permanent_Marker'] text-2xl font-normal transition-colors duration-300 hover:text-[#f0f0f0]">CONTATO</a></li>
        </ul>
      </nav>
      <div className="fixed bottom-0 left-0 w-full h-[100px] bg-[#293296] rounded-t-[50%_50%] z-0"></div>
    </>
  );
};

export default Navbar;