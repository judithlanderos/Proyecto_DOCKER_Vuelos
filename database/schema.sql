SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `reserva_vuelos`;
CREATE SCHEMA IF NOT EXISTS `reserva_vuelos` DEFAULT CHARACTER SET utf8mb4;
USE `reserva_vuelos`;

-- -----------------------------------------------------
-- Usuarios (va primero porque pasajeros la referencia)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Pasajeros
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pasajeros`;
CREATE TABLE IF NOT EXISTS `pasajeros` (
  `id_pasajeros` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `primer_apellido` VARCHAR(45) NOT NULL,
  `segundo_apellido` VARCHAR(45) NULL,
  `correo` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NULL,
  `nacionalidad` VARCHAR(45) NULL,
  `num_pasaporte` VARCHAR(45) NOT NULL,
  `id_usuario` INT NULL,
  PRIMARY KEY (`id_pasajeros`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC),
  UNIQUE INDEX `num_pasaporte_UNIQUE` (`num_pasaporte` ASC),
  INDEX `fk_pasajeros_usuarios_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_pasajeros_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuarios` (`id_usuario`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Aeropuertos
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aeropuertos`;
CREATE TABLE IF NOT EXISTS `aeropuertos` (
  `id_aeropuerto` INT NOT NULL AUTO_INCREMENT,
  `codigo_iata` VARCHAR(3) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_aeropuerto`),
  UNIQUE INDEX `codigo_iata_UNIQUE` (`codigo_iata` ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Rutas
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rutas`;
CREATE TABLE IF NOT EXISTS `rutas` (
  `id_ruta` INT NOT NULL AUTO_INCREMENT,
  `distancia_km` DECIMAL(10,2) NULL,
  `duracion_estimada` INT NULL COMMENT 'Duración en minutos',
  `id_origen` INT NOT NULL,
  `id_destino` INT NOT NULL,
  PRIMARY KEY (`id_ruta`),
  INDEX `fk_rutas_origen_idx` (`id_origen` ASC),
  INDEX `fk_rutas_destino_idx` (`id_destino` ASC),
  CONSTRAINT `fk_rutas_origen`
    FOREIGN KEY (`id_origen`)
    REFERENCES `aeropuertos` (`id_aeropuerto`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rutas_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `aeropuertos` (`id_aeropuerto`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Aviones
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aviones`;
CREATE TABLE IF NOT EXISTS `aviones` (
  `id_avion` INT NOT NULL AUTO_INCREMENT,
  `matricula` VARCHAR(45) NOT NULL,
  `modelo` VARCHAR(45) NOT NULL,
  `fabricante` VARCHAR(45) NOT NULL,
  `capacidad_total` INT NOT NULL,
  PRIMARY KEY (`id_avion`),
  UNIQUE INDEX `matricula_UNIQUE` (`matricula` ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Vuelos
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vuelos`;
CREATE TABLE IF NOT EXISTS `vuelos` (
  `id_vuelo` INT NOT NULL AUTO_INCREMENT,
  `codigo_vuelo` VARCHAR(45) NOT NULL,
  `fecha_salida` DATETIME NOT NULL,
  `fecha_llegada` DATETIME NOT NULL,
  `estado` ENUM('programado', 'retrasado', 'cancelado', 'completado') NOT NULL DEFAULT 'programado',
  `id_ruta` INT NOT NULL,
  `id_avion` INT NOT NULL,
  PRIMARY KEY (`id_vuelo`),
  UNIQUE INDEX `codigo_vuelo_UNIQUE` (`codigo_vuelo` ASC),
  INDEX `fk_vuelos_rutas_idx` (`id_ruta` ASC),
  INDEX `fk_vuelos_aviones_idx` (`id_avion` ASC),
  CONSTRAINT `fk_vuelos_rutas`
    FOREIGN KEY (`id_ruta`)
    REFERENCES `rutas` (`id_ruta`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vuelos_aviones`
    FOREIGN KEY (`id_avion`)
    REFERENCES `aviones` (`id_avion`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Asientos
-- -----------------------------------------------------
DROP TABLE IF EXISTS `asientos`;
CREATE TABLE IF NOT EXISTS `asientos` (
  `id_asiento` INT NOT NULL AUTO_INCREMENT,
  `numero_asiento` VARCHAR(45) NOT NULL,
  `clase` ENUM('turista', 'ejecutiva', 'primera_clase') NOT NULL,
  `id_avion` INT NOT NULL,
  PRIMARY KEY (`id_asiento`),
  UNIQUE INDEX `uq_avion_asiento` (`id_avion` ASC, `numero_asiento` ASC),
  INDEX `fk_asientos_aviones_idx` (`id_avion` ASC),
  CONSTRAINT `fk_asientos_aviones`
    FOREIGN KEY (`id_avion`)
    REFERENCES `aviones` (`id_avion`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Vuelo Asientos (N:M)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vuelo_asientos`;
CREATE TABLE IF NOT EXISTS `vuelo_asientos` (
  `id_vuelo` INT NOT NULL,
  `id_asiento` INT NOT NULL,
  `estado` ENUM('disponible', 'ocupado', 'bloqueado') NOT NULL DEFAULT 'disponible',
  PRIMARY KEY (`id_vuelo`, `id_asiento`),
  INDEX `fk_vuelo_asientos_vuelos_idx` (`id_vuelo` ASC),
  INDEX `fk_vuelo_asientos_asientos_idx` (`id_asiento` ASC),
  CONSTRAINT `fk_vuelo_asientos_vuelos`
    FOREIGN KEY (`id_vuelo`)
    REFERENCES `vuelos` (`id_vuelo`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vuelo_asientos_asientos`
    FOREIGN KEY (`id_asiento`)
    REFERENCES `asientos` (`id_asiento`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Grupo Reserva
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grupo_reserva`;
CREATE TABLE IF NOT EXISTS `grupo_reserva` (
  `id_grupo` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pasajero_responsable` INT NOT NULL,
  PRIMARY KEY (`id_grupo`),
  INDEX `fk_grupo_reserva_pasajeros_idx` (`id_pasajero_responsable` ASC),
  CONSTRAINT `fk_grupo_reserva_pasajeros`
    FOREIGN KEY (`id_pasajero_responsable`)
    REFERENCES `pasajeros` (`id_pasajeros`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Pagos
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id_pago` INT NOT NULL AUTO_INCREMENT,
  `metodo` ENUM('tarjeta', 'transferencia', 'puntos') NOT NULL,
  `monto_total` DECIMAL(10,2) NOT NULL,
  `moneda` VARCHAR(10) NOT NULL DEFAULT 'MXN',
  `fecha_transaccion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` ENUM('completado', 'reembolsado', 'cancelado') NOT NULL DEFAULT 'completado',
  `id_grupo` INT NOT NULL,
  PRIMARY KEY (`id_pago`),
  INDEX `fk_pagos_grupo_reserva_idx` (`id_grupo` ASC),
  CONSTRAINT `fk_pagos_grupo_reserva`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo_reserva` (`id_grupo`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Reservas
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservas`;
CREATE TABLE IF NOT EXISTS `reservas` (
  `id_reserva` INT NOT NULL AUTO_INCREMENT,
  `fecha_reserva` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` ENUM('confirmada', 'cancelada', 'en_espera') NOT NULL DEFAULT 'confirmada',
  `id_vuelo` INT NOT NULL,
  `id_pasajero` INT NOT NULL,
  `id_grupo` INT NOT NULL,
  PRIMARY KEY (`id_reserva`),
  INDEX `fk_reservas_vuelos_idx` (`id_vuelo` ASC),
  INDEX `fk_reservas_pasajeros_idx` (`id_pasajero` ASC),
  INDEX `fk_reservas_grupo_idx` (`id_grupo` ASC),
  CONSTRAINT `fk_reservas_vuelos`
    FOREIGN KEY (`id_vuelo`)
    REFERENCES `vuelos` (`id_vuelo`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_pasajeros`
    FOREIGN KEY (`id_pasajero`)
    REFERENCES `pasajeros` (`id_pasajeros`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_grupo`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo_reserva` (`id_grupo`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tripulacion
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tripulacion`;
CREATE TABLE IF NOT EXISTS `tripulacion` (
  `id_tripulacion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `primer_apellido` VARCHAR(45) NOT NULL,
  `segundo_apellido` VARCHAR(45) NULL,
  `nacionalidad` VARCHAR(45) NOT NULL,
  `rol` ENUM('piloto', 'copiloto', 'auxiliar') NOT NULL,
  PRIMARY KEY (`id_tripulacion`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Vuelo Tripulacion (N:M)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vuelo_tripulacion`;
CREATE TABLE IF NOT EXISTS `vuelo_tripulacion` (
  `id_vuelo` INT NOT NULL,
  `id_tripulacion` INT NOT NULL,
  `rol_en_vuelo` ENUM('piloto', 'copiloto', 'auxiliar') NOT NULL,
  PRIMARY KEY (`id_vuelo`, `id_tripulacion`),
  INDEX `fk_vuelo_tripulacion_tripulacion_idx` (`id_tripulacion` ASC),
  INDEX `fk_vuelo_tripulacion_vuelos_idx` (`id_vuelo` ASC),
  CONSTRAINT `fk_vuelo_tripulacion_vuelos`
    FOREIGN KEY (`id_vuelo`)
    REFERENCES `vuelos` (`id_vuelo`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vuelo_tripulacion_tripulacion`
    FOREIGN KEY (`id_tripulacion`)
    REFERENCES `tripulacion` (`id_tripulacion`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Reserva Asiento (N:M)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reserva_asiento`;
CREATE TABLE IF NOT EXISTS `reserva_asiento` (
  `id_reserva_asiento` INT NOT NULL AUTO_INCREMENT,
  `precio` DECIMAL(10,2) NOT NULL,
  `id_reserva` INT NOT NULL,
  `id_asiento` INT NOT NULL,
  PRIMARY KEY (`id_reserva_asiento`),
  INDEX `fk_reserva_asiento_reservas_idx` (`id_reserva` ASC),
  INDEX `fk_reserva_asiento_asientos_idx` (`id_asiento` ASC),
  CONSTRAINT `fk_reserva_asiento_reservas`
    FOREIGN KEY (`id_reserva`)
    REFERENCES `reservas` (`id_reserva`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reserva_asiento_asientos`
    FOREIGN KEY (`id_asiento`)
    REFERENCES `asientos` (`id_asiento`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;