import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './component/layout/Header';
import Nav from './component/layout/Nav';
import Home from './component/layout/Home';
import Signup from './component/page/01_Signup';
import Login from './component/page/01_Login';
import Footer from './component/layout/Footer';
import Mypage from './component/page/02_Mypage';
import Member from './component/page/02_Member';
import MemberWrite from './component/page/02_Member_Write';
import MemberDetail from './component/page/02_MemberDetail';
import Management from './component/page/02_Management';
import JoinOrCreate from './component/page/02_JoinOrCreate';
import Createteam from './component/page/02_create_team';
import Match from './component/page/02_Match';
import MatchWrite from './component/page/02_Match_Write';
import MatchDetail from './component/page/02_MatchDetail';
import Team from './component/page/02_Team';
import TeamWrite from './component/page/02_Team_Write';
import TeamDetail from './component/page/02_TeamDetail';
import Vote from './component/page/02_Vote';

function App() {
    return (
        <BrowserRouter>
            <Container>
                    <Header />
                    <Nav />
                    <InsideContainer>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/mypage" element={<Mypage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/member" element={<Member />} />
                            <Route path="/memberwrite" element={<MemberWrite />} />
                            <Route path="/member/:post_id" element={<MemberDetail />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/teamwrite" element={<TeamWrite />} />
                            <Route path="/team/:post_id" element={<TeamDetail />} />
                            <Route path="/match" element={<Match />} />
                            <Route path="matchwrite" element={<MatchWrite />} />
                            <Route path="match/:post_id" element={<MatchDetail />} />
                            <Route path="/management" element={<Management />} />
                            <Route path="/join_or_create" element={<JoinOrCreate />} />
                            <Route path="/create_team" element={<Createteam />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/  " element={<Vote />} />
                        </Routes>
                    </InsideContainer>
                <Footer />
            </Container>
        </BrowserRouter>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const InsideContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 80vh;
`;

export default App;