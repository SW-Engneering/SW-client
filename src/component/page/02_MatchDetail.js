import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 팀관리1 from "../images/팀관리1.jpg";
import styled from 'styled-components';
import Cookies from 'js-cookie';

export default function MatchDetail() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state;
    const userId = Cookies.get('userId');
    const nickname = Cookies.get('nickname');
    const [comments, setComments] = useState([]);
    const [writeComment, setWriteComment] = useState('');
    const [teamInfo, setTeamInfo] = useState('');
    const [commentCount, setCommentCount] = useState(post.post_comment_count);

    

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://3.34.133.247/comments?postId=${post.post_id}`);
                const firstData = response.data;

                const commentWithNickname = await Promise.all(firstData.map(async (post) => {
                    const userResponse = await axios.get(`https://3.34.133.247/user/${post.user_id}`);
                    return {
                        ...post,
                        nickname: userResponse.data.nickname// nickname 추가
                    };
                }));
                console.log('불러온 목록: ', commentWithNickname);
                setComments(commentWithNickname);
            } catch(error) {
                console.log('실패');
            } finally {
                console.log('로딩완료');
            }
        };

        const getTeam = async () => {
            try {
                const response = await axios.get(`https://3.34.133.247/user/${post.user_id}`);
                const { team_id } = response.data; 
                
                const secondResponse = await axios.get(`https://3.34.133.247/teams/${team_id}`);
                setTeamInfo(secondResponse.data);
            } catch(error) {
                console.log('에러');
                console.log(teamInfo);
            }
        }

        const fetch = async () => {
            await fetchComments();
            await getTeam();
        }

        fetch();
    }, []);


    const convertNewlinesToBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    const modifyGoGo = () => {
        navigate('/matchwrite', { state : { post }});
    }

    const deleteGoGo = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
            
            if (confirmDelete) {
                try {
                    await axios.delete(`https://3.34.133.247/post/${post.post_id}?userId=${userId}`);
                    alert("삭제되었습니다.");
                    navigate('/match');
                } catch (error) {
                    console.error('삭제 실패:', error); // 에러 로그
                    alert("삭제에 실패했습니다."); // 사용자에게 알림
                }
            } else {
                return; // 삭제 취소 시 아무것도 하지 않음
        }
    };

    const handleCommentChange = (e) => {
        setWriteComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!writeComment.trim()) {
            alert("댓글을 입력해주세요.");
            return;
        }

        try {
            await axios.post(`https://3.34.133.247/comments?postId=${post.post_id}&userId=${userId}`, {
                comment_content: writeComment,
                nickname: nickname,
            });
            alert("댓글이 작성되었습니다.");
            setWriteComment(''); // 댓글 입력란 초기화
            // 댓글 다시 가져오기
            const response = await axios.get(`https://3.34.133.247/comments?postId=${post.post_id}`);
                const firstData = response.data;

                const commentWithNickname = await Promise.all(firstData.map(async (post) => {
                    const userResponse = await axios.get(`https://3.34.133.247/user/${post.user_id}`);
                    return {
                        ...post,
                        nickname: userResponse.data.nickname// nickname 추가
                    };
                }));
                console.log('불러온 목록: ', commentWithNickname);
                setComments(commentWithNickname);
                setCommentCount(commentCount + 1);
        } catch (error) {
            console.error('댓글 작성 실패:', error);
            alert("댓글 작성에 실패했습니다.");
        }
    };

    const CommentDeleteGoGo = async(comment_id) => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if(confirmDelete) {
            try {
                await axios.delete(`https://3.34.133.247/comments/${comment_id}?userId=${userId}`);
                alert("삭제되었습니다.");
                window.location.reload();
            } catch(error) {
                console.log(comments.comment_id, '가 표시가 안되나?');
                console.log('아니면', userId, '가 표시가 안되나?');
                console.log(comments)
            }
        }
        else {
            return;
        }
    }

    const matchGoGo = async (user_id) => {
        const confirm = window.confirm('매칭을 잡으시겠습니까?')
        if(confirm) {
            try {
                const response = await axios.get(`https://3.34.133.247/user/${userId}`);
                const { team_id } = response.data;

                const secondResponse = await axios.get(`https://3.34.133.247/user/${user_id}`);
                const yourTeamId = secondResponse.data.team_id;

                console.log(`Sending request to: https://3.34.133.247/matches?teamId=${team_id}&awayTeamId=${yourTeamId}`);
    
                await axios.post(`https://3.34.133.247/matches?homeTeamId=${team_id}&awayTeamId=${yourTeamId}`, {
                    homeTeamId: team_id,
                    awayTeamId: yourTeamId,
                    matchDate: new Date(),
                    location: 'IT관 114호',
                });
                alert('매칭이 성사되었습니다! \n팀 관리 화면으로 이동합니다.');
                navigate('/management');
    
            } catch(error) {
                alert('이미 타 팀과 매칭이 잡혀있습니다.');
                
            }
        }
        else {
            return;
        }
        
    }

    


    return (
        <Container>
            <BannerContainer>
                <Image src={팀관리1} alt="ㅁㄴㅇㄹ" />
                <OverlayText1>팀 매칭하기</OverlayText1>
                <OverlayText2>같이 한판 하실 분~</OverlayText2>
            </BannerContainer>
            <Padding200>
                <DetailContainer>
                    <Title>{post.post_title}</Title>
                    <Flexbox>
                        <Nick>{post.nickname}</Nick>
                        <CreateTime>작성일: {post.post_created_time.split('T')[0]}</CreateTime>
                        <Hits>조회수: {post.post_hits}</Hits>
                    </Flexbox>
                    <Justbox>
                        <Content>
                            {convertNewlinesToBreaks(post.post_content)}
                            
                        </Content>
                        <TeamInfo>
                                팀명: {teamInfo.teamName}<br/><br/>
                                지역: {teamInfo.teamRegion}<br/>
                                <MatchButton onClick={() => {matchGoGo(post.user_id)}}>
                                    매치 신청하기
                                </MatchButton>
                        </TeamInfo>
                    </Justbox>
                </DetailContainer>
                <SujungDeleteFlexbox>
                    {nickname === post.nickname && ( // 작성자 본인일 때만 버튼 표시
                        <>
                            <Modifybutton onClick={modifyGoGo}>수정</Modifybutton>
                            <Deletebutton onClick={deleteGoGo}>삭제</Deletebutton>
                        </>
                    )}
                </SujungDeleteFlexbox>
                <CommentForm onSubmit={handleCommentSubmit}>
                    <CommentInput 
                        type="text" 
                        value={writeComment} 
                        onChange={handleCommentChange} 
                        placeholder="댓글을 입력하세요..." 
                    />
                    <SubmitButton type="submit">댓글 작성</SubmitButton>
                </CommentForm>
                <CommentCount>댓글 {commentCount}개</CommentCount>
                <CommentsSection>
                    {comments.map((comment) => (
                        <Comment key={comment.comment_id}>
                            <CommentNickname>{comment.nickname} </CommentNickname>
                            <CommentContent>{comment.comment_content}</CommentContent>
                            <CommentinsertTime>{comment.comment_insert_time.split('T')[0]} {comment.comment_insert_time.split('T')[1].split('.')[0]}</CommentinsertTime>
                            {nickname === comment.nickname && ( // 작성자 본인일 때만 버튼 표시
                                <>
                                    <CommentDelete onClick={() => CommentDeleteGoGo(comment.comment_id)}>삭제</CommentDelete>
                                </>
                            )}
                            
                        </Comment>
                    ))}
                </CommentsSection>
            </Padding200>
            
        </Container>
        
    );
}

