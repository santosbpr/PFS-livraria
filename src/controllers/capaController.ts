import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const capaController = {
  upload: async (req: Request, res: Response) => {
    const { id: livroId } = req.params; 

    // O Multer nos dá acesso ao arquivo através do req.file
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const { filename } = req.file;
    const urlDaImagem = `/uploads/${filename}`; // Caminho relativo da imagem

    try {
      // Verifica se o livro existe
      const livro = await prisma.livro.findUnique({ where: { id: parseInt(livroId) } });
      if (!livro) {
        return res.status(404).json({ message: 'Livro não encontrado.' });
      }

      // Cria a entrada da Capa no banco, associando-a ao livro
      const novaCapa = await prisma.capa.create({
        data: {
          urlDaImagem,
          livroId: parseInt(livroId),
        },
      });

      return res.status(201).json(novaCapa);
    } catch (error: any) {
        // Trata o erro caso o livro já tenha uma capa (violação da restrição @unique)
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'Este livro já possui uma capa.' });
        }
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
};