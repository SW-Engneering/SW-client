import styled from "styled-components";
import 팀만들기 from "../images/팀관리1.jpg";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Create_team() {

    const userId = Cookies.get('userId');
    const [teamInfo, setTeamInfo] = useState({
        teamName : "",
        leaderId : userId,
        teamRegion : ""
    });
    const navigate = useNavigate();


    const { teamName, teamRegion } = teamInfo;

    const onChange = (e) => {
        const { name, value } = e.target;
        setTeamInfo({
            ...teamInfo,
            [name]: value,
        });
    };

    const createTeam = async () => {
        if (!teamName || !teamRegion) {
            alert('작성 안하신 부분이 있습니다.');
            return;
        }

        try {
            await axios.post(`https://3.34.133.247/teams?leaderId=${userId}`, teamInfo);
            alert('팀 생성이 완료되었습니다!');
            navigate('/management');
        } catch(error) {
            console.log(teamInfo);
            console.log(userId);
        }
    }

    return(
        <Container>
            <ImageContainer>
                <Image src={팀만들기} alt="adsf" />
                <OverlayText1>팀 생성</OverlayText1>
                <OverlayText2>팀을 만들어보세요.</OverlayText2>
            </ImageContainer>
            <Flexbox>
                <CreateBox>
                    <InputBox>
                        <TeamNameInput type="text" name="teamName" value={teamName} onChange={onChange} placeholder="팀 이름"></TeamNameInput><br/>
                        <TeamRegionInput type="text" name="teamRegion" value={teamRegion} onChange={onChange} placeholder="지역"></TeamRegionInput>
                    </InputBox>
                    <CreateButton onClick={createTeam}>팀 생성</CreateButton>
                </CreateBox>
            </Flexbox>
        </Container>
    );
}

const Container = styled.div`
    text-align: center;
`;

const ImageContainer = styled.div`
    position: relative; /* 자식 요소의 위치를 상대적으로 설정 */
`;

const Image = styled.img`
    align-items: center;
    width: 100%;
`;

const OverlayText1 = styled.div`
    position: absolute; /* 절대 위치 지정 */
    top: 30%; /* 수직 중앙 정렬 */
    left: 50%; /* 수평 중앙 정렬 */
    transform: translate(-50%, -50%); /* 중앙으로 이동 */
    color: white; /* 텍스트 색상 */
    font-size: 40px; /* 텍스트 크기 */
    font-weight: bold; /* 텍스트 두께 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 */
`;

const OverlayText2 = styled.div`
    position: absolute; /* 절대 위치 지정 */
    top: 70%;
    left: 50%; /* 수평 중앙 정렬 */
    transform: translate(-50%, -50%); /* 중앙으로 이동 */
    color: white; /* 텍스트 색상 */
    font-size: 20px; /* 텍스트 크기 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 */
`;

const Flexbox = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    padding-top: 30px;
`;

const CreateBox = styled.div`
    padding-top: 50px;
    width: 500px;
    height: 200px;
    display: relative;
    border-radius: 30px;
    box-shadow: 10px 3px 40px rgba(0, 0, 0, 0.1);
`;

const TeamNameInput = styled.input`
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 7px;
`;

const TeamRegionInput = styled.input`
    border-radius: 10px;
    padding: 5px;
`;

const InputBox = styled.div`
    padding: 20px 0;
`;

const CreateButton = styled.div`
    cursor: pointer;
    color: white;
    background-color: black;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    margin: 0 auto;
    padding-top: 10px;
    font-weight: bold;
    transition: transform 0.1s ease, box-shadow 0.1s ease;

    &:hover {
        background-color: #3F3F3F;
        transform: translateY(4px);
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
        
    }

`;