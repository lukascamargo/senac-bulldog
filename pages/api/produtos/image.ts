import {NowRequest, NowResponse} from '@vercel/node';
import nextConnect from 'next-connect';
import multer from 'multer';
import express from 'express';
import { Produtos } from '../../../shared/models/produtos';
import { queryPromiseSave } from '../connection';
import path from 'path';
import uploadConfig from '../../../shared/utils/uploadConfig';
import fs from 'fs';

type NowRequestWithFile = NowRequest & {
    files: Express.Multer.File[]
};

const handler = nextConnect();

const upload = multer(uploadConfig);

handler.use(upload.array('file'));

handler.get(async (req: NowRequestWithFile, res: NowResponse) => {
    const file = await fs.readFileSync(`/tmp/${req.query.file}` as string);

    res.setHeader('Content-Type', 'image/jpg');
    return res.send(file);
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;