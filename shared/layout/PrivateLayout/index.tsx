import jwt from 'jsonwebtoken';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BottomNavigationMenu from '../../components/BottomNavigation';
import Header from '../../components/Header';
import SimpleHeader from '../../components/SimpleHeader';
import { nextRoute } from '../../services/nextroute';

type Props = {};

const PrivateLayout: React.FC<Props> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>();
    
    const handleSizeChange = useCallback(() => setIsMobile(window.innerWidth < 992), [setIsMobile]);
    
    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (!token) {
    //         Router.push('/')
    //     }

    // }, []);

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
        <>
            <Header />
            <Container style={{ marginBottom: '1em'}}>
                {children}
            </Container>
            {/* { isMobile ? (<BottomNavigationMenu />) : ''} */}
        </>
    );
}

export default PrivateLayout;