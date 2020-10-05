import {NowRequest, NowResponse} from "@vercel/node";
import {queryPromiseGet} from "./produtos";

async function getProducts(request: NowRequest, response: NowResponse) {
    const query = await queryPromiseGet('SELECT * FROM Produto WHERE status=true');

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
