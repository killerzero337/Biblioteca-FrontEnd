import React, { useState, useEffect } from "react";
import TarjetaLibro from "./CardLibro";

import SearchBar from "./SearchBar";
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

const ColeccionLibros = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [librosFiltrados, setLibrosFiltrados] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState<string>("");
  const [autores, setAutores] = useState<string[]>([]);
  const [generos, setGeneros] = useState<string[]>([]);
  const [disponibilidad] = useState<string>("true");
  const [fechaDesde, setFechaDesde] = useState<string>("");
  const [fechaHasta, setFechaHasta] = useState<string>("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const actualizarLibro = (libroActualizado: Libro) => {
    Content();
    setLibros((prevLibros) =>
      prevLibros.map((l) =>
        l.id === libroActualizado.id ? libroActualizado : l
      )
    );

    setLibrosFiltrados((prevFiltrados) =>
      prevFiltrados.map((l) =>
        l.id === libroActualizado.id ? libroActualizado : l
      )
    );
  };

  const Content = async () => {
    try {
      const response = await fetch(
        "https://apidebiblioteca.onrender.com/api/Libros"
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const librosArray = Array.isArray(data) ? data : data.libros || [];

      setLibros(librosArray);
      setLibrosFiltrados(librosArray);

      const autoresSet = new Set(
        librosArray.map((libro: Libro) => libro.autor)
      );
      const generosSet = new Set(
        librosArray.map((libro: Libro) => libro.genero)
      );

      setAutores(Array.from(autoresSet) as string[]);
      setGeneros(Array.from(generosSet) as string[]);
    } catch (error: any) {
      console.error("Error al obtener libros:", error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleBusqueda = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setBusqueda(query);

    const librosFiltrados = libros.filter((libro) =>
      libro.titulo?.toLowerCase().includes(query.toLowerCase())
    );

    setLibrosFiltrados(librosFiltrados);
  };

  const handleFiltroChange = async (
    filterName: string,
    filterValue: string
  ) => {
    if (filterName === "desde") {
      setFechaDesde(filterValue);
    } else if (filterName === "hasta") {
      setFechaHasta(filterValue);
    }

    let url = "https://apidebiblioteca.onrender.com/api/Libros";

    if (filterName === "autor" && filterValue !== "") {
      url = `${url}/autor/${filterValue}`;
    } else if (filterName === "genero" && filterValue !== "") {
      url = `${url}/genero/${filterValue}`;
    } else if (filterName === "disponibilidad" && filterValue !== "") {
      url = `${url}/disponible/${filterValue === "true"}`;
    }

    const formatearFecha = (fecha: string) => {
      const partes = fecha.split("-");
      return partes.length === 3
        ? `${partes[2]}-${partes[1]}-${partes[0]}`
        : fecha;
    };

    if (
      (filterName === "desde" || filterName === "hasta") &&
      fechaDesde &&
      fechaHasta
    ) {
      const fechaDesdeFormateada = formatearFecha(fechaDesde);
      const fechaHastaFormateada = formatearFecha(fechaHasta);

      url = `https://apidebiblioteca.onrender.com/api/Libros/fechaPublicacion/?desde=${fechaDesdeFormateada}&hasta=${fechaHastaFormateada}`;
    }

    console.log(`URL generada: ${url}`);

    try {
      setCargando(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const librosArray = Array.isArray(data) ? data : data.libros || [];

      setLibrosFiltrados(librosArray);
    } catch (error: any) {
      console.error("Error al filtrar libros:", error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };
  const eliminarLibro = async (id: number) => {
    try {
      const response = await fetch(
        `https://apidebiblioteca.onrender.com/api/Libros/${id}`,
        {
          method: "DELETE",
        }
      );
      Content();
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Actualiza el estado después de eliminar
      setLibros(libros.filter((libro) => libro.id !== id));
      setLibrosFiltrados(librosFiltrados.filter((libro) => libro.id !== id));
    } catch (error: any) {
      console.error("Error al eliminar libro:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    Content();
  }, []);

  return (
    <main className="mb">
      <div className="flex justify-center relative top-11 z-50 w-full">
        <SearchBar
          busqueda={busqueda}
          onBusquedaChange={handleBusqueda}
          autores={autores}
          generos={generos}
          disponibilidad={disponibilidad}
          fechaDesde={fechaDesde}
          fechaHasta={fechaHasta}
          onFiltroChange={handleFiltroChange}
        />
      </div>
      <div className="p-10 bg-Gray/50">
        <div className="mt-20">
          <h1 className="text-4xl text-center md:text-7xl font-bold text-Dark-Violet">
            Aquí nuestra colección:
          </h1>
          <p className="mt-2 text-center text-Grayish-Violet">
            Descubre historias inspiradoras explorando el mundo de la lectura.
          </p>
        </div>
      </div>

      {/*
      <div className="p-10 text-center bg-Gray/50">
        {cargando && <p className="text-gray-600">Cargando libros...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-10 bg-Gray/50">
        {librosFiltrados.length > 0
          ? librosFiltrados.map((libro) => (
              <TarjetaLibro
                id={libro.id}
                key={libro.id}
                titulo={libro.titulo}
                autor={libro.autor}
                fechaPublicacion={libro.fechaPublicacion}
                isbn={libro.isbn}
                disponible={libro.disponible}
                numeroPaginas={libro.numeroPaginas}
                genero={libro.genero}
                imagen={libro.imagen}
                onEliminar={() => eliminarLibro(libro.id)}
                onEditar={actualizarLibro}
              />
            ))
          : !cargando && (
              <p className="text-red-600 text-center">
                No se encontraron libros.
              </p>
            )}
      </div>
    </main>
  );
};

export default ColeccionLibros;
