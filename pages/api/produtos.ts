import { NowRequest, NowResponse } from '@vercel/node'
import mysql from 'mysql';
import { Produtos } from '../../models/produtos';

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: Number(process.env.PORT),
    insecureAuth: true
});


const queryPromiseGet = (query: any) => {
    return new Promise((resolve, reject) => {
        connection.query(query, function(error, results, fields) {
            if (error) return reject(error);
            resolve(results);
        })
    })
}

const queryPromiseSave = (query: any, object: any) => {
    return new Promise((resolve, reject) => {
        connection.query(query, object, function(error, results, fields) {
            if (error) return reject(error);
            resolve(results);
        })
    })
}


async function getProducts(request: NowRequest, response: NowResponse) {
    const query = await queryPromiseGet('SELECT * FROM Produto');
    return response.json(query);

}

async function saveProducts(request: NowRequest, response: NowResponse) {
    const product: Produtos = request.body;

    const query = await queryPromiseSave('INSERT INTO Produto SET ?', product);

    return response.json(query);
}

async function editProducts(request: NowRequest, response: NowResponse) {
    console.log(request.body);
    const product: Produtos = request.body;

    const query = await queryPromiseSave(`UPDATE Produto SET ? WHERE idproduto=${product.idproduto}`, product);

    return response.json(query);
}

async function deleteProduct(request: NowRequest, response: NowResponse) {
    console.log(request.query);

    const { idproduto } = request.query;

    const query = await queryPromiseSave(`UPDATE Produto SET ? WHERE idproduto=${idproduto}`, {status: false});

    return response.json(query);
}

export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return await getProducts(request, response);
        case 'POST':
            return await saveProducts(request, response);
        case 'PUT':
            return await editProducts(request, response);
        case 'DELETE':
            return await deleteProduct(request, response);
        default:
            response.status(405).end();
            break;    
    }
}