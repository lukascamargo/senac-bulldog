import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Produtos } from '../../models/produtos';

export default function ProductsList() {
    const [produtos, setProdutos] = useState<Produtos[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const p = await axios.get('/api/produtos');
            console.log('RESPONSE', p);
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
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Quantidade</TableCell>
                        <TableCell align="center">Descricao</TableCell>
                        <TableCell align="center">Palavras Chave</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { produtos.map((produto) => (
                        <TableRow key={produto.idproduto}>
                            <TableCell align="center">{produto.nome}</TableCell>
                            <TableCell align="center">{produto.quantidade ? produto.quantidade : 0}</TableCell>
                            <TableCell align="center">{produto.descricao}</TableCell>
                            <TableCell align="center">{produto.palavras_chave}</TableCell>
                            <TableCell align="center">{produto.status ? 'ATIVO' : 'INATIVO'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}