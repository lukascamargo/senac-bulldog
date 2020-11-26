import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import PublicLayout from '../../shared/layout/PublicLayout';
import axios from 'axios';
import { Button, ButtonGroup, FormControl, Image, InputGroup, ListGroup, Table } from 'react-bootstrap';
import CarrinhoHeader from '../../shared/components/CarrinhoHeader';


export default function PrivateHome() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const cookiesProducts = JSON.parse(Cookies.get('produtos'));
    
            console.log(cookiesProducts);
    
            const promise = await cookiesProducts.map(async p => {
                return await buscarInformacoesProduto(p.idproduto, p.quantidade);
            });
            console.log(promise);
            const produtos = await Promise.all(promise);

            console.log(produtos);

            setProdutos(produtos);
        }
        fetchProducts();
    }, []);

    const buscarInformacoesProduto = useCallback(async (idproduto, itens) => {
        const responseProduto = await axios.get(`/api/produto?idproduto=${idproduto}`);

        return {...responseProduto.data.produto[0], imagem: responseProduto.data.image, itens};
    }, []);

    const changeItensQuantity = (idproduto: number, operation: string) => {
        console.log(idproduto, operation);
        const novosProdutos = produtos.map(produto => {
            if (produto.idproduto === idproduto) {
                produto.itens = operation === 'plus' ? (produto.itens + 1) : (produto.itens - 1)
            }
            return produto;
        });
        console.log('Novos', novosProdutos);

        Cookies.set('produtos', JSON.stringify(novosProdutos));
        setProdutos(novosProdutos);
    }

    return (
        <PublicLayout>
            <h3>Carrinho de Compras</h3>
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
                                            <FormControl style={{ width: 5, textAlign: 'center'}} defaultValue={produto.itens} />
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
                                        <Button className="mt-2" style={{ borderRadius: 100 }} variant="outline-dark">
                                            <i className="fas fa-times"></i>
                                        </Button>
                                    </td>
                                </tr>                                
                            );
                        })
                    }
                </tbody>
            </Table>
            
        </PublicLayout>
    );
};
