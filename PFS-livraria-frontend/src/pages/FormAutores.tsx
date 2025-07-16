import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';

export function FormAutor() {
  const { id } = useParams(); // Pega o 'id' da URL, se existir
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(id); // Verifica se estamos em modo de edição

  useEffect(() => {
    if (isEditing) {
      // Se estiver editando, busca os dados do autor para preencher o formulário
      api.get(`/autores/${id}`)
        .then(response => {
          const autor = response.data;
          setNome(autor.nome);
          setNacionalidade(autor.nacionalidade);
        })
        .catch(error => {
          console.error("Erro ao buscar autor:", error);
          setError("Não foi possível carregar os dados do autor.");
        });
    }
  }, [id, isEditing]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!nome || !nacionalidade) {
      setError("Os campos 'Nome' e 'Nacionalidade' são obrigatórios.");
      return;
    }

    const data = { nome, nacionalidade };

    try {
      if (isEditing) {
        // Modo Edição: usa o método PUT
        await api.put(`/autores/${id}`, data);
        alert('Autor atualizado com sucesso!');
      } else {
        // Modo Criação: usa o método POST
        await api.post('/autores', data);
        alert('Autor cadastrado com sucesso!');
      }
      navigate('/autores'); // Volta para a lista de autores
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ocorreu um erro ao salvar o autor.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Editar Autor' : 'Cadastrar Novo Autor'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nacionalidade" className="form-label">Nacionalidade:</label>
          <input
            type="text"
            className="form-control"
            id="nacionalidade"
            value={nacionalidade}
            onChange={e => setNacionalidade(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}