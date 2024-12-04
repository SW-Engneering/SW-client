import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { NavLink ,useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Font.css';
import 왼쪽화살표 from '../images/Left_arrow.png'; // 좌측 화살표 이미지 경로
import 오른쪽화살표 from '../images/Right_arrow.png'; // 우측 화살표 이미지 경로
import Member from '../page/02_Member';
import Team from '../page/02_Team';
import Match from '../page/02_Match';
import 팀원 from '../images/팀원구하기1.png';
import 팀 from '../images/팀구하기1.png';
import axios from 'axios';


export default function Home() {

    const [memberList, setMemberList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [matchList, setMatchList] = useState([]);
    const navigate = useNavigate();
    

    const settings = {
        dots: false,
        slidesToScroll: 1,
        centerMode: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <LeftArrow src={왼쪽화살표} alt="Previous" />,
        nextArrow: <RightArrow src={오른쪽화살표} alt="Next" />,
    };

    useEffect(() => {
        const getFiveMemberList = async () => {
            try {
                const response = await axios.get(`https://3.34.133.247/member`);
                const goodData = response.data.sort((a, b) => b.post_id - a.post_id);
                const recentPosts = goodData.slice(0, 5);
                setMemberList(recentPosts);
            } catch(error) {
                console.log('에러')
            }
        }
        getFiveMemberList();

        const getFiveTeamList = async () => {
            try {
                const response = await axios.get(`https://3.34.133.247/team`);
                const goodData = response.data.sort((a, b) => b.post_id - a.post_id);
                const recentPosts = goodData.slice(0, 5);
                setTeamList(recentPosts);
            } catch(error) {
                console.log('에러')
            }
        }

        const getMatchList = async () => {
            try {
                const response = await axios.get(`https://3.34.133.247/match`);
                const goodData = response.data.sort((a, b) => b.post_id - a.post_id);
                const recentPosts = goodData.slice(0, 5);
                setMatchList(recentPosts);
            } catch(error) {
                console.log('에러')
            }
        }

        getFiveMemberList();
        getFiveTeamList();
        getMatchList();
    }, []);

    const memberDetail = async (post_id, post) => {
        navigate(`/member/${post_id}`, { state: { post } } );
    };

    const teamDetail = async (post_id, post) => {
        navigate(`/team/${post_id}`, { state: { post } } );
    };

    const matchDetail = async (post_id, post) => {
        navigate(`/team/${post_id}`, { state: { post } } );
    };

    return (
        <Container>
            <Slider {...settings}>
                <SliderContainer>
                    <Navi activeClassName="active" to="/member">
                        <Image src={팀원} alt="팀원 구하기" />
                    </Navi>
                </SliderContainer>
                <SliderContainer>
                    <Navi activeClassName="active" to="/team">
                        <Image src={팀} alt="팀 구하기" />
                    </Navi>
                </SliderContainer>
                <SliderContainer>ㅁㅇㄹㄴㅇ</SliderContainer>
                <SliderContainer>네번째 화면</SliderContainer>
                <SliderContainer>다섯번째 화면</SliderContainer>
                <SliderContainer>여섯번째 화면</SliderContainer>
            </Slider>
            <Gray>
                <RecentContainer>최근 올라온 글</RecentContainer>
                <TeamContainer>
                    <BulletinContainer>
                        <BulletinNameContainer>팀원 구하기</BulletinNameContainer>
                        <PostsList>
                            {memberList.map((post) => (
                                <PostItem key={post.post_id}>
                                    <PostTitle onClick={() => memberDetail(post.post_id, post)}>
                                        {post.post_title}{post.post_comment_count > 0 && ` [${post.post_comment_count}]`}
                                    </PostTitle>
                                </PostItem>
                            ))}
                        </PostsList>
                    </BulletinContainer>
                    <BulletinContainer>
                        <BulletinNameContainer>팀 구하기</BulletinNameContainer>
                        <PostsList>
                            {teamList.map((post) => (
                                <PostItem key={post.post_id}>
                                    <PostTitle onClick={() => teamDetail(post.post_id, post)}>
                                        {post.post_title}{post.post_comment_count > 0 && ` [${post.post_comment_count}]`}
                                    </PostTitle>
                                </PostItem>
                            ))}
                        </PostsList>
                    </BulletinContainer>
                    <BulletinContainer>
                        <BulletinNameContainer>팀 매칭하기</BulletinNameContainer>
                        <PostsList>
                            {matchList.map((post) => (
                                <PostItem key={post.post_id}>
                                    <PostTitle onClick={() => matchDetail(post.post_id, post)}>
                                        {post.post_title}{post.post_comment_count > 0 && ` [${post.post_comment_count}]`}
                                    </PostTitle>
                                </PostItem>
                            ))}
                        </PostsList>
                    </BulletinContainer>
                </TeamContainer>
                <ToBeContinued>to be continued...</ToBeContinued>
            </Gray>
            
        </Container>
    );
}

const Container = styled.div`
    font-family: 'Pretendard-Light';
    position: relative;
    max-width: 100%;
`;
const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    font-size: 24px;
    text-align: center;
    font-family: Ganpan;
`;
const Arrow = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 1;
    position: absolute;
    background-color: white;
    border-radius: 30px;
`;

const LeftArrow = styled(Arrow)`
    left: 10px; /* 왼쪽 위치 조정 */
`;

const RightArrow = styled(Arrow)`
    right: 10px; /* 오른쪽 위치 조정 */
`;

const Gray = styled.div`
    background-color: #ecedef;
`;

const RecentContainer = styled.div`
    padding: 30px 0;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
`;

const TeamContainer = styled.div`
    display: flex;
    width: 60%;
    align-items: center;
    background-color: white;
    margin: 0 auto;
`;

const BulletinContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 25%;
    
    text-align: center;
    border: 0.5px solid #ecedef;
`;
//최신글 게시판 종류
const BulletinNameContainer = styled.div`
    font-weight: bold;
    padding: 4%;
    border-top: 2px solid black;
    
`;



const Navi = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Image = styled.img`
    width: 100%;
    height:100%;
    object-fit: contain;
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
    padding: 10px;
    display: flex;
`;


const PostTitle = styled.div`
    width: 536px;
    margin-left: 20px;
    text-align: left;
    cursor: pointer;

    &:hover {
        color: green;
        }
`;

const ToBeContinued = styled.div`
    padding: 20px 0;
    text-align: center;
`;