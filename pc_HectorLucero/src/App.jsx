import BuscadorFetch from "./components/BuscadorFetch";
import "./App.css";

function App() {
  return (
    <div className="pagina">
      <header className="encabezado">
        <div className="encabezado-contenido">
          <span className="etiqueta">SISTEMA DE CONSULTA</span>
          <h1>Universidades del Perú</h1>
          <p>
            Explora y encuentra información de instituciones universitarias
            de manera rápida y sencilla.
          </p>
        </div>
      </header>

      <main className="contenedor">
        <BuscadorFetch />
      </main>

      <footer className="pie">
        <p>PC3 · Desarrollo de aplicaciones con API REST</p>
        <p>Frontend React · Backend Node.js y Express</p>
      </footer>
    </div>
  );
}

export default App;
