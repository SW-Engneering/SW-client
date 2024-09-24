import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './component/layout/Header';
import Nav from './component/layout/Nav';
import Home from './component/layout/Home';
import Signup from './component/page/01_Signup';
import Team from './component/page/Team';
import Login from './component/page/01_Login';
import Footer from './component/layout/Footer';
import Soccer from './component/page/02_Soccer';
import Footvolleyball from './component/page/02_Footvolleyball';
import Basketball from './component/page/02_Basketball';
import Volleyball from './component/page/02_Volleyball';
import Tabletennis from './component/page/02_Tabletennis';
import Tennis from './component/page/02_Tennis';
import Badminton from './component/page/02_Badminton';
import Bowling from './component/page/02_Bowling';
import Etc from './component/page/02_Etc';
import Player from './component/page/Player';
import Match from './component/page/Match';

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
            <Route path="/soccer" element={<Soccer/>} />
            <Route path="/footvolleyball" element={<Footvolleyball/>}/>
            <Route path='/basketball' element={<Basketball/>}/>
            <Route path='/volleyball' element={<Volleyball/>}/>
            <Route path='/tabletennis' element={<Tabletennis/>}/>
            <Route path='/tennis' element={<Tennis/>}/>
            <Route path='/badminton' element={<Badminton/>}/>
            <Route path='/bowling' element={<Bowling/>}/>
            <Route path='/etc' element={<Etc/>}/>
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
