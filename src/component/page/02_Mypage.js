import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [position, setPosition] = useState(null);
    const [number, setNumber] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [showWithdrawConfirmation, setShowWithdrawConfirmation] = useState(false);

    const [withdrawalPassword, setWithdrawalPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
                const { user_name, phone_number, position, passwd } = response.data;
                setNickname(user_name);
                setPassword(passwd);
                setNumber(formatPhoneNumber(phone_number));
                setPosition(position);
                console.log(password);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleWithdraw = async () => {
        // Reset previous password error
        setPasswordError('');

        // Check if entered password matches stored password
        if (withdrawalPassword !== password) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.delete(`https://3.34.133.247/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    password: withdrawalPassword,
                },
            });

            if (response.status === 204) {
                // Clear cookies and redirect to login page
                Cookies.remove('userId');
                Cookies.remove('nickname');

                // Show withdrawal success message
                alert('회원탈퇴가 완료되었습니다.');

                // Redirect to login page
                navigate('/');
            }
        } catch (error) {
            console.error('회원탈퇴 중 오류 발생:', error);
            alert('회원탈퇴 중 문제가 발생했습니다. 다시 시도해 주세요.');
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
        { name: '일정관리', component: <Schedule /> },
        { name: '문의내역', component: <Inquiry /> },
    ];

    const renderInformationContainer = () => {
        const activeTabComponent = tabs.find((tab) => tab.name === activeTab);
        return activeTabComponent ? activeTabComponent.component : <DefaultPage />;
    };

    function formatPhoneNumber(phoneNumber) {
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
                                <>
                                    <ToggleButton onClick={handleToggleClick}>{isEditing ? '완료' : '수정'}</ToggleButton>
                                    <WithdrawButton onClick={() => setShowWithdrawConfirmation(true)}>회원탈퇴</WithdrawButton>
                                </>
                            )}
                        </ButtonContainer>
                    </InfoContainer>
                </UserContainer>

                {/* Withdrawal Confirmation Modal */}
                {showWithdrawConfirmation && (
                    <ConfirmationModal>
                        <ModalContent>
                            <p>정말로 회원탈퇴를 하시겠습니까?</p>
                            <p>탈퇴 시 모든 데이터는 삭제되며 복구할 수 없습니다.</p>

                            <PasswordInputContainer>
                                <label htmlFor="withdrawal-password">비밀번호 확인:</label>
                                <PasswordInput
                                    type="password"
                                    id="withdrawal-password"
                                    value={withdrawalPassword}
                                    onChange={(e) => setWithdrawalPassword(e.target.value)}
                                    placeholder="비밀번호를 입력해주세요"
                                />
                                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                            </PasswordInputContainer>

                            <ModalButtonContainer>
                                <ConfirmButton onClick={handleWithdraw}>확인</ConfirmButton>
                                <CancelButton
                                    onClick={() => {
                                        setShowWithdrawConfirmation(false);
                                        setPasswordError('');
                                        setWithdrawalPassword('');
                                    }}
                                >
                                    취소
                                </CancelButton>
                            </ModalButtonContainer>
                        </ModalContent>
                    </ConfirmationModal>
                )}

                <ToolContainer>
                    {menuVisible && <Account />}
                    {!menuVisible && renderInformationContainer()}
                </ToolContainer>
            </RightContainer>
        </Container>
    );
}

// 기존 스타일드 컴포넌트들 (그대로 유지)
const Container = styled.div`
    display: flex;
    border-radius: 5px;
    min-height: 80vh;
    max-width: 100vw;
`;

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

const MypageContaer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 1.5vw;
`;

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
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
    justify-content: center;
`;

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

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserNameContainer = styled.div`
    font-size: 32px;
    margin-left: 30px;
`;

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

const UserPos = styled.div`
    font-size: 20px;
    margin-left: 50%;
    width: 100%;
`;

const UserEmail = styled.div`
    font-size: 1.5vw;
    margin-left: 20%;
    width: 100%;
`;

const OneLineContainer = styled.div`
    font-size: 20px;
    margin-left: 50%;
    width: 100%;
`;

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
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ToggleButton = styled.div`
    background-color: black;
    color: white;
    border-radius: 20px;
    font-size: 14px;
    padding: 6px 10px;
    cursor: pointer;
    height: 25px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

// New styled components for withdrawal
const WithdrawButton = styled.div`
    background-color: #ff4d4d;
    color: white;
    border-radius: 20px;
    font-size: 14px;
    padding: 6px 10px;
    cursor: pointer;
    height: 25px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 5px;
`;

const ConfirmationModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    width: 90%;
`;

const ModalButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const ConfirmButton = styled.button`
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
`;

const CancelButton = styled.button`
    background-color: #cccccc;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
`;

const PasswordInputContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PasswordInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 10px;
    font-size: 14px;
`;
