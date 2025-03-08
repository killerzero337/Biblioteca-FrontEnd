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
      <menu className="flex justify-between md:justify-around items-center mt-5 h-30 px-6 z-10 relative">
        <div className="flex items-center">
          <a href="http://">
            <img src="/logo.svg" alt="Logotipo" />
          </a>
        </div>

        {/* Menú principal en pantallas grandes */}
        <div className="hidden md:flex flex-1 justify-around">
          <ul className="flex gap-5">
            <li>
              <a href="http://" className="hover:text-Cyan-Theme">
                Sobre el proyecto
              </a>
            </li>
            <li>
              <a href="http://" className="hover:text-Cyan-Theme">
                Tecnologías utilizadas
              </a>
            </li>
            <li>
              <a href="http://" className="hover:text-Cyan-Theme">
                ¿Qué es una API?
              </a>
            </li>
          </ul>
        </div>

        {/* Menú hamburguesa en pantallas pequeñas */}
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
        <div className="absolute z-20 p-6 top-100 left-1/2 transform -translate-x-1/2 w-100 -translate-y-1/2 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-4">
          <Formulario />
          <button
            onClick={toggleFormulario}
            className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white py-2 px-4 rounded"
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Menu;
