import PrivateLayout from '../../layout/PrivateLayout';
import ProductsList from '../../components/ProductsList';
import Link from 'next/link';
import { Button } from '@material-ui/core';


export default function Produto() {

    return (
        <PrivateLayout>
            <Link href="/admin/adicionar-produto" style={{marginTop: 10}}>
                <Button variant="contained" color="primary">Adicionar Produto</Button>
            </Link>
            <ProductsList />
        </PrivateLayout>
    );
};