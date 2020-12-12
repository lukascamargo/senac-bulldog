import { NowRequest, NowResponse } from "@vercel/node";
import { Cliente } from "../../../shared/models/cliente";
import { Endereco } from "../../../shared/models/endereco";
import {queryPromiseGet, queryPromiseSave} from "../connection";
import { encryptPassword } from "../encryptPassword";

export default async (request: NowRequest, response: NowResponse) => {
    const {
        entrega
    } = request.body;


    const query = await queryPromiseSave(
        'INSERT INTO Endereco SET ?', entrega
    );


    return response.status(201).json(query);    
}