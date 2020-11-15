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

export default function LandingPage() {
    const methods = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control: methods.control,
        name: 'entrega'
    })
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
                    { /*
                        
                        fields.map((item, index) => {
                            return <EnderecoForm getValues={methods.getValues} key={index} tipo={`entrega[${index}]`} tipoView="Entrega" index={index} remove={remove} />
                        })
                    */ }
                    <Container >
                        {/* <Row>
                            <Button variant="secondary" style={{ marginLeft: '3em' }} type="button" onClick={() => append({ tipo: 'Entrega' })}>
                                + Endereco de Entrega
                            </Button>
                        </Row> */}
                        <Row>
                            <Button variant="success" style={{ marginLeft: '3em' }} type="submit">
                                Cadastrar
                            </Button>
                        </Row>
                    </Container>
                </Form>
            </FormProvider>
        </PublicLayout>
    );
};
