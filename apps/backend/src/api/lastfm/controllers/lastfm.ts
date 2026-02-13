export default {
  async recentTracks(ctx) {
    const apiKey = process.env.LASTFM_API_KEY;
    const user = process.env.LASTFM_USER || 'dankhael';

    if (!apiKey) {
      ctx.status = 500;
      ctx.body = { error: 'Last.fm API key is not configured' };
      return;
    }

    try {
      const tracks = await strapi
        .service('api::lastfm.lastfm')
        .getRecentTracks(user, apiKey);

      ctx.body = { data: tracks };
    } catch (error) {
      strapi.log.error('Last.fm API error:', error);
      ctx.status = 502;
      ctx.body = { error: 'Failed to fetch Last.fm data' };
    }
  },
};
