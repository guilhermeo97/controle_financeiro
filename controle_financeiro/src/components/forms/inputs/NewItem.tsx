"use client";

import { FormContext } from "@/contexts/Contexto";
import { DataBase } from "@/data/DataBase";
import { NewValue, TypeValue } from "@/types/NewItem";
import { useContext, useEffect, useState } from "react";

export const NewItem = () => {
  const contexto = useContext(FormContext);
  if (!contexto) return null;

  const dateNow = new Date().toISOString().split("T")[0]; // Data inicial formatada

  const { addNewValue } = contexto;

  // Estados do formulário
  const [description, setDescription] = useState("");
  const [typeSelecionado, setTypeSelecionado] = useState<TypeValue>(
    TypeValue.RECEITA
  );
  const [occurenceDate, setOcurrenceDate] = useState<string>(dateNow);
  const [moeny, setValue] = useState(0);

  // Estado da lista
  const [list, setList] = useState<NewValue[]>([]);

  // Carregar dados do DataBase ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      const data = await DataBase(); // Chama o DataBase e espera o resultado
      setList(data); // Atualiza o estado com os dados retornados
    };

    fetchData();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (description && moeny && occurenceDate) {
      const novoValor: NewValue = {
        id: list.length + 1, // Gera um ID incremental
        description: description.trim(),
        ocurrenceDate: new Date(occurenceDate), // Converte para Date
        typeValue: typeSelecionado,
        money: moeny,
      };

      setList([...list, novoValor]); // Atualiza a lista no estado
      addNewValue(novoValor); // Adiciona no contexto

      // Limpa os campos do formulário
      setDescription("");
      setValue(0);
      setOcurrenceDate(dateNow);
    }
  };

  return (
    <div className="container mx-auto py-4 bg-white w-1/3 mt-3 rounded-md p-6 shadow-md">
      <form onSubmit={handleSubmit}>
        <legend className="text-lg font-semibold text-gray-700 mb-2">
          Adicione um novo valor
        </legend>
        <div className="flex flex-col my-2">
          <label>Descrição:</label>
          <input
            className="border border-slate-900 rounded-md px-2 py-1"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-2">
          <label>Data:</label>
          <input
            className="border border-slate-900 rounded-md px-2 py-1"
            type="date"
            value={occurenceDate}
            onChange={(e) => setOcurrenceDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-2">
          <label>Tipo:</label>
          <select
            className="border border-slate-900 rounded-md px-2 py-1"
            value={typeSelecionado}
            onChange={(e) => setTypeSelecionado(e.target.value as TypeValue)}
          >
            {Object.values(TypeValue).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col my-2">
          <label>Valor:</label>
          <input
            className="border border-slate-900 rounded-md px-2 py-1"
            type="number"
            value={moeny}
            onChange={(e) => setValue(+e.target.value)}
          />
        </div>
        <div className="flex flex-col my-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-400 transition"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};
