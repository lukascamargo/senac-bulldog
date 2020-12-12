import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Image, Row, Table } from "react-bootstrap";
import PrivateLayout from "../../../shared/layout/PrivateLayout";

import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';


export default function LandingPage() {
    const [pedido, setPedido] = useState();
    const [cliente, setCliente] = useState();
    const [usuario, setUsuario] = useState();

    const router = useRouter();
    const {idcarrinho} = router.query;

    async function fetchPedidos() {
        const response = await axios.get('/api/checkout/show', {
            params: {
                idcarrinho,
            }
        });

        console.log(response.data);
        setPedido(response.data);
        
    }

    useEffect(() => {
        console.log('ID Carrinho', idcarrinho);
        if(idcarrinho) {
            fetchPedidos();
        }
    }, []);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log("Token", token);

        const usuario: any = jwt.decode(token);

        if(usuario.perfil) {
            setUsuario(usuario);
        }
    }, []);

    useEffect(() => {
        async function fetchUsuario() {
            const response = await axios.get('/api/clientes/show', {
                params: {
                    idcliente: pedido?.idcliente,
                }
            });

            setCliente(response.data);
            
        }

        if(pedido?.idcliente) {
            fetchUsuario();
        }
    }, [pedido]);
    
    const concluirCompra = async (novoStatus) => {
        const response = await axios.put('/api/checkout/changeStatus', {
            idcarrinho: pedido?.idcarrinho,
            produtos: pedido?.itens,
            novoStatus,
        });

        if (response.data) {
            fetchPedidos();
        }
    }

    if(!pedido) {
        return (
            <PrivateLayout>
                <h3>Este pedido não existe</h3>
            </PrivateLayout>
        );
    }

    

    
    return (
        <PrivateLayout>
            <h2>Pedido {pedido?.pedido} - {cliente?.nome} {cliente?.sobrenome}</h2>
            <p>Pagamento: {pedido?.pagamento}</p>
            <p>Status: {pedido?.status}</p>
            <p>Data do Pedido: {new Date(pedido?.createAt).toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
            </p>
            <p>Data de Atualizacao do Pedido: {new Date(pedido?.updateAt).toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
            </p>
            <Card style={{ width: `100%`}}>
                <Card.Title className="tabela-alinhar-centro">
                    <h4>Produtos</h4>
                </Card.Title>
                <Card.Body>
                    <Table responsive="sm" style={{marginTop: 5}}>
                        <thead>
                            <tr>
                                <th colSpan={2}>Produto</th>
                                <th>Quantidade</th>
                                <th>Unitário</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { pedido?.itens.map(item => {
                                return (
                                    <tr key={item.idproduto}>
                                        <td className="tabela-alinhar-centro">
                                            <Image
                                                src={item?.imagem[0] ? `http://localhost:3000/api/produtos/image?file=${item.imagem[0].nome}` : '/img/no-image-found.png'}
                                                style={{ width: 80, height: 70, border: '1px solid #ccc'}}
                                                rounded
                                            />
                                        </td>
                                        <td className="tabela-alinhar-centro">
                                            <div>
                                                <p className="lead">
                                                    {item.nome}
                                                </p>
                                                <small className="text-muted">
                                                    {item.descricao}
                                                </small>
                                            </div>
                                        </td>
                                        <td className="tabela-alinhar-centro">
                                            {item.itens}
                                        </td>
                                        <td className="tabela-alinhar-centro">
                                            <p className="mt-3">
                                                R$ {parseFloat(item.valor.toString()).toFixed(2)}
                                            </p>
                                        </td>
                                        <td className="tabela-alinhar-centro">
                                            <p className="mt-3">
                                                R$ {parseFloat((item.itens * item.valor).toString()).toFixed(2)}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'right' }}>
                                    <h3>Total: R$ { parseFloat(pedido?.total.toString()).toFixed(2) }</h3>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Card style={{marginTop: '3em', marginBottom: '3em'}}>
                <Card.Header>{ pedido?.logradouro }, { pedido?.numero }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        CEP: { pedido?.cep } - Complemento: { pedido?.complemento }
                    </Card.Text>
                    <Card.Text>
                        { pedido?.cidade } - { pedido?.estado } [ { pedido?.pais } ]
                    </Card.Text>
                </Card.Body>
            </Card>
            { usuario?.perfil && pedido.status === 'Em Andamento' ? (
                <>
                    <Button variant="danger" size="lg" block onClick={() => concluirCompra('cancelado')}>
                        Cancelar Compra
                    </Button>
                    <Button variant="success" size="lg" block onClick={() => concluirCompra('aprovado')}>
                        Aprovar Compra
                    </Button>
                </>
            ) : (<></>)}
        </PrivateLayout>
    );
};
