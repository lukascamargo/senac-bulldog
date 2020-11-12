import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CreateIcon from '@material-ui/icons/Create';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Produtos } from '../../models/produtos';
import ProductListMenu from "../ProductListMenu";
import { User } from '../../models/user';
import UserListMenu from '../UserListMenu';

interface OwnProps {
    newUsers: number;
    editUser(user: User): void;
}

type Props = OwnProps;

export default function UserList({ newUsers, editUser }: Props) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const u = await axios.get('/api/users');
            console.log('RESPONSE', u);
            setUsers(u.data);
        }

        fetchData();
    }, [newUsers]);

    if (users.length <= 0) {
        return <h3>Não há nenhum usuário cadastrado.</h3>
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Sobrenome</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">E-mail</TableCell>
                        <TableCell align="center">Perfil</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { users.map((user) => (
                        <TableRow key={user.idusuario}>
                            <TableCell align="center">
                                <UserListMenu
                                    user={user}
                                    editarUsuario={() => editUser(user)}
                                />
                            </TableCell>
                            <TableCell align="center">{user.nome}</TableCell>
                            <TableCell align="center">{user.sobrenome}</TableCell>
                            <TableCell align="center">{user.cpf}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.perfil}</TableCell>
                            <TableCell align="center">{user.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}