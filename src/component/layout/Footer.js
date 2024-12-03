import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

function Footer() {
    return (
        <Container>
            <Navbar>
                <Navi activeClassName="active" exact to="/terms">
                    서비스 이용 약관
                </Navi>
                <Divider>|</Divider>
                <Navi activeClassName="active" to="/privacy">
                    개인정보 취급 방침
                </Navi>
                <Divider>|</Divider>
                <Navi activeClassName="active" to="/contact">
                    제휴문의
                </Navi>
                <Divider>|</Divider>
                <Navi activeClassName="active" to="/support">
                    고객센터
                </Navi>
                <Divider>|</Divider>
                <Navi activeClassName="active" to="/jobs">
                    채용
                </Navi>
            </Navbar>
            <NavbarText>&nbsp;소프트웨어 공학 프로젝트</NavbarText>
        </Container>
    );
}

const Container = styled.div`
    border-top: 2px solid #ecedef;
    margin-top: 30px;
    margin-bottom: 50px;
    background-color: white;
    display: flex;
    width: 100%;
    height: 8vh;
    position: relative;
    bottom: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding:3px;
`;
const Navbar = styled.div`
    margin-top: 30px;
`;
const NavbarText = styled.div`
    margin-bottom: 10px;
    word-spacing: 3px;
    font-size: 13px;
    color: black;
    margin-top: 30px;
    text-decoration: none;
`;
const Navi = styled(NavLink)`
    word-spacing: 3px;
    font-size: 13px;
    color: black;
    margin: 10px;
    text-decoration: none;
`;
const Divider = styled.span`
    margin: 0 15px;
    color: black;
`;
export default Footer;
