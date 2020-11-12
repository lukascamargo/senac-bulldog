import PrivateLayout from '../../shared/layout/PrivateLayout';
import AuthGuard from '../../shared/utils/AuthGuard';
import StockProductList from '../../shared/components/StockProductList';

function LandingPage() {

    return (
        <PrivateLayout>
            <StockProductList />
        </PrivateLayout>
    );
};

export default AuthGuard(LandingPage);