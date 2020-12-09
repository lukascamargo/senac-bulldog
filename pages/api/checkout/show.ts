import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";
import { transformarPedido } from "./findAll";

export default async (request: NowRequest, response: NowResponse) => {
    const {idcarrinho} = request.query;

    const carrinhos = await queryPromiseGet(`SELECT * FROM Carrinho INNER JOIN Endereco ON Carrinho.idendereco = Endereco.idendereco WHERE idcarrinho=${idcarrinho}`) as any[];

    let promises = carrinhos.map(async carrinho => {
        const itens = await queryPromiseGet(`SELECT * FROM ItemCarrinho INNER JOIN Produto ON ItemCarrinho.idproduto = Produto.idproduto WHERE idcarrinho=${carrinho.idcarrinho}`);
        return {...carrinho, itens, pedido: transformarPedido(carrinho.idcarrinho)}
    });

    promises = await Promise.all(promises);

    return response.json(promises[0]);
}