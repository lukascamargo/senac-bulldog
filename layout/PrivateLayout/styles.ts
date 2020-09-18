import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 70vh;
    margin-bottom: 32px;
    padding: 16px;

    @media screen and (min-width: 992px) {
        max-width: 600px;
    }
`;