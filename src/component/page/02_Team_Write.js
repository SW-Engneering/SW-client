import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 배너 from "../images/배너.png";
import styled from "styled-components";

export default function TeamWrite() {

    const navigate = useNavigate();

    const [write, setWrite] = useState({
        title: '',
        contents: '',
    });

    const {title, contents} = write;

    const onChange = (e) => {
        const { value, name } = e.target;
        setWrite({
            ...write,
            [name]: value,
        });
    };

    const saveWrite = async () => {

        if (!title && !contents) {
            alert('제목과 내용을 작성해주세요.');
            return;
        }
        if (!title) {
            alert('제목을 작성해주세요.');
            return;
        }
        if (!contents) {
            alert('내용을 작성해주세요.');
            return;
        }
        
        try {
            await axios.post('http://3.34.133.247:8080/team?userId=1234', write); // POST 요청으로 수정
            alert('등록되었습니다.');
            navigate('/match');
        } catch (error) {
            alert('API 연동이 필요합니다.'); // 에러 발생 시 알림
        }
    };
    
    const backToList = () => {
        navigate('/team');
    };

    return(
        <Container>
            <BannerContainer>
                <Image src={배너} alt="배너" />
            </BannerContainer>
            <TitleContainer>
                <TeamContainer>
                    글쓰기
                </TeamContainer>
                <SitemapContainer>
                    팀을 구하는 글을 자유롭게 작성해보세요~
                </SitemapContainer>
            </TitleContainer>
            <Title>
                <Titlespan>
                    제목
                </Titlespan>
                <Titleinput type = "text" name = "title" value = {title} onChange = {onChange} placeholder = "제목을 입력하세요." />
            </Title>
            <br />
            <Contents>
                <Contentsinput name = "contents"  value = {contents} onChange={onChange} placeholder = "내용을 입력하세요.">
                </Contentsinput>
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