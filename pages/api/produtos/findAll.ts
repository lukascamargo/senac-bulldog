import {NowRequest, NowResponse} from '@vercel/node';
import nextConnect from 'next-connect';
import multer from 'multer';
import express from 'express';
import { queryPromiseGet, queryPromiseSave } from '../connection';
import path from 'path';
import uploadConfig from '../../../shared/utils/uploadConfig';

type NowRequestWithFile = NowRequest & {
    files: Express.Multer.File[]
};

const handler = nextConnect();

const upload = multer(uploadConfig);

handler.use(upload.array('file'));

handler.use('/tmp', express.static(path.join(__dirname, 'tmp')));

handler.get(async (req: NowRequestWithFile, res: NowResponse) => {
    const query = await queryPromiseGet('SELECT * FROM Produto');
    return res.json(query);
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;