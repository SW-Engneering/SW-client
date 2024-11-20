import styled from "styled-components";
import 로고 from "../images/로고.jpg";


export default function Management() {
    return (
        <Container>
            <TitleContainer>
                팀 관리
            </TitleContainer>
            <Instruction>
                팀 관리 페이지를 통해 보다 효율적으로 팀을 관리해보세요.
            </Instruction>
            <Team>
                <LeftTeam>
                    <TeamLogo src={로고} alt="팀 로고" />
                    <TeamName>
                        FC스포매치
                    </TeamName>
                </LeftTeam>
                <RightTeam>

                </RightTeam>
            </Team>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 50px;
    text-align: center;
    padding: 0 200px;
`;

const TitleContainer = styled.strong`
    font-size: 40px;
`;

const Instruction = styled.div`
    margin-top: 30px;
    font-size: 15px;
`;

const Team = styled.div`
    margin-top: 30px;
`;

const LeftTeam = styled.div`
    background-color: orange;
    width: 30%;
    height: 400px;
`;

const TeamLogo = styled.img`
    width: 50%;
    height: 150px;
    border-radius: 30px;
    margin-top: 10px;
`;

const TeamName = styled.div`
    font-size: 30px;
`;

const RightTeam = styled.div`

`;