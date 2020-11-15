import { useState } from 'react';
import Link from 'next/link';

import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';
import Router from "next/router";

import Login from '../../modals/Login';

import { Brand } from './styles';

const Header = () => {
    const [openLogin, setOpenLogin] = useState<boolean>(false);
    const [user, setUser] = useState();

    function getUser() {
        const token = Cookies.get('token');
        console.log("Token", token);
        if (!token) {
            return false;
        }

        const cliente: any = jwt.decode(token);

        if(cliente.nome) {
            setUser(cliente);
        }
        return cliente;
    }

    function logout() {
        Cookies.remove('token');
        Router.push('/cliente/login');
    }

    function goToRoot() {
        Router.push('/');
    }


    const handleDialog = () => {
        setOpenLogin(!openLogin);
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" style={{justifyContent: 'flex-start'}}>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <i className="fas fa-bars"></i>
                </Navbar.Toggle>
                <Navbar.Brand>
                    <Brand>
                        The Bulldog
                    </Brand>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center align-items-center">
                    <Nav className="ml-auto">
                        <Nav.Link onClick={goToRoot}>Home</Nav.Link>
                        {
                            user?.perfil === 'Admin' ? (
                                <>
                                    <Link href="/admin/produtos">
                                        <Nav.Link href="/admin/produtos">Gerenciar Produtos</Nav.Link>
                                    </Link>
                                    <Link href="/admin/usuarios">
                                        <Nav.Link href="/admin/usuarios">Gerenciar Usuarios</Nav.Link>
                                    </Link>
                                </>
                            ) : (<></>)
                        }
                        { 
                        user?.nome || getUser() ? (
                            <>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Link href="/cliente/cadastro">
                                    <Nav.Link href="/cliente/cadastro">Cadastre-se</Nav.Link>
                                </Link>
                                <Link href="/cliente/login">
                                    <Nav.Link href="/cliente/login">Login</Nav.Link>
                                </Link>
                                <Nav.Link onClick={handleDialog}>Admin</Nav.Link>
                            </>
                        ) 
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Login open={openLogin} handleClose={handleDialog}/>
        </div>
    );
};

export default Header;