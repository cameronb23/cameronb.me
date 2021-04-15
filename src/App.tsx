import React from 'react';

import useSWR from 'swr';

import styled from 'styled-components';

import AboutMe from './components/About';
import LanyardStatus from './components/LanyardStatus';

import avatar from './avatar.svg';

import github from './github.svg';
import twitter from './twitter.svg';

import { LanyardData } from './types';

const AppContainer = styled.div`
  color: white;
`;

const SocialRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 1rem;
`;

const SocialIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;

  fill: white;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const AvatarStatus = styled.div`
  // position: absolute;
  // bottom: 0;
  // right: 0;

  // border-width: 2px;
  // border-color: #292929;

  width: auto;

  border-radius: 10px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  display: inline-flex;
  background-color: #292929;
`;

interface LanyardResponse {
  success: boolean;
  data?: LanyardData;
}

const COLORS: Record<string, string> = {
  online: '43b581',
  idle: 'faa61a',
  dnd: 'f04747',
  offline: 'ffffff'
};

function App() {
  const { data, error } = useSWR<LanyardResponse>(
    'https://api.lanyard.rest/v1/users/325986883366551555',
    { refreshInterval: 5000 }
  );

  return (
    <AppContainer className="container mx-auto grid justify-items-center">
      <AvatarContainer className="grid justify-items-center">
        <img
          src={avatar}
          alt="logo"
          style={{ width: '256px', height: '256px' }}
        />
        <AvatarStatus
          style={{
            color: `#${COLORS[data?.data?.discord_status || 'offline']}`,
            textTransform: 'capitalize'
          }}
        >
          {data?.data?.discord_status}
        </AvatarStatus>
      </AvatarContainer>

      <SocialRow>
        <a
          href="https://github.com/cameronb23"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon src={github} alt="Github Link" />
        </a>

        <a
          href="https://twitter.com/cgalt23"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon
            src={twitter}
            alt="Twitter Link"
            style={{ marginTop: '2px' }}
          />
        </a>
      </SocialRow>

      <AboutMe />

      <LanyardStatus data={data?.data} error={error} />
    </AppContainer>
  );
}

export default App;
