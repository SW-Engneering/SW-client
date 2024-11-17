import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import Avata from '../images/Generic_avatar.png';
import Account from './03_Account';
import Mytext from './03_Mytext';
import Favorite from './03_Favorites';
import Schedule from './03_Schedule';
import Inquiry from './03_Inquiry';
import DefaultPage from './03_DefaultPage';

export default function MyPage() {
    const location = useLocation();
    const [id, setId] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    const MenuToggle = (e) => {
        e.stopPropagation();
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const cookieId = Cookies.get('userId');
        setId(cookieId ? cookieId : null);
    }, [location]);

    const tabs = [
        { name: '내 게시글 관리', component: <Mytext /> },
        { name: '즐겨찾기한 글', component: <Favorite /> },
        { name: '내 문의내역', component: <Inquiry /> },
        { name: '일정관리', component: <Schedule /> },
    ];

    const renderInformationContainer = () => {
        const activeTabComponent = tabs.find((tab) => tab.name === activeTab);
        return activeTabComponent ? activeTabComponent.component : <DefaultPage />;
    };

    return (
        <Container>
            <LeftContainer>
                <ImformationContainer>
                    <MypageContaer>
                        <Link to={`/mypage`} style={{ textDecoration: 'none', color: 'black' }} onClick={() => setActiveTab(null)}>
                            마이페이지
                        </Link>
                    </MypageContaer>
                    {tabs.map((tab) => (
                        <Link key={tab.name} to={`/mypage`} style={{ textDecoration: 'none' }} onClick={() => setActiveTab(tab.name)}>
                            <LinkContainer isSelected={activeTab === tab.name}>{tab.name} </LinkContainer>
                        </Link>
                    ))}
                </ImformationContainer>
            </LeftContainer>
            <RightContainer>
                <UserContainer>
                    <UserImage />
                    <InfoContainer>
                        <UserDetails>
                            <UserNameContainer>{id}</UserNameContainer>
                            <UserPos>포지션</UserPos>
                            <OneLineContainer>자기소개</OneLineContainer>
                        </UserDetails>
                        <ButtonContainer>
                            {menuVisible && <Account />}
                            <ToggleButton onClick={(e) => MenuToggle(e)}>수정</ToggleButton>
                        </ButtonContainer>
                    </InfoContainer>
                </UserContainer>
                <ToolContainer>{renderInformationContainer()}</ToolContainer>
            </RightContainer>
        </Container>
    );
}
//전체 컨테이너
const Container = styled.div`
    display: flex;
    border-radius: 5px;
    max-width: 100%;
    /* padding: 0 10%; */
    height: 84vh;
`;
//마이페이지 왼쪽 컨테이너
const LeftContainer = styled.div`
    box-sizing: border-box;
    min-width: 15%;
    font-size: 30px;
    padding: 3% 0 0 3%;
    /* padding-left: 3%; */
    border-right: 2px solid black;
    text-align: left;
    padding-left: 5%;
    @media (max-width: 1500px) {
        font-size: 28px;
        min-width: 17%;
    }
    @media (max-width: 1250px) {
        font-size: 25px;
        min-width: 17%;
    }
    @media (max-width: 1000px) {
        font-size: 22px;
        padding-left: 2.5%;
        min-width: 24%;
    }
    @media (max-width: 850px) {
        font-size: 20px;
        min-width: 20%;
    }
    @media (max-width: 600px) {
        font-size: 20px;
        min-width: 29%;
        padding-left: 2.5%;
    }
    @media (max-width: 400px) {
        font-size: 16px;
        min-width: 31%;
    }
    @media (max-width: 350px) {
        padding-left: 2%;
    }
`;
//마이페이지 오른쪽 컨테이너
const RightContainer = styled.div`
    min-width: 85%;
    padding: 4% 5% 0 3%;
    box-sizing: border-box;
    background-color: #ecedef;
    @media (max-width: 800px) {
        width: 95%;
        padding-top: 5%;
    }
    @media (max-width: 800px) {
        min-width: 63%;
    }
`;
//마이페이지 글자 컨테이너
const MypageContaer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 1.5vw; /* Adjusted font size */
`;

//메뉴바 글자 컨테이너
const LinkContainer = styled.div`
    display: block;
    text-decoration: none;
    font-size: 26px;
    margin-bottom: 15px;
    color: ${(props) => (props.isSelected ? 'black' : '#adb5bd')};
    cursor: pointer;
    &hover {
        background-color: #b5b7ba;
    }
    @media (max-width: 2560px) {
        font-size: 24px;
    }
    @media (max-width: 1920px) {
        font-size: 22px;
    }
    @media (max-width: 1280px) {
        font-size: 20px;
    }
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;
//왼쪽 네비바 전체 컨테이너
const ImformationContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
`;
//유저 정보 컨테이너
const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2.5%;
    border-radius: 20px;
    background-color: white;
    padding: 25px;
    height: 200px;
`;
//유저 상세 정보 컨테이너
const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
`;
//유저 이름 컨테이너
const UserNameContainer = styled.div`
    font-size: 40px; /* Adjusted font size */
    margin-left: 30px;
`;
//유저 이미지 컨테이너
const UserImage = styled.div`
    width: 15vw; /* 뷰포트 너비의 15% */
    height: 15vw; /* 뷰포트 너비의 15% */
    max-width: 120px; /* 최대 너비 */
    max-height: 120px; /* 최대 높이 */
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 40px;
`;
//유저 포지션 컨테이너
const UserPos = styled.div`
    font-size: 25px; /* Adjusted font size */
    margin-left: 50%;
    width: 100%;
`;
//유저 이메일 컨테이너
const UserEmail = styled.div`
    font-size: 1.5vw; /* Adjusted font size */
    margin-left: 50%;
    width: 100%;
`;
//자기소게 컨테이너
const OneLineContainer = styled.div`
    font-size: 25px; /* Adjusted font size */
    margin-left: 50%;
    width: 100%;
`;
//렌더링 컨테이너
const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background-color: white;
    padding: 25px;
`;
const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between; /* 양쪽 끝으로 배치 */
    align-items: center;
    width: 100%; /* 전체 너비 사용 */
`;
// ToggleButton의 스타일을 조정할 수 있습니다.
const ToggleButton = styled.div`
    background-color: black;
    color: white;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    height: 25px; /* 높이를 조정 */
    text-align: center;
    align-items: center;
    display: flex; /* 중앙 정렬을 위한 flex 사용 */
    justify-content: center; /* 중앙 정렬 */
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