const DetailContainer = styled.div`
    font-family: 'Pretendard-Light';
    padding-top: 30px;
`;

const Container = styled.div`
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard-Light';
`;

const BannerContainer = styled.div`
    position: relative;
`;

const Image = styled.img`
    align-items: center;
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

const Padding200 = styled.div`
    padding-left: 200px;
    padding-right: 200px;
`;

const Title = styled.div`
    padding-top: 20px;
    text-align: center;
    border-top: 1px solid grey;
    font-size: 45px;
    background-color: #ecedef;
`;

const Nick = styled.div`
    width: 150px;
    text-align: center;
`;

const CreateTime = styled.div`
    width: 150px;
    text-align: center;
`;

const Hits = styled.div`
    width: 150px;
    text-align: center;
`;

const Justbox = styled.div`
    border-bottom: 1px solid black;
    padding-bottom: 30px;
`;

const Content = styled.div`
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 30px;
    padding-bottom: 30px;
    min-height: 50px;
`;

const TeamInfo = styled.div`
    text-align: center;
    width: 300px;
    height: 110px;
    border-radius: 30px;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    padding: 20px 0;
    font-weight: bold;
`;

const MatchButton = styled.button`
    margin-top: 30px;
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.1s ease;
    &:hover {
        transform: translateY(3px);
    }
`;


const Flexbox = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid grey;
    background-color: #ecedef;
`;

const SujungDeleteFlexbox = styled.div`
    display: flex;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
`;

const Modifybutton = styled.div`
    cursor: pointer;
    padding: 10px 30px;
    border: 1px solid black;
    background-color: #ecedef;
`;

const Deletebutton = styled.div`
    cursor: pointer;
    border: 1px solid black;
    padding: 10px 30px;
    background-color: red;
`;

const CommentForm = styled.form`
    display: flex;
    margin-top: 20px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const CommentCount = styled.div`
    font-size: 15px;
    font-weight: bold;
    padding-top: 20px;
`;

const CommentsSection = styled.div`
    
`;

const Comment = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    
`;

const CommentNickname = styled.span`
    font-weight: bold;
    width: 70px;
    overflow: hidden;
`;

const CommentContent = styled.div`
    width: 80%;
`;

const CommentinsertTime = styled.div`
    display: flex;
    font-size: 13px;
`;

const CommentDelete = styled.div`
    font-size: 10px;
    width: 20px;
    text-align: center;
    cursor: pointer;
`;