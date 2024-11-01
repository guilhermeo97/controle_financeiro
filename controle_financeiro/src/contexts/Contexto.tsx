"use client";
import { CardContextType, FormProviderProps, NewValue } from "@/types/NewItem";
import { createContext, useState } from "react";

export const FormContext = createContext<CardContextType | null>(null);

export const FormProvider: React.FC<FormProviderProps> = ({ children, initialValue }: FormProviderProps) => {
    const [contextValue, setContextValue] = useState<NewValue[]>([...initialValue]);

    const addNewValue = (newValue: NewValue) => {
        setContextValue((newItem) => [...newItem, { ...newValue, id: newItem.length + 1 }]);
    };

    const removeValue = (id: number) => {
        setContextValue(contextValue.filter((value) => value.id !== id));
    }

    const updateValue = (updateValue: NewValue) => {
        setContextValue((prevValue) => 
            prevValue.map((value) => (value.id === updateValue.id ? updateValue : value ))
        );
    }

    return (
        <FormContext.Provider value={{contextValue, addNewValue, removeValue, updateValue}}>
            {children}
        </FormContext.Provider>
    );
};
