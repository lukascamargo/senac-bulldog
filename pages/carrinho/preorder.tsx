import Cookies from 'js-cookie';
import PublicLayout from '../../shared/layout/PublicLayout';
import { Button } from 'react-bootstrap';
import { decode } from '../../shared/services/token';
import { nextRoute } from '../../shared/services/nextroute';
import ShoppingCartTable from '../../shared/components/ShoppingCartTable'


export default function PrivateHome() {    


    const proceedPurchase = () => {
        const token = Cookies.get('token');
        if (!token) {
            nextRoute('/cliente/login');
        }

        const cliente: any = decode(token);

        if (cliente?.idcliente) {
            nextRoute('/privado/checkout');
        } else {
            nextRoute('/cliente/login');
        }
    }

    return (
        <PublicLayout>
            <h3>Carrinho de Compras</h3>
            <ShoppingCartTable />
            <div style={{textAlign: 'right'}}>
                <Button variant="success" onClick={proceedPurchase}>Finalizar Compra</Button>
            </div>
            
        </PublicLayout>
    );
};
