import { useForm } from "react-hook-form";
import {AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import React from "react";
import { User } from "../../models/user";

interface OwnProps {
    open: boolean;
    handleClose():void;
    handleSaveUser():void;
    editUser?: User;
}

type Props = OwnProps;
export default function ManterUsuario({ open, handleClose, handleSaveUser, editUser }: Props) {
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = async (data) => {
        if (data.senha != data.senha_confirmar) {
            console.log('As duas senhas não são iguais')
            throw new Error('As duas senhas devem ser iguais e esse erro não deve ser assim rs.');
        }

        const user: User = {
            status: 'ATIVO',
            nome: data.nome, 
            sobrenome: data.sobrenome,
            cpf: data.cpf,
            senha: data.senha,
            email: data.email,
            perfil: data.perfil,
        }

        if (editUser?.idusuario) {
            user.cpf = editUser?.cpf;
            user.idusuario = editUser.idusuario;
            await axios.put('/api/user', user);
        } else {
            await axios.post('/api/user', user);
        }

        handleSaveUser();
    };

    const deletar = async () => {
        if (editUser?.idusuario) {
            await axios.delete(`/api/user?idusuario=${editUser?.idusuario}`);
        }

        handleSaveUser();
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose} >
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flex: 1, marginLeft: 2 }}>
                        {editUser?.idusuario ? 'Editar ': 'Adicionar '} Usuario { editUser?.nome}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="nome" name="nome" label="Nome do Usuario" defaultValue={editUser?.nome} fullWidth inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="sobrenome" name="sobrenome" label="Sobrenome" defaultValue={editUser?.sobrenome} fullWidth inputRef={register({ required: true })}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="cpf" name="cpf" disabled={!!editUser?.idusuario || false} label="CPF" defaultValue={editUser?.cpf}  inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="email" type="email" disabled={!!editUser?.idusuario || false} name="email" label="E-mail" defaultValue={editUser?.email}  inputRef={register({ required: true })}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="perfil" name="perfil" label="Perfil" defaultValue={editUser?.perfil} inputRef={register({ required: true })}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="senha" type="password" name="senha" label="Senha" defaultValue={editUser?.perfil} inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="senha_confirmar" type="password" name="senha_confirmar" label="Senha" defaultValue={editUser?.senha} inputRef={register({ required: false })}/>
                    </Grid>

                </Grid>
                <Button variant="contained" type="submit" fullWidth>
                    Salvar
                </Button>
            </form>
            {
                editUser?.idusuario ?
                    (
                        <Button variant="contained" color="secondary" fullWidth onClick={deletar}>
                            <Typography style={{ color: 'red' }}>
                                Deletar Usuario
                            </Typography>
                        </Button>
                    ):
                    ''
            }
        </Dialog>
    );
};
