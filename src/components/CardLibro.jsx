import React, { useState } from "react";
import Formulario from "./Formulario";

const TarjetaLibro = ({
  id,
  titulo,
  autor,
  fechaPublicacion,
  isbn,
  disponible,
  numeroPaginas,
  genero,
  imagen,
  onEliminar, // Prop para manejar la eliminación
}) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para controlar la visibilidad del formulario

  const toggleFormulario = () => setMostrarFormulario(!mostrarFormulario);

  return (
    <div className="bg-white shadow-lg rounded-xl p-1 flex flex-col items-center min-w-90 max-w-90 mx-auto border border-gray-300">
      <img
        src={imagen ? imagen : "/default-cover.jpg"}
        alt={`Portada del libro ${titulo}`}
        className="w-32 h-48 object-cover mb-4 rounded-md"
      />
      <div className="text-center">
        <h2 className="text-xl font-bold text-purple-800 mb-2">{titulo}</h2>
        <p className="text-md text-gray-600 mb-2">
          <strong>Autor:</strong> {autor}
        </p>
        {fechaPublicacion && (
          <p className="text-sm text-gray-500 mb-1">
            <strong>Fecha de publicación:</strong> {fechaPublicacion}
          </p>
        )}
        {isbn && (
          <p className="text-sm text-gray-500 mb-1">
            <strong>ISBN:</strong> {isbn}
          </p>
        )}
        <p className="text-sm text-gray-500 mb-1">
          <strong>Disponibilidad:</strong>{" "}
          {disponible ? "Disponible" : "No disponible"}
        </p>
        {numeroPaginas && (
          <p className="text-sm text-gray-500 mb-1">
            <strong>Páginas:</strong> {numeroPaginas}
          </p>
        )}
        {genero && (
          <p className="text-sm text-gray-500 mb-1">
            <strong>Género:</strong> {genero}
          </p>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
        <button className="mt-4 bg-blue-600/50 text-white cursor-not-allowed py-2 px-4 rounded-full hover:bg-blue-500">
          Editar
        </button>
        <button
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500"
          onClick={() => onEliminar(id)} 
        >
          Eliminar
        </button>
      </div>

      {mostrarFormulario && (
        <div className="absolute inset-0 flex items-center justify-center z-20 p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-4">
          <FormularioLibro
            libro={{
              id,
              titulo,
              autor,
              fechaPublicacion,
              isbn,
              disponible,
              numeroPaginas,
              genero,
              imagen,
            }}
            onSubmit={() => toggleFormulario()}
          />
        </div>
      )}
    </div>
  );
};

export default TarjetaLibro;
