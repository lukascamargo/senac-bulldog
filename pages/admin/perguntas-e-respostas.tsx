import {
    AppBar,
    Button,
    Dialog,
    Grid,
    IconButton,
    List,
    ListItem, ListItemText,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {Produtos} from "../../shared/models/produtos";
import CloseIcon from "@material-ui/icons/Close";
import Divider from '@material-ui/core/Divider';
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Pergunta} from "../../shared/models/pergunta";

interface OwnProps {
    open: boolean;
    handleClose():void;
    produto: Produtos;
}

type Props = OwnProps;

export default function PerguntasERespostas({ open, handleClose, produto }: Props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [ pergunta, setPergunta ] = useState<Pergunta>();
    const [ listaPerguntas, setListaPerguntas ] = useState<Pergunta[]>();

    useEffect(() => {
        if (produto) {
            buscarPerguntas(produto);
        }
    }, [produto])

    const buscarPerguntas = useCallback(async (produto?) => {
        console.log('Idproduto', produto);
        const perguntas = await axios(`/api/pergunta?idproduto=${produto?.idproduto}`);

        console.log('Perguntas:', perguntas);

        setListaPerguntas(perguntas.data);
    }, [])

    const onSubmit = async (data: Pergunta) => {
        data.idproduto = produto.idproduto;
        await axios.post('/api/pergunta', data);

        buscarPerguntas(produto);
    };

    const deletar = async () => {
        await axios.delete(`/api/produtos?idproduto=`);

    }

    if (!produto) {
        return <></>;
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose}>
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flex: 1, marginLeft: 2 }}>
                        Perguntas e Respostas {produto?.nome}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="pergunta" name="pergunta" label="Pergunta" defaultValue={pergunta?.pergunta} fullWidth inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="textarea" id="resposta" name="resposta" label="Resposta" defaultValue={pergunta?.resposta} fullWidth inputRef={register}/>
                    </Grid>
                </Grid>
                <Button variant="contained" type="submit" fullWidth>
                    Salvar
                </Button>
            </form>
            <Divider />
            <Typography variant="h4">
                Perguntas e Respostas:
            </Typography>
            <List>
                {
                    listaPerguntas?.map((question) => {
                        return <ListItem key={question.idpergunta}>
                                    <ListItemText
                                        primary={question.pergunta}
                                        secondary={
                                            <>
                                                {question.resposta}
                                            </>
                                        }
                                    />
                                </ListItem>
                    })
                }
            </List>
        </Dialog>
    );
}
