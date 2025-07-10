-- CreateTable
CREATE TABLE "Capa" (
    "id" SERIAL NOT NULL,
    "urlDaImagem" TEXT NOT NULL,
    "livroId" INTEGER NOT NULL,

    CONSTRAINT "Capa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Capa_livroId_key" ON "Capa"("livroId");

-- AddForeignKey
ALTER TABLE "Capa" ADD CONSTRAINT "Capa_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
