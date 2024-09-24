import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

export default function Nav(){
    return (
        <Container>
            <Navbar>
                <Navi activeClassName="active" exact to="/soccer">
                    축구/풋살
                </Navi>
                <Navi activeClassName="active" to="/footvolleyball">
                    족구
                </Navi>                
                <Navi activeClassName="active" to="/basketball">
                    농구
                </Navi>
                <Navi activeClassName="active" to="/volleyball">
                    배구
                </Navi>
                <Navi activeClassName="active" to="/tabletennis">
                    탁구
                </Navi>
                <Navi activeClassName="active" to="/tennis">
                    테니스
                </Navi>
                <Navi activeClassName="active" to="/badminton">
                    배드민턴
                </Navi>
                <Navi activeClassName="active" to="/bowling">
                    볼링
                </Navi> 
                <Navi activeClassName="active" to="/etc">
                    기타
                </Navi>
                                         
            </Navbar>
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    justify-content : left;
    align-items: center;
    width:100%;
    padding: 7px 0px;
    background-color:#d9d9d9;
`;
const Navbar = styled.div`
    font-size:13px;
    margin:8px;
    gap:5vw;
`;
const Navi = styled(NavLink)`
    word-spacing: 5px;
    color: #000000;
    font-size: 13px;
    margin: 8px;
    text-decoration: none;
    &.active {
        text-decoration: underline;
    }
`;