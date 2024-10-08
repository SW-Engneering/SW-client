import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Font.css';
import LeftArrow from '.images/Left_arrow.png'; // 좌측 화살표 이미지 경로
import RightArrow from './images/Right_arrow.png'; // 우측 화살표 이미지 경로

export default function Home() {
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
                <SliderContainer>첫번째 화면</SliderContainer>
                <SliderContainer>두번째 화면</SliderContainer>
                <SliderContainer>세번째 화면</SliderContainer>
                <SliderContainer>네번째 화면</SliderContainer>
                <SliderContainer>다섯번째 화면</SliderContainer>
                <SliderContainer>여섯번째 화면</SliderContainer>
            </Slider>
        </Container>
    );
}

const Container = styled.div`
    padding: 30px;
    position: relative; /* 자식 요소의 위치를 기준으로 설정 */
    max-width: 100%;
    font-family: Ganpan;
`;
const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-size: 24px;
    text-align: center;
`;

const Arrow = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 1;
    position: absolute;
`;
