import { NowRequest, NowResponse } from '@vercel/node'
import { METHODS } from 'http';
import mysql from 'promise-mysql';

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

export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            await getProducts(request, response);
            break;
        default:
            response.status(405).end();
            break;    
    }
}