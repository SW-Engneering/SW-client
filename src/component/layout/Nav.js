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
                <NaviContainer>
                    <Navi activeClassName="active" exact to="/member">
                        팀원 구하기
                    </Navi>
                </NaviContainer>
                <NaviContainer>
                    <Navi activeClassName="active" to="/team">
                        팀 구하기
                    </Navi>
                </NaviContainer>
                <NaviContainer>
                    <Navi activeClassName="active" to="/match">
                        팀 매칭하기
                    </Navi>
                </NaviContainer>
                <NaviContainer>
                    <Navi activeClassName="active" to="/management">
                        팀 관리
                    </Navi>
                </NaviContainer>
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
    border-bottom: 0.1px solid grey; /* 하단 회색 줄 */

`;

const LogoImage = styled.div`
    background-image: url(${ball});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 50px;
    width: 50px;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 50px;
    font-family: NFL;
    color: black;
    justify-content: center;
    margin-left: 220px;
`;

const Navbar = styled.div`
    font-size: 20px;
    margin-left: 100px;
    gap: 5vw;
`;

const NaviContainer = styled.div`
    display: flex;
    gap: 5vw;
`;

const Navi = styled(NavLink)`
    word-spacing: 5px;
    color: #000000;
    font-size: 15px;
    font-family: ${(props) => props.fontFamily || 'inherit'};
    margin: 30px;
    text-decoration: none;
    
     &:hover {
        color: blue; /* 마우스 오버 시 글자 색상 */
        text-decoration: underline; /* 마우스 오버 시 밑줄 추가 */
    }

    &.active {
        color: blue;
        text-decoration: underline; /* 활성화된 링크에 밑줄 추가 */
    }
`;

