import React from 'react';
import styled from 'styled-components';
import ball from '../picture/ball.png';

export default function Nav() {
    return (
        <Container>
            <a href="/">
                <LogoContainer>
                    Sport
                    <LogoImage />
                     Match
                </LogoContainer>
            </a>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    padding: 7px 0px;
    background-color: white;

`;

const LogoImage = styled.div`
    background-image: url(${ball});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 60px;
    width: 60px;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 60px;
    font-family: NFL;
    color: black;
    justify-content: center;
    margin-left: 610px;
`;

