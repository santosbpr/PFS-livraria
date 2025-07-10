import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const multerConfig = {
  // Onde os arquivos serão salvos
  dest: path.resolve(__dirname, '..', '..', 'public', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'));
    },
    // Garante que cada arquivo tenha um nome único para evitar sobreposição
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.originalname);
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
  // Limites e filtros de arquivo
  limits: {
    fileSize: 2 * 1024 * 1024, // Limite de 2MB
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido.'));
    }
  },
};