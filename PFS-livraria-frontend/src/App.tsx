import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ListaLivros } from './pages/ListaLivros';
import { FormLivro } from './pages/FormLivro'; 
import { EditarLivro } from './pages/EditarLivro'; // <<-- IMPORTE O NOVO COMPONENTE
import { UploadCapa } from './pages/UploadCapa';

import { ListaAutores } from './pages/ListaAutores';
import { FormAutor } from './pages/FormAutores';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Livraria PFS</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Livros</Link>
              </li>
              {/* <<-- NOVO LINK DE NAVEGAÇÃO -->> */}
              <li className="nav-item">
                <Link className="nav-link" to="/autores">Autores</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <Routes>
              {/* Rotas de Livros */}
              <Route path="/" element={<ListaLivros />} />
              <Route path="/livros/novo" element={<FormLivro />} />
              <Route path="/livros/editar/:id" element={<EditarLivro />} />
              <Route path="/livros/:id/capa" element={<UploadCapa />} />

              {/* <<-- NOVAS ROTAS DE AUTORES -->> */}
              <Route path="/autores" element={<ListaAutores />} />
              <Route path="/autores/novo" element={<FormAutor />} />
              <Route path="/autores/editar/:id" element={<FormAutor />} />
            </Routes>
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
}
export default App;