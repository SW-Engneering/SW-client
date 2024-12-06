import styled from "styled-components";
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useState } from "react";

export default function InquiryPopup() {
    const [inquiryTitle, setInquiryTitle] = useState('문의테스트'); // 기본 제목
    const [inquiryContent, setInquiryContent] = useState(''); // 문의 내용
    const userId = Cookies.get('userId'); // 쿠키에서 userId 가져오기

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://3.34.133.247/myPage/inquiry', {
                userId: userId, // 쿠키에서 가져온 userId
                inquiryTitle: inquiryTitle, // 문의 제목
                inquiryContent: inquiryContent, // 문의 내용
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`, // 예시로 토큰을 사용
                    'Content-Type': 'application/json', // JSON 형식으로 전송
                }
            });
            console.log('문의 제출 성공:', response.data);
            alert('문의가 제출되었습니다!');
            setInquiryContent(''); // 폼 초기화
        } catch (error) {
            console.error('문의 제출 실패:', error);
            alert('문의 제출에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <Container>
            <TitleContainer>문의 하기</TitleContainer>
            <TextContainer>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                    <Textarea 
                        value={inquiryContent} 
                        onChange={(e) => setInquiryContent(e.target.value)} 
                        placeholder="문의 내용을 입력하세요..." 
                        required 
                    />
                    <Button type="submit">완료</Button>
                </form>
            </TextContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
`;

const TitleContainer = styled.h2`
    text-align: center;
`;

const TextContainer = styled.div`
    margin: 10px auto;
`;

const Textarea = styled.textarea`
    width: 500px;
    height: 100px;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none; /* 크기 조절 비활성화 */
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
