"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/Api"; // Instância do Axios configurada

interface AuthContextType {
  user: { id: number; email: string } | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados do usuário autenticado
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.get("/auth/me"); // Exemplo de endpoint que retorna os dados do usuário
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setUser(null); // Usuário não está autenticado
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      await api.post("/auth/logout"); // Exemplo de endpoint de logout
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Buscar os dados do usuário ao carregar o contexto
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
