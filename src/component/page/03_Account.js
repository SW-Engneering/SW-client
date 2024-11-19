import styled from 'styled-components';

export default function Account() {
    return (
        <Container>
            <LineContainer>
                <TextContainer>이름</TextContainer>
                <InputContainer type="text" placeholder="이름을 입력하세요" />
            </LineContainer>
            <LineContainer>
                <TextContainer>포지션</TextContainer>
                <InputContainer type="text" placeholder="포지션을 입력하세요" />
            </LineContainer>
            <LineContainer>
                <TextContainer>이메일</TextContainer>
                <InputContainer type="email" placeholder="이메일을 입력하세요" />
            </LineContainer>
            <LineContainer>
                <TextContainer>전화번호</TextContainer>
                <InputContainer type="tel" placeholder="전화번호를 입력하세요" />
            </LineContainer>
            <LineContainer>
                <TextContainer>자기소개</TextContainer>
                <TextAreaContainer placeholder="자기소개를 입력하세요" />
            </LineContainer>
            <ButtonContainer>
                <SubmitButton>저장</SubmitButton>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LineContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
`;

const TextContainer = styled.div`
    width: 30%;
    margin-right: 10px;
    font-size: 16px;
    text-align: right;
    color: #333;
`;

const InputContainer = styled.input`
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #4caf50;
        outline: none;
    }
`;

const TextAreaContainer = styled.textarea`
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    resize: none;
    height: 100px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #4caf50;
        outline: none;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #388e3c;
    }
`;
