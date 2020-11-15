import { NowRequest, NowResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { queryPromiseGet } from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    console.log(request.body);
    let { email, senha } = request.body;

    senha = await encryptPassword(senha);

    const query = await queryPromiseGet(`SELECT email FROM Cliente WHERE email='${email}' AND senha='${senha}'`);

    console.log(query);

    if (!query[0]?.email) {
        return response.status(404).json({error: 'Cliente não encontrado'});
    }

    const token = jwt.sign(
        {
            email: query[0].email,
            nome: query[0].nome,
            sobrenome: query[0].sobrenome,
            perfil: query[0].perfil,
            cpf: query[0].cpf,
            status: query[0].status,
            idusuario: query[0].idcliente,
        }, 
        process.env.JWT_SECRET,
    );

    return response.json({token});
}