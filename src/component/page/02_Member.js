import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import 팀관리1 from "../images/팀관리1.jpg";
import axios from "axios";
import Cookies from "js-cookie";
import starFill from "../images/starfill.png";
import starEmpty from "../images/starempty.png";

export default function Member() {
    const [MemberList, setMemberList] = useState([]);
    const [filteredMemberList, setFilteredMemberList] = useState([]); // 필터링된 팀 목록
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const postsPerPage = 10; // 페이지당 게시글 수
    const navigate = useNavigate();
    const userId = Cookies.get('userId');


    useEffect(() => {
        const fetchMemberList = async () => {
            try {
                const response = await axios.get('https://3.34.133.247/member');
                const sortedMemberList = response.data.sort((a, b) => b.post_id - a.post_id); // 내림차순 정렬

                // 각 게시물에 대해 작성자의 nickname을 가져오는 API를 호출
                const memberWithNicknames = await Promise.all(sortedMemberList.map(async (post) => {
                    const userResponse = await axios.get(`https://3.34.133.247/user/${post.user_id}`);
                    if(userId) {
                        const bookmarkResponse = await axios.get(`https://3.34.133.247/bookmarks?userId=${userId}&postId=${post.post_id}`);
                        return {
                            ...post,
                            nickname: userResponse.data.nickname, // nickname 추가
                            isFavorite: bookmarkResponse.data.isBookmarked || false
                        };
                    }
                    else {
                        return {
                            ...post,
                            nickname: userResponse.data.nickname // nickname 추가
                        };
                    }
                    
                }));
                console.log('불러온 목록: ', memberWithNicknames);
                setMemberList(memberWithNicknames);
                setFilteredMemberList(memberWithNicknames);
            } catch (error) {
                setError("게시물 가져오기 실패");
            } finally {
                console.log("게시물 로딩 완료");
            }
        };

        fetchMemberList();
    }, []);

    const moveToWrite = () => {
        const nickname = Cookies.get("nickname");
        if (!nickname) {
            alert("로그인이 필요한 기능입니다.");
        } else {
            navigate("/memberwrite");
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredMemberList.slice(indexOfFirstPost, indexOfLastPost);

    const memberDetail = (post_id, post) => {
        navigate(`/member/${post_id}`, { state: { post } });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatTime = (number) => {
        return number.toString().padStart(2, '0'); // 2자리로 포맷팅
    };

    const totalPages = Math.ceil(filteredMemberList.length / postsPerPage);

    const toggleBookmark = async (postId, currentState) => {
        if(userId) {
            try {
                console.log(currentState);
        
                const response = await axios.post(
                    `https://3.34.133.247/bookmarks?userId=${userId}&postId=${postId}`,
                    { userId, postId },
                    { headers: { accept: "/" } }
                );
        
                if (response.status === 201) {
                    // 북마크 상태 업데이트
                    setFilteredMemberList((prevList) =>
                        prevList.map((item) =>
                            item.post_id === postId
                                ? { ...item, isFavorite: !currentState } // 현재 상태를 반전
                                : item
                        )
                    );
                    alert('즐겨찾기에 등록되었습니다.');
                    console.log(currentState);
                }
            } catch (error) {
                alert('이미 즐겨찾기에 등록되어있는 글입니다.');
                console.error("Bookmark toggle error:", error);
            }
        }
        else {
            alert('로그인이 필요합니다.');
        }
    };

    const goToSearch = () => {
        if (searchTerm.trim()) {
            const filteredPosts = MemberList.filter(post => post.nickname.includes(searchTerm));
            setFilteredMemberList(filteredPosts);
            setCurrentPage(1); // 검색 후 첫 페이지로 이동
        } else {
            setFilteredMemberList(MemberList); // 검색어가 없으면 전체 게시물 표시
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            goToSearch();
        }
    };

    return (
        <Container>
            <BannerContainer>
                <Image src={팀관리1} alt="팀관리" />
                <OverlayText1>팀원 구하기</OverlayText1>
                <OverlayText2>같이 축구하실 분~</OverlayText2>
            </BannerContainer>
            <Padding200>
                <TitleContainer>
                    <TeamContainer>팀원 구하기</TeamContainer>
                    <SitemapContainer>
                        <a href="/">메인 </a>
                        &gt;
                        <strong> 팀원 구하기</strong>
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
                        <ul>등록된 게시물이 없습니다.</ul>
                    ) : (
                        <PostsList>
                            {currentPosts.map((post) => {
                                const createdTime = new Date(post.post_created_time); // 날짜 객체로 변환
                                const currentDate = new Date(); // 현재 날짜 객체
                                const isToday = createdTime.toDateString() === currentDate.toDateString(); // 오늘인지 확인

                                return (
                                    <PostItem key={post.post_id}>
                                        <BookmarkButton
                                            $isFavorite={post.isFavorite}
                                            onClick={() => toggleBookmark(post.post_id, post.isFavorite)}
                                        />
                                        <PostId>{post.post_id}</PostId>
                                        <PostTitle onClick={() => memberDetail(post.post_id, post)}>
                                            {post.post_title}
                                            {post.post_comment_count > 0 && ` [${post.post_comment_count}]`}
                                        </PostTitle>
                                        <PostUserId>{post.nickname}</PostUserId>
                                        <PostCreateTime>
                                            {isToday 
                                                ? `${formatTime(createdTime.getHours())}:${formatTime(createdTime.getMinutes())}`
                                                : createdTime.toISOString().split('T')[0]
                                            }
                                        </PostCreateTime>
                                        <PostHits>{post.post_hits}</PostHits>
                                    </PostItem>
                                );
                            })}
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
                <Search>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="작성자를 입력하세요"
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={goToSearch}>검색</button>
                </Search>
                <WriteButton onClick={moveToWrite}>글쓰기</WriteButton>
            </Padding200>
        </Container>
    );
}

// ... styled-components 정의 그대로 유지


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

const Search = styled.div`
    display: flex;
    
    justify-content: center;
    gap: 10px;
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

const BookmarkButton = styled.div`
    width: 18px;
    height: 18px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    background-image: url(${props => (props.$isFavorite ? starFill : starEmpty)});
`;