import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PublicLayout from "../../shared/layout/PublicLayout";
import { Cliente } from "../../shared/models/cliente";
import Cookies from 'js-cookie';
import jwt from "jsonwebtoken";

export default function LandingPage() {
    const methods = useForm();

    function getUser() {
        const token = Cookies.get('token');
        if (!token) {
            return false;
        }

        const cliente: any = jwt.decode(token);
        return cliente;
    }

    useEffect(() => {
        const cliente = getUser();

        if (cliente.nome && open) {
            Router.push('/privado');
        }

    }, [])

    const onSubmit = async (data) => {
        data.status = true;
        const response = await axios.post('/api/clientes/login', data);

        if(response.data.token) {
            Cookies.set('token', response.data.token);
            Router.push('/privado');
        }
    }

    return (
        <PublicLayout>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Card>
                    <Card.Header>
                        <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                Login
                            </div>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control id="email" name="email" placeholder="E-mail" ref={methods.register}  />
                            </Col>
                            <Col>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control id="senha" name="senha" type="password" placeholder="Senha" ref={methods.register} />
                            </Col>
                        </Row>
                        <Row style={{paddingTop: 10}}>
                            <Col>
                                <Button variant="success" type="submit">
                                    Entrar
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Form>
        </PublicLayout>
    );
};
