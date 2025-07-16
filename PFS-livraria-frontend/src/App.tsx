import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ListaLivros } from './pages/ListaLivros';
import { FormLivro } from './pages/FormLivro'; 
import { EditarLivro } from './pages/EditarLivro'; // <<-- IMPORTE O NOVO COMPONENTE
import { UploadCapa } from './pages/UploadCapa';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Listar Livros</Link> | {' '}
        <Link to="/livros/novo">Cadastrar Livro</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<ListaLivros />} />
          <Route path="/livros/novo" element={<FormLivro />} />
          <Route path="/livros/editar/:id" element={<EditarLivro />} />
          {/* <<-- NOVA ROTA PARA UPLOAD -->> */}
          <Route path="/livros/:id/capa" element={<UploadCapa />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;