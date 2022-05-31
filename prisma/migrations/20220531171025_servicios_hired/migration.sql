-- AddForeignKey
ALTER TABLE "ServicioContratado" ADD CONSTRAINT "ServicioContratado_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
