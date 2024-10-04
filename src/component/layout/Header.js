import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Header() {
    const location = useLocation(); 
    const [id, setId] = useState(null);

    useEffect(() => {
        let currentPath = window.location.pathname;
        let parts = currentPath.split('/');
        let ocidFromUrl = parts[2];

        // ocidFromUrl이 undefined일 경우 id를 null로 설정
        setId(ocidFromUrl ? ocidFromUrl : null);
    }, [location]);

    const guestMenu = [
        { to: '/login', text: '로그인' },
        { to: '/signup', text: '회원가입' }
    ];
    const userMenu = [
        { to: '/mypage', text: '안녕하세요' }
    ];
    
    // id가 null이 아닐 때 userMenu를 사용하도록 수정
    const menuItems = id === null ? guestMenu : userMenu;

    return (
        <Container>
            {menuItems.map((item) => (
                <NaviMenu key={item.to} to={item.to} active={location.pathname === item.to}>
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
    background-color: black;
    height: 20px;
    font-size: 15px;
    padding: 7px 20px; /* 좌우 패딩 추가 */
    max-width: 100%;
`;

const NaviMenu = styled(Link)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white;
    flex: 1;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    font-size: ${({ active }) => (active ? '12px' : '10px')};
`;

const NaviText = styled.div`
    // 하단네비바 텍스트 스타일
`;
