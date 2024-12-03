import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
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

export default function Home() {

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
            <RecentContainer>최근 올라온 글</RecentContainer>
            <RenderContainer>
                <TeamContainer>
                    <BulletinContainer>
                        <BulletinNameContainer>팀원 구하기</BulletinNameContainer>
                        <BulletinTitleContainer>경산 팀구합니다</BulletinTitleContainer>
                        <BulletinTitleContainer>경산 팀구합니다</BulletinTitleContainer>
                    </BulletinContainer>
                    <BulletinContainer>
                        <BulletinNameContainer>팀 구하기</BulletinNameContainer>
                        <BulletinTitleContainer>SC팀 골키퍼 구해요</BulletinTitleContainer>
                        <BulletinTitleContainer>SC팀 골키퍼 구해요</BulletinTitleContainer>
                    </BulletinContainer>
                    <BulletinContainer>
                        <BulletinNameContainer>팀 매칭하기</BulletinNameContainer>
                        <BulletinTitleContainer>사동 풋살장에서 16시에 풋살할 팀 모집</BulletinTitleContainer>
                        <BulletinTitleContainer>사동 풋살장에서 16시에 풋살할 팀 모집</BulletinTitleContainer>
                    </BulletinContainer>
                </TeamContainer>
            </RenderContainer>
        </Container>
    );
}

const Container = styled.div`
    font-family: 'Pretendard-Regular';
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

const RenderContainer = styled.div`
    display: flex;
    width: 100%;
`;

const TeamContainer = styled.div`
    display: flex;
    width: 100%;
`;
const RecentContainer = styled.div`
    margin: 6% 0 1% 0;
`;
const BulletinContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 30%;
    aspect-ratio: 1;
    text-align: center;
    &:not(:last-child) {
        margin-right: 2%;
    }
`;
//최신글 게시판 종류
const BulletinNameContainer = styled.div`
    font-weight: bold;
    padding: 4%;
    border-top: 2px solid black;
    border-top-left-radius: 10px;
    border-left: 0;
    border-right: 0;
`;
//최신글 제목
const BulletinTitleContainer = styled.div`
    padding: 1% 0;
    &:not(:last-child) {
        border-bottom: dotted 1px black;
    }
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
