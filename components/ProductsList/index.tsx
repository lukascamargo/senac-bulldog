import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CreateIcon from '@material-ui/icons/Create';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Produtos } from '../../models/produtos';

interface OwnProps {
    novosProdutos: number;
    editarProduto(produto: Produtos): void;
}

type Props = OwnProps;

export default function ProductsList({ novosProdutos, editarProduto}: Props) {
    const [produtos, setProdutos] = useState<Produtos[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const p = await axios.get('/api/produtos');
            console.log('RESPONSE', p);
            setProdutos(p.data);
        }

        fetchData();
    }, [novosProdutos]);

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
                                {
                                    produto.status ?
                                        (<CheckBoxIcon fontSize="small"/>)
                                        : (<CheckBoxOutlineBlankIcon fontSize="small" />)
                                }
                                <Button size="small" onClick={() => editarProduto(produto)}>
                                    <CreateIcon fontSize="small" />
                                </Button>
                                <Button size="small" onClick={() => {}}>
                                    <QuestionAnswerIcon fontSize="small"/>
                                </Button>
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