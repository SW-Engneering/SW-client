import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ball from '../picture/ball.png';

export default function Header() {
    return (
        <Container>
            <a href="/">
                <LogoContainer>
                    Sport
                    <LogoImage />
                    Match
                </LogoContainer>
            </a>
            <span>
                <a href="/login">
                    <LoginContainer>로그인</LoginContainer>
                </a>
                <Divider>|</Divider>
                <a href="/signup">
                    <LoginContainer>회원가입</LoginContainer>
                </a>
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

const LogoImage = styled.div`
    background-image: url(${ball});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 40px;
    width: 40px;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 40px;
    font-family: NFL;
    color: white;
`;

const LoginContainer = styled.div`
    font-family: YesGothicM;
    display: inline-block;
    color: white;
    text-align: right;
`;
const Divider = styled.span`
    margin: 0 5px;
    color: white;
`;
