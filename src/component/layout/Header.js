import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <Container>
            <a href="/">
                <LogoContainer>SportMatch</LogoContainer>
            </a>
            <span>
            <a href="/login">
                <LoginContainer>로그인</LoginContainer>
            </a>
            <Divider>|</Divider>
            <a href="/signup"><LoginContainer>회원가입</LoginContainer></a>
            </span>
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
    padding: 7px 20px; /* 좌우 패딩 추가 */
    max-width: 100%;
`;

const LogoContainer = styled.div`
    font-size:40px;
    font-family:NFL;
    color: white;
`;

const LoginContainer = styled.div`
    font-family:YesGothicM;
    display:inline-block;
    color: white;
    text-align: right;
`;
const Divider = styled.span`
    margin: 0 5px;
    color: white;
`;