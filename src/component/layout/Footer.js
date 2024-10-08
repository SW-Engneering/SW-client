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
    background-color: rgba(33, 34, 39);
    display: flex;
    width: 100%;
    height: 10vh;
    position: relative;
    bottom: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Navbar = styled.div`
    margin: 10px;
`;
const NavbarText = styled.div`
    margin-bottom: 10px;
    word-spacing: 3px;
    font-size: 13px;
    color: white;
    margin: 10px;
    text-decoration: none;
`;
const Navi = styled(NavLink)`
    word-spacing: 3px;
    font-size: 13px;
    color: white;
    margin: 10px;
    text-decoration: none;
`;
const Divider = styled.span`
    margin: 0 15px;
    color: white;
`;
export default Footer;