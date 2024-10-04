import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [userState, setUserState] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setUserState(true);
        navigate(`/u/${id}`)
        console.log("로그인 시도:", { id, password });
    };
    
    return (
        
        <Container>
            <LoginContainer>로그인</LoginContainer>
            <InputContainer>
                <IdInput
                    type="text"
                    value={id}
                    placeholder="아이디"
                    onChange={(e) => setId(e.target.value)}
                />
            </InputContainer>
            <InputContainer>
                <PasswordInput
                    type="password"
                    value={password}
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value)}
                />
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
    width: calc(100% - 1px);  /* 오른쪽 여백을 추가 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;  /* padding과 border를 포함 */
`;

const PasswordInput = styled.input`
    width: calc(100% - 1px);  /* 오른쪽 여백을 추가 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;  /* padding과 border를 포함 */
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
    margin-bottom:10px;
`;
const Signup = styled.a`
    width:100%;
    color:gray;
    text-align:right;
`;