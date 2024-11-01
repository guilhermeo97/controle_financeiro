"use client";
import { DataBase } from "@/data/DataBase";
import { NewValue } from "@/types/NewItem";
import { createContext, Dispatch, SetStateAction } from "react";

interface CardContextType {
    contextValue: NewValue[];
    setContextValue: Dispatch<SetStateAction<NewValue[]>>;
}

export const FormContext = createContext<CardContextType | null>(null);
