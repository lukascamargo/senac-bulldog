import axios from "axios";
import { Container } from "next/app";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import BasicInfoForm from "../../../shared/components/BasicInfoForm";
import EnderecoForm from "../../../shared/components/EnderecoForm";
import PublicLayout from "../../../shared/layout/PublicLayout";
import { Cliente } from "../../../shared/models/cliente";
import { nextRoute } from "../../../shared/services/nextroute";

export default function LandingPage() {
    const methods = useForm();
    const [cliente, setCliente] = useState<Cliente>();
    const [tamanhoEntrega, setTamanhoEntrega] = useState<any[]>([0]);
    const [alert, setAlert] = useState<boolean>(false);

    const router = useRouter();
    const {idcliente} = router.query;

    useEffect(() => {
        console.log('ID Cliente', idcliente);
        async function fetchUser() {
            const response = await axios.get('/api/clientes/show', {
                params: {
                    idcliente,
                    faturamento: true
                }
            });

            setCliente(response.data);
        }

        if(idcliente) {
            fetchUser();
        }
    }, []);

    const dismissAfterSeconds = () => {
        setAlert(true);
        setInterval(() => {
            setAlert(false);
        }, 9000);
    }

    const onSubmit = async (data) => {
        data.status = true;
        data.idcliente = cliente.idcliente;
        const response = await axios.post('/api/clientes/update', data);

        if (response.status === 201) {
            dismissAfterSeconds();
        }

        console.log(data);
    }

    const adicionarEndereco = () => {
        tamanhoEntrega.push(tamanhoEntrega.length - 1);
        setTamanhoEntrega(tamanhoEntrega);
    }

    return (
        <PublicLayout>
            <Alert variant="success" show={alert} onClose={() => setAlert(false)} dismissible>
                Dados salvos em nosso banco de dados com sucesso!
            </Alert>

            <FormProvider {...methods} >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <BasicInfoForm cliente={cliente} />
                    <EnderecoForm cliente={cliente} getValues={methods.getValues} tipo="faturamento" tipoView="Faturamento" />
                    {/* <EnderecoForm getValues={methods.getValues} tipo="entrega" tipoView="Entrega" /> */}
                    <Container >
                        <Row>
                            <Button variant="success" style={{ marginLeft: '3em' }} type="submit">
                                Salvar
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
