import { NowRequest, NowResponse } from "@vercel/node";
import { queryPromiseGet } from "../connection";

export default async (request: NowRequest, response: NowResponse) => {
    const { idendereco } = request.query;

    await queryPromiseGet(`DELETE FROM Endereco WHERE idendereco=${idendereco}`);

    return response.status(200);
}