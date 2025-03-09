import React, { useState, useEffect } from "react";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  fechaPublicacion: string;
  isbn: string;
  disponible: boolean;
  numeroPaginas: number;
  genero: string;
  imagen: string;
}

interface Props {
  libro: Libro;
  onClose: () => void;
  onEditSuccess: (libroActualizado: Libro) => void;
}

const FormularioLibroEditar: React.FC<Props> = ({
  libro,
  onClose,
  onEditSuccess,
}) => {
  const [libroEditado, setLibroEditado] = useState<Libro>(libro);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLibroEditado({
      ...libroEditado,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://apidebiblioteca.onrender.com/api/Libros/${libroEditado.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(libroEditado),
        }
      );

      if (response.ok) {
        const libroActualizado = await response.json();
        onEditSuccess(libroActualizado);
        alert("Libro editado con éxito");
        onClose();
      } else {
        alert("Error al editar el libro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al conectarse con la API");
    }
  };

  return (
    <div>
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex flex-col overflow-y-auto items-center justify-center p-4 z-50"
    >
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md transform transition-transform duration-300">

      <h2 className="text-2xl font-bold mb-4">Editar Libro</h2>

      <input
        type="text"
        name="titulo"
        value={libroEditado.titulo}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="autor"
        value={libroEditado.autor}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        required
      />
      <input
        type="date"
        name="fechaPublicacion"
        value={libroEditado.fechaPublicacion}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="isbn"
        value={libroEditado.isbn}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="numeroPaginas"
        value={libroEditado.numeroPaginas}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="genero"
        value={libroEditado.genero}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="imagen"
        value={libroEditado.imagen}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          name="disponible"
          checked={libroEditado.disponible}
          onChange={handleChange}
          className="mr-2"
        />
        Disponible
      </label>

      <div className="flex mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-500 cursor-pointer rounded mr-2"
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 cursor-pointer hover:bg-gray-600 transition duration-500 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
      </div>
    </form>
    </div>
  );
};

export default FormularioLibroEditar;
