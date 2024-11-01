"use client"

import { FormContext } from "@/contexts/Contexto"
import { DataBase } from "@/data/DataBase"
import { NewValue } from "@/types/NewItem"
import { useContext, useState } from "react"



export const CardCount = () => {

    const contexto = useContext(FormContext);
    
    if (!contexto) return null;

    const { contextValue } = contexto;
    

    return(
        <div className="container mx-auto w-1/3 mt-3 rounded-md shadow-md">
            {contextValue.map((value) => (
               <div className="py-4 bg-white mt-3 w-full rounded-md p-6 shadow-md" key={value.id}>
                    <p><strong>Descrição: </strong>{value.description}</p>
                    <p><strong>Valor: </strong>{value.value.toFixed(2)}</p>
                    {value.type === "Despesa" ?
                        <div className="text-center my-2 p-1 bg-red-300 w-1/5 h-1/5 rounded-md">
                        <p className="text-red-900"><strong>{value.type}</strong></p>
                    </div> :
                    <div className="text-center my-2 p-1 bg-green-200 w-1/5 h-1/5 rounded-md">
                        <p className="text-green-900"><strong>{value.type}</strong></p>
                    </div>
                    }
                
               </div>
            ))}  
        </div>
    )
}