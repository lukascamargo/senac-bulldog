import axios from "axios";
import { Container } from "next/app";
import Router from "next/router";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import BasicInfoForm from "../../shared/components/BasicInfoForm";
import EnderecoForm from "../../shared/components/EnderecoForm";
import SenhaForm from "../../shared/components/SenhaForm";
import PublicLayout from "../../shared/layout/PublicLayout";
import { Cliente } from "../../shared/models/cliente";
import { nextRoute } from "../../shared/services/nextroute";

export default function LandingPage() {
    const methods = useForm();
    const [cliente, setCliente] = useState<Cliente>();
    const [tamanhoEntrega, setTamanhoEntrega] = useState<any[]>([0]);

    const onSubmit = async (data) => {
        data.status = true;
        const response = await axios.post('/api/clientes/store', data);

        if (response.status === 201) {
            Router.push('/cliente/login');
        }
    }

    const adicionarEndereco = () => {
        tamanhoEntrega.push(tamanhoEntrega.length - 1);
        setTamanhoEntrega(tamanhoEntrega);
    }

    return (
        <PublicLayout>
            <FormProvider {...methods} >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <BasicInfoForm />
                    { 
                    !cliente?.idcliente ? 
                        (
                            <SenhaForm />
                        ) 
                        : <></>
                    }
                    <EnderecoForm getValues={methods.getValues} tipo="faturamento" tipoView="Faturamento" />
                    {/* <EnderecoForm getValues={methods.getValues} tipo="entrega" tipoView="Entrega" /> */}
                    <Container >
                        <Row>
                            <Button variant="success" style={{ marginLeft: '3em' }} type="submit">
                                Cadastrar
                            </Button>
                            <Button variant="secondary" style={{ marginLeft: '1em' }} onClick={() => nextRoute('/')}>
                                Cancelar
                            </Button>
                        </Row>
                    </Container>
                </Form>
            </FormProvider>
        </PublicLayout>
    );
};
