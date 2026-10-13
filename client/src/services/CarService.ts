import axios from 'axios';
import { SAMPLE_CARS } from '../data/sampleCars';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

// Interfaz para el modelo Car (coincide con entidad backend)
export interface Car {
  id?: number;
  name: string;        // Marca
  model: string;       // Modelo
  year: number;        // Año
  color: string;       // Color
  price: number;       // Precio
  description: string; // Descripción
  imageUrl: string;    // URL de imagen
  logoUrl: string;     // URL del logo de la marca (editable)
}

/**
 * Servicio para gestionar las peticiones HTTP a la API REST de vehículos.
 * Implementa operaciones CRUD: GET, POST, PUT, DELETE
 * También incluye método para obtener vehículos destacados (cool-cars).
 */
export class CarService {
  /**
   * Obtiene todos los vehículos
   */
  static async getAllCars(): Promise<Car[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/cars`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      // Fallback a datos de muestra (útil para GitHub Pages sin backend)
      return [...SAMPLE_CARS];
    }
  }

  /**
   * Obtiene un vehículo por su ID
   */
  static async getCarById(id: number): Promise<Car> {
    try {
      const response = await axios.get(`${API_BASE_URL}/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener vehículo con ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo vehículo
   */
  static async createCar(car: Car): Promise<Car> {
    try {
      const response = await axios.post(`${API_BASE_URL}/cars`, car);
      return response.data;
    } catch (error) {
      console.error('Error al crear vehículo:', error);
      // Fallback offline: crea un ID temporal
      return { ...car, id: Date.now() };
    }
  }

  /**
   * Actualiza un vehículo existente
   */
  static async updateCar(id: number, car: Car): Promise<Car> {
    try {
      const response = await axios.put(`${API_BASE_URL}/cars/${id}`, car);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar vehículo con ID ${id}:`, error);
      return { ...car, id };
    }
  }

  /**
   * Elimina un vehículo
   */
  static async deleteCar(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/cars/${id}`);
    } catch (error) {
      console.error(`Error al eliminar vehículo con ID ${id}:`, error);
      // Sin backend, la UI ya elimina localmente
    }
  }

  /**
   * Obtiene vehículos destacados (cool-cars)
   */
  static async getCoolCars(): Promise<Car[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/cool-cars`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener vehículos destacados:', error);
      return [...SAMPLE_CARS];
    }
  }
}
