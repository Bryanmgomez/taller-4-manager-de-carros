import { useState, useEffect } from 'react';
import { CarService } from '../services/CarService';
import type { Car } from '../services/CarService';
import CarCard from './CarCard';
import CarForm from './CarForm';

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [coolCars, setCoolCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterYear, setFilterYear] = useState<string>('');
  const [filterColor, setFilterColor] = useState<string>('');

  // Cargar datos al montar el componente
  useEffect(() => {
    loadAllData();
  }, []);

  // Aplicar filtros cuando cambian los términos de búsqueda o filtros
  useEffect(() => {
    applyFilters();
  }, [cars, searchTerm, filterYear, filterColor]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError('');
      const [allCars, coolCarsList] = await Promise.all([
        CarService.getAllCars(),
        CarService.getCoolCars(),
      ]);
      setCars(allCars);
      setCoolCars(coolCarsList);
    } catch (error) {
      setError('Error al cargar los vehículos. Verifique que el backend esté ejecutándose.');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...cars];

    // Filtro por búsqueda (marca o modelo)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term)
      );
    }

    // Filtro por año
    if (filterYear) {
      filtered = filtered.filter((car) => car.year.toString() === filterYear);
    }

    // Filtro por color
    if (filterColor.trim()) {
      const colorTerm = filterColor.toLowerCase();
      filtered = filtered.filter((car) =>
        car.color.toLowerCase().includes(colorTerm)
      );
    }

    setFilteredCars(filtered);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveCar = async (car: Car) => {
    try {
      setError('');
      if (car.id) {
        // Actualizar vehículo (PUT)
        await CarService.updateCar(car.id, car);
        showSuccess('¡Vehículo actualizado correctamente!');
      } else {
        // Crear nuevo vehículo (POST)
        await CarService.createCar(car);
        showSuccess('¡Vehículo registrado correctamente!');
      }
      await loadAllData();
      setShowForm(false);
      setEditingCar(null);
    } catch (error) {
      setError('Error al guardar el vehículo. Intente nuevamente.');
      console.error('Error saving car:', error);
    }
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDeleteCar = async (id: number) => {
    try {
      setError('');
      await CarService.deleteCar(id);
      showSuccess('¡Vehículo eliminado correctamente!');
      await loadAllData();
    } catch (error) {
      setError('Error al eliminar el vehículo. Intente nuevamente.');
      console.error('Error deleting car:', error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };

  const handleAddNew = () => {
    setEditingCar(null);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterYear('');
    setFilterColor('');
  };

  // Obtener años únicos para filtro
  const uniqueYears = [...new Set(cars.map((car) => car.year))]
    .sort((a, b) => b - a);

  // Obtener colores únicos para filtro
  const uniqueColors = [...new Set(cars.map((car) => car.color))].sort();

  return (
    <div className="car-list-container">
      {/* Mensajes de estado */}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Panel de Estadísticas */}
      <div className="stats-panel">
        <div className="stat-card">
          <h3>Total de Vehículos</h3>
          <div className="stat-value">{cars.length}</div>
        </div>
        <div className="stat-card">
          <h3>Vehículos Destacados</h3>
          <div className="stat-value">{coolCars.length}</div>
        </div>
      </div>

      {/* Botón para agregar nuevo vehículo */}
      {!showForm && (
        <div className="actions-bar">
          <button className="btn btn-primary" onClick={handleAddNew}>
            + Registrar Nuevo Vehículo
          </button>
        </div>
      )}

      {/* Formulario de registro/edición */}
      {showForm && (
        <CarForm
          car={editingCar}
          onSave={handleSaveCar}
          onCancel={handleCancelForm}
        />
      )}

      {/* Vehículos Destacados */}
      {!showForm && coolCars.length > 0 && (
        <section className="section">
          <h2 className="section-title">Vehículos Destacados</h2>
          <div className="cars-grid">
            {coolCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onEdit={handleEditCar}
                onDelete={handleDeleteCar}
              />
            ))}
          </div>
        </section>
      )}

      {/* Todos los vehículos */}
      {!showForm && (
        <section className="section">
          <h2 className="section-title">Listado de Vehículos</h2>

          {/* Buscador y Filtros */}
          <div className="filters-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar por marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="filter-select"
              >
                <option value="">Filtrar por año</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={filterColor}
                onChange={(e) => setFilterColor(e.target.value)}
                className="filter-select"
              >
                <option value="">Filtrar por color</option>
                {uniqueColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
              {(searchTerm || filterYear || filterColor) && (
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Limpiar Filtros
                </button>
              )}
            </div>
          </div>

          {/* Estado de carga */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Cargando vehículos...</p>
            </div>
          )}

          {/* Listado */}
          {!loading && filteredCars.length === 0 && cars.length === 0 && (
            <div className="empty-state">
              <p>No hay vehículos registrados.</p>
              <button className="btn btn-primary" onClick={handleAddNew}>
                Registrar el primer vehículo
              </button>
            </div>
          )}

          {!loading && filteredCars.length === 0 && cars.length > 0 && (
            <div className="empty-state">
              <p>No se encontraron vehículos con los filtros aplicados.</p>
              <button className="btn btn-secondary" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>
          )}

          {!loading && filteredCars.length > 0 && (
            <div className="cars-grid">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onEdit={handleEditCar}
                  onDelete={handleDeleteCar}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default CarList;
