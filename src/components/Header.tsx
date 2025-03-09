import React, { useState } from "react";
import HamburgerMenu from "./toggle";
import Formulario from "./Formulario"; // Asegúrate de importar Formulario

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleFormulario = () => setMostrarFormulario(!mostrarFormulario);

  return (
    <>
      <menu className="fixed-header flex justify-between md:justify-around items-center mt-5 h-30 px-6 z-10 relative">
        <div className="flex items-center">
          <a href="/">
            <img src="/logo.svg" alt="Logotipo" />
          </a>
        </div>

        <div className="hidden md:flex flex-1 justify-around">
          <ul className="flex gap-5">
            <li>
              <a
                href="posts/sobre-el-proyecto"
                className="hover:text-Cyan-Theme"
              >
                Sobre el proyecto
              </a>
            </li>
            <li>
              <a
                href="posts/tecnologias-usadas"
                className="hover:text-Cyan-Theme"
              >
                Tecnologías utilizadas
              </a>
            </li>
            <li>
              <a href="/api-rest" className="hover:text-Cyan-Theme">
                ¿Qué es una API?
              </a>
            </li>
          </ul>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 cursor-pointer w-10"
            aria-label="Abrir menú"
          >
            <img src="/Hamburger_icon.png" alt="Menú hamburguesa" />
          </button>
        </div>

        {/* Botón para abrir el formulario */}
        <button
          onClick={toggleFormulario}
          className="cursor-pointer bg-Cyan-Theme w-30 md:w-32 text-center py-2 rounded-4xl text-white transition duration-500 hover:bg-Cyan-Theme/70"
        >
          <span>Añadir libro</span>
        </button>

        {/* Menú hamburguesa desplegable */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          } transition-transform duration-500 ease-in-out`}
        >
          <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </menu>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-lg shadow-md p-4 w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-end">
              <button
                onClick={toggleFormulario}
                className="bg-red-500 text-white align-middle cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-lg"
              >
                ✕
              </button>
            </div>
            <Formulario />
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
