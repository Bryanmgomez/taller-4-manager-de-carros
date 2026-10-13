import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Car } from '../services/CarService';
import BrandLogo from './BrandLogo';
import { getBrandLogoUrl, SUGGESTED_BRANDS } from '../services/brandLogos';

interface CarFormProps {
  car: Car | null;
  onSave: (car: Car) => void;
  onCancel: () => void;
}

/**
 * Componente CarForm
 * Formulario para registrar y editar vehículos.
 * Incluye validaciones para evitar campos vacíos y valores incorrectos.
 * Implementa POST (crear) y PUT (actualizar) según si existe un ID.
 * Permite editar la imagen del vehículo y el logo de la marca (con vista previa).
 */
const CarForm = ({ car, onSave, onCancel }: CarFormProps) => {
  const [formData, setFormData] = useState<Car>({
    name: car?.name || '',
    model: car?.model || '',
    year: car?.year || new Date().getFullYear(),
    color: car?.color || '',
    price: car?.price || 0,
    description: car?.description || '',
    imageUrl: car?.imageUrl || '',
    logoUrl: car?.logoUrl || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'year' || name === 'price'
          ? parseFloat(value) || value
          : value,
    }));
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  /**
   * Autocompleta el campo de logo con el logo del catálogo para la marca escrita.
   */
  const autofillLogo = () => {
    const suggested = getBrandLogoUrl(formData.name);
    if (suggested) {
      setFormData((prev) => ({ ...prev, logoUrl: suggested }));
    } else {
      setErrors((prev) => ({
        ...prev,
        logoUrl: 'No hay logo en el catálogo para esa marca. Puedes pegar una URL.',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'La marca es obligatoria';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es obligatorio';
    }
    if (!formData.year || formData.year < 1900 || formData.year > 2100) {
      newErrors.year = 'Ingrese un año válido (1900-2100)';
    }
    if (!formData.color.trim()) {
      newErrors.color = 'El color es obligatorio';
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Ingrese un precio válido (mayor o igual a 0)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Si estamos editando, incluir el ID
      if (car && car.id) {
        onSave({ ...formData, id: car.id });
      } else {
        onSave(formData);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {car ? 'Editar Vehículo' : 'Registrar Nuevo Vehículo'}
      </h2>
      <form onSubmit={handleSubmit} className="car-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Marca *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              list="brand-list"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Ej: Toyota, Honda, Ford"
            />
            <datalist id="brand-list">
              {SUGGESTED_BRANDS.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="model" className="form-label">
              Modelo *
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={`form-input ${errors.model ? 'input-error' : ''}`}
              placeholder="Ej: Corolla, Civic, Mustang"
            />
            {errors.model && (
              <span className="error-message">{errors.model}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year" className="form-label">
              Año *
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`form-input ${errors.year ? 'input-error' : ''}`}
              min="1900"
              max="2100"
            />
            {errors.year && <span className="error-message">{errors.year}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="color" className="form-label">
              Color *
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={`form-input ${errors.color ? 'input-error' : ''}`}
              placeholder="Ej: Blanco, Negro, Rojo"
            />
            {errors.color && (
              <span className="error-message">{errors.color}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Precio *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`form-input ${errors.price ? 'input-error' : ''}`}
              min="0"
              step="1000"
              placeholder="Ej: 25000000"
            />
            {errors.price && (
              <span className="error-message">{errors.price}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              URL de imagen del vehículo
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </div>
        </div>

        {/* Logo de la marca (editable) con vista previa */}
        <div className="form-group">
          <label htmlFor="logoUrl" className="form-label">
            Logo de la marca (opcional)
          </label>
          <div className="logo-field">
            <input
              type="text"
              id="logoUrl"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className={`form-input ${errors.logoUrl ? 'input-error' : ''}`}
              placeholder="https://ejemplo.com/logo.svg"
            />
            <button
              type="button"
              className="btn btn-secondary btn-logo-auto"
              onClick={autofillLogo}
              title="Buscar automáticamente el logo de la marca"
            >
              Usar logo de la marca
            </button>
          </div>
          {errors.logoUrl && (
            <span className="error-message">{errors.logoUrl}</span>
          )}
          <div className="preview-row">
            <div className="preview-item">
              <span className="preview-label">Logo:</span>
              <BrandLogo name={formData.name} logoUrl={formData.logoUrl} />
            </div>
            {formData.imageUrl && formData.imageUrl.trim() !== '' && (
              <div className="preview-item">
                <span className="preview-label">Imagen:</span>
                <img
                  src={formData.imageUrl}
                  alt="Vista previa"
                  className="preview-photo"
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows={3}
            placeholder="Descripción detallada del vehículo..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-save">
            {car ? 'Actualizar Vehículo' : 'Guardar Vehículo'}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
