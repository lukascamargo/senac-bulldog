import { useEffect, useState } from 'react';
import axios from 'axios';
import { Produtos } from '../../models/produtos';
import { FaEdit } from '@fortawesome/fontawesome-free';
import { Button, Container, FormControl, InputGroup, Table } from 'react-bootstrap';

const StockProductList = () => {
    const [produtos, setProdutos] = useState<Produtos[]>([]);


    const fetchData = async () => {
        const p = await axios.get('/api/produtos/findAll');
        console.log('Data', p);
        setProdutos(p.data);
    }

    useEffect(() => {
        fetchData();
        console.log(produtos);
    }, []);

    const changeItensQuantity = async (idproduto, operation) => {
        const product = produtos.filter(produto => {
            if (produto.idproduto === idproduto) {
                produto.quantidade = (operation === 'plus') ? (produto.quantidade + 1) : (produto.quantidade - 1)
                return produto;
            }
        });

        const response = await axios.post('/api/produtos/edit', product[0]);
        console.log('Response', response);
        if (response.data) {
            fetchData();
        }
    }

    if (produtos.length <= 0) {
        return <h3>Não há nenhum produto cadastrado.</h3>
    }

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th className="tabela-alinhar-centro"></th>
                        <th className="tabela-alinhar-centro">Nome</th>
                        <th className="tabela-alinhar-centro">Quantidade</th>
                        <th className="tabela-alinhar-centro">Valor</th>
                        <th className="tabela-alinhar-centro">Descricao</th>
                        <th className="tabela-alinhar-centro">Palavras Chave</th>
                    </tr>
                </thead>
                <tbody>
                    { produtos.map((produto) => (
                        <tr key={produto.idproduto}>
                            <td>

                            </td>
                            <td className="tabela-alinhar-centro">{produto.nome}</td>
                            <td className="tabela-alinhar-centro">
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button variant="outline-dark" onClick={() => changeItensQuantity(produto.idproduto, 'minus')}>
                                            <i className="fas fa-minus"></i>
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={{ width: 5, textAlign: 'center'}} value={produto.quantidade} readOnly />
                                    <InputGroup.Prepend>
                                        <Button variant="outline-dark" onClick={() => changeItensQuantity(produto.idproduto, 'plus')}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </td>
                            <td className="tabela-alinhar-centro">{produto.valor}</td>
                            <td className="tabela-alinhar-centro">{produto.descricao}</td>
                            <td className="tabela-alinhar-centro">{produto.palavras_chave}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default StockProductList;