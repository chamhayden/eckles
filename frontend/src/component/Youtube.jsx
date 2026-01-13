import React from 'react';

import { Context, useContext } from '../context';
import { getYoutubeCodeFromUrl } from '../util/content';
import { isMobileWidth, isDesktopWidth } from '../util/screen';

const Youtube = ({ code }) => {
  const { getters, setters } = useContext(Context);

  const factor = isMobileWidth() ? 0.8 : isDesktopWidth() ? 0.91 : 0.88
  const width = window.innerWidth * factor - (getters.sidebarOpen ? 230 : 0);

  const codeShort = code.includes('https') ? getYoutubeCodeFromUrl(code) : code;

  return (<>
    <div style={{margin: '0 auto', textAlign: 'center'}}>
      <iframe
        width={width}
        height={Math.round(9/16*width)}
        src={`https://www.youtube.com/embed/${codeShort}`}
        frameBorder="0" 
        allowFullScreen
        style={{
          margin: '25px 10px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        }}
      ></iframe>
    </div>
  </>);
}

export default Youtube;