import React from 'react';

import styled from 'styled-components';

import useSWR from 'swr';

interface DiscordActivity {
  type: number; // 0 is game, 2 is Spotify
  timestamps: {
    start: number;
    end?: number;
  };
  state: string;
  name: string;
  id: string;
  flags: number;
  details: string;
  assets: {
    small_text?: string;
    small_image?: string;
    large_text?: string;
    large_image?: string;
  };
}

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
  activities: DiscordActivity[];
}

interface LanyardResponse {
  success: boolean;
  data?: LanyardData;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  align-items: center;
`;

const LanyardStatusContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  background-color: #292929;
  border-radius: 10px;
  min-width: 400px;
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

const DiscordMock = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #292929;
  padding: 5px;
  padding-right: 10px;
  border-radius: 10px;
  min-width: 200px;
  align-items: center;
`;

const DiscordAvatarContainer = styled.div`
  position: relative;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 10px;

  div {
    position: absolute;
    bottom: 0;
    right: 0;

    border-width: 2px;
    border-color: #292929;
    border-radius: 50%;
  }
`;

const DiscordAvatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const DiscordInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: space-between;

  p {
    margin: 0;
    color: #8e9297;
  }
`;

const COLORS: Record<string, string> = {
  online: '43b581',
  away: 'faa61a',
  dnd: 'f04747'
};

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

  const isPlaying =
    data?.data?.activities != null && data?.data?.activities.length > 0;
  const game = data?.data?.activities.find((a) => a.type === 0);

  return (
    <Wrapper>
      <DiscordMock>
        <DiscordAvatarContainer>
          <DiscordAvatar
            src={`https://cdn.discordapp.com/avatars/${data?.data?.discord_user?.id}/${data?.data?.discord_user?.avatar}.webp?size=128`}
          />
          <div
            style={{
              backgroundColor: `#${
                COLORS[data?.data?.discord_status || 'offline']
              }`,
              width: '10px',
              height: '10px'
            }}
          />
        </DiscordAvatarContainer>
        <DiscordInfo>
          <p style={{ fontSize: '16px;' }}>Cameron</p>
          {isPlaying && game != null && (
            <p style={{ fontSize: '12px;' }}>Playing {game.name}</p>
          )}
        </DiscordInfo>
      </DiscordMock>
      {data?.data?.listening_to_spotify && (
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
      )}
    </Wrapper>
  );
};

export default LanyardStatus;
