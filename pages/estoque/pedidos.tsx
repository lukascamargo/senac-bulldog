import axios from "axios";
import { Container } from "next/app";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import {format} from 'date-fns';
import Link from "next/link";
import AuthGuard from "../../shared/utils/AuthGuard";
import PrivateLayout from "../../shared/layout/PrivateLayout";
import { nextRoute } from "../../shared/services/nextroute";

function LandingPage() {
    const [pedidos, setPedidos] = useState();

    useEffect(() => {
        async function fetchPedidos() {
            const response = await axios.get('/api/checkout/findAll');

            console.log(response.data);
            setPedidos(response.data);
            
        }

        fetchPedidos();
    }, []);

    

    
    if(!pedidos || pedidos?.length === 0) {
        return (
            <PrivateLayout>
                <h3>Ainda não existe pedidos em nossa base</h3>
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
                        <th>Comprador</th>
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
                                <td>
                                    {pedido.nome} - {pedido.sobrenome}
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

export default AuthGuard(LandingPage);