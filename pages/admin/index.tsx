import PrivateLayout from '../../shared/layout/PrivateLayout';
import AuthGuard from '../../shared/utils/AuthGuard';

function Admin() {

    return (
        <PrivateLayout>
            <h1>Admin page</h1>
        </PrivateLayout>
    );
};

export default AuthGuard(Admin);