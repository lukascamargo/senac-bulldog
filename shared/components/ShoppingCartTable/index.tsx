import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, FormControl, Image, InputGroup, ListGroup, Nav, Table } from 'react-bootstrap';
import Link from 'next/link';
import Router from "next/router";
import PublicLayout from '../../layout/PublicLayout';
import { nextRoute } from '../../services/nextroute';

type Props = {
    retornarDados?(produtos, total): void;
}

export default function ShoppingCartTable({retornarDados}: Props) {    
    const [produtos, setProdutos] = useState([]);
    const [change, setChange] = useState(0);
    const [total, setTotal] = useState(0.00);

    useEffect(() => {
        async function fetchProducts() {
            const cookies = Cookies.get('produtos');
    
            if (!cookies) {
                return false;
            }
            const cookiesProducts = JSON.parse(Cookies.get('produtos'));
    
    
            const promise = await cookiesProducts.map(async p => {
                return await buscarInformacoesProduto(p.idproduto, p.quantidade);
            });
            const produtos = await Promise.all(promise);
    
    
            setProdutos(produtos);

        }     
        fetchProducts();
    }, [change]);

    useEffect(() => {
        if(produtos?.length > 0) {
            subTotal();
            
        }
    }, [produtos]);

    useEffect(() => {
        if(produtos?.length > 0 && total != 0 && retornarDados) {
            retornarDados(produtos, total);
        }
    }, [total])

    const buscarInformacoesProduto = useCallback(async (idproduto, itens) => {
        const responseProduto = await axios.get(`/api/produto?idproduto=${idproduto}`);

        return {...responseProduto.data.produto[0], imagem: responseProduto.data.image, itens};
    }, []);

    const changeItensQuantity = (idproduto: number, operation: string) => {
        const cookiesProducts = JSON.parse(Cookies.get('produtos'));
        const novosProdutos = cookiesProducts.map(produto => {
            if (produto.idproduto === idproduto) {
                produto.quantidade = (operation === 'plus') ? (produto.quantidade + 1) : (produto.quantidade - 1)
            }
            return produto;
        });

        Cookies.set('produtos', JSON.stringify(novosProdutos));
        setChange(change + 1);
    }

    const removeItem = (idproduto: number) => {
        const cookiesProducts = JSON.parse(Cookies.get('produtos'));
        const novosProdutos = cookiesProducts.filter(produto => produto.idproduto !== idproduto);

        Cookies.set('produtos', JSON.stringify(novosProdutos));
        setChange(change + 1);
    }

    const subTotal = () => {
        const reducer = produtos?.reduce((acumulator, produto) => Number((acumulator.itens * acumulator.valor)) + Number((produto.itens + produto.valor)));
        setTotal(reducer.idproduto ? reducer.itens * reducer.valor : reducer);
    }

    if (produtos.length === 0) {
        return (
            // <PublicLayout>
                <div className="tabela-alinhar-centro mt-5">
                    <h4>Você ainda não iniciou suas compras.</h4>
                    <Nav.Link onClick={() => nextRoute('/')}>
                        <h6>Clique aqui para ver nossos produtos.</h6>
                    </Nav.Link>
                </div>
            // </PublicLayout>
        );
    }

    return (
        <Table responsive className="mt-4">
            <tbody>
                {
                    produtos?.map((produto) => {
                        return (
                            <tr key={produto.idproduto}>
                                <td className="tabela-alinhar-centro">
                                    <Image 
                                        src={produto.imagem[0] ? `http://localhost:3000/api/produtos/image?file=${produto.imagem[0].nome}` : '/img/no-image-found.png'}
                                        style={{ width: 80, height: 70, border: '1px solid #ccc'}}
                                        rounded
                                    />
                                </td>
                                <td className="tabela-alinhar-centro">
                                    <div>
                                        <p className="lead">
                                            {produto.nome}
                                        </p>
                                        <small className="text-muted">
                                            {produto.descricao}
                                        </small>
                                    </div>
                                </td>
                                <td className="tabela-alinhar-centro">
                                    <p className="mt-3">
                                        R$ {parseFloat(produto.valor.toString()).toFixed(2)}
                                    </p>
                                </td>
                                <td className="tabela-alinhar-centro">
                                    <InputGroup className="mt-3" size="sm">
                                        <InputGroup.Prepend>
                                            <Button variant="outline-dark" onClick={() => changeItensQuantity(produto.idproduto, 'minus')}>
                                                <i className="fas fa-minus"></i>
                                            </Button>
                                        </InputGroup.Prepend>
                                        <FormControl style={{ width: 5, textAlign: 'center'}} value={produto.itens} readOnly />
                                        <InputGroup.Prepend>
                                            <Button variant="outline-dark" onClick={() => changeItensQuantity(produto.idproduto, 'plus')}>
                                                <i className="fas fa-plus"></i>
                                            </Button>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                </td> 
                                <td className="tabela-alinhar-centro">
                                    <p className="mt-3">
                                        R$ {parseFloat((produto.itens * produto.valor).toString()).toFixed(2)}
                                    </p>
                                </td>
                                <td className="tabela-alinhar-centro">
                                    <Button className="mt-2" style={{ borderRadius: 100 }} variant="outline-dark" onClick={() => removeItem(produto.idproduto)}>
                                        <i className="fas fa-times"></i>
                                    </Button>
                                </td>
                            </tr>                                
                        );
                    })
                }
                <tr>
                    <td colSpan={6} style={{ textAlign: 'right' }}>
                        <h3>Subtotal: R$ { parseFloat(total.toString()).toFixed(2) }</h3>
                        
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};
