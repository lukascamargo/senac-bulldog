import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseSave } from "../connection";

export default async (request: NowRequest, response: NowResponse) => {
    const { idendereco } = request.query;
    const {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais
    } = request.body;

    await queryPromiseSave(
        `UPDATE Endereco SET ? WHERE idendereco=${idendereco}`,
        {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            pais
        }
    );

    return response.status(200);
}