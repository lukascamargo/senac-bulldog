import React from 'react';
import Link from 'next/link';
import { Nav, Navbar } from 'react-bootstrap';
import { ControlCameraOutlined } from '@material-ui/icons';


export default function BottomNavigationMenu() {
    return (
        <>
            <Navbar fixed="bottom" variant="dark" bg="dark" className="justify-content-between align-items-center">
                <Nav className="m-auto justify-content-between align-items-center">
                    <Link href="/admin/produtos">
                        <Nav.Link>Product List</Nav.Link>
                    </Link>
                    <Link href="/admin/usuarios">
                        <Nav.Link>User List</Nav.Link>
                    </Link>
                </Nav>
            </Navbar>
        </>        
    );
}