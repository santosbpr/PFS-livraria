import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Autor {
  id: number;
  nome: string;
}

export function FormLivro() {
  const [titulo, setTitulo] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [autorId, setAutorId] = useState('');
  const [autores, setAutores] = useState<Autor[]>([]);
  const navigate = useNavigate();

  // Busca a lista de autores para preencher o select
  useEffect(() => {
    axios.get('http://localhost:3000/autores')
      .then(response => setAutores(response.data))
      .catch(error => console.error("Erro ao buscar autores:", error));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post('http://localhost:3000/livros', {
      titulo,
      anoPublicacao: parseInt(anoPublicacao),
      autorId: parseInt(autorId)
    })
    .then(() => {
      alert('Livro cadastrado com sucesso!');
      navigate('/');
    })
    .catch(error => {
        console.error("Erro ao cadastrar livro:", error)
        alert('Erro ao cadastrar livro. Verifique o console para mais detalhes.');
    });
  };
  
  const isFormInvalid = !titulo || !anoPublicacao || !autorId;

  return (
    <div className="container mt-4">
      <h2>Cadastrar Novo Livro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anoPublicacao" className="form-label">Ano de Publicação:</label>
          <input
            type="number"
            className="form-control"
            id="anoPublicacao"
            value={anoPublicacao}
            onChange={e => setAnoPublicacao(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autor" className="form-label">Autor:</label>
          <select
            className="form-select"
            id="autor"
            value={autorId}
            onChange={e => setAutorId(e.target.value)}
            required
          >
            <option value="">Selecione um autor</option>
            {autores.map(autor => (
              <option key={autor.id} value={autor.id}>{autor.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isFormInvalid}>Salvar</button>
      </form>
    </div>
  );
}