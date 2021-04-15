import React from 'react';

import styled from 'styled-components';

import LanyardStatus from './components/LanyardStatus';

import avatar from './avatar.svg';

import './App.css';

const AppContainer = styled.div`
  background-color: #292929;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function App() {
  return (
    <AppContainer>
      <header className="App-header">
        <img src={avatar} className="App-logo" alt="logo" />

        <LanyardStatus />
      </header>
    </AppContainer>
  );
}

export default App;
