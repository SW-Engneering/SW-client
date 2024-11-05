import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const [userState, setUserState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 쿠키에서 로그인 상태를 확인
        const cookieId = Cookies.get('userId');
        if (cookieId) {
            setUserState(true);
            navigate(`/`);
        }
    }, [navigate]);

    const handleLogin = () => {
        Cookies.set('userId', id, { expires: 7 }); // 7일 동안 유지
        setUserState(true);
        navigate(`/`);
        console.log('로그인 시도:', { id, password });
    };

    return (
        <Container>
            <LoginContainer>로그인</LoginContainer>
            <InputContainer>
                <IdInput type="text" value={id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
            </InputContainer>
            <InputContainer>
                <PasswordInput type="password" value={password} placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
            </InputContainer>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            <Signup href="/signup">회원가입</Signup>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 20px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LoginContainer = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`;

const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 15px;
`;

const IdInput = styled.input`
    width: calc(100% - 1px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

const PasswordInput = styled.input`
    width: calc(100% - 1px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
    margin-bottom: 10px;
`;

const Signup = styled.a`
    width: 100%;
    color: gray;
    text-align: right;
`;
