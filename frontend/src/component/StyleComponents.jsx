import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Body = (props) => {
  return (
    <Typography {...props} variant="body1" style={{ padding: '10px 0'}}>
      {props.children}
    </Typography>
  )
}

export const H3 = (props) => {
  return (
    <Typography id={props.id} {...props} variant="h4" component="div" gutterBottom>
      {props.children}
    </Typography>
  );
}

export const H5 = (props) => {
  return (
    <Typography id={props.id} {...props} variant="h5" component="div" gutterBottom>
      {props.children}
    </Typography>
  );
}

export const HR = () => {
  return <Divider sx={{ mb: 3, mt: 3, }} />
}

export const Code = (props) => {
  /*<div style={{ maxWidth: props.large ? '100%' : props.medium ? '800px' : '500px' }}>*/
  return (
    <div style={{ maxWidth: '800px' }}>
      <SyntaxHighlighter
        style={a11yDark}
        language={props.lang}
      >
        {props.children}
      </SyntaxHighlighter>
    </div>
  )
}

export const Example = (props) => {
  const [expand, setExpand] = React.useState(false);

  return (
    <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 15px', borderRadius: '15px'}} my={2}>
      <Box sx={{ cursor: 'pointer' }} p={1} onClick={() => setExpand(!expand)}>
        <Body>
          <span>{expand ? '⬇️' : '⬆️'}</span>
          💡 <b>{`${(props.title ?? 'Example')}:`} </b>
        </Body>
      </Box>

      <Collapse in={expand} unmountOnExit>
        <Box component='hr' m={0}/>
        <div style={{ marginLeft: '20px', marginBottom: '20px', padding: '4px' }}>
          {props.bads && props.bads.map((bad, idx) => {
            return (
              <>
                <Body tyle={{paddingTop: '20px'}} key={idx}><b>🔴 Bad</b></Body>
                <Code lang={props.lang} large={props.large} medium={props.medium}>{bad}</Code>
              </>
            )
          })}
          {props.goods && props.goods.map((good, idx) => {
            return (
              <>
                <Body style={{paddingTop: '20px'}} key={idx}><b>🟢 Good</b></Body>
                <Code lang={props.lang} large={props.large} medium={props.medium}>{good}</Code>
              </>
            )
          })}
        </div>  
      </Collapse>
    </Box>
  )
}

export const ExampleImages = ({ title, srcArray = [] }) => {
  const [expand, setExpand] = React.useState(false);

  return (
    <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 15px', borderRadius: '15px'}} my={2}>
      <Box sx={{ cursor: 'pointer' }} p={1} onClick={() => setExpand(!expand)}>
        <Body>
          <span>
            {expand ? '⬇️' : '⬆️'}
          </span>
          💡 <b>{`${(title ?? 'Example')}:`} </b>
        </Body>
      </Box>
      <Collapse in={expand} unmountOnExit>
        <Box component='hr' m={0}/>
        <Box p={1}>
          {srcArray.map((asset, idx) => (
            <CaptionedImage src={asset.src} alt={`Example #${idx + 1}`} caption={asset.caption} />
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}

const CaptionedImage = ({ src, alt, caption }) => (
  <Box mb={4}>
    <Box
      component='img'
      src={src}
      alt={alt}
      maxWidth='700px'
      width='100%'
    />
    <Typography><i>{caption ?? ''}</i></Typography>
  </Box>
)
