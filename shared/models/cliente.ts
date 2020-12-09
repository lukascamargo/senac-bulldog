import { Endereco } from "./endereco";

export interface Cliente {
    idcliente?: number;
    email: string;
    senha?: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    telefone: string;
    status: boolean;
}

export interface ClienteEndereco extends Cliente {
    faturamento?: Endereco;
    entrega?: Endereco[];
}