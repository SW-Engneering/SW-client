import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 배너 from "../images/배너.png";
import styled from "styled-components";
import Cookies from "js-cookie";

export default function MemberWrite() {

    const userId = Cookies.get('userId');
    console.log(userId, "로딩 완료");

    const navigate = useNavigate();

    const [write, setWrite] = useState({
        post_id: 0,
        user_id: userId, // userId를 포함
        post_type: "member", // 필요한 경우 적절하게 설정
        post_writer: "", // 작성자 정보를 userId로 설정
        post_title: "",
        post_content: "",
        post_hits: 0,
        post_created_time: new Date().toISOString(),
        post_updated_time: new Date().toISOString(),
        post_like_count: 0,
        post_dislike_count: 0,
        post_report_count: 0,
        post_comment_count: 0
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
        console.log('등록할 데이터 : ', write)

        try {
            await axios.post(`http://3.34.133.247:8080/member?userId=${userId}`, write, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            alert('등록되었습니다.');
            navigate('/member');
        } catch (error) {
            console.error('API 연동 실패:', error); // 에러 로그
            alert('API 연동이 필요합니다.'); // 에러 발생 시 알림
        }
    };

    const backToList = () => {
        navigate('/member');
    };

    return (
        <Container>
            <BannerContainer>
                <Image src={배너} alt="배너" />
            </BannerContainer>
            <TitleContainer>
                <TeamContainer>
                    글쓰기
                </TeamContainer>
                <SitemapContainer>
                    팀원을 구하는 글을 자유롭게 작성해보세요~
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
                <Submitbutton onClick={saveWrite}>등록</Submitbutton>
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