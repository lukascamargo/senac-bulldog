import {NowRequest, NowResponse} from "@vercel/node";
import { queryPromiseGet } from "./connection";


async function getProducts(request: NowRequest, response: NowResponse) {
    const query = await queryPromiseGet(
        'SELECT * FROM Produto WHERE status=true'
    ) as any[];

    const promises = query.map(async (result) => {
        let images = await queryPromiseGet(`SELECT * FROM ImageProduto WHERE idproduto=${result.idproduto}`) as any[];
        if (images.length > 0) {
            result.imagem = images[0].nome;
        }
    });

    await Promise.all(promises);

    return response.json(query);
}

export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return await getProducts(request, response);
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
