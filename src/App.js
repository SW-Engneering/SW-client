import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './component/Header';
import Nav from './component/Nav';
import Home from './component/Home';
import Signup from './component/Signup';
import Team from './component/Team';
import Login from './component/Login';
import Footer from './component/Footer';
import Player from './component/Player';
import Match from './component/Match';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Nav />
        <InsideContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/team" element={<Team />} />
            <Route path="/player" element={<Player/>}/>
            <Route path='/match' element={<Match/>}/>
            <Route path='/signup' element={<Signup/>}/>
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
`;

export default App;
