import { NowRequest, NowResponse } from "@vercel/node";
import { Cliente } from "../../../shared/models/cliente";
import { Endereco } from "../../../shared/models/endereco";
import {queryPromiseGet, queryPromiseSave} from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    const {
        email,
        senha,
        nome,
        sobrenome,
        cpf,
        telefone,
        status,
        faturamento,
        entrega
    } = request.body;

    const client: Cliente = {
        email,
        senha,
        nome,
        sobrenome,
        cpf,
        telefone,
        status
    };

    client.senha = await encryptPassword(client.senha);

    const query = await queryPromiseSave(
        'INSERT INTO Cliente SET ? ', client
    ) as any;

    client.idcliente = query.insertId;

    const enderecos: Endereco[] = [faturamento];

    if (entrega?.length > 0) {
        enderecos.push(...entrega);
    }

    const promises = enderecos.map(async endereco => {
        endereco.idcliente = client.idcliente;
        await queryPromiseSave(
            'INSERT INTO Endereco SET ?', endereco
        );
    });

    await Promise.all(promises);

    return response.status(201).json(query);    
}