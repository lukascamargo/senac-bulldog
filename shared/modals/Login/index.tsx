import { useForm } from "react-hook-form";
import {AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import React, { useEffect } from "react";
import { User } from "../../models/user";
import Router from "next/router";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

interface OwnProps {
    open: boolean;
    handleClose():void;
}

type Props = OwnProps;
export default function Login({ open, handleClose }: Props) {
    const { register, handleSubmit, watch, errors } = useForm();

    function getUser() {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }

        const user: any = jwt.decode(token);
        return user;
    }

    useEffect(() => {
        const user = getUser();

        if (user.nome && open) {
            Router.push('/estoque');
        }

    }, [open])
    
    const onSubmit = async (data) => {
        const response = await axios.post('/api/login', data);

        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
            Cookies.set('token', response.data.token);
            Router.push('/estoque');
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
