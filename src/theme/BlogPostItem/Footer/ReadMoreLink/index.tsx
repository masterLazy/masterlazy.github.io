import React, { type ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogPostItem/Footer/ReadMoreLink';

function ReadMoreLabel() {
  return (
    <b>阅读全文 →</b>
  );
}

export default function BlogPostItemFooterReadMoreLink(
  props: Props,
): ReactNode {
  const { blogPostTitle, ...linkProps } = props;
  return (
    <Link
      aria-label={translate(
        {
          message: 'Read more about {title}',
          id: 'theme.blog.post.readMoreLabel',
          description:
            'The ARIA label for the link to full blog posts from excerpts',
        },
        { title: blogPostTitle },
      )}
      {...linkProps}>
      <ReadMoreLabel />
    </Link>
  );
}
