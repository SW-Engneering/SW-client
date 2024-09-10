import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <Container>
            <a href="/">
                <LogoContainer>SportMatch(로고)</LogoContainer>
            </a>
            <a href="/login">
                <LoginContainer>로그인 | 회원가입</LoginContainer>
            </a>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between; /* 양쪽 끝으로 배치 */
    align-items: center;
    color: white;
    background-color: black;
    height: 50px;
    font-size: 20px;
    padding: 7px 15px; /* 좌우 패딩 추가 */
    max-width: 100%;
`;

const LogoContainer = styled.div`
    color: white;
`;

const LoginContainer = styled.div`
    color: white;
    text-align: right;
`;

