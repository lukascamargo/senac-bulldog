import axios from "axios";
import { Container } from "next/app";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import BasicInfoForm from "../../../shared/components/BasicInfoForm";
import CadastrarEntrega from "../../../shared/components/CadastrarEntrega";
import EnderecoForm from "../../../shared/components/EnderecoForm";
import PublicLayout from "../../../shared/layout/PublicLayout";
import { Cliente } from "../../../shared/models/cliente";
import { nextRoute } from "../../../shared/services/nextroute";

export default function LandingPage() {
    const methods = useForm();
    const [cliente, setCliente] = useState<Cliente>();
    const [entregas, setEntregas] = useState<any[]>([0]);
    const [alert, setAlert] = useState<boolean>(false);

    const router = useRouter();
    const {idcliente} = router.query;

    async function fetchUser() {
        const response = await axios.get('/api/clientes/show', {
            params: {
                idcliente,
                entrega: true
            }
        });

        console.log(response.data);
        setCliente(response.data);
        setEntregas(response.data.entrega);
    }

    useEffect(() => {
        console.log('ID Cliente', idcliente);
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

    const update = async () => {
        fetchUser();
    }

    const adicionarEndereco = () => {
        setEntregas([...entregas, {tipo: 'Entrega'}]);
    }


    return (
        <PublicLayout>
            <Alert variant="success" show={alert} onClose={() => setAlert(false)} dismissible>
                Dados salvos em nosso banco de dados com sucesso!
            </Alert>

            <Button variant="primary" onClick={adicionarEndereco}>
                Adicionar Endereco
            </Button>
            

            { 
                entregas?.map(entrega => {
                    return (
                        <CadastrarEntrega entrega={entrega} atualizar={update} idcliente={cliente?.idcliente} />
                    );
                })
            }

        </PublicLayout>
    );
};
