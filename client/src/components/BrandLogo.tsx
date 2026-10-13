import { useState, useEffect } from 'react';
import { getBrandColor } from '../services/brandLogos';

interface BrandLogoProps {
  name: string;      // Marca del vehículo
  logoUrl?: string;  // URL del logo (si está definida, tiene prioridad)
  className?: string;
}

/**
 * Obtiene las iniciales de una marca (máx. 2 letras) para el badge de reserva.
 */
function getInitials(name: string): string {
  const clean = (name || '?').trim();
  const parts = clean.split(/[\s-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

/**
 * Componente BrandLogo
 * Muestra el logo de la marca del vehículo.
 * - Si se pasa logoUrl, se usa esa imagen (editable por el usuario).
 * - Si no, intenta el catálogo de marcas (Simple Icons CDN).
 * - Si el logo falla o no existe, muestra un badge con las iniciales.
 */
const BrandLogo = ({ name, logoUrl, className = '' }: BrandLogoProps) => {
  const [failed, setFailed] = useState(false);

  // Reinicia el estado de error cuando cambia la fuente
  useEffect(() => {
    setFailed(false);
  }, [logoUrl, name]);

  const src = (logoUrl && logoUrl.trim() !== '')
    ? logoUrl.trim()
    : undefined;

  const color = getBrandColor(name);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`Logo ${name}`}
        className={`brand-logo-img ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  // Badge de reserva con iniciales y color de la marca
  return (
    <span
      className={`brand-logo-badge ${className}`}
      style={{ backgroundColor: color }}
      title={name}
    >
      {getInitials(name)}
    </span>
  );
};

export default BrandLogo;
