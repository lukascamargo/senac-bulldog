import React, { useCallback, useEffect, useState } from 'react';
import BottomNavigationMenu from '../../components/BottomNavigation';
import Header from '../../components/Header';
import {
    Content,
} from './styles';
import SimplePublicHeader from "../../components/SimplePublicHeader";
import { Container } from 'react-bootstrap';
import { nextRoute } from '../../services/nextroute';

type Props = {};

const PublicLayout: React.FC<Props> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>();
    
    const handleSizeChange = useCallback(() => setIsMobile(window.innerWidth < 992), [setIsMobile]);
    
    // useEffect(() => {
    //     console.log(isMobile)
    //     if(!isMobile) {
    //         setIsMobile(window.innerWidth < 992)
    //     }
    // }, [isMobile]);

    // useEffect(() => {
    //     window.addEventListener('resize', handleSizeChange);

    //     return () => window.removeEventListener('resize', handleSizeChange);
    // }, [handleSizeChange]);

    

    return (
        <div style={{minHeight: '100vh'}}>
            <Header />
            <Container style={{ marginBottom: '1em'}}>
                {children}
            </Container>
        </div>
    );
}

export default PublicLayout;
