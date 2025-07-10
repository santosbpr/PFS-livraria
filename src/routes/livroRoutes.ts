import { Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../config/multer'; 
import { livroController } from '../controllers/livroController';
import { capaController } from '../controllers/capaController';


const router = Router();
const upload = multer(multerConfig);

router.post('/', livroController.criar);
router.get('/', livroController.listar);
router.get('/:id', livroController.buscarPorId);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);
router.post('/:id/capa', upload.single('capa'), capaController.upload);

export default router;