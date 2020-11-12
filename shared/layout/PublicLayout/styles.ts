import styled from '../../shared/components/BottomNavigation/node_modules/styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 70vh;
    margin-bottom: 32px;
    padding: 16px;

    @media screen and (min-width: 992px) {
        max-width: 600px;
    }
`;