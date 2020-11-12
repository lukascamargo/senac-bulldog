import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseSave } from "../connection";

export default async (request: NowRequest, response: NowResponse) => {
    const {
        nome,
        sobrenome,
        telefone,
    } = request.body;
    const { idcliente } = request.query;



    const query = await queryPromiseSave(
        `UPDATE Cliente SET ? WHERE idcliente=${idcliente}`,
        {
            nome,
            sobrenome,
            telefone,
        }
    );

    return response.status(200);
}