"use client"

import { FormContext } from "@/contexts/Contexto";
import { DataBase } from "@/data/DataBase";
import { NewValue, TypeValue } from "@/types/NewItem";
import { ReactHTMLElement, useContext, useState } from "react"


export const NewItem = () => {

    const contexto = useContext(FormContext);
    if(!contexto) return null;

    const { contextValue, setContextValue } = contexto;

    const [description, setDescription] = useState('');

    const [typeSelecionado, setTypeSelecionado] = useState<TypeValue>(TypeValue.Receita);
    const [listaDeType, setListTypes] = useState<TypeValue[]>([]);
    const [value, setValue] = useState(0);
    const [list, setList] = useState<NewValue[]>(DataBase)

    const handleSubmit = (event: any) => {
        event.preventDefault(); // Impede o reload da página
        
        // Verifica se os campos estão preenchidos
        if (description && value) {
          // Cria um novo objeto com os dados do formulário
            const novoValor = {
                id: list.length + 1,
                description: description.trim(),
                type: typeSelecionado,
                value: value
            }
    
          // Atualiza a lista de usuários adicionando o novo
          setList([...list, novoValor]);
          setContextValue([...list, novoValor]);
    
          // Limpa os campos do formulário após a submissão
          setDescription('');
          setValue(0);
          console.log("Lista depois da atualização:", [...list, novoValor]);
        }
      };
        
        
   

    return (
        <div className="container mx-auto py-4 bg-white w-1/3  mt-3 rounded-md p-6 shadow-md">
            <form onSubmit={handleSubmit}>
                <legend className="text-lg font-semibold text-gray-700 mb-2">Adicione um novo valor</legend>
                <div className="flex flex-col my-2">
                    <label>Descrição:</label>
                    <input className="border border-slate-900 rounded-md px-2 py-1" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex flex-col my-2">
                    <label>Tipo:</label>
                    <select className="border border-slate-900 rounded-md px-2 py-1" value={typeSelecionado} onChange={(e) => setTypeSelecionado(e.target.value as TypeValue)}>
                        {Object.values(TypeValue).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col my-2">
                    <label>Valor:</label>
                    <input className="border border-slate-900 rounded-md px-2 py-1" type="number" value={value} onChange={(e) => setValue(+e.target.value)} />
                </div>
                <div className="flex flex-col my-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-400 transition">Cadastrar</button>
                </div>
            </form>
        </div>
    );
    
    
}
