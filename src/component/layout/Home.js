import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import '../css/Font.css';
import LeftArrow from '../images/Left_arrow.png'; // 좌측 화살표 이미지 경로
import RightArrow from '../images/Right_arrow.png'; // 우측 화살표 이미지 경로
import Member from "../page/02_Member";
import Team from "../page/02_Team";
import Match from "../page/02_Match";
import 챙 from "../images/챙.jpg";

export default function Home() {
    const MatchRenderContainer = () => {
        <Match/>
        console.log("매칭 렌더링");
    }
    const TeamRenderContainer = () => {
        <Team/>
        console.log("팀 렌더링");
    }
    const MemberRenderContainer = () => {
        <Member/>
        console.log("멤버 렌더링");
    }
    const settings = {
        dots: true,
        slidesToScroll: 1,
        centerMode: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed : 5000,
        prevArrow: <Arrow src={LeftArrow} alt="Previous" />,
        nextArrow: <Arrow src={RightArrow} alt="Next" />
    };

    return (
        <Container>
            <Slider {...settings}>
                <SliderContainer>
                    <Navi activeClassName="active" to="/member">
                        <Image src={챙} alt="팀원 구하기" />
                    </Navi>
                </SliderContainer>
                <SliderContainer>
                    두번째 화면
                </SliderContainer>
                <SliderContainer>
                    세번째 화면
                </SliderContainer>
                <SliderContainer>
                    네번째 화면
                </SliderContainer>
                <SliderContainer>
                    다섯번째 화면
                </SliderContainer>
                <SliderContainer>
                    여섯번째 화면
                </SliderContainer>
            </Slider>
            <RenderContainer>
                <BulletinContainer>{MatchRenderContainer()}</BulletinContainer>
                <BulletinContainer>{TeamRenderContainer()}</BulletinContainer>
                <BulletinContainer>{MemberRenderContainer()}</BulletinContainer>
                </RenderContainer>
        </Container>
    );
}

const Container = styled.div`
    padding: 50px 300px;
    position: relative; /* 자식 요소의 위치를 기준으로 설정 */
    max-width: 100%;
`;
const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: 100%;
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
`;
const RenderContainer = styled.div`
    margin-top : 4%;
    display: flex;
    width:90%;
    margin: 4% auto 0 auto;
`;
const BulletinContainer = styled.div`
    flex:1;
    width:30%;
    aspect-ratio: 1;
`;

const Navi = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-item: center;
`;

const Image = styled.img`
    width: 90%;
    height: auto;
    object-fit: contain;
`;