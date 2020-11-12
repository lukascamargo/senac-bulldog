import {NowRequest, NowResponse} from '@vercel/node';
import nextConnect from 'next-connect';
import multer from 'multer';
import express from 'express';
import { Produtos } from '../../../shared/models/produtos';
import { queryPromiseSave } from '../connection';
import path from 'path';
import uploadConfig from '../../../shared/utils/uploadConfig';
import fs from 'fs';
import {ImageProduto} from '../../../shared/models/ImageProduto';

type NowRequestWithFile = NowRequest & {
    files: Express.Multer.File[]
};

const handler = nextConnect();

const upload = multer(uploadConfig);

handler.use(upload.array('file'));

handler.use('/tmp', express.static(path.join(__dirname, 'tmp')));

handler.post(async (req: NowRequestWithFile, res: NowResponse) => {
    const {
        status,
        quantidade,
        nome,
        descricao,
        descricao_longa,
        valor,
        palavras_chave
    }: Produtos = req.body;

    const product = {
        status: (status as unknown as string) === 'true',
        quantidade: parseInt((quantidade as unknown as string)),
        nome,
        descricao,
        descricao_longa,
        valor: parseFloat((valor as unknown as string)),
        palavras_chave
    }

    const query = await queryPromiseSave('INSERT INTO Produto SET ?', product) as any;

    const promises = req.files.map(async file => {
        let imageProduto: ImageProduto = { 
            path: file.path,
            nome: file.filename,
            idproduto: query.insertId,
        };
        let response = await queryPromiseSave('INSERT INTO ImageProduto SET ?', imageProduto);
    });

    await Promise.all(promises);

    return res.status(201).json(query);
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;