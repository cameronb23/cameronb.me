import React from 'react';

import styled from 'styled-components';

import useSWR from 'swr';

interface LanyardData {
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  listening_to_spotify: boolean;

  spotify?: {
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
  discord_user: {
    username: string;
    public_flags: number;
    id: string;
    discriminator: string;
    avatar: string;
  };
  discord_status: string;
  activities: any[];
}

interface LanyardResponse {
  success: boolean;
  data?: LanyardData;
}

const LanyardStatusContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  background-color: #414141;
  border-radius: 10px;
  max-height: 200px;
`;

const LanyardSongArt = styled.img`
  aspect-ratio: 1 / 1;
  flex: 1;
  max-width: inherit;
  max-height: inherit;
  width: auto;
  height: auto;
  margin-right: 10px;
`;

const LanyardSongDetails = styled.div`
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
`;

const LanyardStatus = () => {
  const { data, error } = useSWR<LanyardResponse>(
    'https://api.lanyard.rest/v1/users/325986883366551555',
    { refreshInterval: 5000 }
  );

  if (error || !data?.success) {
    console.error(error);
    return <div>Error!</div>;
  }

  if (!data && !error) {
    return <div>Loading!!!</div>;
  }

  return (
    <div>
      {data?.data?.listening_to_spotify ? (
        <>
          <h3>I&apos;m currently listening to:</h3>
          <LanyardStatusContainer>
            <LanyardSongArt
              src={data?.data?.spotify?.album_art_url}
              alt="Spotify album"
            />

            <LanyardSongDetails>
              <h4>{data?.data?.spotify?.song}</h4>
              <p>by {data?.data?.spotify?.artist}</p>
              <p>on {data?.data?.spotify?.album}</p>
            </LanyardSongDetails>
          </LanyardStatusContainer>
        </>
      ) : (
        <p>I&apos;m not currently listening to anything.</p>
      )}
    </div>
  );
};

export default LanyardStatus;
