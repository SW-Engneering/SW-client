import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function DefaultPage() {
    const [nickname, setNickname] = useState('user123');
    const [location, setLocation] = useState('user@example.com');
    const [position, setPosition] = useState('골키퍼');
    const [number, setNumber] = useState('010-1234-5678');
    const [detail, setDetail] = useState('안녕하세요. 즐겁게 축구해요.');
    const [id, setId] = useState(null);

    function formatPhoneNumber(phoneNumber){
        if (phoneNumber.length !== 11) {
            return '유효하지 않은 전화번호입니다.';
        }
        const formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
        return formattedNumber;
    }   

    useEffect(() => {
        const cookieId = Cookies.get('userId');
        setId(cookieId ? cookieId : null);
        if (id) {
            fetchUserData(id);
        }
    }, [id]); 

    const fetchUserData = async (id) => {
        try {
            const response = await axios.get(`https://3.34.133.247/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('유저 상세 정보 불러오기 성공:', response.data);
                const { nickname, phone_number, position, location } = response.data;
                setNickname(nickname);
                setNumber(formatPhoneNumber(phone_number));
                setPosition(position);
                setLocation(location)                
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <Container>
            <RowContainer>
                <ColumnTextContainer>
                    <IdTextContainer>닉네임 :&nbsp;</IdTextContainer>
                    <PosTextContainer>포지션 :&nbsp;</PosTextContainer>
                    <EmailTextContainer>주소 :&nbsp;</EmailTextContainer>
                    <NumTextContainer>휴대폰 번호 :&nbsp;</NumTextContainer>
                    <DetailTextContainer>자기소개 :&nbsp;</DetailTextContainer>
                </ColumnTextContainer>
                <ColumnContainer>
                    <IdContainer>{nickname}</IdContainer>
                    <PosContainer>{position}</PosContainer>
                    <EmailContainer>{location}</EmailContainer>
                    <NumContainer>{number}</NumContainer>
                    <DetailContainer>{detail}</DetailContainer>
                </ColumnContainer>
            </RowContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const RowContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const ColumnTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px; /* 간격 조정 */
    align-items: flex-end; /* 모든 div를 오른쪽 정렬 */
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const IdTextContainer = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const IdContainer = styled.div`
    font-size: 16px;
`;

const EmailTextContainer = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const EmailContainer = styled.div`
    font-size: 16px;
`;

const PosTextContainer = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const PosContainer = styled.div`
    font-size: 16px;
`;

const NumTextContainer = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const NumContainer = styled.div`
    font-size: 16px;
`;

const DetailTextContainer = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const DetailContainer = styled.div`
    font-size: 16px;
`;
