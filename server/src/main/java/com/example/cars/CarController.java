package com.example.cars;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Controlador REST para gestionar los vehículos.
 * Proporciona endpoints para realizar operaciones CRUD (GET, POST, PUT, DELETE)
 * y un endpoint especial para vehículos destacados (cool-cars).
 *
 * Nota: se usan rutas absolutas en cada método (no @RequestMapping a nivel de clase)
 * para que el endpoint de destacados quede en /cool-cars, tal como pide el laboratorio.
 */
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CarController {

    private final CarRepository repository;

    @Autowired
    public CarController(CarRepository repository) {
        this.repository = repository;
    }

    /**
     * GET /cars -> devuelve todos los vehículos.
     */
    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = repository.findAll();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    /**
     * GET /cars/{id} -> devuelve un vehículo por su ID.
     */
    @GetMapping("/cars/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Optional<Car> car = repository.findById(id);
        return car.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * POST /cars -> registra un nuevo vehículo.
     */
    @PostMapping("/cars")
    public ResponseEntity<Car> createCar(@Valid @RequestBody Car car) {
        Car savedCar = repository.save(car);
        return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
    }

    /**
     * PUT /cars/{id} -> actualiza un vehículo existente.
     */
    @PutMapping("/cars/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @Valid @RequestBody Car car) {
        Optional<Car> existingCar = repository.findById(id);
        if (existingCar.isPresent()) {
            Car carToUpdate = existingCar.get();
            carToUpdate.setName(car.getName());
            carToUpdate.setModel(car.getModel());
            carToUpdate.setYear(car.getYear());
            carToUpdate.setColor(car.getColor());
            carToUpdate.setPrice(car.getPrice());
            carToUpdate.setDescription(car.getDescription());
            carToUpdate.setImageUrl(car.getImageUrl());
            carToUpdate.setLogoUrl(car.getLogoUrl());
            Car updatedCar = repository.save(carToUpdate);
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * DELETE /cars/{id} -> elimina un vehículo.
     */
    @DeleteMapping("/cars/{id}")
    public ResponseEntity<HttpStatus> deleteCar(@PathVariable Long id) {
        Optional<Car> car = repository.findById(id);
        if (car.isPresent()) {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * GET /cool-cars -> devuelve la lista de vehículos destacados.
     * Se usa ruta absoluta para que quede en la raíz, como en el laboratorio original.
     */
    @GetMapping("/cool-cars")
    public ResponseEntity<Collection<Car>> getCoolCars() {
        Collection<Car> coolCars = repository.findAll().stream()
                .filter(this::isCool)
                .collect(Collectors.toList());
        return new ResponseEntity<>(coolCars, HttpStatus.OK);
    }

    /**
     * Determina si un vehículo es "destacado" (cool).
     */
    private boolean isCool(Car car) {
        if (car.getName() == null) {
            return true;
        }
        String name = car.getName().trim();
        return !name.equalsIgnoreCase("AMC Gremlin") &&
                !name.equalsIgnoreCase("Triumph Stag") &&
                !name.equalsIgnoreCase("Ford Pinto") &&
                !name.equalsIgnoreCase("Yugo GV");
    }
}
