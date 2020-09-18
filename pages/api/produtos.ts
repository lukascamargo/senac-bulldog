import { NowRequest, NowResponse } from '@vercel/node'
import mysql from 'promise-mysql';
import { Produtos } from '../../models/produtos';

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: Number(process.env.PORT),
});


async function getProducts(request: NowRequest, response: NowResponse){
    const query = await (await connection).query('SELECT * FROM Produto');
    console.log(query)
    return response.json(query);
}

async function saveProducts(request: NowRequest, response: NowResponse) {
    const product: Produtos = request.body;

    const query = await (await connection).query('INSERT INTO Produto SET ?', product);

    return response.json(query);
}

export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return await getProducts(request, response);
        case 'POST':
            return await saveProducts(request, response);
        default:
            response.status(405).end();
            break;    
    }
}