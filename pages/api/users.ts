import {NowRequest, NowResponse} from "@vercel/node";
import crypto from 'crypto';
import { User } from "../../models/user";
import {queryPromiseGet, queryPromiseSave} from "./produtos";

export async function encryptPassword(password: string) {
    return crypto.createHmac('sha256', 'senha').update(password).digest('hex');
}

async function index(request: NowRequest, response: NowResponse) {
    const query = await queryPromiseGet(`SELECT * FROM Usuario`);

    return response.json(query);
}


export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return await index(request, response);
        case 'POST':
            return false;
        case 'PUT':
            return false;
        case 'DELETE':
            return false;
        default:
            response.status(405).end();
            break;
    }
}
