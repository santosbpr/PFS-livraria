import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api'; // Usando nossa API centralizada

interface Autor {
  id: number;
  nome: string;
  nacionalidade: string;
  livros?: any[]; // Opcional, para mostrar a contagem de livros
}

export function ListaAutores() {
  const [autores, setAutores] = useState<Autor[]>([]);

  const fetchAutores = () => {
    // Usando o 'include' para já saber quantos livros cada autor tem
    api.get('/autores?_include=livros') // Nota: o Prisma não entende isso, vamos manter simples
      .then(response => {
        setAutores(response.data);
      })
      .catch(error => console.error("Erro ao buscar autores:", error));
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este autor? Isso só funcionará se ele não tiver livros associados.')) {
      api.delete(`/autores/${id}`)
        .then(() => {
          alert('Autor deletado com sucesso!');
          fetchAutores(); // Atualiza a lista
        })
        .catch(error => {
          alert(error.response?.data?.message || 'Erro ao deletar o autor.');
        });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Autores</h1>
        <Link to="/autores/novo" className="btn btn-primary">Cadastrar Novo Autor</Link>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Nacionalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autores.map(autor => (
            <tr key={autor.id}>
              <td>{autor.id}</td>
              <td>{autor.nome}</td>
              <td>{autor.nacionalidade}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link to={`/autores/editar/${autor.id}`} className="btn btn-sm btn-warning">Editar</Link>
                  <button onClick={() => handleDelete(autor.id)} className="btn btn-sm btn-danger">Deletar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}