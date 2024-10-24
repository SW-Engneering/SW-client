import styled from "styled-components";
import 배너 from "../images/배너.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // axios 임포트

export default function Team() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]); // 게시물 상태 저장
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const handleWriteClick = () => {
        navigate("/write"); // 글쓰기 페이지로 이동
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://api.example.com/posts"); // API 호출
                setPosts(response.data); // 게시물 데이터 설정
            } catch (error) {
                setError("게시물 가져오기 실패"); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchPosts(); // 게시물 가져오기 호출
    }, []);

    return (
        <Container>
            <BannerContainer>
                <Image src={배너} alt="배너" />
            </BannerContainer>
            <TitleContainer>
                <TeamContainer>
                    팀 구하기
                </TeamContainer>
                <SitemapContainer>
                    <a href="/">메인</a>
                    &gt;
                    <strong>팀 구하기</strong>
                </SitemapContainer>
            </TitleContainer>
            <ContentContainer>
                {loading ? (
                    <LoadingMessage>로딩 중...</LoadingMessage>
                ) : error ? (
                    <ErrorMessage>{error}</ErrorMessage> // 에러 메시지 표시
                ) : posts.length === 0 ? (
                    <NoPostsMessage>등록된 게시물이 없습니다.</NoPostsMessage>
                ) : (
                    <PostsList>
                        {posts.map((post) => (
                            <PostItem key={post.id}>
                                <PostTitle>{post.title}</PostTitle>
                                <PostContent>{post.content}</PostContent>
                            </PostItem>
                        ))}
                    </PostsList>
                )}
            </ContentContainer>
            <WriteButton onClick={handleWriteClick}>
                글쓰기
            </WriteButton>
        </Container>
    );
}

const Container = styled.div`
    justify-content: center;
    align-items: center;
    padding-left: 200px;
    padding-right: 200px;
    position: relative;
`;

const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1px solid grey;
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
    padding: 20px 0;
`;

const ContentContainer = styled.div`
    margin-top: 20px;
`;

const LoadingMessage = styled.div`
    font-size: 18px;
    text-align: center;
`;

const ErrorMessage = styled.div`
    font-size: 18px;
    color: red; /* 에러 메시지 색상 */
    text-align: center;
`;

const NoPostsMessage = styled.div`
    font-size: 18px;
    text-align: center;
`;

const PostsList = styled.ul`
    list-style: none;
    padding: 0;
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
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #45a049;
    }
`;
