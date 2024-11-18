import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import userData from '../../UserData';
import styled from 'styled-components';
import Avata from '../images/Generic_avatar.png';
import Account from './03_Account';
import Mytext from './03_Mytext';
import Favorite from './03_Favorites';
import Schedule from './03_Schedule';
import Review from './03_Review';
import Inquiry from './03_Inquiry';
import DefaultPage from './03_DefaultPage';

export default function MyPage() {
    const location = useLocation();
    const [id, setId] = useState(null);
    const tabs = [
        { name: '내 정보 수정', component: <Account /> },
        { name: '내 게시글 관리', component: <Mytext /> },
        { name: '즐겨찾기한 글', component: <Favorite /> },
        { name: '내 문의내역', component: <Inquiry /> },
        { name: '일정관리', component: <Schedule /> },
        { name: '회원탈퇴', component: <Review /> },
    ];

    const renderInformationContainer = () => {
        const activeTabComponent = tabs.find((tab) => tab.name === activeTab);
        return activeTabComponent ? activeTabComponent.component : <DefaultPage />;
    };
    useEffect(() => {
        let currentPath = window.location.pathname;
        let parts = currentPath.split('/');
        let ocidFromUrl = parts[2];

        // ocidFromUrl이 undefined일 경우 id를 null로 설정
        setId(ocidFromUrl ? ocidFromUrl : null);
    }, [location]);

    const [activeTab, setActiveTab] = useState(null);
    return (
        <Container>
            <LeftContainer>
                <ImformationContainer>
                    <MypageContaer>
                        <Link to={`/u/${id}/mypage`} style={{ textDecoration: 'none', color: 'black' }} onClick={() => setActiveTab(null)}>
                            마이페이지
                        </Link>
                    </MypageContaer>
                    {tabs.map((tab) => (
                        <Link key={tab.name} to={`/u/${id}/mypage`} style={{ textDecoration: 'none' }} onClick={() => setActiveTab(tab.name)}>
                            <LinkContainer isSelected={activeTab === tab.name}>{tab.name} </LinkContainer>
                        </Link>
                    ))}
                </ImformationContainer>
            </LeftContainer>
            <RightContainer>
                <UserContainer>
                    <UserImage />
                    <UserDetails>
                        <UserNameContainer>{id}</UserNameContainer>
                        <UserPos>포지션</UserPos>
                        <OneLineContainer>자기소개</OneLineContainer>
                    </UserDetails>
                </UserContainer>
                <ToolContainer>{renderInformationContainer()}</ToolContainer>
            </RightContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    border-radius: 5px;
    max-width: 100%;
    padding: 0 10%;
    height: 82vh;
`;
const LeftContainer = styled.div`
    box-sizing: border-box;
    min-width: 15%;
    font-size: 30px;
    padding: 3% 0 0 3%;
    /* padding-left: 3%; */
    border-right: 2px solid black;
    text-align: left;
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
    padding: 4% 0 0 3%;
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

const ImformationContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
`;
const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-radius:20px;
    align-items: center;
    justify-content:left;
    margin:0 0 5% 3%;
    background-color:white;
    padding:3%;
`;
const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
`;
const UserNameContainer = styled.div`
    font-size: 3vw; /* Adjusted font size */
    margin-left: 30px;
`;
const UserImage = styled.div`
    width: 13vw; 
    height: 13vw;
    max-width: 120px;
    max-height: 120px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 6%;
`;

const UserPos = styled.div`
    font-size: 1.5vw; /* Adjusted font size */
    margin-left: 20%;
    width: 100%;
`;

const UserEmail = styled.div`
    font-size: 1.5vw; /* Adjusted font size */
    margin-left: 20%;
    width: 100%;
`;

const OneLineContainer = styled.div`
    font-size: 1.2vw; /* Adjusted font size */
    margin-left: 20%;
    width: 100%;
`;
const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin:3% 0 0 3%;
    padding:3%;
    background-color:white;
    border-radius:20px;
`;
