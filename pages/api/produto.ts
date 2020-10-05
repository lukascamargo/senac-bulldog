import {NowRequest, NowResponse} from "@vercel/node";
import {queryPromiseGet} from "./produtos";

async function getProduct(request: NowRequest, response: NowResponse) {
    const { idproduto } = request.query;

    const query = await queryPromiseGet(`SELECT * FROM Produto WHERE status=true AND idproduto=${idproduto}`);

    return response.json(query);
}

export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return await getProduct(request, response);
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
