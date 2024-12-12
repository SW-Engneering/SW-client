import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import 로고 from "../images/로고.jpg";
import 팀관리1 from "../images/팀관리1.jpg";
import axios from "axios";
import Cookies from "js-cookie";

export default function Management() {
    const userId = Cookies.get('userId');
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [oppositionTeamData, setOppositionTeamData] = useState([]);
    const [membersInfo, setMembersInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamRegion, setNewTeamRegion] = useState('');
    const [noticeList, setNoticeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // 페이지당 항목 수
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [newNoticeTitle, setNewNoticeTitle] = useState('');
    const [newNoticeContent, setNewNoticeContent] = useState('');
    const [isCreating, setIsCreating] = useState(false); // 공지사항 작성 모드 상태

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const userResponse = await axios.get(`https://3.34.133.247/user/${userId}`);
                const { team_id } = userResponse.data;

                const noticeResponse = await axios.get(`https://3.34.133.247/teams/${team_id}/announcements`);
                const sortedNoticeList = noticeResponse.data.sort((a, b) => b.announcementId - a.announcementId);
                setNoticeList(sortedNoticeList);

                const teamResponse = await axios.get(`https://3.34.133.247/teams/${team_id}`);
                setTeamData(teamResponse.data);

                const { memberIds } = teamResponse.data;

                const membersPromises = memberIds.map(async (id) => {
                    const memberResponse = await axios.get(`https://3.34.133.247/user/${id}`);
                    return {
                        nickname: memberResponse.data.nickname,
                        position: memberResponse.data.position,
                        userId: memberResponse.data.user_id,
                    };
                });

                // 모든 사용자 정보가 로드될 때까지 기다림
                const members = await Promise.all(membersPromises);
                setMembersInfo(members);

                const matchResponse = await axios.get(`https://3.34.133.247/matches/{teamId}?teamId=${team_id}`);
                const awayTeamId = matchResponse.data[0]?.awayTeamId;
                setMatchData(matchResponse.data);
                
                console.log(awayTeamId);
                console.log(matchData);

                const oppositionTeamResponse = await axios.get(`https://3.34.133.247/teams/${awayTeamId}`);
                setOppositionTeamData(oppositionTeamResponse.data);

            } catch (error) {
                console.log(teamData);
            }
        };
        

        fetchTeamData();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleNoticeToggle = async (announcementId) => {
        
        try {
            const response = await axios.get(`https://3.34.133.247/teams/announcement/${announcementId}`);
            setSelectedNotice(response.data);
            setIsReading(true);
        } catch(error) {
            console.log('에러');
        }
    }

    const handleSave = async () => {
        const team_id = teamData.teamId;
        try {
            await axios.put(`https://3.34.133.247/teams/${team_id}?leaderId=${userId}`, {
                teamName: newTeamName,
                teamRegion: newTeamRegion
            });
            alert("팀 정보가 수정되었습니다.");
            setIsEditing(false);
            const response = await axios.get(`https://3.34.133.247/teams/${team_id}`);
            setTeamData(response.data);
        } catch (error) {
            console.error('팀 정보 수정 실패:', error);
            alert("팀 정보 수정에 실패했습니다.");
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 현재 페이지에 해당하는 공지사항 가져오기
    const indexOfLastNotice = currentPage * itemsPerPage;
    const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
    const currentNotices = noticeList.slice(indexOfFirstNotice, indexOfLastNotice);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(noticeList.length / itemsPerPage);

    const handleCreateNoticeToggle = () => {
        setIsCreating(!isCreating);
    };
    
    const handleCreateNotice = async (teamId, leaderId) => {
        try {
            const response = await axios.post(`https://3.34.133.247/teams/${teamId}/announcement?leaderId=${leaderId}`, {
                title: newNoticeTitle,
                content: newNoticeContent,
            });
            // 새 공지사항이 추가된 후 상태 업데이트
            setNoticeList((prev) => [response.data, ...prev]); // 새로운 공지사항을 상단에 추가
            setIsCreating(false); // 모달 닫기
            setNewNoticeTitle(''); // 입력 초기화
            setNewNoticeContent(''); // 입력 초기화
            window.location.reload();
        } catch (error) {
            console.error('공지사항 작성 실패:', error);
            alert("공지사항 작성에 실패했습니다.");
        }
    };

    const handleRealeseTeamOne = async (teamId, userId, leaderId) => {
        const confirm = window.confirm("방출하시겠습니까?");
        if(confirm) {
            try {
                await axios.delete(`https://3.34.133.247/teams/${teamId}/members/${userId}?leaderId=${leaderId}`);
                alert('방출했습니다.');
                window.location.reload();
            } catch(error) {
                alert('팀장은 방출이 불가능합니다.');
            }
        }
    }

    const leaveTeam = async (teamId) => {
        const confirm = window.confirm('정말로 팀을 나가시겠습니까?');
        if(confirm) {
            try {
                await axios.delete(`https://3.34.133.247/teams/${teamId}/leave?userId=${userId}`);
                alert('팀에서 나갔습니다. \n다른 팀을 찾아봅시다');
                navigate('/');
            } catch(error) {
                console.log('asdf');
            }
        }
        else {
            return;
        }
        
        
    }

    const explodeTeam = async (teamId) => {
        const confirm = window.confirm('정말로 팀을 삭제하시겠습니까?');
        if(confirm) {
            try {
                await axios.delete(`https://3.34.133.247/teams/${teamId}?userId=${userId}`);
                alert('팀이 삭제되었습니다.');
                navigate('/');
            } catch(error) {
                alert('삭제가 불가능합니다.');
            }
        }
        else {
            return;
        }
    }

    const cancelMatch = async (teamId) => {
        const confirm = window.confirm('매칭을 취소하시겠습니까?');
        if(confirm) {
            try {
                const response = await axios.get(`https://3.34.133.247/matches/{teamId}?teamId=${teamId}`);
                const matchId = response.data[0]?.matchId;

                await axios.delete(`https://3.34.133.247/matches/${matchId}/{userId}`);
                alert('매칭이 취소되었습니다.');
                window.location.reload();
            } catch(error) {
                alert('취소가 거부되었습니다.');
            }
        }
        else {
            return;
        }
    } 

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
                        {isEditing ? (
                            <>
                                <InputBox>
                                    <TeamNameInput
                                        type="text"
                                        value={newTeamName}
                                        onChange={(e) => setNewTeamName(e.target.value)}
                                        placeholder="팀명을 입력하세요"
                                    />
                                    <TeamRegionInput
                                        type="text"
                                        value={newTeamRegion}
                                        onChange={(e) => setNewTeamRegion(e.target.value)}
                                        placeholder="팀 지역을 입력하세요"
                                    />
                                </InputBox>
                                <br />
                                <ButtonBox>
                                    <SaveButton onClick={handleSave}>저장</SaveButton>
                                    <CancelButton onClick={handleEditToggle}>취소</CancelButton>
                                </ButtonBox>
                            </>
                        ) : (
                            <>
                                <TeamName>{teamData.teamName}</TeamName>
                                <TeamRegion>{teamData.teamRegion}</TeamRegion>
                                {teamData.leaderId === Number(userId) && (
                                    <TeamNamechange onClick={handleEditToggle}>정보 수정</TeamNamechange>
                                )}
                            </>
                        )}
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
                                    <MyTeamRegion>{oppositionTeamData.teamRegion}</MyTeamRegion>
                                </OppositionTeam>
                            </>
                        ) : (
                            <NoMatch>매치 정보가 없습니다.</NoMatch>
                        )}
                    </TeamList>
                </RightTeam>
            </Team>
            <NoticeTeamone>
                <Notice>
                    <NoticeTitle>
                        공지사항
                    </NoticeTitle>
                    <NoticeBonmoon>
                        {!isReading ? (
                            <>
                                {currentNotices.length === 0 ? (
                                    <NoNotice>공지사항이 없습니다.</NoNotice>
                                ) : (
                                    currentNotices.map((notice) => {
                                        const noticeDate = new Date(notice.createdAt);
                                        const now = new Date();
                                        const isToday = noticeDate.toDateString() === now.toDateString();

                                        return (
                                            <NoticeItem key={notice.id}>
                                                <NoticeJemok onClick={() => handleNoticeToggle(notice.announcementId)}>{notice.title}</NoticeJemok>
                                                <NoticeDate>
                                                    {isToday
                                                        ? `${String(noticeDate.getHours()).padStart(2, '0')}:${String(noticeDate.getMinutes()).padStart(2, '0')}`
                                                        : noticeDate.toLocaleDateString()}
                                                </NoticeDate>
                                            </NoticeItem>
                                        );
                                    })
                                )}
                                <Pagination>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <PageButton key={index + 1} onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </PageButton>
                                    ))}
                                </Pagination>

                            </>
                        ) : (
                            selectedNotice && ( // selectedNotice가 null이 아닐 때만 렌더링
                                <>
                                    <JustFlex>
                                        <SelectedNoticeTitle>{selectedNotice.title}</SelectedNoticeTitle>
                                        <SelectedNoticeCreatedAt>{new Date(selectedNotice.createdAt).toLocaleString()}</SelectedNoticeCreatedAt>
                                    </JustFlex>
                                    <SelectedNoticeContent>{selectedNotice.content}</SelectedNoticeContent>
                                    <BackToList onClick={() => setIsReading(false)}>뒤로가기</BackToList>
                                </>
                            )
                        )}
                        {isCreating && ( // 공지사항 작성 모달
                            <Modal>
                                <h2>공지사항 작성하기</h2>
                                <JemokNaeyong>
                                    <input
                                        type="text"
                                        value={newNoticeTitle}
                                        onChange={(e) => setNewNoticeTitle(e.target.value)}
                                        placeholder="제목"
                                    />
                                    <Textarea1
                                        value={newNoticeContent}
                                        onChange={(e) => setNewNoticeContent(e.target.value)}
                                        placeholder="내용"
                                    />
                                </JemokNaeyong>
                                <button onClick={() => handleCreateNotice(teamData.teamId, teamData.leaderId)}>작성하기</button>
                                <button onClick={handleCreateNoticeToggle}>취소</button>
                            </Modal>
                        )}
                        {Number(userId) === teamData.leaderId && (
                            <button onClick={handleCreateNoticeToggle}>작성하기</button>
                            )}
                    </NoticeBonmoon>
                    
                </Notice>
                <TeamOne>
                    <TeamOneTitle>
                        팀원목록
                    </TeamOneTitle>
                    <div>
                        {membersInfo.map((member, index) => (
                            <TeamFlex key={index}>
                                <TeamOneName 
                                    onClick={() => {
                                        if (Number(userId) === teamData.leaderId) {
                                            handleRealeseTeamOne(teamData.teamId, member.userId, teamData.leaderId);
                                        } else {
                                            alert('권한이 없습니다.'); // 사용자에게 권한이 없음을 알림
                                        }
                                    }}
                                >
                                    {member.nickname}
                                </TeamOneName>
                                <TeamOnePosition>
                                    {member.position}
                                </TeamOnePosition>
                            </TeamFlex>
                        ))}
                    </div>
                </TeamOne>
            </NoticeTeamone>
            <Last>
                {oppositionTeamData && oppositionTeamData.teamName && (
                    <CancelMatching onClick={() => {cancelMatch(teamData.teamId)}}>매칭 취소</CancelMatching>
                )}
                {teamData.leaderId === Number(userId) ? (
                    <ExplodeTeam onClick={() => {explodeTeam(teamData.teamId)}}>팀 삭제</ExplodeTeam>
                ) : (
                    <ExplodeTeam onClick={() => {leaveTeam(teamData.teamId)}}>팀 나가기</ExplodeTeam>
                )}
            </Last>
        </Container>
    );
}

