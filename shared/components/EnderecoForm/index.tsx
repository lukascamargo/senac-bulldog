import Axios from "axios";
import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Endereco } from "../../models/endereco";
import { ConnectForm } from "../ConnectForm"

type Props = {
    tipo: string;
    tipoView: string
}
export default function EnderecoForm({ tipo, tipoView }: Props) {
    const [faturamento, setFaturamento] = useState<Endereco>();

    return (
        <ConnectForm>
            { ({ register, reset }) => {

                const viaCEP = async (data) => {
                    try {
                        console.log(data.target.value);
                        const response = await Axios.get(`http://viacep.com.br/ws/${data.target.value}/json`);
                        
                        if (response.status === 200) {
                            console.log('Resposta da API: ', response);
                            
                            reset({
                                [tipo]: {
                                    logradouro: response.data.logradouro,
                                    cep: response.data.cep,
                                    pais: 'Brasil',
                                    bairro: response.data.bairro,
                                    cidade: response.data.localidade,
                                    estado: response.data.uf
                                }
                            });
                        }

                    } catch(e) {
                        console.log('Erro na busca do CEP', e);
                    }
                    
                }

                return (
                    <Card style={{ padding: '2em'}}>
                        <Card.Header>Endereco de { tipoView</Card.Header>
                        <Row>
                            <Col>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select" name={`${tipo}.tipo`} defaultValue={tipoView} ref={register}>
                                    <option value={tipoView}>{tipoView}</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>CEP</Form.Label>
                                <Form.Control name={`${tipo}.cep`} placeholder="CEP" ref={register} onChange={(e) => viaCEP(e)} />
                            </Col>
                            <Col>
                                <Form.Label>Logradouro</Form.Label>
                                <Form.Control name={`${tipo}.logradouro`} placeholder="Logradouro" defaultValue={faturamento?.logradouro} ref={register} />
                            </Col>
                            <Col>
                                <Form.Label>Numero</Form.Label>
                                <Form.Control name={`${tipo}.numero`} placeholder="Numero" defaultValue={faturamento?.numero} ref={register} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control name={`${tipo}.complemento`} placeholder="Complemento" defaultValue={faturamento?.numero} ref={register} />
                            </Col>
                            <Col>
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control name={`${tipo}.bairro`} placeholder="Bairro" defaultValue={faturamento?.numero} ref={register} />
                            </Col>
                            <Col>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control name={`${tipo}.cidade`} placeholder="Cidade" defaultValue={faturamento?.numero} ref={register} />
                            </Col>
                            <Col>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control name={`${tipo}.estado`} placeholder="Estado" defaultValue={faturamento?.numero} ref={register} />
                            </Col>
                            <Col>
                                <Form.Label>País</Form.Label>
                                <Form.Control name={`${tipo}.pais`} placeholder="País" defaultValue={faturamento?.numero} ref={register} />
                            </Col>
                        </Row>
                    </Card>
                );
            }}
        </ConnectForm>
    );   
}