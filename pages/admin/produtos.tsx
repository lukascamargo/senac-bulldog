import PrivateLayout from '../../shared/layout/PrivateLayout';
import ProductsList from '../../shared/components/ProductsList';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import AdicionarProduto from './adicionar-produto';
import React, {useState} from "react";
import {Produtos} from "../../shared/models/produtos";
import PerguntasERespostas from "./perguntas-e-respostas";
import AuthGuard from '../../shared/utils/AuthGuard';
import PublicLayout from '../../shared/layout/PublicLayout';


function Produto() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [questionDialog, setQuestionDialog] = useState<boolean>(false);
    const [createdProducts, setCreatedProducts] = useState<number>(0);
    const [produto, setProduto] = useState<Produtos>();

    const handleDialog = () => {
        if (openDialog) {
            setProduto(undefined as Produtos);
        }
        setOpenDialog(!openDialog);
    }

    const handleQuestionDialog = () => {
        if (questionDialog) {
            setProduto(undefined as Produtos);
        }
        setQuestionDialog(!questionDialog);
    }

    const updateProductList = () => {
        handleDialog();
        setCreatedProducts(createdProducts + 1);
    }

    const editarProduto = (parameter: Produtos) => {
        console.log(parameter);
        setProduto(parameter);
        handleDialog();
    }

    const editarPerguntas = (parameter: Produtos) => {
        setProduto(parameter);
        handleQuestionDialog();
    }




    return (
        <PublicLayout>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDialog}
            >
                Criar Produto
            </Button>
            <ProductsList novosProdutos={createdProducts} editarProduto={editarProduto} editarPerguntas={editarPerguntas}/>
            <AdicionarProduto open={openDialog} handleClose={handleDialog} handleSaveProduct={updateProductList} editarProduto={produto} />
            <PerguntasERespostas open={questionDialog} handleClose={handleQuestionDialog} produto={produto} />
        </PublicLayout>
    );
};

export default AuthGuard(Produto);
