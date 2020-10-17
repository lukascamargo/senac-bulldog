import { useForm } from "react-hook-form";
import {AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import React from "react";
import { User } from "../../models/user";
import Router from "next/router";

interface OwnProps {
    open: boolean;
    handleClose():void;
}

type Props = OwnProps;
export default function Login({ open, handleClose }: Props) {
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = async (data) => {
        const response = await axios.post('/api/login', data);
        console.log(response);

        if(response.data.token) {
            console.log('needed to be redirected');
            localStorage.setItem('token', response.data.token);
            Router.push('/admin/produtos');
        }

    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flex: 1, marginLeft: 2 }}>
                        Login
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="email" type="email" name="email" label="E-mail" fullWidth inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="senha" type="password" name="senha" label="Senha" fullWidth inputRef={register({ required: true })}/>
                    </Grid>
                </Grid>
                <Button variant="contained" type="submit" fullWidth>
                    Salvar
                </Button>
            </form>
        </Dialog>
    );
};
