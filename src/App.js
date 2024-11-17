import logo from './logo.svg';
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
import Mamber from './component/page/02_Member';
import Management from './component/page/02_Management';
import Match from './component/page/02_Match';
import Team from './component/page/02_Team';
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
                        <Route path="/" element={<Home />} />
                        <Route path="/mypage" element={<Mypage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/member" element={<Mamber />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/match" element={<Match />} />
                        <Route path="/management" element={<Management />} />
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
    min-height: 100vh;
`;

const InsideContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export default App;
