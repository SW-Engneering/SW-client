import styled from "styled-components";

export default function Schedule(){
    return(
<       Container>
            <Message>일정이 없습니다.</Message>
        </Container>    
        )
}

const Container = styled.div`
    padding: 20px;
    background-color: #f4f4f4;
    text-align: center;
    align-items: center;
    min-height: 15vh;
`;

const Message = styled.div`
    font-size: 18px;
    color: #555;
    margin-top: 50px;
`;
