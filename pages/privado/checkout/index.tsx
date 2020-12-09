import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import Router from "next/router";
import PrivateLayout from '../../../shared/layout/PrivateLayout';
import { decode } from '../../../shared/services/token';
import ShoppingCartTable from '../../../shared/components/ShoppingCartTable';
import { Cliente } from '../../../shared/models/cliente';
import { Button, Form } from "react-bootstrap";
import ConfirmarEndereco from "../../../shared/components/ConfirmarEndereco";
import Pagamento from "../../../shared/components/Pagamento";
import { FormProvider, useForm } from "react-hook-form";
import { Endereco } from "../../../shared/models/endereco";
import axios from "axios";

export default function CheckOut() {
    const [cliente, setCliente] = useState<Cliente>();
    const [endereco, setEndereco] = useState<Endereco>();
    const [produtos, setProdutos] = useState();
    const [total, setTotal] = useState();
    const [validarEndereco, setValidarEndereco] = useState<boolean>(false);
    const [validarPagamento, setValidarPagamento] = useState<boolean>(false);

    const methods = useForm();


    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            Router.push('/cliente/login');
        }

        const usuario = decode(token) as Cliente;
        console.log(usuario);
        if(!usuario.idcliente) {
            Router.push('/cliente/login');
        }
        
        setCliente(usuario);
    }, []);

    const onSubmit = async (data) => {
        console.log('Cliente', cliente);
        console.log('Endereco', endereco);
        const carrinho = {
            idcliente: cliente.idcliente,
            status: 'Em Andamento',
            pagamento: data?.nome ? 'Cartão' : 'Boleto',
            idendereco: endereco.idendereco,
            produtos,
            total,
        }
        console.log('Carrinho', carrinho);
        const response = await axios.post('/api/checkout/store', carrinho);
        console.log(response);
    }

    

    if(!cliente) {
        return (
            <PrivateLayout>
                <h3>Ops, algo de errado aconteceu ao buscar seus itens.</h3>
            </PrivateLayout>
        );
    }

    return (
        <PrivateLayout>
            <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <h3>{ cliente?.nome  }, veja seu Carrinho de Compras abaixo.</h3>
                    <ShoppingCartTable retornarDados={(p, t) => (setProdutos(p), setTotal(t))} />
                    {
                        !validarEndereco ? (
                            <>
                                <div style={{textAlign: 'right'}}>
                                    <Button variant="success" onClick={() => setValidarEndereco(!validarEndereco)}>Validar Endereco</Button>
                                </div>
                            </>
                        ) : 
                        (
                            <>
                                <ConfirmarEndereco idcliente={cliente?.idcliente} retornarDados={(e) => setEndereco(e)} />
                            </>
                        )
                    }
                    {
                        !validarEndereco ? 
                            (
                                <></>
                            ) :
                            (
                                !validarPagamento ? 
                                    (<Button variant="success" style={{ marginTop: 15 }} onClick={() => setValidarPagamento(!validarPagamento)}>Pagamento</Button>) :
                                    (
                                        <div style={{ marginTop: 15 }}>
                                            <Pagamento />
                                            <Button variant="success" type="submit">Finalizar Compra</Button>
                                        </div>
                                    )
                            )
                    }
                </Form>
            </FormProvider>
        </PrivateLayout>
    );
};
