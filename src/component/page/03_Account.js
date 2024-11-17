import styled from 'styled-components';

export default function Account() {
    return (
        <Container>
            <LineContainer>
                <TextContainer>이름</TextContainer>
                <InputContainer type="text" />
            </LineContainer>
            <LineContainer>
                <TextContainer>포지션</TextContainer>
                <InputContainer type="text" />
            </LineContainer>
            <LineContainer>
                <TextContainer>이메일</TextContainer>
                <InputContainer type="text" />
            </LineContainer>
            <LineContainer>
                <TextContainer>전화번호</TextContainer>
                <InputContainer type="text" />
            </LineContainer>
            <LineContainer>
                <TextContainer>자기소개</TextContainer>
                <InputContainer type="text" />
            </LineContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const LineContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 5px;
`;

const TextContainer = styled.div`
    width: 30%;
    margin-right: 5px;
    font-size: 20px;
    text-align: right;
`;

const InputContainer = styled.input`
    width: 70%;
    border: 1px black solid;
    border-radius: 5px;
    padding: 5px;
    font-size: 18px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const SubmitButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;
