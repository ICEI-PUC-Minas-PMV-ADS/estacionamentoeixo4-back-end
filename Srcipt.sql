USE db_why_park;



CREATE TABLE `cliente` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL UNIQUE,
	`cpf` char(11) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `veiculo` (
	`id` int NOT NULL AUTO_INCREMENT,
	`placa` varchar(10) NOT NULL UNIQUE,
	`modelo` varchar(20) NOT NULL,
	`id_cliente` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `reserva` (
	`id_liente` int NOT NULL,
	`id_estacionamento` int NOT NULL,
	`duracao` int NOT NULL,
	`horario_reserva` TIMESTAMP NOT NULL,
	`id_veiculo` int NOT NULL,
	PRIMARY KEY (`id_cliente`,`id_estacionamento`)
);

CREATE TABLE `estacionamento` (
	`id` int NOT NULL AUTO_INCREMENT,
	`preco` double NOT NULL,
	`vagas_preferenciais` int NOT NULL,
	`vagas_gerais` int NOT NULL,
	`razao_social` varchar(255) NOT NULL,
	`cnpj` char(14) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `endereco` (
	`id` int NOT NULL AUTO_INCREMENT,
	`cep` int NOT NULL UNIQUE,
	`bairro` varchar(255) NOT NULL,
	`endereco` varchar(255) NOT NULL,
	`numero` int NOT NULL,
	`cidade` varchar(50) NOT NULL,
	`estado` varchar(50) NOT NULL,
	`id_estacionamento` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `administrador` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(50) NOT NULL ,
	`email` varchar(50) NOT NULL UNIQUE,
	`id_estacionamento` int NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `veiculo` ADD CONSTRAINT `veiculo_fk0` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`);

ALTER TABLE `reserva` ADD CONSTRAINT `reserva_fk0` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`);

ALTER TABLE `reserva` ADD CONSTRAINT `reserva_fk1` FOREIGN KEY (`id_estacionamento`) REFERENCES `estacionamento`(`id`);

ALTER TABLE `endereco` ADD CONSTRAINT `endereco_fk0` FOREIGN KEY (`id_estacionamento`) REFERENCES `estacionamento`(`id`);

ALTER TABLE `administrador` ADD CONSTRAINT `administrador_fk0` FOREIGN KEY (`id_estacionamento`) REFERENCES `estacionamento`(`id`);






