import { NowRequest, NowResponse } from "@vercel/node";
import { Cliente } from "../../../shared/models/cliente";
import { Endereco } from "../../../shared/models/endereco";
import {queryPromiseGet, queryPromiseSave} from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    const {
        idcliente,
        status,
        pagamento,
        idendereco,
        produtos,
        total
    } = request.body;

    let carrinho: any = {
        idcliente,
        idendereco,
        status,
        pagamento,
        total,
        createAt: new Date(),
        updateAt: new Date()
    }

    const carrinhoQuery = await queryPromiseSave(
        'INSERT INTO Carrinho SET ? ', carrinho
    ) as any;

    if (!carrinhoQuery.insertId) {
        return response.status(500).json({error: 'Some error has happened.'});
    }

    carrinho = {...carrinho, idcarrinho: carrinhoQuery.insertId, produtos: []};

    const promises = produtos.map(async produto => {
        const item = {
            idproduto: produto.idproduto,
            idcarrinho: carrinho.idcarrinho,
            discount: 0,
            itens: produto.itens,
        }
        const query = await queryPromiseSave(
            'INSERT INTO ItemCarrinho SET ?', item
        ) as any;
        carrinho.produtos.push({...item, iditemcarrinho: query.insertId});
        console.log(query);
    });

    await Promise.all(promises);

    return response.status(201).json(carrinho);    
}