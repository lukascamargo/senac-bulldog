import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet, queryPromiseSave } from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    const { idcliente } = request.query;
    let {
        senha,
        novaSenha,
     } = request.body;

     senha = await encryptPassword(senha);
     novaSenha = await encryptPassword(novaSenha);

     const cliente = await queryPromiseGet(`SELECT * FROM Cliente WHERE idcliente=${idcliente} AND senha=${senha}`) as any[];

     if (cliente.length === 0) {
        return response.status(404).json({error: 'Cliente não encontrado'});
     }



     await queryPromiseSave(
        `UPDATE Cliente SET ? WHERE idcliente=${idcliente}`,
        {
            senha: novaSenha
        }
     );

     return response.status(200);
}