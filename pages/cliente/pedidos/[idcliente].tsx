import axios from "axios";
import { Container } from "next/app";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import PrivateLayout from "../../../shared/layout/PrivateLayout";
import {format} from 'date-fns';
import Link from "next/link";
import { nextRoute } from "../../../shared/services/nextroute";

export default function LandingPage() {
    const [pedidos, setPedidos] = useState();

    const router = useRouter();
    const {idcliente} = router.query;

    useEffect(() => {
        console.log('ID Cliente', idcliente);
        async function fetchPedidos() {
            const response = await axios.get('/api/checkout/findAllByClient', {
                params: {
                    idcliente,
                }
            });

            console.log(response.data);
            setPedidos(response.data);
            
        }

        if(idcliente) {
            fetchPedidos();
        }
    }, []);

    

    
    if(!pedidos || pedidos?.length === 0) {
        return (
            <PrivateLayout>
                <h3>Você ainda não possui pedidos feitos. Compre conosco!</h3>
            </PrivateLayout>
        );
    }

    

    
    return (
        <PrivateLayout>
            <h3>Veja abaixo sua lista de pedidos realizados</h3>
            <Table responsive="sm" style={{marginTop: 5}}>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Pagamento</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Data do Pedido</th>
                        <th>Data de Atualizacao</th>
                    </tr>
                </thead>
                <tbody>
                    { pedidos?.map(pedido => {
                        return (
                            <tr key={pedido.idcarrinho}>
                                <td>
                                    <Button variant="link" onClick={() => nextRoute(`/cliente/pedido/${pedido.idcarrinho}`)}>
                                        {pedido.pedido}
                                    </Button>
                                </td>
                                <td>{pedido.pagamento}</td>
                                <td>R$ {parseFloat(pedido.total).toFixed(2)}</td>
                                <td>{pedido.status}</td>
                                <td>{new Date(pedido.createAt).toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}</td>
                                <td>{new Date(pedido.updateAt).toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}</td>
                            </tr>
                        );
                    }) }
                </tbody>
            </Table>
        </PrivateLayout>
    );
};
