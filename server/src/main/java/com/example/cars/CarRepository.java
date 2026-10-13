package com.example.cars;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de datos para la entidad Car.
 * Proporciona métodos CRUD y operaciones de base de datos mediante Spring Data JPA.
 */
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
}
