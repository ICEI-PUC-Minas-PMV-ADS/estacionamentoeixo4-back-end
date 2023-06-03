-- CreateTable
CREATE TABLE "avaliacao" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_estacionamento" INTEGER NOT NULL,
    "avaliacao" INTEGER NOT NULL,
    "comentario" CHAR(255) NOT NULL,

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_id_estacionamento_fkey" FOREIGN KEY ("id_estacionamento") REFERENCES "estacionamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
