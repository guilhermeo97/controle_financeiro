"use client";
import { NewValue } from "@/types/NewItem";
import axios from "axios";

export const DataBase = async (): Promise<NewValue[] | []> => {
  try {
    const response = await axios.get<NewValue[] | any[]>(
      "http://localhost:8080/finance",
      { withCredentials: true }
    );

    const mappedData: NewValue[] = response.data.map((item) => {
      return {
        id: item.id,
        description: item.description,
        ocurrenceDate: item.ocurrenceDate,
        typeValue: item.typeValue,
        money: item.money,
      };
    });
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// {
//   id: 1,
//   description: "Passeio",
//   ocurrenceDate: new Date("2024-11-24"),
//   typeValue: TypeValue.DESPESA,
//   money: 200.0,
// },
// {
//   id: 2,
//   description: "Salário",
//   ocurrenceDate: new Date("2024-11-24"),
//   typeValue: TypeValue.RECEITA,
//   money: 1000.0,
// },
