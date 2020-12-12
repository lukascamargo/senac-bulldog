import { NowRequest, NowResponse } from "@vercel/node";
import { Cliente } from "../../../shared/models/cliente";
import { Endereco } from "../../../shared/models/endereco";
import {queryPromiseGet, queryPromiseSave} from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    const {
        idcarrinho,
        produtos,
        novoStatus
    } = request.body;

    const carrinho = {
        status: novoStatus === 'aprovado' ? 'Pagamento Aprovado' : 'Compra Cancelada',
    }

    const q = await queryPromiseSave(`UPDATE Carrinho SET ? WHERE idcarrinho=${idcarrinho}`, carrinho);


    if (novoStatus === 'aprovado') {

        const promise = produtos.map(async produto => {
            const quantidade = produto.quantidade - produto.itens;
            const query = await queryPromiseSave(`UPDATE Produto SET ? WHERE idproduto=${produto.idproduto}`, {quantidade});
            return produto;
        });

        await Promise.all(promise);

    }

    return response.status(201).json(true);    
}