const Container = styled.div`
    text-align: center;
    font-family: '지마켓';
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
    border-radius: 8px; /* 모서리를 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
    
`;

const Justbox = styled.div`
    padding: 40px 0;
`;

const TeamName = styled.div`
    font-weight: bold;
    color: white;
    font-size: 30px;
`;

const InputBox = styled.div`
    
`;

const TeamNameInput = styled.input`
    height: 30px;
    border-radius: 15px;
    border: none;
`;

const TeamRegionInput = styled.input`
    margin-top: 20px;
    height: 30px;
    border-radius: 15px;
    border: none;
`;

const ButtonBox = styled.div`
    
`;

const SaveButton = styled.button`
    margin-right: 20px;
    background-color: black;
    color: white;
    border-radius: 20px;
    width: 60px;
    height: 25px;
    font-family: '지마켓';
    
    
    cursor: pointer;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    &:hover {
        transform: translateY(2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    }
`;

const CancelButton = styled.button`
    margin-right: 20px;
    background-color: black;
    color: white;
    border-radius: 20px;
    width: 60px;
    height: 25px;
    font-family: '지마켓';
    
    
    cursor: pointer;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    &:hover {
        transform: translateY(2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    }
`;


const RightTeam = styled.div`
    margin-top: 30px;
    width: 70%;
    margin-left: 30px;
    background-color: white; /* 배경색을 추가하여 그림자가 더 잘 보이도록 함 */
    border-radius: 8px; /* 모서리를 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
    
`;

