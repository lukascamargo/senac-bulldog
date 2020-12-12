import Axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Cliente, ClienteEndereco } from "../../models/cliente";
import { Endereco } from "../../models/endereco";
import { ConnectForm } from "../ConnectForm"

type Props = {
    tipo: string;
    tipoView: string
    remove?(index: number);
    index?: number;
    getValues();
    cliente?: ClienteEndereco;
    entrega?: any;
}
export default function EnderecoForm({ tipo, tipoView, remove, index, getValues, cliente, entrega }: Props) {
    const [faturamento, setFaturamento] = useState<Endereco>();

    return (
        <ConnectForm>
            { ({ register, reset }) => {

                const viaCEP = async (data) => {
                    try {
                        console.log(getValues());
                        console.log(data.target.value);
                        if (data.target.value.length === 8) {
                            const response = await Axios.get(`http://viacep.com.br/ws/${data.target.value}/json`);
                            
                            if (response.status === 200) {
                                console.log('Resposta da API: ', response);

                                const tipoLower = tipoView.toLowerCase();

                                const variables = getValues();

                                if (tipoLower === 'entrega') {
                                    variables.entrega = {
                                        logradouro: response.data.logradouro,
                                        cep: response.data.cep,
                                        pais: 'Brasil',
                                        bairro: response.data.bairro,
                                        cidade: response.data.localidade,
                                        estado: response.data.uf
                                    }
                                    console.log(variables);
                                    reset(variables);
                                } else {
                                    reset({
                                        [tipo]: {
                                            logradouro: response.data.logradouro,
                                            cep: response.data.cep,
                                            pais: 'Brasil',
                                            bairro: response.data.bairro,
                                            cidade: response.data.localidade,
                                            estado: response.data.uf
                                        },
                                    });
                                }
                            }
                        }

                    } catch(e) {
                        console.log('Erro na busca do CEP', e);
                    }
                    
                }

                return (
                    <Card style={{ margin: '2em' }} >
                        <Card.Header>
                            <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    Endereco de { tipoView }
                                </div>
                                { remove ? (
                                    <div>
                                        <Button onClick={() => remove(index)} variant="light">
                                            x
                                        </Button>
                                    </div>
                                ) : '' }
                            </Row>
                        </Card.Header>
                        <Row>
                            {
                                cliente?.faturamento?.idendereco ? (
                                    <Form.Control type="hidden" name={`${tipo}.idendereco`} defaultValue={cliente?.faturamento?.idendereco || entrega?.idendereco} ref={register} />
                                ) : (<></>)
                            }
                            <Col sm={12} md={3}>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select" name={`${tipo}.tipo`} defaultValue={tipoView} ref={register}>
                                    <option value={tipoView}>{tipoView}</option>
                                </Form.Control>
                            </Col>
                            <Col sm={12} md={3}>
                                <Form.Label>CEP</Form.Label>
                                <Form.Control name={`${tipo}.cep`} placeholder="CEP" defaultValue={cliente?.faturamento?.cep || entrega?.cep} ref={register} onChange={(e) => viaCEP(e)} />
                            </Col>
                            <Col sm={12} md={4}>
                                <Form.Label>Logradouro</Form.Label>
                                <Form.Control name={`${tipo}.logradouro`} placeholder="Logradouro" defaultValue={faturamento?.logradouro || cliente?.faturamento?.logradouro || entrega?.logradouro} ref={register} />
                            </Col>
                            <Col sm={12} md={2}>
                                <Form.Label>Numero</Form.Label>
                                <Form.Control name={`${tipo}.numero`} placeholder="Numero" defaultValue={faturamento?.numero || cliente?.faturamento?.numero || entrega?.numero} ref={register} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={2}>
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control name={`${tipo}.complemento`} placeholder="Complemento" defaultValue={faturamento?.complemento || cliente?.faturamento?.complemento || entrega?.complemento} ref={register} />
                            </Col>
                            <Col sm={12} md={3}>
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control name={`${tipo}.bairro`} placeholder="Bairro" defaultValue={faturamento?.bairro || cliente?.faturamento?.bairro || entrega?.bairro} ref={register} />
                            </Col>
                            <Col sm={12} md={3}>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control name={`${tipo}.cidade`} placeholder="Cidade" defaultValue={faturamento?.cidade || cliente?.faturamento?.cidade || entrega?.cidade} ref={register} />
                            </Col>
                            <Col sm={12} md={2}>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control name={`${tipo}.estado`} placeholder="Estado" defaultValue={faturamento?.estado || cliente?.faturamento?.estado || entrega?.estado} ref={register} />
                            </Col>
                            <Col sm={12} md={2}>
                                <Form.Label>País</Form.Label>
                                <Form.Control name={`${tipo}.pais`} placeholder="País" defaultValue={faturamento?.pais || cliente?.faturamento?.pais || entrega?.pais} ref={register} />
                            </Col>
                        </Row>
                    </Card>
                );
            }}
        </ConnectForm>
    );   
}