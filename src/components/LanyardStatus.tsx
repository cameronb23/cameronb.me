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
  background-color: #292929;
  border-radius: 10px;
`;

const LanyardSongArt = styled.img`
  max-width: inherit;
  max-height: inherit;
  width: 140px;
  height: 140px;
  margin-right: 10px;
  border-radius: 10px;
`;

const LanyardSongDetails = styled.div`
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const SongDetailsText = styled.p`
  display: flex;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
              <SongDetailsText>{data?.data?.spotify?.song}</SongDetailsText>
              <SongDetailsText>
                by {data?.data?.spotify?.artist.split(';')[0]}
              </SongDetailsText>
              <SongDetailsText>on {data?.data?.spotify?.album}</SongDetailsText>
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
