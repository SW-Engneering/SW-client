import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Inquiry() {
    const [inquirys, setInquirys] = useState([]);
    const userId = Cookies.get('userId');

    const handleUpdateProducts = async () => {
        // Open the popup
        window.open(`/InquiryPopup?userId=${userId}`, '문의하기', 'width=600,height=400,scrollbars=yes');
    };

    const InquiryfetchData = async () => {
        try {
            const response = await axios.get(`https://3.34.133.247/myPage/inquiry/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setInquirys(response.data);
            console.log("문의내역 불러오기 성공", response.data);
        } catch (error) {
            console.error("문의내역 불러오기 실패", error);
        }
    };

    useEffect(() => {
        if (userId) {
            InquiryfetchData();
        }
    }, [userId]);

    return (
        <Container>
            {inquirys.length === 0 ? (
                <Message>문의내역이 없습니다.</Message>
            ) : (
                <InquiryList>
                    {inquirys.map((inquiry) => (
                        <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                        <InquiryItem key={inquiry.inquiryId}>
                            <Title>{inquiry.inquiryTitle}</Title>
                            <Content>{inquiry.inquiryContent}</Content>
                            <ResponseStatus>
                                {inquiry.responseExists ? "응답 완료" : "응답 대기 중"}
                            </ResponseStatus>
                        </InquiryItem>
                        </div>
                    ))}
                </InquiryList>
            )}
            <InquiryButton onClick={handleUpdateProducts}>문의하기</InquiryButton>
        </Container>
    );
}

const Container = styled.div`
    width:100%; 
    padding: 20px;
    background-color: #f4f4f4;
    text-align: center;
    align-items: center;
    min-height: 15vh;
    position: relative; /* 부모 요소에 position: relative 추가 */
    box-sizing:border-box;
`;

const Message = styled.div`
    font-size: 18px;
    color: #555;
    margin-top: 50px;
`;

const InquiryList = styled.div`
    margin-top: 20px;
    text-align: left; /* 왼쪽 정렬 */
`;

const InquiryItem = styled.div`
    width:100%; 
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const Content = styled.div`
    font-size: 14px;
    color: #333;
`;

const ResponseStatus = styled.div`
    font-size: 12px;
    color: ${props => props.children === "응답 완료" ? "green" : "red"};
`;

const InquiryButton = styled.div`
    width: 80px;
    height: 40px;
    position: absolute; /* 절대 위치 설정 */
    bottom: 10px; /* 하단에서 10px 떨어진 위치 */
    right: 10px; /* 우측에서 10px 떨어진 위치 */
    background-color: black; /* 버튼 배경색 */
    color: white; /* 버튼 텍스트 색상 */
    display: flex; /* 중앙 정렬을 위한 flex 설정 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    border-radius: 5px; /* 모서리 둥글게 */
    cursor: pointer; /* 커서 포인터로 변경 */
    &:hover {
        background-color: #3f3f3f;
    }
    &:active {
        background-color: #3f3f3f;
    }
`;
