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

const handler = nextConnect();

handler.post(async (req: NowRequest, res: NowResponse) => {
    const {
        idproduto,
        quantidade,
    }: Produtos = req.body;

    const query = await queryPromiseSave(`UPDATE Produto SET ? WHERE idproduto=${idproduto}`, {quantidade}) as any;

    return res.status(201).json(query);
});

export default handler;