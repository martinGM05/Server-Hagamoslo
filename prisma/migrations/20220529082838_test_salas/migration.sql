/*
  Warnings:

  - The primary key for the `Sala` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Sala" DROP CONSTRAINT "Sala_pkey",
ADD CONSTRAINT "Sala_pkey" PRIMARY KEY ("idUsuario", "idReceptor");
