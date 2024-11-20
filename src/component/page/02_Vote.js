import React from "react"
import styled from "styled-components"
import Plus_circle from "../images/Plus_circle.png"

export default function Vote(){
   return(
        <Container>
            <VoteContainer>
                <TitleContainer>시간</TitleContainer>
                <DetailContainer>내용</DetailContainer>
            </VoteContainer>
            <AddContainerButton/>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    margin : 2% 13%;    
`;
const VoteContainer = styled.div`
    display:flex;
    flex-direction:column;
    max-width:30%;
`;
const TitleContainer = styled.div`
    padding : 1% 10%;
    background-color: #231B1B;
    color:white;
    width:auto;
    text-align:center;
`;
const DetailContainer = styled.div`
    display: flex;
    flex-direction : column;
    border: solid black 0.5px;
    padding : 1% 10%;
    text-align:center;
`;
const TextConatainer = styled.div`
    
`;
const AddContainerButton = styled.div`
    background-color:none;
    background-image:url(${Plus_circle});
    background-repeat:none;
    width:100px;
    height:100px;
    background-size:cover;
    border:none;
    @active{

    }
`