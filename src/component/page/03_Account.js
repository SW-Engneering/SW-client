import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Account() {
    // 수정할 정보
    const [userName, setUserName] = useState('');
    const [position, setPosition] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');

    // State for form submission and error handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Get user ID from cookies
    const userId = Cookies.get('userId');

    // Fetch current user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://3.34.133.247/user/${userId}`);
                const userData = response.data;

                setUserName(userData.user_name || '');
                setPosition(userData.position || '');
                setPhoneNumber(userData.phone_number || '');
                setLocation(userData.location || '');
            } catch (err) {
                setError('사용자 정보를 불러오는 데 실패했습니다.');
                console.error(err);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.put(`https://3.34.133.247/user/${userId}`, {
                user_name: userName,
                phone_number: phoneNumber,
                location: location,
                position: position,
                password: password, // Note: Be cautious about sending passwords
            });

            setSuccess(true);
            // Optional: Update cookies or local storage with new user info
            Cookies.set('userName', userName);
            console.log('정보수정 완료');
        } catch (err) {
            setError('정보 수정에 실패했습니다. 다시 시도해주세요.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>정보가 성공적으로 수정되었습니다.</SuccessMessage>}

            <form onSubmit={handleSubmit}>
                <LineContainer>
                    <TextContainer>이름</TextContainer>
                    <InputContainer type="text" placeholder="이름을 입력하세요" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </LineContainer>

                <LineContainer>
                    <TextContainer>포지션</TextContainer>
                    <PosSelect value={position} onChange={(e) => setPosition(e.target.value)} required>
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
                </LineContainer>

                <LineContainer>
                    <TextContainer>비밀번호</TextContainer>
                    <InputContainer type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
                </LineContainer>

                <LineContainer>
                    <TextContainer>휴대폰</TextContainer>
                    <InputContainer type="tel" placeholder="전화번호를 입력하세요" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </LineContainer>

                <LineContainer>
                    <TextContainer>지역</TextContainer>
                    <InputContainer type="text" placeholder="지역을 입력하세요" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </LineContainer>

                <ButtonContainer>
                    <SubmitButton type="submit" disabled={isLoading}>
                        {isLoading ? '저장 중...' : '저장'}
                    </SubmitButton>
                </ButtonContainer>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LineContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
`;

const TextContainer = styled.div`
    width: 30%;
    margin-right: 10px;
    font-size: 16px;
    text-align: right;
    color: #333;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #388e3c;
    }
`;

const sharedStyles = `
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #4caf50;
        outline: none;
    }
`;

const InputContainer = styled.input`
    ${sharedStyles}
`;

const PosSelect = styled.select`
    ${sharedStyles}
`;
const ErrorMessage = styled.div`
    background-color: #ffebee;
    color: #d32f2f;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
`;

const SuccessMessage = styled.div`
    background-color: #e8f5e9;
    color: #2e7d32;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
`;
