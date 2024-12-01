"use client";
import { CardCount } from "@/components/cards/CardCounts";
import { NewItem } from "@/components/forms/inputs/NewItem";
import { FormProvider } from "@/contexts/Contexto";
import { DataBase } from "@/data/DataBase";
import { NewValue } from "@/types/NewItem";
import { useEffect, useState } from "react";

export default function Home() {
  const [initialValue, setInitialValue] = useState<NewValue[] | []>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await DataBase();
        setInitialValue(data);
      } catch (error) {
        console.error("Erro ao carregar os dados iniciais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>; // Exibe um estado de carregamento enquanto busca os dados
  }

  return (
    <FormProvider initialValue={initialValue}>
      <NewItem />
      <CardCount />
    </FormProvider>
  );
}
