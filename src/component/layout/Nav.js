import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import ball from '../images/ball.png';
import Cookies from 'js-cookie';
import axios from 'axios';



export default function Nav() {

    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    
    

    const teamGwanLiMotDeGa = async (asdf) => {
        try {
            const userResponse = await axios.get(`https://3.34.133.247/user/${userId}`);
            const { team_id } = userResponse.data; // team_id 추출
            console.log(team_id);

            if(userId) {
                if(team_id) {
                    navigate('/management');
                }
                else {
                    const confirm = window.confirm('asdf?');
                    if(confirm) {
                        navigate('/create_team');
                    }
                }
            }
        } catch(error) {
            alert('로그인이 필요한 기능입니다.');
            navigate('/login');
        }

        
    }
    return (
        <Container>
            <a href="/">
                <LogoContainer>
                    Sport
                    <LogoImage />
                    Match
                </LogoContainer>
            </a>

            <Navbar>
                <NaviContainer>
                    <Navi activeClassName="active" exact to="/member">
                        팀원 구하기
                    </Navi>
                </NaviContainer>
                <NaviContainer>
                    <Navi activeClassName="active" to="/team">
                        팀 구하기
                    </Navi>
                </NaviContainer>
                <NaviContainer>
                    <Navi activeClassName="active" to="/match">
                        팀 매칭하기
                    </Navi>
                </NaviContainer>
                <NaviContainer>
                    <Shit onClick={teamGwanLiMotDeGa}>
                        팀 관리
                    </Shit>
                </NaviContainer>
            </Navbar>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 10px;
    width: 100%;
    background-color: white;
    border-bottom: 2px solid #ecedef; /* 하단 회색 줄 */
    font-family: 'Pretendard-Regular';
`;

const LogoImage = styled.div`
    background-image: url(${ball});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 50px;
    width: 50px;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 50px;
    font-family: NFL;
    color: black;
    justify-content: center;
    padding: 0px 100px;
    margin-bottom: 10px;
    text-decoration: none;
`;

const Navbar = styled.div`
    font-size: 20px;
    margin-left: 150px;
    gap: 5vw;
    display: flex;
`;

const NaviContainer = styled.div`
    display: flex;

    &:hover {
        color: blue; /* 마우스 오버 시 글자 색상 */
        text-decoration: underline; /* 마우스 오버 시 밑줄 추가 */
    }

    &.active {
        color: blue;
        text-decoration: underline; /* 활성화된 링크에 밑줄 추가 */
    }
`;

const Navi = styled(NavLink)`
    color: #000000;
    font-size: 17px;
    font-weight: bold;
    font-family: ${(props) => props.fontFamily || 'inherit'};
    margin-bottom:10px;
    text-decoration: none;
`;

const Shit = styled.div`
    color: #000000;
    font-size: 17px;
    font-weight: bold;
    font-family: ${(props) => props.fontFamily || 'inherit'};
    margin-bottom:10px;
    text-decoration: none;
    cursor: pointer;
`;
