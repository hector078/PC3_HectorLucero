import { useEffect, useState } from "react";

function BuscadorFetch() {
  const [universidades, setUniversidades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function obtenerUniversidades() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(
          "/api/search?country=Peru",
          { signal: controller.signal }
        );

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        setUniversidades(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error al consultar la API:", err);
          setError(err.message || "No se pudieron cargar las universidades.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    obtenerUniversidades();

    return () => controller.abort();
  }, []);

  const universidadesFiltradas = universidades.filter((universidad) =>
    universidad.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return <p>Cargando universidades...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>Error al cargar universidades</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Volver a intentar
        </button>
      </div>
    );
  }

  return (
    <section>
      <h2>Universidades del Perú</h2>

      <input
        type="text"
        placeholder="Buscar universidad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <p>
        Universidades encontradas: {universidadesFiltradas.length}
      </p>

      {universidadesFiltradas.length === 0 ? (
        <p>No se encontraron universidades.</p>
      ) : (
        <ul>
          {universidadesFiltradas.map((universidad, index) => (
            <li key={`${universidad.name}-${index}`}>
              <strong>{universidad.name}</strong>
              <br />
              <a
                href={universidad.web_pages?.[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar sitio web
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BuscadorFetch;
