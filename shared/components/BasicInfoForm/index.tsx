import Axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Cliente } from "../../models/cliente";
import { ConnectForm } from "../ConnectForm"

type Props = {
    cliente?: Cliente
}
export default function BasicInfoForm({cliente}: Props) {

    return (
        <ConnectForm>
            { ({ register }) => {

                return (
                    <Card style={{ margin: '2em' }} >
                        <Card.Header>
                            <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    Informacões Básicas
                                </div>
                            </Row>
                        </Card.Header>
                        <Row>
                            <Col>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control id="nome" name="nome" placeholder="Nome" defaultValue={cliente?.nome} ref={register} />
                            </Col>
                            <Col>
                                <Form.Label>Sobrenome</Form.Label>
                                <Form.Control id="sobrenome" name="sobrenome" placeholder="Sobrenome" defaultValue={cliente?.sobrenome} ref={register} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control id="email" name="email" placeholder="E-mail" defaultValue={cliente?.email} ref={register}  />
                            </Col>
                            <Col>
                                <Form.Label>CPF</Form.Label>
                                <Form.Control id="cpf" name="cpf" placeholder="CPF" defaultValue={cliente?.cpf} ref={register}  />
                            </Col>
                            <Col>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control id="telefone" name="telefone" placeholder="Telefone"  defaultValue={cliente?.telefone} ref={register} />
                            </Col>
                        </Row>
                    </Card>
                );
            }}
        </ConnectForm>
    );   
}