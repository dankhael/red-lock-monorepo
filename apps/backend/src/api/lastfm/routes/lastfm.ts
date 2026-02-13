export default {
  routes: [
    {
      method: 'GET',
      path: '/lastfm/recent-tracks',
      handler: 'lastfm.recentTracks',
      config: {
        auth: false,
      },
    },
  ],
};
