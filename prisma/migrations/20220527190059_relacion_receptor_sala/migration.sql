/*
  Warnings:

  - You are about to drop the column `localizacion` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `latitud` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "localizacion",
ADD COLUMN     "latitud" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitud" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Sala" (
    "id" SERIAL NOT NULL,
    "idSala" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idReceptor" INTEGER NOT NULL,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sala_idUsuario_key" ON "Sala"("idUsuario");

-- AddForeignKey
ALTER TABLE "Sala" ADD CONSTRAINT "Sala_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sala" ADD CONSTRAINT "Sala_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
