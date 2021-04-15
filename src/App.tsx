import React from 'react';

import styled from 'styled-components';

import AboutMe from './components/About';
import LanyardStatus from './components/LanyardStatus';

import avatar from './avatar.svg';

const AppContainer = styled.div`
  background-color: #121212;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

function App() {
  return (
    <AppContainer>
      <img src={avatar} className="App-logo" alt="logo" />

      <h3>Hi. I&apos;m Cameron.</h3>

      <AboutMe />

      <LanyardStatus />
    </AppContainer>
  );
}

export default App;
