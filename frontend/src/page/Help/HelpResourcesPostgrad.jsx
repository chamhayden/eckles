import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import helpResourcesPostgradMarkdown from './HelpResourcesPostgrad.md';
import makePage from '../../component/makePage';

const ResourcesPostgrad = ({}) => {
  const [markdown, setMarkdown] = React.useState('');

  React.useEffect(() => {
    let isActive = true;
    fetch(helpResourcesPostgradMarkdown)
      .then((response) => response.text())
      .then((text) => {
        if (isActive) {
          setMarkdown(text);
        }
      });
    return () => {
      isActive = false;
    };
  }, [helpResourcesPostgradMarkdown]);

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default makePage(ResourcesPostgrad, {
  loginRequired: true,
  title: 'Postgrad',
});
