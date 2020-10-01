import PrivateLayout from '../../layout/PrivateLayout';
import ProductsList from '../../components/ProductsList';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import AdicionarProduto from './adicionar-produto';
import React from "react";
import {Produtos} from "../../models/produtos";


export default function Produto() {
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [createdProducts, setCreatedProducts] = React.useState<number>(0);
    const [produto, setProduto] = React.useState<Produtos>();

    const handleDialog = () => {
        if (openDialog) {
            setProduto({} as Produtos);
        }
        setOpenDialog(!openDialog);
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

    return (
        <PrivateLayout>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDialog}
            >
                Criar Produto
            </Button>
            <ProductsList novosProdutos={createdProducts} editarProduto={editarProduto}/>
            <AdicionarProduto open={openDialog} handleClose={handleDialog} handleSaveProduct={updateProductList} editarProduto={produto} />
        </PrivateLayout>
    );
};