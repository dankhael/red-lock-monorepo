import { DiscussionEmbed } from 'disqus-react';

const DISQUS_SHORTNAME = process.env.REACT_APP_DISQUS_SHORTNAME;

function DisqusComments({ slug, title }) {
  if (!DISQUS_SHORTNAME) return null;

  const disqusConfig = {
    url: `${window.location.origin}/blog/${slug}`,
    identifier: slug,
    title: title,
  };

  return (
    <div className="disqus-comments">
      <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={disqusConfig} />
    </div>
  );
}

export default DisqusComments;
