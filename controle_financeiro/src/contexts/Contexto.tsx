"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { CardContextType, FormProviderProps, NewValue } from "@/types/NewItem";

export const FormContext = createContext<CardContextType | null>(null);

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialValue,
}) => {
  const [contextValue, setContextValue] = useState<NewValue[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar os dados iniciais ao montar o contexto
  useEffect(() => {
    const fetchData = async () => {
      try {
        setContextValue(initialValue); // Usa os dados iniciais carregados do componente pai
      } catch (error) {
        console.error("Erro ao carregar os dados iniciais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialValue]);

  // Função para adicionar um novo valor
  const addNewValue = async (newValue: NewValue) => {
    console.log(newValue);
    try {
      const response = await axios.post(
        "http://localhost:8080/finance",
        {
          description: newValue.description,
          ocurenceDate: newValue.ocurenceDate.toISOString().split("T")[0],
          typeValue: newValue.typeValue,
          money: newValue.money,
        },
        { withCredentials: true }
      );

      // Atualiza o estado com o novo valor
      setContextValue((prevItems) => [
        ...prevItems,
        { ...newValue, id: response.data.id },
      ]);
    } catch (error) {
      console.error("Erro ao adicionar valor:", error);
    }
  };

  // Função para remover um valor
  const removeValue = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/finance/${id}`, {
        withCredentials: true,
      });

      // Remove o item do estado
      setContextValue((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover valor:", error);
    }
  };

  // Função para atualizar um valor existente
  const updateValue = async (updateValue: NewValue) => {
    try {
      await axios.put(
        `http://localhost:8080/finance/${updateValue.id}`,
        updateValue,
        { withCredentials: true }
      );

      // Atualiza o item no estado
      setContextValue((prevItems) =>
        prevItems.map((item) =>
          item.id === updateValue.id ? updateValue : item
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar valor:", error);
    }
  };

  // Prover os valores e funções através do contexto
  return (
    <FormContext.Provider
      value={{ contextValue, addNewValue, removeValue, updateValue }}
    >
      {loading ? <p>Carregando...</p> : children}
    </FormContext.Provider>
  );
};
