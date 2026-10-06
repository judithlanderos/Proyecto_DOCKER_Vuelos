CREATE DATABASE IF NOT EXISTS reserva_vuelos;
USE reserva_vuelos;

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;

DROP TABLE IF EXISTS `aeropuertos`;
CREATE TABLE `aeropuertos` (
  `id_aeropuerto` int NOT NULL AUTO_INCREMENT,
  `codigo_iata` varchar(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  PRIMARY KEY (`id_aeropuerto`),
  UNIQUE KEY `codigo_iata_UNIQUE` (`codigo_iata`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `aviones`;
CREATE TABLE `aviones` (
  `id_avion` int NOT NULL AUTO_INCREMENT,
  `matricula` varchar(45) NOT NULL,
  `modelo` varchar(45) NOT NULL,
  `fabricante` varchar(45) NOT NULL,
  `capacidad_total` int NOT NULL,
  PRIMARY KEY (`id_avion`),
  UNIQUE KEY `matricula_UNIQUE` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `asientos`;
CREATE TABLE `asientos` (
  `id_asiento` int NOT NULL AUTO_INCREMENT,
  `numero_asiento` varchar(45) NOT NULL,
  `clase` enum('turista','ejecutiva','primera_clase') NOT NULL,
  `id_avion` int NOT NULL,
  PRIMARY KEY (`id_asiento`),
  UNIQUE KEY `uq_avion_asiento` (`id_avion`,`numero_asiento`),
  KEY `fk_asientos_aviones_idx` (`id_avion`),
  CONSTRAINT `fk_asientos_aviones`
    FOREIGN KEY (`id_avion`)
    REFERENCES `aviones` (`id_avion`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','usuario') NOT NULL DEFAULT 'usuario',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `genero` enum('masculino','femenino') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `pasajeros`;
CREATE TABLE `pasajeros` (
  `id_pasajeros` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `primer_apellido` varchar(45) NOT NULL,
  `segundo_apellido` varchar(45) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `nacionalidad` varchar(45) DEFAULT NULL,
  `num_pasaporte` varchar(45) NOT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_pasajeros`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  UNIQUE KEY `num_pasaporte_UNIQUE` (`num_pasaporte`),
  KEY `fk_pasajeros_usuarios` (`id_usuario`),
  CONSTRAINT `fk_pasajeros_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `grupo_reserva`;
CREATE TABLE `grupo_reserva` (
  `id_grupo` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pasajero_responsable` int NOT NULL,
  PRIMARY KEY (`id_grupo`),
  KEY `fk_grupo_reserva_pasajeros_idx` (`id_pasajero_responsable`),
  CONSTRAINT `fk_grupo_reserva_pasajeros`
    FOREIGN KEY (`id_pasajero_responsable`)
    REFERENCES `pasajeros` (`id_pasajeros`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE `pagos` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `metodo` enum('tarjeta','transferencia','efectivo','puntos') NOT NULL,
  `monto_total` decimal(10,2) NOT NULL,
  `moneda` varchar(10) NOT NULL DEFAULT 'MXN',
  `fecha_transaccion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('completado','reembolsado','cancelado') NOT NULL DEFAULT 'completado',
  `id_grupo` int NOT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `fk_pagos_grupo_reserva_idx` (`id_grupo`),
  CONSTRAINT `fk_pagos_grupo_reserva`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo_reserva` (`id_grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `aeropuertos`;

DROP TABLE IF EXISTS `rutas`;
CREATE TABLE `rutas` (
  `id_ruta` int NOT NULL AUTO_INCREMENT,
  `distancia_km` decimal(10,2) DEFAULT NULL,
  `duracion_estimada` int DEFAULT NULL COMMENT 'Duracion en minutos',
  `id_origen` int NOT NULL,
  `id_destino` int NOT NULL,
  PRIMARY KEY (`id_ruta`),
  KEY `fk_rutas_origen_idx` (`id_origen`),
  KEY `fk_rutas_destino_idx` (`id_destino`),
  CONSTRAINT `fk_rutas_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `aeropuertos` (`id_aeropuerto`),
  CONSTRAINT `fk_rutas_origen`
    FOREIGN KEY (`id_origen`)
    REFERENCES `aeropuertos` (`id_aeropuerto`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `vuelos`;
CREATE TABLE `vuelos` (
  `id_vuelo` int NOT NULL AUTO_INCREMENT,
  `codigo_vuelo` varchar(45) NOT NULL,
  `fecha_salida` datetime NOT NULL,
  `fecha_llegada` datetime NOT NULL,
  `estado` enum('programado','retrasado','cancelado','completado') NOT NULL DEFAULT 'programado',
  `id_ruta` int NOT NULL,
  `id_avion` int NOT NULL,
  PRIMARY KEY (`id_vuelo`),
  UNIQUE KEY `codigo_vuelo_UNIQUE` (`codigo_vuelo`),
  KEY `fk_vuelos_rutas_idx` (`id_ruta`),
  KEY `fk_vuelos_aviones_idx` (`id_avion`),
  CONSTRAINT `fk_vuelos_aviones`
    FOREIGN KEY (`id_avion`)
    REFERENCES `aviones` (`id_avion`),
  CONSTRAINT `fk_vuelos_rutas`
    FOREIGN KEY (`id_ruta`)
    REFERENCES `rutas` (`id_ruta`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `reserva_asiento`;
DROP TABLE IF EXISTS `reservas`;
CREATE TABLE `reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `fecha_reserva` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('confirmada','cancelada','en_espera') NOT NULL DEFAULT 'confirmada',
  `id_vuelo` int NOT NULL,
  `id_pasajero` int NOT NULL,
  `id_grupo` int NOT NULL,
  `clase` enum('turista','ejecutiva','primera') NOT NULL DEFAULT 'turista',
  `precio_pagado` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `fk_reservas_vuelos_idx` (`id_vuelo`),
  KEY `fk_reservas_pasajeros_idx` (`id_pasajero`),
  KEY `fk_reservas_grupo_idx` (`id_grupo`),
  CONSTRAINT `fk_reservas_grupo`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo_reserva` (`id_grupo`),
  CONSTRAINT `fk_reservas_pasajeros`
    FOREIGN KEY (`id_pasajero`)
    REFERENCES `pasajeros` (`id_pasajeros`),
  CONSTRAINT `fk_reservas_vuelos`
    FOREIGN KEY (`id_vuelo`)
    REFERENCES `vuelos` (`id_vuelo`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reserva_asiento` (
  `id_reserva_asiento` int NOT NULL AUTO_INCREMENT,
  `precio` decimal(10,2) NOT NULL,
  `id_reserva` int NOT NULL,
  `id_asiento` int NOT NULL,
  PRIMARY KEY (`id_reserva_asiento`),
  KEY `fk_reserva_asiento_reservas_idx` (`id_reserva`),
  KEY `fk_reserva_asiento_asientos_idx` (`id_asiento`),
  CONSTRAINT `fk_reserva_asiento_asientos`
    FOREIGN KEY (`id_asiento`)
    REFERENCES `asientos` (`id_asiento`),
  CONSTRAINT `fk_reserva_asiento_reservas`
    FOREIGN KEY (`id_reserva`)
    REFERENCES `reservas` (`id_reserva`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tripulacion`;
CREATE TABLE `tripulacion` (
  `id_tripulacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `primer_apellido` varchar(45) NOT NULL,
  `segundo_apellido` varchar(45) DEFAULT NULL,
  `nacionalidad` varchar(45) NOT NULL,
  `rol` enum('piloto','copiloto','auxiliar') NOT NULL,
  PRIMARY KEY (`id_tripulacion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `vuelo_asientos`;
CREATE TABLE `vuelo_asientos` (
  `id_vuelo` int NOT NULL,
  `id_asiento` int NOT NULL,
  `estado` enum('disponible','ocupado','bloqueado') NOT NULL DEFAULT 'disponible',
  PRIMARY KEY (`id_vuelo`,`id_asiento`),
  KEY `fk_vuelo_asientos_vuelos_idx` (`id_vuelo`),
  KEY `fk_vuelo_asientos_asientos_idx` (`id_asiento`),
  CONSTRAINT `fk_vuelo_asientos_asientos`
    FOREIGN KEY (`id_asiento`)
    REFERENCES `asientos` (`id_asiento`),
  CONSTRAINT `fk_vuelo_asientos_vuelos`
    FOREIGN KEY (`id_vuelo`)
    REFERENCES `vuelos` (`id_vuelo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `vuelo_tripulacion`;
CREATE TABLE `vuelo_tripulacion` (
  `id_vuelo` int NOT NULL,
  `id_tripulacion` int NOT NULL,
  `rol_en_vuelo` enum('piloto','copiloto','auxiliar') NOT NULL,
  PRIMARY KEY (`id_vuelo`,`id_tripulacion`),
  KEY `fk_vuelo_tripulacion_tripulacion_idx` (`id_tripulacion`),
  KEY `fk_vuelo_tripulacion_vuelos_idx` (`id_vuelo`),
  CONSTRAINT `fk_vuelo_tripulacion_tripulacion`
    FOREIGN KEY (`id_tripulacion`)
    REFERENCES `tripulacion` (`id_tripulacion`),
  CONSTRAINT `fk_vuelo_tripulacion_vuelos`
    FOREIGN KEY (`id_vuelo`)
    REFERENCES `vuelos` (`id_vuelo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=1;