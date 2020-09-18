import PrivateLayout from '../../layout/PrivateLayout';
import ProductsList from '../../components/ProductsList';
import { useForm } from "react-hook-form";
import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';

export default function AdicionarProduto() {
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = async (data) => {
        console.log(data);

        const response = await axios.post('/api/produtos', data);

        console.log(response);
    };

    return (
        <PrivateLayout>
            <h3>Formulário de Adicão de Produto</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="nome" name="nome" label="Nome do Produto" fullWidth inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="quantidade" name="quantidade" label="Quantidade" type="number" fullWidth inputRef={register}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField id="descricao" name="descricao" label="Descricao" inputRef={register({ required: true })}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="palavras_chave" name="palavras_chave" label="Palavras Chave" inputRef={register({ required: true })}/>
                    </Grid>
                </Grid>
                <Button variant="contained" type="submit">
                    Salvar
                </Button>
            </form>
        </PrivateLayout>
    );
};