import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ball from '../images/ball.png';

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
            <Navbar>
                <Navi activeClassName="active" exact to="/member" fontFamily="Boa">
                    팀원 구하기
                </Navi>
                <Navi activeClassName="active" to="/team" fontFamily="Boa">
                    팀 구하기
                </Navi>
                <Navi activeClassName="active" to="/match" fontFamily="Boa">
                    팀 매칭하기
                </Navi>
                <Navi activeClassName="active" to="/management" fontFamily="Boa">
                    팀 관리
                </Navi>
            </Navbar>
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
    border-bottom: 2px solid black; /* 하단 검은색 줄 */

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
    margin-left: 40px;
`;

const Navbar = styled.div`
    font-size: 20px;
    margin: 5px;
    margin-left: 100px;
    gap: 5vw;
`;
const Navi = styled(NavLink)`
    word-spacing: 5px;
    color: #000000;
    font-size: 15px;
    font-family: ${(props) => props.fontFamily || 'inherit'};
    margin: 50px;
    text-decoration: none;
    &.active {
        text-decoration: underline;
    }
`;

