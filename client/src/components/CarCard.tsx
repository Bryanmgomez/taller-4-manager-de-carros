import { useState } from 'react';
import GiphyImage from './GiphyImage';
import BrandLogo from './BrandLogo';
import type { Car } from '../services/CarService';

interface CarCardProps {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
}

/**
 * CarCard
 * Tarjeta que muestra un vehículo con:
 * - Imagen del vehículo (si el usuario la definió) o un GIF/imagen por marca.
 * - Insignia (badge) con el logo de la marca, siempre visible y editable.
 */
const CarCard = ({ car, onEdit, onDelete }: CarCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  const hasPhoto = !!(car.imageUrl && car.imageUrl.trim() !== '');

  return (
    <div className="car-card">
      <div className="car-card-image">
        {hasPhoto && !imageFailed ? (
          <img
            src={car.imageUrl}
            alt={`${car.name} ${car.model}`}
            className="car-photo"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <GiphyImage name={car.name} />
        )}

        {/* Badge con el logo de la marca (editable) */}
        <div className="car-logo-badge">
          <BrandLogo name={car.name} logoUrl={car.logoUrl} />
        </div>
      </div>

      <div className="car-card-content">
        <h3 className="car-card-title">
          {car.name} {car.model}
        </h3>
        <div className="car-card-details">
          <div className="car-detail">
            <span className="car-detail-label">Año:</span>
            <span className="car-detail-value">{car.year}</span>
          </div>
          <div className="car-detail">
            <span className="car-detail-label">Color:</span>
            <span className="car-detail-value">{car.color}</span>
          </div>
          <div className="car-detail">
            <span className="car-detail-label">Precio:</span>
            <span className="car-detail-value price">
              ${car.price.toLocaleString('es-CO')}
            </span>
          </div>
        </div>
        {car.description && (
          <div className="car-card-description">
            <p>{car.description}</p>
          </div>
        )}
        <div className="car-card-actions">
          <button className="btn btn-edit" onClick={() => onEdit(car)}>
            Editar
          </button>
          <button
            className="btn btn-delete"
            onClick={() => {
              if (car.id && window.confirm(`¿Eliminar ${car.name} ${car.model}?`)) {
                onDelete(car.id);
              }
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
