import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Font.css';
import LeftArrow from '../images/Left_arrow.png'; // 좌측 화살표 이미지 경로
import RightArrow from '../images/Right_arrow.png'; // 우측 화살표 이미지 경로
import Member from "../page/02_Member";
import Team from "../page/02_Team";
import Match from "../page/02_Match";
import 챙 from "../images/챙.jpg";
import 빵 from "../images/adfs.jpg";
import 젼 from "../images/sdfsdf.jpg";

export default function Home() {
    const MatchRenderContainer = () => {
        console.log('매칭 렌더링');
        return <Match />;
    };
    const TeamRenderContainer = () => {
        console.log('팀 렌더링');
        return <Team />;
    };
    const MemberRenderContainer = () => {
        console.log('멤버 렌더링');
        return <Member />;
    };

    const settings = {
        dots: true,
        slidesToScroll: 1,
        centerMode: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <Arrow src={LeftArrow} alt="Previous" />,
        nextArrow: <Arrow src={RightArrow} alt="Next" />,
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
                    <Navi activeClassName="active" to="/team">
                        <Image src={빵} alt="팀 구하기" />
                    </Navi>
                </SliderContainer>
                <SliderContainer>
                    <Navi activeClassName="active" to="/team">
                        <Image src={젼} alt="팀 매칭하기" />
                    </Navi>
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
                <BulletinContainer>{TeamRenderContainer()}</BulletinContainer>
                <BulletinContainer>{MemberRenderContainer()}</BulletinContainer>
                <BulletinContainer>{MatchRenderContainer()}</BulletinContainer>
            </RenderContainer>
        </Container>
    );
}

const Container = styled.div`
    padding: 50px 300px;
    position: relative;
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
    margin-top: 4%;
    display: flex;
    width: 90%;
    margin: 4% auto 0 auto;
`;
const BulletinContainer = styled.div`
    flex: 1;
    width: 30%;
    aspect-ratio: 1;
`;
const Navi = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center; /* align-item -> align-items로 수정 */
`;
const Image = styled.img`
    width: 90%;
    height: auto;
    object-fit: contain;
`;
