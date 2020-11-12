import { useState } from 'react';
import Link from 'next/link';

import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

import Login from '../../modals/Login';

import { Brand } from './styles';

const Header = () => {
    const [openLogin, setOpenLogin] = useState<boolean>(false);


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
                        <Link href="/">
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link href="/cliente/cadastro">
                            <Nav.Link href="/cliente/cadastro">Cadastre-se</Nav.Link>
                        </Link>
                        <Link href="/">
                            <Nav.Link href="#link">Login</Nav.Link>
                        </Link>
                        <Nav.Link onClick={handleDialog}>Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Login open={openLogin} handleClose={handleDialog}/>
        </div>
    );
};

export default Header;