import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        // 쿠키에서 nickname 가져오기
        const cookieId = Cookies.get('nickname');
        if (cookieId) {
            setId(cookieId);
            setLogin(true); // 쿠키가 존재하면 로그인 상태로 설정
        } else {
            setLogin(false); // 쿠키가 없으면 비로그인 상태로 설정
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('nickname'); // 쿠키 제거
        setId(null); // 상태 명시적 업데이트
        setLogin(false); // 로그인 상태 업데이트
        navigate('/'); // 홈으로 리디렉션
    };

    const guestMenu = [
        { to: '/login', text: '로그인' },
        { to: '/signup', text: '회원가입' },
    ];

    const userMenu = [
        { to: `/u/${id}/mypage`, text: `안녕하세요 ${id}님` },
        { to: '/', text: '로그아웃', onClick: handleLogout },
    ];

    // login 상태에 따라 메뉴 항목 결정
    const menuItems = login ? userMenu : guestMenu;

    return (
        <Container>
            {menuItems.map((item) => (
                <NaviMenu
                    key={item.to}
                    to={item.to}
                    active={location.pathname === item.to}
                    onClick={
                        item.onClick
                            ? (e) => {
                                  e.preventDefault(); // 기본 동작 방지
                                  item.onClick(); // 로그아웃 처리
                              }
                            : undefined
                    }
                >
                    <NaviText>{item.text}</NaviText>
                </NaviMenu>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 끝으로 배치 */
    align-items: center;
    color: white;
    background-color: #007bff; /* 배경색 변경 */
    height: 60px; /* 헤더 높이 */
    font-size: 15px;
    padding: 7px 30px; /* 좌우 패딩 추가 */
    max-width: 100%;
`;

const NaviMenu = styled(Link)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black; /* 텍스트 색상 */
    margin: 0 15px; /* 좌우 마진 */
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    font-size: ${({ active }) => (active ? '15px' : '13px')};

    &:hover {
        color: #0056b3; /* 호버 색상 */
    }
`;

const NaviText = styled.div`
    // 하단네비바 텍스트 스타일
`;
