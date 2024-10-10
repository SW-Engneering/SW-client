import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
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

    useEffect(() => {
        let currentPath = window.location.pathname;
        let parts = currentPath.split('/');
        let ocidFromUrl = parts[2];

        // ocidFromUrl이 undefined일 경우 id를 null로 설정
        setId(ocidFromUrl ? ocidFromUrl : null);
    }, [location]);

    const renderInformationContainer = () => {
        switch (activeTab) {
            case 'Account':
                return <Account />;
            case 'Mytext':
                return <Mytext />;
            case 'Favorite':
                return <Favorite />;
            case 'Review':
                return <Review />;
            case 'Inquiry':
                return <Inquiry />;
            case 'Schedule':
                return <Schedule />;
            default:
                return <DefaultPage />;
        }
    };
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
                    <Link to={`/u/${id}/mypage`} style={{ textDecoration: 'none' }}>
                        <LinkContainer onClick={() => setActiveTab('Account')} isSelected={activeTab === 'Account'}>
                            내 정보 수정
                        </LinkContainer>
                    </Link>
                    <Link to={`/u/${id}/mypage`} style={{ textDecoration: 'none' }}>
                        <LinkContainer onClick={() => setActiveTab('Mytext')} isSelected={activeTab === 'Mytext'}>
                            내 게시글 관리
                        </LinkContainer>
                    </Link>
                    <Link to={`/u/${id}/mypage`} style={{ textDecoration: 'none' }}>
                        <LinkContainer onClick={() => setActiveTab('Favorite')} isSelected={activeTab === 'Favorite'}>
                            즐겨찾기한 글
                        </LinkContainer>
                    </Link>
                    <Link to={`/u/${id}/mypage`} style={{ textDecoration: 'none' }}>
                        <LinkContainer onClick={() => setActiveTab('Schedule')} isSelected={activeTab === 'Schedule'}>
                            일정관리
                        </LinkContainer>
                    </Link>
                    <Link to={`/u/${id}/mypage`} style={{ textDecoration: 'none' }}>
                        <LinkContainer onClick={() => setActiveTab('Review')} isSelected={activeTab === 'Review'}>
                            리뷰 관리
                        </LinkContainer>
                    </Link>
                    <Link to={`/u/${id}/mypage`} style={{ textDecoration: 'none' }}>
                        <LinkContainer onClick={() => setActiveTab('Inquiry')} isSelected={activeTab === 'Inquiry'}>
                            내 문의 내역
                        </LinkContainer>
                    </Link>
                </ImformationContainer>
            </LeftContainer>
            <RightContainer>
                <UserContainer>
                    <UserImage />
                    <UserDetails>
                        <UserNameContainer>{id}</UserNameContainer>
                        <UserPos>포지션</UserPos>
                        <UserEmail>이메일</UserEmail>
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
    height: auto;
`;
const LeftContainer = styled.div`
    min-width: 19%;
    font-size: 1.875rem;
    padding-top: 3%;
    margin-right: 20px;
    padding-left: 20px;
    border-right: 2px solid black;
`;

const MypageContaer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
`;

const LinkContainer = styled.div`
    display: block;
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    margin-bottom: 15px;
    background-color: ${(props) => (props.isSelected ? '#adb5bd' : '#white')};
    cursor: pointer;
    &hover {
        background-color: #adb5bd;
    }
`;

const ImformationContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
`;
const RightContainer = styled.div`
    min-width: 71%;
    padding-top: 3%;
    margin-left: 3%;
`;
const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    margin-bottom: 5%;
`;
const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
`;
const UserNameContainer = styled.div`
    font-size: 2.1rem;
    margin-left: 30px;
`;
const UserImage = styled.div`
    width: 120px;
    height: 120px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 40px;
`;
const UserPos = styled.div`
    font-size: 1.3rem;
    margin-left: 50%;
    width: 100%;
`;
const UserEmail = styled.div`
    font-size: 1.3rem;
    margin-left: 50%;
    width: 100%;
`;
const OneLineContainer = styled.div`
    font-size: 1.1rem;
    margin-left: 50%;
    width: 100%;
`;
const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
