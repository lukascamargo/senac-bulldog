import Axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Cliente } from "../../models/cliente";
import { ConnectForm } from "../ConnectForm"

export default function SenhaForm() {
    const [cliente, setCliente] = useState<Cliente>();

    return (
        <ConnectForm>
            { ({ register }) => {

                return (
                    <Card style={{ margin: '2em' }} >
                        <Card.Header>
                            <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    Senha
                                </div>
                            </Row>
                        </Card.Header>
                        <Row>
                            <Col>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control id="senha" name="senha" type="password" placeholder="Senha" ref={register} />
                            </Col>
                            <Col>
                                <Form.Label>Confirmar Senha</Form.Label>
                                <Form.Control id="confirmarSenha" name="confirmarSenha" type="password" placeholder="Confirmar Senha" ref={register} />
                                {
                                true ? 
                                (
                                    <Form.Text className="text-muted text-danger">
                                        <span style={{ color: 'red' }}>
                                            As senhas não são iguais
                                        </span>
                                    </Form.Text>
                                ) 
                                : <></>
                                }
                            </Col>
                        </Row>
                    </Card>
                );
            }}
        </ConnectForm>
    );   
}