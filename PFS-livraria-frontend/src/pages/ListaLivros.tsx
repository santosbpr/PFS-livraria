import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

interface Livro {
  id: number;
  titulo: string;
  anoPublicacao: number;
  autor: { nome: string };
  capa: { urlDaImagem: string } | null;
}

export function ListaLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);

  const fetchLivros = () => {
    axios.get('http://localhost:3000/livros')
      .then(response => {
        setLivros(response.data);
      })
      .catch(error => console.error("Houve um erro ao buscar os livros:", error));
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleDelete = (id: number) => {
    const confirmar = window.confirm("Tem certeza que deseja deletar este livro?");
    if (confirmar) {
      axios.delete(`http://localhost:3000/livros/${id}`)
        .then(() => {
          alert("Livro deletado com sucesso!");
          fetchLivros(); 
        })
        .catch(error => console.error("Erro ao deletar o livro:", error));
    }
  };

return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="mb-0">Nossos Livros</h1>
      <Link to="/livros/novo" className="btn btn-primary">Cadastrar Novo Livro</Link>
    </div>

    {/* Mapeamento para os Cards */}
    <div className="row g-4">
      {livros.map(livro => (
        <div className="col-md-6 col-lg-4" key={livro.id}>
          <div className="card h-100 shadow-sm">
            {livro.capa ? (
              <img 
                src={`http://localhost:3000/files${livro.capa.urlDaImagem}`} 
                className="card-img-top" 
                alt={`Capa de ${livro.titulo}`}
                style={{ height: '250px', objectFit: 'cover' }}
              />
            ) : (
              <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                <span className="text-muted">Sem capa</span>
              </div>
            )}
            <div className="card-body">
              <h5 className="card-title">{livro.titulo}</h5>
              <p className="card-text mb-1"><small className="text-muted">{livro.autor.nome} - {livro.anoPublicacao}</small></p>
            </div>
            <div className="card-footer bg-transparent border-top-0 d-flex justify-content-end gap-2">
              <Link to={`/livros/editar/${livro.id}`} className="btn btn-sm btn-outline-warning">Editar</Link>
              <Link to={`/livros/${livro.id}/capa`} className="btn btn-sm btn-outline-info">Capa</Link>
              <button onClick={() => handleDelete(livro.id)} className="btn btn-sm btn-outline-danger">Deletar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}