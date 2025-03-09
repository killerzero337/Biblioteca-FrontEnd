import React from "react";

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`fixed top-0 fle left-0 w-full h-full  bg-white z-60 transition-all duration-300 ease-in-out flex flex-col text-center items-center justify-center ${
        isOpen ? " opacity-100 visible" : " opacity-10 invisible"
      }`}
    >
      <ul className="text-xl space-y-6">
        <li>
          <a href="http://">Sobre el proyecto</a>
        </li>
        <li>
          <a href="http://">Tecnologías utilizadas</a>
        </li>
        <li>
          <a href="/api-rest">¿Qué es una API?</a>
        </li>
      </ul>

      <button
        onClick={toggleMenu}
        className="mt-8 px-6 py-2 w-20 text-white rounded-lg cursor-pointer"
      >
        <img src="/close.svg" alt="" />
      </button>
    </div>
  );
};

export default HamburgerMenu;
