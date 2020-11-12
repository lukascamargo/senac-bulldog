import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import EnderecoForm from "../../shared/components/EnderecoForm";
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
        console.log(data);
    }

    const adicionarEndereco = () => {
        tamanhoEntrega.push(tamanhoEntrega.length - 1);
        setTamanhoEntrega(tamanhoEntrega);
    }

    return (
        <PublicLayout>
            <FormProvider {...methods} >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <h3>Informacões Basicas</h3>
                    <Row>
                        <Col>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control id="nome" name="nome" placeholder="Nome" defaultValue={cliente?.nome} ref={methods.register} />
                        </Col>
                        <Col>
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control id="sobrenome" name="sobrenome" placeholder="Sobrenome" defaultValue={cliente?.nome} ref={methods.register} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control id="email" name="email" placeholder="E-mail" defaultValue={cliente?.nome} ref={methods.register}  />
                        </Col>
                        <Col>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control id="cpf" name="cpf" placeholder="CPF" defaultValue={cliente?.nome} ref={methods.register}  />
                        </Col>
                        <Col>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control id="telefone" name="telefone" placeholder="Telefone"  defaultValue={cliente?.nome} ref={methods.register} />
                        </Col>
                    </Row>
                    <h3>Senha</h3>
                    { 
                    !cliente?.idcliente ? 
                        (
                            <Row>
                                <Col>
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control id="senha" name="senha" type="password" placeholder="Senha" ref={methods.register} />
                                </Col>
                                <Col>
                                    <Form.Label>Confirmar Senha</Form.Label>
                                    <Form.Control id="confirmarSenha" name="confirmarSenha" type="password" placeholder="Confirmar Senha" ref={methods.register} />
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
                        ) 
                        : <></>
                    }
                    <h3>Endereco de Faturamento</h3>
                    <EnderecoForm tipo="faturamento" tipoView="Faturamento" />
                    <h3>Endereco de Entrega </h3>
                    {
                        console.log('fields', fields)
                    }
                    { 
                        
                        fields.map((item, index) => {
                            return <EnderecoForm key={index} tipo={`endereco[${index}]`} tipoView="Endereco" />
                        })
                    }
                    <Button type="button" onClick={() => append({ tipo: 'Entrega' })}>
                        Adicionar Endereco
                    </Button>
                    <Button type="submit">
                        Cadastrar
                    </Button>
                </Form>
            </FormProvider>
        </PublicLayout>
    );
};
