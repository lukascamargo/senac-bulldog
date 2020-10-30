import React, { useCallback, useEffect, useState } from 'react';
import BottomNavigationMenu from '../../components/BottomNavigation';
import Header from '../../components/Header';
import SimpleHeader from '../../components/SimpleHeader';
import {
    Content,
    Container
} from './styles';

type Props = {};

const PrivateLayout: React.FC<Props> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>();
    
    const handleSizeChange = useCallback(() => setIsMobile(window.innerWidth < 992), [setIsMobile]);
    
    useEffect(() => {
        console.log(isMobile)
        if(!isMobile) {
            setIsMobile(window.innerWidth < 992)
        }
    }, [isMobile]);

    useEffect(() => {
        window.addEventListener('resize', handleSizeChange);

        return () => window.removeEventListener('resize', handleSizeChange);
    }, [handleSizeChange]);

    

    return (
        <>
            <Header />
            <Container>
                <Content>
                    {children}
                </Content>
            </Container>
            { isMobile ? (<BottomNavigationMenu />) : ''}
        </>
    );
}

export default PrivateLayout;