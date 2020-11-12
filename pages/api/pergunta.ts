import {NowRequest, NowResponse} from "@vercel/node";
import {queryPromiseGet, queryPromiseSave} from "./produtos_old";
import {Pergunta} from "../../shared/models/pergunta";

async function saveQuestions(request: NowRequest, response: NowResponse) {

    const pergunta: Pergunta = request.body;

    const query = await queryPromiseSave('INSERT INTO Perguntas SET ?', pergunta);

    return response.json(query);
}

async function getQuestions(request: NowRequest, response: NowResponse) {
    const { idproduto } = request.query;

    const query = await queryPromiseGet(`SELECT * FROM Perguntas WHERE idproduto=${idproduto}`);

    return response.json(query);
}

export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return await getQuestions(request, response);
        case 'POST':
            return await saveQuestions(request, response);
        case 'PUT':
            return false;
        case 'DELETE':
            return false;
        default:
            response.status(405).end();
            break;
    }
}