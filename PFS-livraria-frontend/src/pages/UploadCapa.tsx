import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function UploadCapa() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado para armazenar o arquivo selecionado
  const [arquivo, setArquivo] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setArquivo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!arquivo) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    // FormData é o formato correto para enviar arquivos
    const formData = new FormData();
    formData.append('capa', arquivo); // 'capa' é o nome do campo esperado pelo Multer no back-end

    try {
      await axios.post(`http://localhost:3000/livros/${id}/capa`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Cabeçalho importante para uploads
        },
      });
      alert('Capa enviada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro ao enviar a capa:", error);
      alert('Erro ao enviar a capa.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Enviar Capa para o Livro (ID: {id})</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="capaFile" className="form-label">Selecione a imagem da capa:</label>
          <input 
            type="file" 
            className="form-control" 
            id="capaFile"
            onChange={handleFileChange} 
            accept="image/*" // Aceita apenas arquivos de imagem
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!arquivo}>
          Enviar
        </button>
      </form>
    </div>
  );
}