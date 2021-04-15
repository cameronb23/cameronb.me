export interface DiscordActivity {
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

export interface LanyardData {
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
