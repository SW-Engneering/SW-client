import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import './Font.css';


export default function Home(){
    const settings={
        dots: true,
        slidesToScroll: 1,
        centerMode : true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true
    };
    return (
        <Container>
          <h2> Single Item</h2>
          <Slider {...settings}>
            <SliderContainer>
              첫번째 화면
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
        </Container>
      );
}

const Container = styled.div`
  max-width:100%;
  font-family : Ganpan;  
`;
const SliderContainer = styled.div`
  align-items : center;
  justify-content : center;
  width : 100%;
`;