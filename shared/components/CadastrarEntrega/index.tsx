import Axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Cliente, ClienteEndereco } from "../../models/cliente";
import { Endereco } from "../../models/endereco";
import { ConnectForm } from "../ConnectForm"
import EnderecoForm from "../EnderecoForm";

import axios from 'axios';

type Props = {
    entrega?: any;
    idcliente?: any;
    atualizar?(): void;
}
export default function CadastrarEntrega({ entrega, atualizar, idcliente }: Props) {
    const methods = useForm();
    const [faturamento, setFaturamento] = useState<Endereco>();

    const onSubmit = async (data: any) => {
        console.log('Cadastrar', data);
        data.entrega.idcliente = idcliente;

        const response = await axios.post('/api/clientes/addEndereco', {
            entrega: data.entrega,
        });

        console.log(response);

        atualizar();

    }

    const deletar = async () => {
        const response = await axios.get('/api/clientes/deleteEndereco', {
            params: {
                idendereco: entrega.idendereco,
            }
        });

        atualizar();
    }

    return (
        <FormProvider {...methods} >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <EnderecoForm entrega={entrega} getValues={methods.getValues} tipo="entrega" tipoView="Entrega" />
                    <Container>
                        <Row>
                            <Button variant="success" style={{ marginLeft: '3em' }} type="submit">
                                Salvar
                            </Button>
                            { 
                                entrega.idendereco ? (
                                    <Button variant="secondary" style={{ marginLeft: '1em' }} onClick={() => deletar()}>
                                        Deletar
                                    </Button>
                                ) : (<></>)
                            }
                        </Row>
                    </Container>
                </Form>
        </FormProvider>
    );   
}