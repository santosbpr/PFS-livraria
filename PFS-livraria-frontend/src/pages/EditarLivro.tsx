import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Autor {
  id: number;
  nome: string;
}

export function EditarLivro() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [autorId, setAutorId] = useState('');
  const [autores, setAutores] = useState<Autor[]>([]);

  // Busca os dados do livro e dos autores quando a página carrega
  useEffect(() => {
    // Busca os dados do livro específico para preencher o formulário
    axios.get(`http://localhost:3000/livros/${id}`)
      .then(response => {
        const livro = response.data;
        setTitulo(livro.titulo);
        setAnoPublicacao(livro.anoPublicacao);
        setAutorId(livro.autorId);
      })
      .catch(error => console.error("Erro ao buscar dados do livro:", error));

    // Busca todos os autores para o dropdown
    axios.get('http://localhost:3000/autores')
      .then(response => setAutores(response.data))
      .catch(error => console.error("Erro ao buscar autores:", error));
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/livros/${id}`, { // Método PUT
      titulo,
      anoPublicacao: parseInt(anoPublicacao),
      autorId: parseInt(autorId)
    })
    .then(() => {
      alert('Livro atualizado com sucesso!');
      navigate('/');
    })
    .catch(error => {
        console.error("Erro ao atualizar livro:", error);
        alert('Erro ao atualizar livro. Verifique o console para mais detalhes.');
    });
  };
  
  const isFormInvalid = !titulo || !anoPublicacao || !autorId;

  return (
    <div className="container mt-4">
      <h2>Editar Livro (ID: {id})</h2>
      {/* A estrutura do formulário é idêntica à de criação */}
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
        <button type="submit" className="btn btn-success" disabled={isFormInvalid}>Salvar Alterações</button>
      </form>
    </div>
  );
}