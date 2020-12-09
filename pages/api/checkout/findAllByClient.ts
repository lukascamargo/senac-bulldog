import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";
import { transformarPedido } from "./findAll";

export default async (request: NowRequest, response: NowResponse) => {
    const {idcliente} = request.query;

    let carrinhos = await queryPromiseGet(`SELECT * FROM Carrinho WHERE idcliente=${idcliente}`) as any[];

    carrinhos = carrinhos.map(carrinho => {
        return {...carrinho, pedido: transformarPedido(carrinho.idcarrinho)};
    })

    return response.json(carrinhos);
}