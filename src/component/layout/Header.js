import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState(null);

    useEffect(() => {
        const cookieId = Cookies.get('userId');
        // ocidFromUrl이 undefined일 경우 id를 null로 설정
        setId(cookieId ? cookieId : null);
    }, [location]);

    const handleLogout = () => {
        // 로그아웃 처리
        Cookies.remove('userId');
        setId(null); // id를 null로 설정하여 메뉴 업데이트
        navigate('/');
    };

    const guestMenu = [
        { to: '/login', text: '로그인' },
        { to: '/signup', text: '회원가입' },
    ];
    const userMenu = [
        { to: `/mypage`, text: `안녕하세요 ${id}님` },
        { to: '/', text: '로그아웃', onClick: handleLogout },
    ];

    // id가 null이 아닐 때 userMenu를 사용하도록 수정
    const menuItems = id === null ? guestMenu : userMenu;

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
                                  e.preventDefault();
                                  item.onClick();
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
    border-bottom: 2px solid #ecedef;
    align-items: center;
    color: white;
    background-color: white;
    height: 20px;
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
    color: black;
    margin: 30px;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    font-size: ${({ active }) => (active ? '15px' : '13px')};
`;

const NaviText = styled.div`
    // 하단네비바 텍스트 스타일
`;
