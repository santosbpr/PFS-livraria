import express, { Request, Response } from 'express';
import livroRoutes from './routes/livroRoutes';
import autorRoutes from './routes/autorRoutes';
import path from 'path'

const app = express();
const PORT: number = 3000;

app.use(express.json());

app.use('/livros', livroRoutes);
app.use('/autores', autorRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Bem-vindo à API da Livraria Online');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'public')));

export default app;