const Matching = styled.div`
    padding: 10px 0;
    background-color: green;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border-radius: 8px;
`;

const TeamList = styled.div`
    display: flex;
`;

const MyTeam = styled.div`
    width: 350px;
    margin-top: 40px;
`;

const MyTeamName = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const MyTeamRegion = styled.div`
    padding: 30px;
`;

const TeamNamechange = styled.div`
    background-color: black;
    color: white;
    border-radius: 20px;
    width: 100px;
    height: 25px;
    margin: 0 auto;
    margin-top: 20px;
    padding-top: 10px;
    cursor: pointer;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    &:hover {
        transform: translateY(2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    }
`;

const TeamRegion = styled.div`
    margin-top: 30px;
    color: white;
`;

const VS = styled.div`
    text-align: center;
    font-size: 50px;
    padding: 20px 0;
    margin-top: 30px;
`;

const OppositionTeam = styled.div`
    width: 350px;
    margin-top: 40px;
`;

const NoMatch = styled.div`
    margin: 0 auto;
    padding: 60px;
    font-size: 30px;
    font-weight: bold;
`;


const NoticeTeamone = styled.div`
    height: 100%;
    text-align: center;
    justify-content: center;
    gap: 50px;
    margin-top: 40px;
    font-size: 30px;
    display: flex;
`;

