import PrivateLayout from '../../layout/PrivateLayout';
import ProductsList from '../../components/AdminProductsList';
import { useState } from 'react';
import { User } from '../../models/user';
import { Button } from '@material-ui/core';
import UserList from '../../components/AdminUserList';
import ManterUsuario from './adicionar-usuario';

export default function Usuarios() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [createdUsers, setCreatedUsers] = useState<number>(0);

    const handleDialog = () => {
        if (openDialog) {
            setUser(undefined as User);
        }
        setOpenDialog(!openDialog);
    }

    const editUser = (parameter: User) => {
        console.log(parameter);
        setUser(parameter);
        handleDialog();
    }

    const updateUsersList = () => {
        handleDialog();
        setCreatedUsers(createdUsers + 1);
    }

    return (
        <PrivateLayout>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDialog}
            >
                Criar Usuario
            </Button>
            <UserList newUsers={createdUsers} editUser={editUser}/> 
            <ManterUsuario open={openDialog} handleClose={handleDialog} handleSaveUser={updateUsersList} editUser={user}/>
        </PrivateLayout>
    );
};
