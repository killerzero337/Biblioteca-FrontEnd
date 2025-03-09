import React, { useState } from "react";
import FormularioLibroEditar from "./FormularioEditar";

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
  onEliminar,
  onEditar, 
}) => {
  const [editando, setEditando] = useState(false);

  const toggleFormulario = () => setEditando(!editando);
  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`https://apidebiblioteca.onrender.com/api/Libros/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libroEditado),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar libro");
      }
  
      const data = await response.json(); // Recibimos el libro actualizado
      onEditar(data.libro); // Actualizamos la lista en el estado global
    } catch (error) {
      console.error("Error al actualizar libro:", error);
    }
  };

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
        <button
          className="mt-1 bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-full hover:bg-blue-400 duration-500"
          onClick={toggleFormulario}
        >
          Editar
        </button>
        <button
          className="mt-1 bg-red-600 cursor-pointer text-white py-2 px-4 rounded-full hover:bg-red-400 transition duration-500"
          onClick={() => onEliminar(id)}
        >
          Eliminar
        </button>
      </div>

      {/* Mostrar formulario de edición si editando es true */}
      {editando && (
        <FormularioLibroEditar
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
          onClose={toggleFormulario}
          onEditSuccess={onEditar}
        />
      )}
    </div>
  );
};

export default TarjetaLibro;
