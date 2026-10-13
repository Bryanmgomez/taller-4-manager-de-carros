/**
 * Catálogo de logos de marcas de vehículos.
 *
 * Usa el CDN público de Simple Icons (https://simpleicons.org), que no requiere
 * API Key. Cada marca se mapea a un "slug" y a su color corporativo.
 *
 * Si una marca no existe en el catálogo, el componente BrandLogo mostrará un
 * badge con las iniciales de la marca (ver BrandLogo.tsx).
 */

interface BrandInfo {
  slug: string;
  color: string;
}

const BRANDS: { [key: string]: BrandInfo } = {
  toyota: { slug: 'toyota', color: 'EB0A1E' },
  honda: { slug: 'honda', color: 'E40521' },
  ford: { slug: 'ford', color: '003478' },
  chevrolet: { slug: 'chevrolet', color: 'C5A05A' },
  chevrolet_: { slug: 'chevrolet', color: 'C5A05A' },
  bmw: { slug: 'bmw', color: '0066B1' },
  audi: { slug: 'audi', color: 'BB0A30' },
  volkswagen: { slug: 'volkswagen', color: '001E50' },
  vw: { slug: 'volkswagen', color: '001E50' },
  nissan: { slug: 'nissan', color: 'C3002F' },
  hyundai: { slug: 'hyundai', color: '002C5F' },
  kia: { slug: 'kia', color: 'BB162B' },
  mazda: { slug: 'mazda', color: '101010' },
  porsche: { slug: 'porsche', color: 'B12B28' },
  ferrari: { slug: 'ferrari', color: 'FF2800' },
  tesla: { slug: 'tesla', color: 'CC0000' },
  subaru: { slug: 'subaru', color: '013C74' },
  jeep: { slug: 'jeep', color: '4A5D4E' },
  renault: { slug: 'renault', color: '000000' },
  peugeot: { slug: 'peugeot', color: '000000' },
  volvo: { slug: 'volvo', color: '003057' },
  mitsubishi: { slug: 'mitsubishi', color: 'E60012' },
  suzuki: { slug: 'suzuki', color: 'E30613' },
  fiat: { slug: 'fiat', color: '101010' },
  lamborghini: { slug: 'lamborghini', color: 'DDB321' },
  ferrari_: { slug: 'ferrari', color: 'FF2800' },
  maserati: { slug: 'maserati', color: '0C2340' },
  bugatti: { slug: 'bugatti', color: 'BE0032' },
  bentley: { slug: 'bentley', color: '101010' },
  astonmartin: { slug: 'astonmartin', color: '00665E' },
  rollsroyce: { slug: 'rollsroyce', color: '101010' },
  cadillac: { slug: 'cadillac', color: '101010' },
  mini: { slug: 'mini', color: '101010' },
  skoda: { slug: 'skoda', color: '0E3A2F' },
  mitsubishi_: { slug: 'mitsubishi', color: 'E60012' },
  tesla_: { slug: 'tesla', color: 'CC0000' },
};

/**
 * Normaliza el nombre de la marca para buscarlo en el catálogo.
 */
function normalize(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Devuelve la URL del logo de la marca o null si no se encuentra.
 */
export function getBrandLogoUrl(name: string): string | null {
  if (!name) return null;

  // Coincidencia exacta
  if (BRANDS[name.toLowerCase()]) {
    const b = BRANDS[name.toLowerCase()];
    return `https://cdn.simpleicons.org/${b.slug}/${b.color}`;
  }

  // Coincidencia por palabra contenida (ej: "Mercedes-Benz", "Alfa Romeo")
  for (const key2 of Object.keys(BRANDS)) {
    if (name.toLowerCase().includes(key2)) {
      const b = BRANDS[key2];
      return `https://cdn.simpleicons.org/${b.slug}/${b.color}`;
    }
  }

  if (BRANDS[normalize(name)]) {
    const b = BRANDS[normalize(name)];
    return `https://cdn.simpleicons.org/${b.slug}/${b.color}`;
  }

  return null;
}

/**
 * Devuelve el color corporativo de la marca (o un azul por defecto).
 */
export function getBrandColor(name: string): string {
  const key = normalize(name);
  if (BRANDS[key]) {
    return '#' + BRANDS[key].color;
  }
  return '#1e3a8a';
}

/**
 * Lista de marcas sugeridas para el formulario (datalist).
 */
export const SUGGESTED_BRANDS: string[] = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Audi', 'Volkswagen',
  'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Porsche', 'Ferrari', 'Tesla',
  'Subaru', 'Jeep', 'Renault', 'Peugeot', 'Volvo', 'Mercedes-Benz',
  'Mitsubishi', 'Suzuki', 'Lamborghini', 'Maserati', 'Bugatti', 'Bentley',
  'Jaguar', 'Land Rover', 'Lexus', 'Alfa Romeo', 'Dodge', 'Cadillac',
];
