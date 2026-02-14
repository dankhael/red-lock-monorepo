export default {
  async feed(ctx) {
    const siteUrl = process.env.SITE_URL || 'https://dankredbox.com';

    try {
      const posts = await strapi.documents('api::post.post').findMany({
        sort: { publishedAt: 'desc' },
        limit: 20,
        status: 'published',
      });

      const xml = strapi
        .service('api::rss.rss')
        .buildRssXml(posts, siteUrl);

      ctx.type = 'application/rss+xml';
      ctx.body = xml;
    } catch (error) {
      strapi.log.error('RSS feed generation error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to generate RSS feed' };
    }
  },
};
