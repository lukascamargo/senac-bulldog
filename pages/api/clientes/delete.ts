import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";

export default async (request: NowRequest, response: NowResponse) => {

    const { idcliente } = request.query;

    await queryPromiseGet(`DELETE FROM Cliente WHERE idcliente=${idcliente}`);

    return response.status(200);
}