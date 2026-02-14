function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default {
  buildRssXml(posts: any[], siteUrl: string): string {
    const items = posts
      .map((post) => {
        const link = `${siteUrl}/blog/${post.slug}`;
        const pubDate = post.publishedOn || post.publishedAt || post.createdAt;

        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(post.content || post.excerpt || '')}</description>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}
    </item>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Red Box Blog</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Meu blog pessoal, minha caixa vermelha.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl)}/api/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  },
};
