import PrivateLayout from '../../shared/layout/PrivateLayout';
import ProductsList from '../../shared/components/ProductsList';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from "next/router";

export default function PrivateHome() {

    useEffect(() => {
        const token = Cookies.get('token');
        console.log('Privado', token);
        if (!token) {
            Router.push('/cliente/login');
        }
    }, [])

    return (
        <PrivateLayout>
            <h3>Acesso privado para os clientes</h3>
        </PrivateLayout>
    );
};
