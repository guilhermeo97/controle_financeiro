import { ReactNode } from "react";

export interface NewValue {
    id: number,
    description: string,
    type: TypeValue,
    value: number
}

export enum TypeValue {
    Despesa = "Despesa",
    Receita = "Receita"
}

export interface CardContextType {
    contextValue: NewValue[];
    addNewValue: (newValue: NewValue ) => void;
    removeValue: (id: number) => void;
    updateValue: (updatedCar: NewValue) => void;
}

export interface FormProviderProps {
    children: ReactNode;
    initialValue: NewValue[];
}