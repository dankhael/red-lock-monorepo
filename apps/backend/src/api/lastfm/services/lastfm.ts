const LASTFM_API_BASE = 'https://ws.audioscrobbler.com/2.0/';

export default {
  async getRecentTracks(user: string, apiKey: string, limit: number = 15) {
    const url = `${LASTFM_API_BASE}?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status} ${response.statusText}`);
    }

    const data: any = await response.json();
    return data.recenttracks?.track || [];
  },
};
