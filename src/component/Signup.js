import React, { useState } from "react";
import styled from "styled-components";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSignup = () => {
        // 회원가입 처리 로직을 여기에 추가
        console.log("회원가입 시도:", { username, email, password });
    };

    return (
        <Container>
            <SignupContainer>회원가입</SignupContainer>
            <InputContainer>
            <TypeContainer>이름</TypeContainer>
                <UsernameInput
                    type="text"
                    value={username}
                    placeholder="사용자 이름"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </InputContainer>
            <InputContainer>
                <EmailInput
                    type="email"
                    value={email}
                    placeholder="이메일"
                    onChange={(e) => setEmail(e.target.value)}
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
            <TermsContainer>
                <Checkbox 
                    type="checkbox" 
                    checked={termsAccepted} 
                    onChange={() => setTermsAccepted(!termsAccepted)} 
                />
                <TermsLabel>
                    약관에 동의합니다.
                </TermsLabel>
            </TermsContainer>
            <SignupButton 
                onClick={handleSignup} 
                disabled={!termsAccepted}
            >
                회원가입
            </SignupButton>
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

const TypeContainer = styled.div`
    font-size: 15px;
    color:black;
    margin-bottom : 5px;
`;

const SignupContainer = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`;

const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 15px;
`;

const UsernameInput = styled.input`
    width: calc(100% - 1px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

const EmailInput = styled.input`
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

const TermsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const TermsLabel = styled.label`
    font-size: 14px;
`;

const SignupButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? "#007bff" : "#0056b3")};
    }
`;
