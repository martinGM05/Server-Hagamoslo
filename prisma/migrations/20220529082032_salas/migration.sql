-- DropIndex
DROP INDEX "Sala_idUsuario_key";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "tokenFCM" TEXT NOT NULL DEFAULT E'';
