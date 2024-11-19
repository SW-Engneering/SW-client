import styled from 'styled-components';
import { useState } from 'react';

export default function DefaultPage() {
    const [nickname, setNickname] = useState('user123');
    const [email, setEmail] = useState('user@example.com');
    const [position, setPosition] = useState('골키퍼');
    const [number, setNumber] = useState('010-1234-5678');
    const [detail, setDetail] = useState('안녕하세요. 다막는 골키퍼입니다.');

    return (
        <Container>
            <RowContainer>
                <ColumnTextContainer>
                    <IdTextContainer>닉네임 :&nbsp;</IdTextContainer>
                    <EmailTextContainer>이메일 :&nbsp;</EmailTextContainer>
                    <PosTextContainer>포지션 :&nbsp;</PosTextContainer>
                    <NumTextContainer>휴대폰 번호 :&nbsp;</NumTextContainer>
                    <DetailTextContainer>자기소개 :&nbsp;</DetailTextContainer>
                </ColumnTextContainer>
                <ColumnContainer>
                    <IdContainer>{nickname}</IdContainer>
                    <EmailContainer>{email}</EmailContainer>
                    <PosContainer>{position}</PosContainer>
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
