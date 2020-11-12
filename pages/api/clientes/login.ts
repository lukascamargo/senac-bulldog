import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    let { email, senha } = request.body;

    senha = await encryptPassword(senha);

    const query = await queryPromiseGet(`SELECT email FROM Cliente WHERE email=${email} AND senha=${senha}`);

    if (!query[0].email) {
        return response.status(404).json({error: 'Cliente não encontrado'});
    }

    return response.status(200).json(query[0]);
}