import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";

export default async (request: NowRequest, response: NowResponse) => {
    const clients = await queryPromiseGet('SELECT * FROM Cliente WHERE status=true');

    return response.json(clients);
}