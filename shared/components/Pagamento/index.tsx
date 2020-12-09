import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConnectForm } from "../ConnectForm";

export default function Pagamento() {
    const [selected, setSelected] = useState<string>();

    return (
        <ConnectForm>
            { ({ register }) => {
                return (
                    <div>
                        <h3>Pagamento</h3>
                        <h6>Selecione um método de pagamento</h6>
                        <ButtonGroup toggle style={{ marginBottom: '1em' }}>
                            <ToggleButton
                                type="radio"
                                variant="outline-secondary"
                                value={selected === 'boleto'}
                                checked={selected === 'boleto'}
                                onChange={(e) => setSelected('boleto')}
                            >
                                Boleto
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                variant="outline-secondary"
                                value={selected === 'cartao'}
                                checked={selected === 'cartao'}
                                onChange={(e) => setSelected('cartao')}
                            >
                                Cartão de Crédito
                            </ToggleButton>
                        </ButtonGroup>

                        { 
                            selected === 'cartao' ? 
                                (
                                    <Container fluid style={{ marginTop: 20, marginBottom: 20 }}>
                                        <h6>Preencha os dados do seu catão de crédito abaixo:</h6>

                                            <Row>
                                                <Col>
                                                    <Form.Label>Digite o Nome do Titular</Form.Label>
                                                    <Form.Control id="nome" name="nome" placeholder="Digite o nome do titular" ref={register({ required: true })} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Digite o numero do cartão</Form.Label>
                                                    <Form.Control id="numero" name="numero" placeholder="Digite o numero do cartão" ref={register({ required: true })} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Código de Seguranca</Form.Label>
                                                    <Form.Control type="number" id="codigo" name="codigo" placeholder="Código de Seguranca" ref={register({ required: true })} />
                                                </Col>
                                                <Col>
                                                    <Form.Label>Validade</Form.Label>
                                                    <Form.Control id="validade" name="validade" placeholder="Validade" ref={register({ required: true })} />
                                                </Col>
                                            </Row>
                                    </Container>
                                ) : 
                                (
                                    <div></div>
                                )
                        }

                    </div>
                );
            }}
        </ConnectForm>
    );
}