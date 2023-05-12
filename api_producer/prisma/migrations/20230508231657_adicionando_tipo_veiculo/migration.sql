-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculo" (
    "id" SERIAL NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "tipo" VARCHAR(10) NOT NULL,
    "modelo" VARCHAR(20) NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estacionamento" (
    "id" SERIAL NOT NULL,
    "preco" DECIMAL(9,2) NOT NULL,
    "vagas_preferenciais" INTEGER NOT NULL,
    "vagas_gerais" INTEGER NOT NULL,
    "razao_social" VARCHAR(255) NOT NULL,
    "cnpj" CHAR(14) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estacionamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrador" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstacionamentoAndAdministradores" (
    "id_estacionamento" INTEGER NOT NULL,
    "id_administrador" INTEGER NOT NULL,

    CONSTRAINT "EstacionamentoAndAdministradores_pkey" PRIMARY KEY ("id_estacionamento","id_administrador")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" SERIAL NOT NULL,
    "cep" INTEGER NOT NULL,
    "bairro" VARCHAR(255) NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "numero" INTEGER NOT NULL,
    "cidade" VARCHAR(50) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "id_estacionamento" INTEGER NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_estacionamento" INTEGER NOT NULL,
    "duracao" INTEGER NOT NULL,
    "horario_reserva" TIMESTAMP(3) NOT NULL,
    "id_veiculo" INTEGER NOT NULL,
    "cancelado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "estacionamento_cnpj_key" ON "estacionamento"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");

-- AddForeignKey
ALTER TABLE "veiculo" ADD CONSTRAINT "veiculo_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstacionamentoAndAdministradores" ADD CONSTRAINT "EstacionamentoAndAdministradores_id_estacionamento_fkey" FOREIGN KEY ("id_estacionamento") REFERENCES "estacionamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstacionamentoAndAdministradores" ADD CONSTRAINT "EstacionamentoAndAdministradores_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "administrador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_estacionamento_fkey" FOREIGN KEY ("id_estacionamento") REFERENCES "estacionamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