const Notice = styled.div`
    height: 300px;
    width: 540px;
    background-color: white; /* 배경색을 추가하여 그림자가 더 잘 보이도록 함 */
    border-radius: 8px; /* 모서리를 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
    
    overflow: auto; /* 내용이 넘칠 경우 스크롤 가능 */
`;

const NoticeTitle = styled.div`
    background-color: green; /* 배경색 설정 */
    color: white; /* 텍스트 색상 설정 (읽기 쉽게 하기 위해) */
    padding: 10px; /* 내부 여백 추가 */
    border-radius: 4px; /* 모서리를 둥글게 */
    font-weight: bold; /* 글씨 두껍게 */
`;

const NoticeBonmoon = styled.div`

`;

const NoticeItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    font-size: 15px;
`;

const NoticeJemok = styled.div`
    cursor: pointer;

    &:hover {
        text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    }
`;

const NoticeDate = styled.div`

`;

const NoNotice = styled.div`
    padding: 30px 0;
    font-size: 15px;
`;

const TeamOne = styled.div`
    height: 300px;
    width: 540px;
    background-color: white; /* 배경색을 추가하여 그림자가 더 잘 보이도록 함 */
    border-radius: 8px; /* 모서리를 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
    overflow: auto; /* 내용이 넘칠 경우 스크롤 가능 */
`;

const TeamOneTitle = styled.div`
    background-color: green; /* 배경색 설정 */
    color: white; /* 텍스트 색상 설정 (읽기 쉽게 하기 위해) */
    padding: 10px; /* 내부 여백 추가 */
    border-radius: 4px; /* 모서리를 둥글게 */
    font-weight: bold; /* 글씨 두껍게 */    
`;

const Pagination = styled.div`
    margin-top: 20px;
`;

const PageButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: darkgreen;
    }
`;

const JustFlex = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid black;
`;

const SelectedNoticeTitle = styled.div`
    margin-top: 10px;
`;

const SelectedNoticeCreatedAt = styled.div`
    font-size: 15px;
    margin-top: 20px;
`;

const SelectedNoticeContent = styled.div`
    margin-top: 30px;
    margin-left: 15px;
    display: flex;
    font-size: 15px;
`;

const BackToList = styled.div`
    padding-right: 10px;
    margin-top: 60px;
    font-size: 15px;
    cursor: pointer;
    
    &:hover {
        text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    }
`;

const TeamFlex = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
`;

const TeamOneName = styled.div`
    cursor: pointer;
    font-size: 20px;
`;

const TeamOnePosition = styled.div`
    font-size: 20px;
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 1000; /* 모달이 다른 요소 위에 나타나도록 설정 */
`;

const JemokNaeyong = styled.div`
    display: flex;
    flex-direction: column; /* 세로 방향으로 배치 */
    gap: 10px; /* 항목 간 간격 조정 */
`;

const Textarea1 = styled.textarea`
    height: 100px;
`;

const ExplodeTeam = styled.div`
    padding: 20px 10px;
    background-color: red;
    color: white;
    width: 100px;
    height: 20px;
    cursor: pointer;
`;

const CancelMatching = styled.div`
    padding: 20px 10px;
    background-color: black;
    color: white;
    width: 100px;
    height: 20px;
    cursor: pointer;
`;

const Last = styled.div`
    display: flex;
    align-items: right;
    justify-content: flex-end;
    padding-right: 200px;
    padding-top: 40px;
`;