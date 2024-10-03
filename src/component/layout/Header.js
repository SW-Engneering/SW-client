import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <Container>
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
    justify-content: flex-end; /* 오른쪽 끝으로 배치 */
    align-items: center;
    color: white;
    background-color: black;
    height: 20px;
    font-size: 15px;
    padding: 7px 20px; /* 좌우 패딩 추가 */
    max-width: 100%;
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
