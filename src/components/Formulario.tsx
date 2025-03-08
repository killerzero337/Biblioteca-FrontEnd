import React, { useState } from "react";

interface Libro {
  titulo: string;
  autor: string;
  fechaPublicacion: string;
  isbn: string;
  disponible: boolean;
  numeroPaginas: number;
  genero: string;
  imagen: string;
}

const FormularioLibro: React.FC = () => {
  const [libro, setLibro] = useState<Libro>({
    titulo: "",
    autor: "",
    fechaPublicacion: "",
    isbn: "",
    disponible: false,
    numeroPaginas: 0,
    genero: "",
    imagen: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLibro({
      ...libro,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://apidebiblioteca.onrender.com/api/Libros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(libro),
      });

      if (response.ok) {
        alert("Libro agregado con éxito");
        window.location.reload();
      } else {
        alert("Error al agregar el libro");
        console.error("Error en la respuesta:", await response.json());
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al conectarse con la API");
    }
  };

  return (
    <form id="form-libro" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Agregar Libro
      </h2>

      <div className="mb-4">
        <label
          htmlFor="titulo"
          className="block text-gray-700 font-medium mb-2"
        >
          Título
        </label>
        <input
          type="text"
          name="titulo"
          id="titulo"
          value={libro.titulo}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="autor" className="block text-gray-700 font-medium mb-2">
          Autor
        </label>
        <input
          type="text"
          name="autor"
          id="autor"
          value={libro.autor}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="fechaPublicacion"
          className="block text-gray-700 font-medium mb-2"
        >
          Fecha de Publicación
        </label>
        <input
          type="date"
          name="fechaPublicacion"
          id="fechaPublicacion"
          value={libro.fechaPublicacion}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="isbn" className="block text-gray-700 font-medium mb-2">
          ISBN
        </label>
        <input
          type="text"
          name="isbn"
          id="isbn"
          value={libro.isbn}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="disponible"
          id="disponible"
          checked={libro.disponible}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="disponible" className="text-gray-700 font-medium">
          Disponible
        </label>
      </div>

      <div className="mb-4">
        <label
          htmlFor="numeroPaginas"
          className="block text-gray-700 font-medium mb-2"
        >
          Número de Páginas
        </label>
        <input
          type="number"
          name="numeroPaginas"
          id="numeroPaginas"
          value={libro.numeroPaginas}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="genero"
          className="block text-gray-700 font-medium mb-2"
        >
          Género
        </label>
        <input
          type="text"
          name="genero"
          id="genero"
          value={libro.genero}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="imagen"
          className="block text-gray-700 font-medium mb-2"
        >
          Imagen (URL)
        </label>
        <input
          type="text"
          name="imagen"
          id="imagen"
          value={libro.imagen}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Agregar Libro
      </button>
    </form>
  );
};

export default FormularioLibro;
