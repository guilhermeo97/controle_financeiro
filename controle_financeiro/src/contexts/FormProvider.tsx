"use client";
import { ReactNode, useState } from "react";
import { FormContext } from "@/contexts/Contexto";
import { NewValue } from "@/types/NewItem";

interface FormProviderProps {
    children: ReactNode;
    initialValue: NewValue[];
}

export const FormProvider = ({ children, initialValue }: FormProviderProps) => {
    const [contextValue, setContextValue] = useState(initialValue);

    return (
        <FormContext.Provider value={{ contextValue, setContextValue }}>
            {children}
        </FormContext.Provider>
    );
};
