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
  <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1>Lista de Livros</h1>
      <Link to="/livros/novo" className="btn btn-primary">Cadastrar Novo Livro</Link>
    </div>

    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            {/* Nova coluna para a imagem da capa */}
            <th scope="col" style={{ width: '10%' }}>Capa</th> 
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Ano</th>
            <th scope="col">Autor</th>
            <th scope="col" style={{ width: '20%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id}>
              <td>
                {/* Lógica para exibir a imagem ou um placeholder */}
                {livro.capa ? (
                  <img
                    // Lembre-se de trocar localhost pela URL da sua API no deploy
                    src={`http://localhost:3000/files${livro.capa.urlDaImagem}`}
                    alt={`Capa do livro ${livro.titulo}`}
                    className="img-thumbnail" // Classe do Bootstrap para imagens
                    style={{ width: '60px', height: 'auto' }}
                  />
                ) : (
                  <div 
                    className="text-center text-muted border rounded"
                    style={{ width: '60px', height: '80px', lineHeight: '80px', fontSize: '12px' }}
                  >
                    Sem capa
                  </div>
                )}
              </td>
              <th scope="row">{livro.id}</th>
              <td>{livro.titulo}</td>
              <td>{livro.anoPublicacao}</td>
              <td>{livro.autor ? livro.autor.nome : 'N/A'}</td>
              <td>
                <div className="d-flex flex-wrap gap-2">
                  <Link to={`/livros/editar/${livro.id}`} className="btn btn-sm btn-warning">Editar</Link>
                  <Link to={`/livros/${livro.id}/capa`} className="btn btn-sm btn-info">Capa</Link>
                  <button onClick={() => handleDelete(livro.id)} className="btn btn-sm btn-danger">
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}