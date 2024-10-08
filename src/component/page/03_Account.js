import styled from "styled-components"

export default function Account(){
    return(
        <Container>
            <LineContainer><TextContainer>이름</TextContainer><InputContainer type="text"></InputContainer></LineContainer>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
`;
const LineContainer = styled.div`
    display:flex;
`
const TextContainer = styled.div`

`
const InputContainer = styled.input`

`