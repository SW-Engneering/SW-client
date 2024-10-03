import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Nav() {
    return (
        <Container>
            <Navbar>
                <Navi activeClassName="active" exact to="/member">
                    팀원 구하기
                </Navi>
                <Navi activeClassName="active" to="/team">
                    팀 구하기
                </Navi>
                <Navi activeClassName="active" to="/match">
                    팀 매칭하기
                </Navi>
                <Navi activeClassName="active" to="/management">
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
    background-color: #d9d9d9;
`;
const Navbar = styled.div`
    font-size: 13px;
    margin: 8px;
    gap: 5vw;
`;
const Navi = styled(NavLink)`
    word-spacing: 5px;
    color: #000000;
    font-size: 13px;
    margin: 8px;
    text-decoration: none;
    &.active {
        text-decoration: underline;
    }
`;
