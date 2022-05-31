-- DropForeignKey
ALTER TABLE "ServicioContratado" DROP CONSTRAINT "ServicioContratado_idUsuario_fkey";

-- DropIndex
DROP INDEX "ServicioContratado_idUsuario_key";

-- AddForeignKey
ALTER TABLE "Sala" ADD CONSTRAINT "Sala_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
