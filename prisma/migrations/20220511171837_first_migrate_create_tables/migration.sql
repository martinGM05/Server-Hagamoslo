-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "urlFoto" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "localizacion" TEXT NOT NULL,
    "idRol" INTEGER NOT NULL,
    "descripcion" TEXT DEFAULT E'',
    "valoracion" INTEGER DEFAULT 0,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComentarioBlog" (
    "id" SERIAL NOT NULL,
    "comentario" TEXT NOT NULL,
    "idBlog" INTEGER NOT NULL,
    "idTrabajador" INTEGER NOT NULL,

    CONSTRAINT "ComentarioBlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "comentario" JSONB NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComentarioUsuario" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idComentario" INTEGER NOT NULL,

    CONSTRAINT "ComentarioUsuario_pkey" PRIMARY KEY ("idUsuario","idComentario")
);

-- CreateTable
CREATE TABLE "ServicioContratado" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idTrabajador" INTEGER NOT NULL,
    "descripcion" VARCHAR(100) NOT NULL,
    "fechaInicio" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFin" DATE NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "costo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ServicioContratado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "idTag" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("idTag","idUsuario")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "icono" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "ServicioContratado_idUsuario_key" ON "ServicioContratado"("idUsuario");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioBlog" ADD CONSTRAINT "ComentarioBlog_idTrabajador_fkey" FOREIGN KEY ("idTrabajador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioBlog" ADD CONSTRAINT "ComentarioBlog_idBlog_fkey" FOREIGN KEY ("idBlog") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioUsuario" ADD CONSTRAINT "ComentarioUsuario_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioUsuario" ADD CONSTRAINT "ComentarioUsuario_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Comentario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicioContratado" ADD CONSTRAINT "ServicioContratado_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicioContratado" ADD CONSTRAINT "ServicioContratado_idTrabajador_fkey" FOREIGN KEY ("idTrabajador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_idTag_fkey" FOREIGN KEY ("idTag") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
