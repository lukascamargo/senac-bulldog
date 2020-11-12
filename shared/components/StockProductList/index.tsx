import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Produtos } from '../../models/produtos';
import { FaEdit } from '@fortawesome/fontawesome-free';

interface OwnProps {
    novosProdutos: number;
    editarProduto(produto: Produtos): void;
    editarPerguntas(produto: Produtos): void;
}

type Props = OwnProps;

const StockProductList = () => {
    const [produtos, setProdutos] = useState<Produtos[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const p = await axios.get('/api/produtos');
            setProdutos(p.data);
        }

        fetchData();
    }, []);

    if (produtos.length <= 0) {
        return <h3>Não há nenhum produto cadastrado.</h3>
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Quantidade</TableCell>
                        <TableCell align="center">Valor</TableCell>
                        <TableCell align="center">Descricao</TableCell>
                        <TableCell align="center">Palavras Chave</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { produtos.map((produto) => (
                        <TableRow key={produto.idproduto}>
                            <TableCell align="center">
                                <FaEdit />
                            </TableCell>
                            <TableCell align="center">{produto.nome}</TableCell>
                            <TableCell align="center">{produto.quantidade ? produto.quantidade : 0}</TableCell>
                            <TableCell align="center">{produto.valor}</TableCell>
                            <TableCell align="center">{produto.descricao}</TableCell>
                            <TableCell align="center">{produto.palavras_chave}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default StockProductList;