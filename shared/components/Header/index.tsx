import { useState } from 'react';
import Link from 'next/link';

import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';
import Router from "next/router";

import Login from '../../modals/Login';

import { Brand } from './styles';
import { Cliente } from '../../models/cliente';
import { User } from '../../models/User';

const Header = () => {
    const [openLogin, setOpenLogin] = useState<boolean>(false);
    const [user, setUser] = useState<Cliente | User>();

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

    function nextRoute(route: string) {
        Router.push(route);
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
                        <Nav.Link onClick={() => nextRoute('/')}>Home</Nav.Link>
                        <Nav.Link onClick={() => nextRoute('/carrinho/preorder')}>Carrinho</Nav.Link>
                        {
                            user?.perfil === 'Admin' ? (
                                <>
                                    <Link href="/admin/produtos">
                                        <Nav.Link href="/admin/produtos">Gerenciar Produtos</Nav.Link>
                                    </Link>
                                    <Link href="/admin/usuarios">
                                        <Nav.Link href="/admin/usuarios">Gerenciar Usuarios</Nav.Link>
                                    </Link>
                                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                                </>
                            ) : (<></>)
                        }
                        {
                            user?.perfil === 'Estoque' ? (
                                <>
                                    <Link href="/estoque">
                                        <Nav.Link href="/estoque">Estoque</Nav.Link>
                                    </Link>
                                    <Link href="/estoque/pedidos">
                                        <Nav.Link href="/estoque/pedidos">Pedidos</Nav.Link>
                                    </Link>
                                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                                </>
                            ) : (<></>)
                        }
                        { 
                        user?.nome || getUser() ? (
                            user?.idcliente ? 
                                (
                                    <>
                                        <NavDropdown title={`${user?.nome} ${user?.sobrenome}`} id="nav-dropdown">
                                            <NavDropdown.Item onClick={() => nextRoute(`/cliente/pedidos/${user?.idcliente}`)}>Meus Pedidos</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => nextRoute(`/cliente/perfil/${user?.idcliente}`)}>Meu Perfil</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => nextRoute(`/cliente/entregas/${user?.idcliente}`)}>Meus Enderecos</NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                                    </>
                                ) :
                                (
                                    <></>
                                )
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