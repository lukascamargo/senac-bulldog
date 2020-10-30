import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Icon } from '@material-ui/core';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

import { Brand } from './styles';
import Link from 'next/link';

const Header = () => {

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" style={{justifyContent: 'flex-start'}}>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <i className="fas fa-bars"></i>
                </Navbar.Toggle>
                <Navbar.Brand>
                    <Brand>
                        Bulldog
                    </Brand>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center align-items-center">
                    <Nav className="ml-auto">
                        <Link href="/">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Link>
                        <Link href="/">
                            <Nav.Link href="#link">Cadastre-se</Nav.Link>
                        </Link>
                        <Link href="/">
                            <Nav.Link href="#link">Login</Nav.Link>
                        </Link>
                        <Link href="/">
                            <Nav.Link href="#link">Admin</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;