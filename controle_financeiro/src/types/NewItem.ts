import { ReactNode } from "react";

export interface NewValue {
  id?: number;
  description: string;
  ocurrenceDate: Date;
  typeValue: TypeValue;
  money: number;
}

export enum TypeValue {
  DESPESA = "Despesa",
  RECEITA = "Receita",
  INVESTIMENTO = "Investimento",
}

export interface CardContextType {
  contextValue: NewValue[];
  addNewValue: (newValue: NewValue) => void;
  removeValue: (id: number) => void;
  updateValue: (updatedCar: NewValue) => void;
}

export interface FormProviderProps {
  children: ReactNode;
  initialValue: NewValue[] | [];
}
