import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [userState, setUserState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 쿠키에서 로그인 상태 확인
        const cookieId = Cookies.get('nickname');
        if (cookieId) {
            setUserState(true);
            navigate(`/`);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 form 제출 동작 방지
        if (id && password) {
            try {
                const response = await axios.post(
                    `http://3.34.133.247:8080/user/login?nickname=${id}&passwd=${password}`, // 실제 API 엔드포인트 추가
                    {
                        nickname: id,
                        passwd: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('로그인 성공:', response.data);
                    Cookies.set('nickname', response.data.nickname, { expires: 14 });
                    navigate('/Home'); // 로그인 후 이동할 경로
                } else {
                    console.log('로그인 실패:', response.data);
                    alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
                }
            } catch (error) {
                console.error('로그인 요청 중 오류 발생:', error);
                alert('로그인 요청 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } else {
            alert('아이디와 비밀번호를 입력해 주세요.');
        }
    };

    return (
        <Container>
            <LoginContainer>로그인</LoginContainer>
            <form onSubmit={handleSubmit}>
                <InputContainer>
                    <IdInput type="text" value={id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <PasswordInput type="password" value={password} placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
                </InputContainer>
                <LoginButton type="submit">로그인</LoginButton>
            </form>
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
