import {NowRequest, NowResponse} from "@vercel/node";
import { User } from "../../models/user";
import {queryPromiseGet, queryPromiseSave} from "./produtos";
import { encryptPassword } from "./users";
import jwt from 'jsonwebtoken';

async function login(request: NowRequest, response: NowResponse) {
    let {email, senha} = request.body;

    console.log('Usuario logando', email);

    senha = await encryptPassword(senha);

    const query = await queryPromiseGet(
        `SELECT * FROM Usuario WHERE (email='${email}' AND senha='${senha}' AND status='ATIVO')`
    );

    console.log(query);

    if (!query[0]) {
        //! Preciso fazer um tratamento melhor desse dado query
        
        return response.status(404).json({
            error: 'No user found'
        });
    }

    const token = jwt.sign(
        {
            email: query[0].email,
            nome: query[0].nome,
            sobrenome: query[0].sobrenome,
            perfil: query[0].perfil,
            cpf: query[0].cpf,
            status: query[0].status,
            idusuario: query[0].idusuario,
        }, 
        process.env.JWT_SECRET,
    );

    return response.json({token});
}


export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return false;
        case 'POST':
            return await login(request, response);
        case 'PUT':
            return false;
        case 'DELETE':
            return false;
        default:
            response.status(405).end();
            break;
    }
}
