import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const [passwordverify, setPasswordverify] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [sex, setSex] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');

    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault(); // 기본 form 제출 동작 방지
        if (id && password) {
            try {
                const response = await axios.post(
                    'http://3.34.133.247:8080/user/register',
                    {
                        user_name: username,
                        nickname: id,
                        passwd: password,
                        phone_number: phoneNumber,
                        location: location,
                        sex: sex,
                        age: age,
                        position: position,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('회원가입 성공:', response.data);
                    navigate('/Home');
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

    const isPasswordMatch = password === passwordverify;
    const isFormValid = username && id && password && passwordverify && termsAccepted && isPasswordMatch && position;

    return (
        <Container>
            <SignupContainer>회원가입</SignupContainer>
            <InputContainer>
                <UsernameInput type="text" value={username} placeholder="사용자 이름" onChange={(e) => setUsername(e.target.value)} />
            </InputContainer>
            <InputContainer>
                <NickNameInput type="text" value={id} placeholder="아이디" onChange={(e) => setID(e.target.value)} />
            </InputContainer>
            <InputContainer>
                <PasswordInput
                    type="password"
                    value={password}
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                />
            </InputContainer>
            <VerifyInputContainer>
                <PasswordInput
                    type="password"
                    value={passwordverify}
                    placeholder="비밀번호 확인"
                    onChange={(e) => setPasswordverify(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                />
            </VerifyInputContainer>
            <VerifyContainer>
                {password && passwordverify && (isPasswordMatch ? <Message success>비밀번호가 일치합니다.</Message> : <Message error>비밀번호가 일치하지 않습니다.</Message>)}
            </VerifyContainer>
            <PosSelect value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="m">남자</option>
                <option value="w">여자</option>
            </PosSelect>
            <PosSelect value={position} onChange={(e) => setPosition(e.target.value)}>
                <option value="">포지션 선택</option>
                <option value="CF">중앙 공격수(CF)</option>
                <option value="LWF">좌측 윙 포워드(LWF)</option>
                <option value="SS">세컨드 스트라이커(SS)</option>
                <option value="AM">공격형 미드필더(AM)</option>
                <option value="RWF">우측 윙 포워드(RWF)</option>
                <option value="LM">좌측 측면 미드필더(LM)</option>
                <option value="CM">중앙 미드필더(CM)</option>
                <option value="RM">우측 측면 미드필더(RM)</option>
                <option value="DM">수비형 미드필더(DM)</option>
                <option value="LWB">좌측 윙백(LWB)</option>
                <option value="RWB">우측 윙백(RWB)</option>
                <option value="LB">좌측 풀백(LB)</option>
                <option value="CB">중앙 수비수(CB)</option>
                <option value="RB">우측풀백(RB)</option>
                <option value="GK">골키퍼(GK)</option>
            </PosSelect>
            <TermsContainer>
                <Checkbox type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
                <TermsLabel>약관에 동의합니다.</TermsLabel>
            </TermsContainer>
            <SignupButton onClick={handleSignup} disabled={!isFormValid}>
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

const SignupContainer = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`;

const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 15px;
`;
const VerifyInputContainer = styled.div`
    width: 100%;
`;
const UsernameInput = styled.input`
    width: calc(100% - 1px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

const NickNameInput = styled.input`
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

const VerifyContainer = styled.div`
    width: 100%;
    margin: 7.5px 0;
`;

const Message = styled.div`
    color: ${({ success }) => (success ? 'green' : 'red')};
    font-size: 14px;
`;

const TermsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const PosSelect = styled.select`
    width: calc(100% - 1px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
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
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#007bff' : '#0056b3')};
    }
`;
