import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import 감독 from "../images/감독.jpg";

export default function JoinOrCreate() {

    const navigate = useNavigate();

    const goToTeam = () => {
        navigate('/team');
    }

    const goToCreateTeam = () => {
        navigate('/create_team');
    }

    return (
        <Container>
            <TitleContainer>
                <Title>
                    팀을 가지고 싶으신가요?
                </Title>
                <Instruction>
                    스포매치에서 팀을 만들거나 가입해보세요.
                </Instruction>
            </TitleContainer>
            <JoinCreate>
                <JoinCreateBox onClick={goToTeam}>
                    <JoinTitle>
                        팀 가입
                    </JoinTitle>
                    <Shakehand>🤝</Shakehand>
                    <JoinInstruction>
                        클릭 시 팀 구하기 게시판으로 이동합니다.
                    </JoinInstruction>
                </JoinCreateBox>
                <JoinCreateBox onClick={goToCreateTeam}>
                    <CreateTitle>
                        팀 생성
                    </CreateTitle>
                    <EmptyBox>
                        <Manager src={감독} alt="감독" />
                    </EmptyBox>
                    <CreateInstruction>
                        나만의 팀을 만들어보세요!
                    </CreateInstruction>
                </JoinCreateBox>
            </JoinCreate>
        </Container>
    )
}

const Container = styled.div`
    text-align: center;
    position: relative;
    font-family: '지마켓';
    padding-bottom: 40px;
`;

const TitleContainer = styled.div`
    padding-top: 40px;
`;

const Title = styled.div`
    font-size: 50px;
    font-weight: bold;
    height: 70px;
`;

const Instruction = styled.div`
    font-size: 20px;
    padding: 40px 0;
`;

const JoinCreate = styled.div`
    display: flex; /* 자식 요소를 가로로 배치 */
    justify-content: center;
    gap: 30px;
    font-size: 35px;
`;

const JoinCreateBox = styled.div`
    height: 340px;
    width: 300px;
    cursor: pointer;
    
    border-radius: 30px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    transition: transform 0.1s ease, box-shadow 0.1s ease; /* 애니메이션 추가 */

    &:hover {
        transform: translateY(4px); /* 아래로 4px 이동 */
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2); /* 그림자 변경 */
    }
`;

const JoinTitle = styled.div`
    padding-top: 30px;
    font-weight: bold;
`;

const Shakehand = styled.div`
    font-size: 120px;
`;

const JoinInstruction = styled.div`
    padding-top: 30px;
    font-size: 15px;
`;

const CreateTitle = styled.div`
    padding-top: 30px;
    font-weight: bold;
`;

const EmptyBox = styled.div`
    
`;

const Manager = styled.img`
    width: 145px;
    height: 145px;
    padding-top: 5px;
`;

const CreateInstruction = styled.div`
    font-size: 15px;
    padding-top: 40px;
`;