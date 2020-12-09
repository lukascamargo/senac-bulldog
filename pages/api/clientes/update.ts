import { NowRequest, NowResponse } from "@vercel/node";
import { Cliente } from "../../../shared/models/cliente";
import { Endereco } from "../../../shared/models/endereco";
import {queryPromiseGet, queryPromiseSave} from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    console.log(request.body);
    const {
        idcliente,
        email,
        nome,
        sobrenome,
        cpf,
        telefone,
        status,
        faturamento,
    } = request.body;

    const client: Cliente = {
        idcliente,
        email,
        nome,
        sobrenome,
        cpf,
        telefone,
        status,
    };

    const query = await queryPromiseSave(
        `UPDATE Cliente SET ? WHERE idcliente=${idcliente}`, client
    ) as any;

    const enderecos: Endereco[] = [faturamento];

    const promises = enderecos.map(async endereco => {
        endereco.idcliente = client.idcliente;
        await queryPromiseSave(
            `UPDATE Endereco SET ? WHERE idendereco=${endereco.idendereco}`, endereco
        );
    });

    await Promise.all(promises);

    return response.status(201).json(query);    
}