import React from 'react';
import Divider from '@mui/material/Divider';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import HelpNodeSite from '../../asset/help-nodejs-site.png';
import HelpRepl from '../../asset/help-repl.png';
import HelpDownload from '../../asset/download.png';
import HelpExe from '../../asset/exe.png';
import HelpLocalMac from '../../asset/local-mac.png';
import HelpCseLab from '../../asset/cselab.png';

import helpInstallationMarkdown from './HelpInstallation.md';
import makePage from '../../component/makePage';

const IMAGE_MAP = {
  'help-nodejs-site.png': HelpNodeSite,
  'help-repl.png': HelpRepl,
  'download.png': HelpDownload,
  'exe.png': HelpExe,
  'local-mac.png': HelpLocalMac,
  'cselab.png': HelpCseLab,
};

const IMAGE_STYLES = {
  'help-nodejs-site.png': { width: '80%', maxWidth: '600px', marginTop: '10px' },
  'help-repl.png': { width: '80%', maxWidth: '400px', marginTop: '10px' },
  'download.png': { width: '80%', maxWidth: '700px', marginTop: '10px' },
  'exe.png': { width: '80%', maxWidth: '700px', marginTop: '10px' },
  'local-mac.png': { width: '80%', maxWidth: '700px', marginTop: '10px' },
  'cselab.png': { width: '80%', maxWidth: '700px', marginTop: '10px' },
};

const getImageKey = (src = '') => src.split('/').pop();

const HelpInstallation = ({}) => {
  const [markdown, setMarkdown] = React.useState('');

  React.useEffect(() => {
    let isActive = true;
    fetch(helpInstallationMarkdown)
      .then((response) => response.text())
      .then((text) => {
        if (isActive) {
          setMarkdown(text);
        }
      });
    return () => {
      isActive = false;
    };
  }, [helpInstallationMarkdown]);

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        hr: () => <Divider sx={{ mb: 3, mt: 3 }} />,
        a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
        img: ({ node: _node, src, alt, ...props }) => {
          const imageKey = getImageKey(src);
          const mappedSrc = IMAGE_MAP[imageKey] || src;
          const style = {
            maxWidth: '100%',
            ...(IMAGE_STYLES[imageKey] || {}),
            ...(props.style || {}),
          };
          return <img {...props} src={mappedSrc} alt={alt || ''} style={style} />;
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default makePage(HelpInstallation, {
  loginRequired: false,
  title: 'Installation Help',
});
