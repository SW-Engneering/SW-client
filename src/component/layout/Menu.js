import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Menu() {
    return(
        <Container>
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
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 7px 0px;
    background-color: #d0fc5c;
    border-bottom: 2px solid black; /* 하단 검은색 줄 */
`;

const Navbar = styled.div`
    font-size: 20px;
    margin: 8px;
    gap: 5vw;
`;
const Navi = styled(NavLink)`
    word-spacing: 5px;
    color: #000000;
    font-size: 20px;
    font-family: ${(props) => props.fontFamily || 'inherit'};
    margin: 8px;
    text-decoration: none;
    &.active {
        text-decoration: underline;
    }
`;