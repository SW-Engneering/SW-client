import styled from 'styled-components';
import 로고 from '../images/로고.jpg';
import 팀관리1 from '../images/팀관리1.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Management() {
    const [teamId, setTeamId] = useState(null);
    const navigate = useNavigate();

    const [teamInfo, setTeamInfo] = useState({
        name: '가입된 팀이 없습니다.',
        region: '대구',
        win: 0,
        draw: 0,
        lose: 0,
    });

    const handleTeamCreate = () => {
        navigate('/create_team');
    };

    // useEffect(() => {
    //     const teamInfoLoad = async () => {
    //         const res = await axios.get('api주소');
    //         setTeamInfo(res.data);
    //     };

    //     teamInfoLoad();
    // }, [navigate]);

    return (
        <Container>
            <ImageContainer>
                <Image src={팀관리1} alt="팀관리" />
                <OverlayText1>팀 관리</OverlayText1>
                <OverlayText2>팀 관리 페이지를 통해 효율적으로 팀을 관리해보세요.</OverlayText2>
            </ImageContainer>
            <Team>
                <LeftTeam>
                    <TeamLogo src={로고} alt="팀 로고" />
                    <TeamName>{teamInfo.name}</TeamName>
                    <WinLose>
                        {teamInfo.win}승 {teamInfo.draw}무 {teamInfo.lose}패
                    </WinLose>
                    <TeamCreateButton onClick={handleTeamCreate}>팀 만들기</TeamCreateButton>
                </LeftTeam>
                <RightTeam>
                    <Matching>매칭정보</Matching>
                    <TeamList>
                        <MyTeam>
                            <TeamLogo src={로고} alt="팀 로고" />
                            <MyTeamName>{teamInfo.name}</MyTeamName>
                            <TeamRegion>{teamInfo.region}</TeamRegion>
                        </MyTeam>
                        <VS>VS</VS>
                        <OppositionTeam>
                            <TeamLogo src={로고} alt="팀 로고" />
                            <MyTeamName>{teamInfo.name}</MyTeamName>
                            <TeamRegion>{teamInfo.region}</TeamRegion>
                        </OppositionTeam>
                    </TeamList>
                </RightTeam>
            </Team>
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

const Team = styled.div`
    display: flex;
    padding: 0 200px;
`;

const LeftTeam = styled.div`
    margin-top: 30px;
    background-color: red;
    width: 30%;
    height: 400px;
`;

const TeamCreateButton = styled.button`
    margin-top: 30px;
`;

const TeamLogo = styled.img`
    width: 50%;
    height: 150px;
    border-radius: 30px;
    margin-top: 30px;
`;

const TeamName = styled.div`
    margin-top: 30px;
    font-weight: bold;
    color: white;
    font-size: 30px;
`;

const WinLose = styled.div`
    margin-top: 30px;
    color: white;
    font-size: 15px;
`;

const MatchInfo = styled.div``;

const RightTeam = styled.div`
    margin-top: 30px;
    border-right: 3px solid #ecedef;
    border-left: 3px solid #ecedef;
    border-bottom: 3px solid #ecedef;
    border-top: 3px solid #ecedef;
    width: 70%;
    margin-left: 30px;
    height: 400px;
`;

const Matching = styled.div`
    padding: 10px 0;
    background-color: #4f599f;
    color: white;
    font-size: 30px;
    font-weight: bold;
`;

const TeamList = styled.div`
    display: flex;
    align-items: center;
`;

const MyTeam = styled.div`
    width: 350px;
`;

const MyTeamName = styled.div`
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
`;

const TeamRegion = styled.div`
    margin-top: 30px;
`;

const VS = styled.div`
    text-align: center;
    font-size: 50px;
`;

const OppositionTeam = styled.div`
    width: 350px;
`;
