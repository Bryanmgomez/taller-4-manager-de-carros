package com.example.cars;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad Car que representa un vehículo en la base de datos.
 * Contiene todos los atributos necesarios para gestionar vehículos:
 * id, marca (name), modelo, año, color, precio, descripción e imagen.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "cars")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La marca del vehículo es obligatoria")
    private String name; // Marca del vehículo

    @NotBlank(message = "El modelo del vehículo es obligatorio")
    private String model; // Modelo del vehículo

    @NotNull(message = "El año del vehículo es obligatorio")
    @Min(value = 1900, message = "El año debe ser mayor a 1900")
    private Integer year; // Año del vehículo

    @NotBlank(message = "El color del vehículo es obligatorio")
    private String color; // Color del vehículo

    @NotNull(message = "El precio del vehículo es obligatorio")
    @Min(value = 0, message = "El precio debe ser mayor o igual a 0")
    private Double price; // Precio del vehículo

    private String description; // Descripción del vehículo

    private String imageUrl; // URL de la imagen (foto) del vehículo

    private String logoUrl; // URL del logo de la marca del vehículo (editable)
}
