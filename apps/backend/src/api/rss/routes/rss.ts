export default {
  routes: [
    {
      method: 'GET',
      path: '/rss',
      handler: 'rss.feed',
      config: {
        auth: false,
      },
    },
  ],
};
