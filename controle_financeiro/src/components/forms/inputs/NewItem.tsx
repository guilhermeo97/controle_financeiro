"use client"

import { useState } from "react"
import { NewValue, TypeValue } from "@/types/NewItem"

export const NewItem = () => {

    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState(0);



    return(
        <div className="container py-2">
            <form>
                <div>
                    <label>Descrição:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    
                </div>
                <br/>
                <label>Tipo:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="Despesa">Despesa</option>
                    <option value="Receita">Receita</option>
                </select>

                <br/>
                <label>Valor:</label>
                <input type="number" value={value} onChange={(e) => setValue(+e.target.value)}/>
                <br/>
                <button className="bg-gray-200 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition" type="submit">Cadastrar</button>
            </form>
        </div>
        
    )
}
