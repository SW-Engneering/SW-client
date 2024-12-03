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
import axios from 'axios';

export default function MyPage() {
    const location = useLocation();
    const [id, setId] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [position, setPosition] = useState(null);
    const [number, setNumber] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    const MenuToggle = (e) => {
        e.stopPropagation();
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const cookieId = Cookies.get('userId');
        setId(cookieId ? cookieId : null);
    }, [location]);

    useEffect(() => {
        if (id) {
            fetchUserData(id);
        }
    }, [id]); 

    const fetchUserData = async (id) => {
        try {
            const response = await axios.get(`https://3.34.133.247/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('유저 상세 정보 불러오기 성공:', response.data);
                const { nickname, phone_number, position } = response.data;
                setNickname(nickname);
                setNumber(formatPhoneNumber(phone_number));
                setPosition(position);                
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleToggleClick = (e) => {
        MenuToggle(e);
        setIsEditing(!isEditing); // Toggle editing state
    };
    const ChangeNab = () => {
        setMenuVisible(false);
        setIsEditing(false);
    };
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

    function formatPhoneNumber(phoneNumber){
        if (phoneNumber.length !== 11) {
            return '유효하지 않은 전화번호입니다.';
        }
        const formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
        return formattedNumber;
    }

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
                            <LinkContainer onClick={ChangeNab} isSelected={activeTab === tab.name}>
                                {tab.name}{' '}
                            </LinkContainer>
                        </Link>
                    ))}
                </ImformationContainer>
            </LeftContainer>
            <RightContainer>
                <UserContainer>
                    <UserImage />
                    <InfoContainer>
                        <UserDetails>
                            <UserNameContainer>{nickname}</UserNameContainer>
                            <UserPos>{position}</UserPos>
                            <OneLineContainer>{number}</OneLineContainer>
                        </UserDetails>
                        <ButtonContainer>
                            {activeTab === null && (
                                <ToggleButton onClick={handleToggleClick}>
                                    {isEditing ? '완료' : '수정'} {/* Change button text based on isEditing state */}
                                </ToggleButton>
                            )}
                        </ButtonContainer>
                    </InfoContainer>
                </UserContainer>
                <ToolContainer>
                    {menuVisible && <Account />}
                    {!menuVisible && renderInformationContainer()}
                </ToolContainer>
            </RightContainer>
        </Container>
    );
}
//전체 컨테이너
const Container = styled.div`
    display: flex;
    border-radius: 5px;
    min-height: 80vh;
    max-width: 100vw;
`;
//마이페이지 왼쪽 컨테이너
const LeftContainer = styled.div`
    box-sizing: border-box;
    min-width: 15%;
    font-size: 30px;
    padding: 3% 1.5% 0 3%;
    border-right: 2px solid black;
    justify-content: center;
    @media (max-width: 1500px) {
        font-size: 28px;
        min-width: 18%;
    }
    @media (max-width: 1250px) {
        font-size: 25px;
    }
    @media (max-width: 1000px) {
        font-size: 22px;
        padding-left: 2.5%;
    }
    @media (max-width: 850px) {
        font-size: 20px;
    }
    @media (max-width: 600px) {
        font-size: 20px;
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
    padding: 2% 5% 0 3%;
    box-sizing: border-box;
    background-color: #ecedef;
    flex: 1;

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
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
    justify-content: center;
`;
//유저 정보 컨테이너
const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    align-items: center;
    margin-bottom: 2.5%;
    border-radius: 20px;
    background-color: white;
    padding: 25px;
    height: 120px;
`;
//유저 상세 정보 컨테이너
const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
`;
//유저 이름 컨테이너
const UserNameContainer = styled.div`
    font-size: 32px; /* Adjusted font size */
    margin-left: 30px;
`;
//유저 이미지 컨테이너
const UserImage = styled.div`
    width: 13vw;
    height: 13vw;
    max-width: 100px;
    max-height: 100px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
    margin: 0 2%;
`;
//유저 포지션 컨테이너
const UserPos = styled.div`
    font-size: 20px; /* Adjusted font size */
    margin-left: 50%;
    width: 100%;
`;
//유저 이메일 컨테이너
const UserEmail = styled.div`
    font-size: 1.5vw; /* Adjusted font size */
    margin-left: 20%;
    width: 100%;
`;
//자기소개 컨테이너
const OneLineContainer = styled.div`
    font-size: 20px; /* Adjusted font size */
    margin-left: 50%;
    width: 100%;
`;
//렌더링 컨테이너
const ToolContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: white;
    padding: 20px 25px;
    overflow-y: scroll;
    max-height: 65%;
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
    font-size: 14px;
    padding: 6px 10px;
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
