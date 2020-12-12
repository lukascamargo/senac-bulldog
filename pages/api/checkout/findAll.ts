import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";

export const transformarPedido = (pedido: number) => {
    const str = "" + pedido;
    const pad = "0000";
    return pad.substring(0, pad.length - str.length) + str;
}

export default async (request: NowRequest, response: NowResponse) => {
    let carrinhos = await queryPromiseGet(`SELECT Carrinho.*, Cliente.nome, Cliente.sobrenome, Cliente.email FROM Carrinho INNER JOIN Cliente ON Carrinho.idcliente = Cliente.idcliente`) as any[];

    carrinhos = carrinhos.map(carrinho => {
        return {...carrinho, pedido: transformarPedido(carrinho.idcarrinho)};
    })

    console.log('Carrinhos', carrinhos);

    return response.json(carrinhos);
}