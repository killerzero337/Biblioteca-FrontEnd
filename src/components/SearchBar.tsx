import React from "react";

interface SearchBarProps {
  busqueda: string;
  onBusquedaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autores: string[];
  generos: string[];
  disponibilidad: string;
  onFiltroChange: (filterName: string, filterValue: string) => void;
  fechaDesde: string;
  fechaHasta: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  busqueda,
  onBusquedaChange,
  autores,
  generos,
  disponibilidad,
  onFiltroChange,
  fechaDesde,
  fechaHasta,
}) => {
  return (
    <div className="flex justify-center relative top-11 z-50 w-full">
      <div className="w-full max-w-6xl rounded-xl bg-Dark-Violet md:h-50 h-120 bg-[url(../assets/bg-shorten-mobile.svg)] md:bg-[url(../assets/bg-shorten-desktop.svg)] bg-no-repeat bg-cover p-6">
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <label className="sr-only " htmlFor="busqueda">
            Buscar libro
          </label>
          <input
            id="busqueda"
            type="text"
            value={busqueda}
            onChange={onBusquedaChange}
            placeholder="Buscar libro..."
            className="w-full h-12 px-4 rounded-lg bg-white outline-none mb-4 md:mb-0"
          />
          <button className="w-full md:w-auto h-12 rounded-lg hover:bg-Cyan-Theme/70 transition duration-500 cursor-pointer bg-Cyan-Theme text-white font-bold px-6">
            Buscar
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-row justify-center items-center mt-6 md:grid-cols-none">
          <div className="flex flex-col">
            <label htmlFor="autor" className="mb-1 text-white">
              Filtrar por autor
            </label>
            <select
              id="autor"
              name="autor"
              onChange={(e) => onFiltroChange("autor", e.target.value)}
              className="p-2 border rounded-lg bg-white w-full md:w-auto"
            >
              <option value="">Seleccionar autor</option>
              {autores.map((autor, index) => (
                <option key={index} value={autor}>
                  {autor}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="genero" className="mb-1 text-white">
              Filtrar por género
            </label>
            <select
              id="genero"
              name="genero"
              onChange={(e) => onFiltroChange("genero", e.target.value)}
              className="p-2 border rounded-lg bg-white w-full md:w-auto"
            >
              <option value="">Seleccionar género</option>
              {generos.map((genero, index) => (
                <option key={index} value={genero}>
                  {genero}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="disponibilidad" className="mb-1 text-white">
              Filtrar por disponibilidad
            </label>
            <select
              id="disponibilidad"
              name="disponibilidad"
              onChange={(e) => onFiltroChange("disponibilidad", e.target.value)}
              className="p-2 border rounded-lg bg-white w-full md:w-auto"
            >
              <option value="">Seleccionar disponibilidad</option>
              <option value="true">Disponible</option>
              <option value="false">No disponible</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="fechaDesde" className="mb-1 text-white">
              Filtrar desde
            </label>
            <input
              id="fechaDesde"
              type="date"
              value={fechaDesde}
              onChange={(e) => onFiltroChange("desde", e.target.value)}
              className="p-2 border rounded-lg bg-white w-full md:w-auto"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fechaHasta" className="mb-1 text-white">
              Filtrar hasta
            </label>
            <input
              id="fechaHasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => onFiltroChange("hasta", e.target.value)}
              className="p-2 border rounded-lg bg-white w-full md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
