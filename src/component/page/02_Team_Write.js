import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import 배너 from "../images/배너.png";
import styled from "styled-components";
import Cookies from "js-cookie";

export default function MemberWrite() {
    const userId = Cookies.get('userId');
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state || {}; // 수정할 포스트 정보

    const [write, setWrite] = useState({
        post_id: post ? post.post_id : 0,
        user_id: userId,
        post_type: "member",
        post_writer: userId,
        post_title: post ? post.post_title : "",
        post_content: post ? post.post_content : "",
        post_hits: post ? post.post_hits: 0,
        post_created_time: post ? post.post_created_time : new Date().toISOString(),
        post_updated_time: new Date().toISOString(),
        post_like_count: post ? post.post_like_count: 0,
        post_dislike_count: post ? post.post_dislike_count: 0,
        post_report_count: post ? post.post_report_count: 0,
        post_comment_count: post ? post.post_comment_count: 0
    });

    const { post_title, post_content } = write;

    const onChange = (e) => {
        const { name, value } = e.target;
        setWrite({
            ...write,
            [name]: value,
        });
    };

    const saveWrite = async () => {
        if (!post_title || !post_content) {
            alert('제목과 내용을 작성해주세요.');
            return;
        }

        console.log('저장할 데이터 : ', write);

        try {
            // 수정할 경우 PUT 요청, 새로 작성할 경우 POST 요청
            if (post) {
                await axios.put(`https://3.34.133.247/team/${post.post_id}?userId=${userId}`, write, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert('수정되었습니다.');
            } else {
                await axios.post(`https://3.34.133.247/team?userId=${userId}`, write, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert('등록되었습니다.');
            }
            navigate('/team');
        } catch (error) {
            console.error('API 연동 실패:', error);
            alert('API 연동에 실패했습니다.');
        }
    };

    const backToList = () => {
        navigate('/team');
    };

    return (
        <Container>
            <BannerContainer>
                <Image src={배너} alt="배너" />
            </BannerContainer>
            <TitleContainer>
                <TeamContainer>
                    {post ? "수정하기" : "글쓰기"}
                </TeamContainer>
                <SitemapContainer>
                    {post ? "글을 잘못 쓰셔도 얼마든지 수정 가능합니다~" : "팀원을 구하는 글을 자유롭게 작성해보세요~"}
                </SitemapContainer>
            </TitleContainer>
            <Title>
                <Titlespan>
                    제목
                </Titlespan>
                <Titleinput type="text" name="post_title" value={post_title} onChange={onChange} placeholder="제목을 입력하세요." />
            </Title>
            <br />
            <Contents>
                <Contentsinput type="text" name="post_content" value={post_content} onChange={onChange} placeholder="내용을 입력하세요." />
            </Contents>
            <br />
            <ButtonContainer>
                <Cancelbutton onClick={backToList}>취소</Cancelbutton>
                <Submitbutton onClick={saveWrite}>{post ? "수정" : "등록"}</Submitbutton>
            </ButtonContainer>
        </Container>
    ); 
}


const Container = styled.div`
    justify-content: center;
    align-items: center;
    padding-left: 200px;
    padding-right: 200px;
    position: relative;
    border-left: 1px solid #cecece;
    border-right: 1px solid #cecece;

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

const Titlespan = styled.span`
    margin-right: 20px;
`;

const Title = styled.div`
    padding: 20px;
    border-bottom: 1px solid #cecece;
    font-weight: bold;

`;

const Titleinput = styled.input`
    width: 1000px;
    height: 30px;
    font-size: 15px;
`;

const Contents = styled.div`
    
`;

const Contentsinput = styled.textarea`
    font-size: 15px;
    height: 400px;
    width: 1100px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
    margin-top: 20px; /* 버튼과 내용 사이 여백 */
    margin-right: 20px;
    margin-bottom: 20px;
`;

const Submitbutton = styled.button`
    bottom: 20px;
    right: 20px;
    background-color: blue;
    color: white;
    border: none;
    font-weight: bold;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
`;

const Cancelbutton = styled.button`
    background-color: gray; /* 취소 버튼의 배경색 */
    color: white;
    border: none;
    font-weight: bold;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
`;