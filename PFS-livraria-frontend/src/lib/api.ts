import axios from 'axios';

// Cria uma instância do Axios com configurações pré-definidas
export const api = axios.create({
  // A URL base para todas as requisições que usarem esta instância
  baseURL: 'http://localhost:3000', 
});