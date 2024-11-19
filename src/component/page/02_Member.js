import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import 배너 from "../images/배너.png"
import axios from "axios";

export default function Member() {

    const [MemberList, setMemberList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
    
    useEffect (() => {
        const fetchMemberList = async () => {
            try {
                const response = await axios.get('미구현');
                setMemberList(response.data);
                console.log(MemberList);
            } catch(error) {
                setError("게시물 가져오기 실패");
            }
            
        };
        fetchMemberList();
    });

    const moveToWrite = () => {
        navigate('/memberwrite')
    }


    return(
        <Container>
            <BannerContainer>
                <Image src={배너} alt="배너" />
            </BannerContainer>
            <TitleContainer>
                <TeamContainer>
                    팀원 구하기
                </TeamContainer>
                <SitemapContainer>
                    <a href="/">메인</a>
                    &gt;
                    <strong>팀원 구하기</strong>
                </SitemapContainer>
            </TitleContainer>
            <HeaderContainer>
                    <FirstContainer>글 번호</FirstContainer>
                    <SecondContainer>제목</SecondContainer>
                    <ThirdContainer>작성자</ThirdContainer>
                    <FourthContainer>작성일</FourthContainer>
                    <FifthContainer>조회수</FifthContainer>
            </HeaderContainer>
            <ul>
                {error ? (
                    <ul>{error}</ul>
                ) : MemberList.length === 0 ? (
                    <ul>등록된 게시물이 없습니다.</ul>
                ) : (
                    <PostsList>
                        {MemberList.map((post) => (
                            <PostItem key={post.id}>
                                <PostTitle>{post.title}</PostTitle>
                                <PostContent>{post.content}</PostContent>
                            </PostItem>
                        ))}
                    </PostsList>
                )}
            </ul>
            <WriteButton onClick={moveToWrite}>글쓰기</WriteButton>
        </Container>
        
    );
}

const Container = styled.div`
    justify-content: center;
    align-item: center;
    padding-left: 200px;
    padding-right: 200px;

`;

const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;
`;



const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #cecece; /* 하단 회색 줄 */
`;

const HeaderContainer = styled.div`
    display: flex;
    background-color: #edf3e6;
    border-bottom: 2px solid #cecece; /* 하단 회색 줄 */
    padding: 5px;
`;

const FirstContainer = styled.div` //글번호
    margin-left:10px;
    margin-right: 20px;
`;

const SecondContainer = styled.div` //제목
    margin-left: 300px;
    margin-right: 300px;
`;


const ThirdContainer = styled.div`

    margin-right: 100px;
`;


const FourthContainer = styled.div`

`;


const FifthContainer = styled.div`
    margin-left: 100px;
`;

const TeamContainer = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 10px 0;
`;

const Image = styled.img`
    width: 80%;
    height: auto;
    object-fit: contain;
`;

const SitemapContainer = styled.div`
    font-size: 15px;
    padding: 20px 0; /* 위아래 패딩 추가 */
`;

const PostsList = styled.ul`
    list-style: none;
    padding: 0;
    border-bottom: 0.1px solid grey; /* 하단 회색 줄 */
`;

const PostItem = styled.li`
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px;
`;

const PostTitle = styled.h3`
    margin: 0;
`;

const PostContent = styled.p`
    margin: 5px 0 0;
`;

const WriteButton = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 1000px;

    &:hover {
        background-color: #45a049; /* 호버 시 색상 변경 */
    }
`;