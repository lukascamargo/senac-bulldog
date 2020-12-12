import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";
import { transformarPedido } from "./findAll";

export default async (request: NowRequest, response: NowResponse) => {
    const {idcarrinho} = request.query;

    const carrinhos = await queryPromiseGet(`SELECT * FROM Carrinho INNER JOIN Endereco ON Carrinho.idendereco = Endereco.idendereco WHERE idcarrinho=${idcarrinho}`) as any[];

    let promises = carrinhos.map(async carrinho => {
        let itens = await queryPromiseGet(`SELECT * FROM ItemCarrinho INNER JOIN Produto ON ItemCarrinho.idproduto = Produto.idproduto WHERE idcarrinho=${carrinho.idcarrinho}`) as any[];
        itens = itens.map(async item => {
            const query = await queryPromiseGet(`SELECT * FROM ImageProduto WHERE idproduto=${item.idproduto}`);
            item.imagem = query;
            return item;
        });
        const promise = await Promise.all(itens);
        return {...carrinho, itens: promise, pedido: transformarPedido(carrinho.idcarrinho)}
    });

    promises = await Promise.all(promises);

    return response.json(promises[0]);
}