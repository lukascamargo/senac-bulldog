import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";

export default async (request: NowRequest, response: NowResponse) => {
    const { idcliente, faturamento, entrega } = request.query;

    const {
        email,
        nome,
        sobrenome,
        cpf,
        telefone,
        status
    } = await queryPromiseGet(`SELECT * FROM Cliente WHERE idcliente=${idcliente} AND status=true`)[0];
    const enderecos = await queryPromiseGet(`SELECT * FROM Endereco WHERE idcliente=${idcliente}`) as any[];

    const client = {
        email,
        nome,
        sobrenome,
        cpf,
        telefone,
        status
    };

    return response.json({
        idcliente,
        ...client,
        faturamento: faturamento ? enderecos.filter(endereco => endereco.tipo === 'Faturamento')[0] : {},
        entrega: entrega ? enderecos.filter(endereco => endereco.tipo === 'Entrega') : []
    });
}