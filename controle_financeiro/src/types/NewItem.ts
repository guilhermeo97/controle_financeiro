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