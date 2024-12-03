import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 팀관리1 from "../images/팀관리1.jpg";
import styled from 'styled-components';
import Cookies from 'js-cookie';

export default function MemberDetail() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state;
    const userId = Cookies.get('userId');
    const nickname = Cookies.get('nickname');

    console.log(post);

    const convertNewlinesToBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    const modifyGoGo = () => {
        navigate('/memberwrite', { state : { post }});
    }

    const deleteGoGo = async () => {
        // 삭제 권한 확인
        if (nickname !== post.nickname) {
            alert("삭제 권한이 없습니다."); // 권한이 없을 경우 알림
            console.log(userId, post.user_id, userId === post.user_id);
            console.log(typeof userId, typeof post.user_id);
            return; // 권한이 없으면 함수 종료
        } else {
            // 삭제 권한이 있는 경우에만 확인 창 띄우기
            const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
            
            if (confirmDelete) {
                try {
                    await axios.delete(`https://3.34.133.247/member/${post.post_id}?userId=${userId}`);
                    alert("삭제되었습니다.");
                    navigate('/member');
                } catch (error) {
                    console.error('삭제 실패:', error); // 에러 로그
                    alert("삭제에 실패했습니다."); // 사용자에게 알림
                }
            } else {
                return; // 삭제 취소 시 아무것도 하지 않음
            }
        }
    };

    return (
        <Container>
            <BannerContainer>
                <Image src={팀관리1} alt="ㅁㄴㅇㄹ" />
                <OverlayText1>팀원 구하기</OverlayText1>
                <OverlayText2>같이 축구하실 분~</OverlayText2>
            </BannerContainer>
            <Padding200>
                <DetailContainer>
                    <Title>{post.post_title}</Title>
                    <Flexbox>
                        <Nick>{post.nickname}</Nick>
                        <CreateTime>작성일: {post.post_created_time.split('T')[0]}</CreateTime>
                        <Hits>조회수: {post.post_hits}</Hits>
                    </Flexbox>
                    <Content>{convertNewlinesToBreaks(post.post_content)}</Content>
                </DetailContainer>
                <SujungDeleteFlexbox>
                    <Modifybutton onClick={modifyGoGo}>수정</Modifybutton>
                    |
                    <Deletebutton onClick={deleteGoGo}>삭제</Deletebutton>
                </SujungDeleteFlexbox>
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

const Content = styled.div`
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid black;
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
`;

const Modifybutton = styled.div`
    
`;

const Deletebutton = styled.div`
    
`;