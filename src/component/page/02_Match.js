import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import 팀관리1 from "../images/팀관리1.jpg";
import axios from "axios";
import Cookies from "js-cookie";

export default function Match() {

    const [MatchList, setMatchList] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const postsPerPage = 10; // 페이지당 게시글 수
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const fetchMatchList = async () => {
            try {
                const response = await axios.get('https://3.34.133.247/match');
                const sortedMatchList = response.data.sort((a, b) => b.post_id - a.post_id); // 내림차순 정렬

                // 각 게시물에 대해 작성자의 nickname을 가져오는 API를 호출
                const matchWithNicknames = await Promise.all(sortedMatchList.map(async (post) => {
                    const userResponse = await axios.get(`https://3.34.133.247/user/${post.user_id}`);
                    return {
                        ...post,
                        nickname: userResponse.data.nickname// nickname 추가
                    };
                }));
                console.log('불러온 목록: ', matchWithNicknames);
                setMatchList(matchWithNicknames);
            } catch (error) {
                setError("게시물 가져오기 실패");
            } finally {
                console.log("게시물 로딩 완료");
            }
        };

        fetchMatchList();
    }, []);

    const moveToWrite = () => {
        const nickname = Cookies.get('nickname')

        if(!nickname) {
            alert('로그인 안하면 글 못씁니다.');
        }
        else {
            navigate('/matchwrite');
        }
        
    };

    // 페이지네이션에 따른 현재 페이지의 게시글 가져오기
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = MatchList.slice(indexOfFirstPost, indexOfLastPost);

    const matchDetail = async (post_id, post) => {
        navigate(`/match/${post_id}`, { state: { post } } );
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(MatchList.length / postsPerPage);

    return(
        <Container>
            <BannerContainer>
                <Image src={팀관리1} alt="ㅁㄴㅇㄹ" />
                <OverlayText1>팀 매칭하기</OverlayText1>
                <OverlayText2>팀을 만들었으면 경기를 해야지~</OverlayText2>
            </BannerContainer>
            <Padding200>
                <TitleContainer>
                    <TeamContainer>
                        팀 매칭하기
                    </TeamContainer>
                    <SitemapContainer>
                        <a href="/">메인 </a>
                        &gt;
                        <strong> 팀 매칭하기</strong>
                    </SitemapContainer>
                </TitleContainer>
                <HeaderContainer>
                    <FirstContainer>글 번호</FirstContainer>
                    <SecondContainer>제목</SecondContainer>
                    <ThirdContainer>작성자</ThirdContainer>
                    <FourthContainer>작성일</FourthContainer>
                    <FifthContainer>조회수</FifthContainer>
                </HeaderContainer>
                <div>
                    {error ? (
                        <ul>{error}</ul>
                    ) : currentPosts.length === 0 ? (
                        <NoPostBox>
                            <NoPost>등록된 게시물이 없습니다.</NoPost>
                        </NoPostBox>
                    ) : (
                        <PostsList>
                            {currentPosts.map((post) => (
                                <PostItem key={post.post_id}>
                                    <PostId>{post.post_id}</PostId>
                                    <PostTitle onClick={() => matchDetail(post.post_id, post)}>
                                        {post.post_title}{post.post_comment_count > 0 && ` [${post.post_comment_count}]`}
                                    </PostTitle>
                                    <PostUserId>{post.nickname}</PostUserId>
                                    <PostCreateTime>{post.post_created_time.split('T')[0]}</PostCreateTime>
                                    <PostHits>{post.post_hits}</PostHits>
                                </PostItem>
                            ))}
                        </PostsList>
                    )}
                </div>
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PageButton key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </PageButton>
                    ))}
                </Pagination>
                <WriteButton onClick={moveToWrite}>글쓰기</WriteButton>
            </Padding200>
        </Container>
        
    );
}

const Container = styled.div`
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard-Light';

`;

const BannerContainer = styled.div`
    position: relative;
`;

const Padding200 = styled.div`
    padding-left: 200px;
    padding-right: 200px;
`;



const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #cecece; /* 하단 회색 줄 */
    margin-top: 30px;
`;

const HeaderContainer = styled.div`
    display: flex;
    background-color: #edf3e6;
    border-bottom: 2px solid #cecece; /* 하단 회색 줄 */
    padding: 5px;
    font-weight: bold;
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
    margin-left: 17px;
    margin-right: 100px;
`;


const FourthContainer = styled.div`

`;


const FifthContainer = styled.div`
    margin-left: 107px;
`;

const TeamContainer = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 10px 0;
`;

const Image = styled.img`
    width: 100%;
`;

const OverlayText1 = styled.div`
    position: absolute; /* 절대 위치 지정 */
    top: 30%; /* 수직 중앙 정렬 */
    left: 50%; /* 수평 중앙 정렬 */
    transform: translate(-50%, -50%); /* 중앙으로 이동 */
    color: white; /* 텍스트 색상 */
    font-size: 40px; /* 텍스트 크기 */
    font-weight: bold; /* 텍스트 두께 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 */
`;

const OverlayText2 = styled.div`
    position: absolute; /* 절대 위치 지정 */
    top: 70%;
    left: 50%; /* 수평 중앙 정렬 */
    transform: translate(-50%, -50%); /* 중앙으로 이동 */
    color: white; /* 텍스트 색상 */
    font-size: 20px; /* 텍스트 크기 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 */
`;

const SitemapContainer = styled.div`
    font-size: 15px;
    padding: 20px 0; /* 위아래 패딩 추가 */
`;

const NoPostBox = styled.div`
    display: flex;
    height: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const NoPost = styled.div`
    
    font-size: 40px;
    font-weight: bold;
    
`;

const PostsList = styled.div`
    list-style: none;
    padding: 0;
    border-bottom: 0.1px solid grey; /* 하단 회색 줄 */
    text-align: center;
    font-size: 15px;
`;

const PostItem = styled.div`
    border: 1px solid #ddd;
    border-right: 1px solid white;
    border-left: 1px solid white;
    
    padding: 10px;
    display: flex;
`;

const PostId = styled.div`
    width: 50px;
`;

const PostTitle = styled.div`
    width: 536px;
    margin-left: 60px;
    text-align: left;
    cursor: pointer;
`;

const PostUserId = styled.div`
    
    width: 100px;
    margin-left: 38px;
`;

const PostCreateTime = styled.div`
    
    margin-left: 10px;
    width: 160px;
`;

const PostHits = styled.div`
    width: 110px;
    margin-left: 17px;
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const PageButton = styled.button`
    margin: 0 5px;
    padding: 10px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:hover {
        background-color: #ddd;
    }
`;