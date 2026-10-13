import CarList from './components/CarList'
import './App.css'

/**
 * Componente principal de la aplicación CarManager.
 * Muestra el encabezado, menú de navegación y el listado de vehículos.
 */
function App() {
  return (
    <div className="app">
      {/* Encabezado */}
      <header className="app-header">
        <div className="header-container">
          <h1 className="app-title">🚗 CarManager</h1>
          <p className="app-subtitle">Sistema de Gestión de Vehículos</p>
        </div>
      </header>

      {/* Menú de Navegación */}
      <nav className="app-nav">
        <div className="nav-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#inicio" className="nav-link">Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#vehiculos" className="nav-link">Vehículos</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="app-main" id="inicio">
        <div className="main-container">
          <CarList />
        </div>
      </main>

      {/* Pie de Página */}
      <footer className="app-footer">
        <div className="footer-container">
          <p>&copy; 2026 CarManager - Tecnológico de Antioquia</p>
        </div>
      </footer>
    </div>
  )
}

export default App
