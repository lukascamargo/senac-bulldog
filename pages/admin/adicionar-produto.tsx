import PrivateLayout from '../../layout/PrivateLayout';
import ProductsList from '../../components/ProductsList';
import { useForm } from "react-hook-form";
import {AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import React from "react";
import {Produtos} from "../../models/produtos";

interface OwnProps {
    open: boolean;
    handleClose():void;
    handleSaveProduct():void;
    editarProduto?: Produtos;
}

type Props = OwnProps;
export default function AdicionarProduto({ open, handleClose, handleSaveProduct, editarProduto }: Props) {
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = async (data) => {
        data.status = true;

        if (editarProduto.idproduto) {
            data.idproduto = editarProduto.idproduto;
            await axios.put('/api/produtos', data);
        } else {
            await axios.post('/api/produtos', data);
        }

        handleSaveProduct();
    };

    const deletar = async () => {
        if (editarProduto?.idproduto) {
            await axios.delete(`/api/produtos?idproduto=${editarProduto?.idproduto}`);
        }

        handleSaveProduct();
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose} >
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flex: 1, marginLeft: 2 }}>
                        {editarProduto?.idproduto ? 'Editar ': 'Adicionar '} Produto { editarProduto?.nome}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="nome" name="nome" label="Nome do Produto" defaultValue={editarProduto?.nome} fullWidth inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="quantidade" name="quantidade" label="Quantidade" type="number" defaultValue={editarProduto?.quantidade} fullWidth inputRef={register}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="valor" type="number" name="valor" label="Valor do Produto" defaultValue={editarProduto?.valor}  inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="palavras_chave" name="palavras_chave" label="Palavras Chave" defaultValue={editarProduto?.palavras_chave}  inputRef={register({ required: true })}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="descricao" name="descricao" label="Descricao Simples" defaultValue={editarProduto?.descricao} inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="descricao_longa" name="descricao_longa" label="Descricao Completa" defaultValue={editarProduto?.descricao_longa} inputRef={register({ required: false })}/>
                    </Grid>

                </Grid>
                <Button variant="contained" type="submit" fullWidth>
                    Salvar
                </Button>
            </form>
            {
                editarProduto?.idproduto ?
                    (
                        <Button variant="contained" color="secondary" fullWidth onClick={deletar}>
                            <Typography style={{ color: 'red' }}>
                                Deletar Produto
                            </Typography>
                        </Button>
                    ):
                    ''
            }
        </Dialog>
    );
};