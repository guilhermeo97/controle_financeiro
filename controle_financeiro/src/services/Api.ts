import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // URL do seu backend
  withCredentials: true, // Envia cookies automaticamente
});

export default api;
