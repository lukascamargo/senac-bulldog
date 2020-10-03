import React, { useCallback, useEffect, useState } from 'react';
import BottomNavigationMenu from '../../components/BottomNavigation';
import Header from '../../components/Header';
import {
    Content,
    Container
} from './styles';
import SimplePublicHeader from "../../components/SimplePublicHeader";

type Props = {};

const PublicLayout: React.FC<Props> = ({ children }) => {
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
            { !isMobile ? (<Header />) : (<SimplePublicHeader />) }
            <Container>
                <Content>
                    {children}
                </Content>
            </Container>
        </>
    );
}

export default PublicLayout;
