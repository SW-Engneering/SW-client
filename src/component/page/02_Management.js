import styled from "styled-components";
import 로고 from "../images/로고.jpg";
import 팀관리1 from "../images/팀관리1.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";



export default function Management() {
    

    const userId = Cookies.get('userId');
    const [teamData, setTeamData] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [oppositionTeamData, setOppositionTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                // 1번 API 주소에서 사용자 정보 가져오기
                const userResponse = await axios.get(`https://3.34.133.247/user/${userId}`);
                const { team_id } = userResponse.data; // team_id 추출

                // 2번 API 주소에 team_id를 사용하여 팀 정보 가져오기
                const teamResponse = await axios.get(`https://3.34.133.247/teams/${team_id}`);
                setTeamData(teamResponse.data); // 팀 데이터 저장

                // 3번 team_id를 이용해 상대팀 아이디 가져오기
                const matchResponse = await axios.get(`https://3.34.133.247/teams/${team_id}/matches`)
                setMatchData(matchResponse.data);

                // 4번 그걸로 상대팀 이름 갖고오기
                const oppositionTeamResponse = await axios.get(`https://3.34.133.247/teams/${matchData.team_id}`);
                setOppositionTeamData(oppositionTeamResponse.data);

            } catch (error) {
                console.log(teamData);
                console.log(matchData);
                console.log(oppositionTeamData);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchTeamData();
    }, []);

    

    return (
        <Container>
            <ImageContainer>
                <Image src={팀관리1} alt="팀관리" />
                <OverlayText1>팀 관리</OverlayText1>
                <OverlayText2>팀 관리 페이지를 통해 효율적으로 팀을 관리해보세요.</OverlayText2>
            </ImageContainer>
            <Team>
                <LeftTeam>
                    <Justbox>
                        <TeamName>
                            {teamData.teamName}
                        </TeamName>
                        <TeamRegion>{teamData.teamRegion}</TeamRegion>
                    </Justbox>
                </LeftTeam>
                <RightTeam>
                    <Matching>
                        매치 정보
                    </Matching>
                    <TeamList>
                        {oppositionTeamData && oppositionTeamData.teamName ? (
                            <>
                                <MyTeam>
                                    <MyTeamName>{teamData.teamName}</MyTeamName>
                                    <MyTeamRegion>{teamData.teamRegion}</MyTeamRegion>
                                </MyTeam>
                                <VS>VS</VS>
                                <OppositionTeam>
                                    <MyTeamName>{oppositionTeamData.teamName}</MyTeamName>
                                    <TeamRegion>{oppositionTeamData.teamRegion}</TeamRegion>
                                </OppositionTeam>
                            </>
                        ) : (
                            <NoMatch>매치 정보가 없습니다.</NoMatch> // 매칭 정보가 없을 때 메시지 표시
                        )}
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
    height: 200px;
`;

const LeftTeam = styled.div`
    margin-top: 30px;

    background-color: red;
    width: 30%;
    
`;

const Justbox = styled.div`
    padding: 40px 0;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const TeamName = styled.div`
    font-weight: bold;
    color: white;
    font-size: 30px;
`;


const RightTeam = styled.div`
    margin-top: 30px;
    border: 3px solid #ecedef;
    width: 70%;
    margin-left: 30px;
    
`;

const Matching = styled.div`
    padding: 10px 0;
    background-color: #4f599f;
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

const TeamList = styled.div`
    
    align-items: center;
`;

const MyTeam = styled.div`
    width: 350px;
`;

const MyTeamName = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const MyTeamRegion = styled.div`
    margin-top: 10px;
`;

const TeamRegion = styled.div`
    margin-top: 30px;
    color: white;
`;

const VS = styled.div`
    text-align: center;
    font-size: 50px;
    padding: 20px 0;
`;

const OppositionTeam = styled.div`
    width: 350px;
`;

const NoMatch = styled.div`
    padding: 32px 0;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
`;