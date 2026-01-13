import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const Body = (props) => {
  return (
    <Typography {...props} variant="body1" sx={{ 
      padding: '0',
      marginBottom: '1.25em',
      lineHeight: 1.7,
      fontSize: '1rem',
    }}>
      {props.children}
    </Typography>
  )
}

export const H3 = (props) => {
  return (
    <Typography id={props.id} {...props} variant="h4" component="div" sx={{ 
      marginTop: '1.5em',
      marginBottom: '0.6em',
      lineHeight: 1.35,
    }}>
      {props.children}
    </Typography>
  );
}

export const H5 = (props) => {
  return (
    <Typography id={props.id} {...props} variant="h5" component="div" sx={{ 
      marginTop: '1.25em',
      marginBottom: '0.6em',
      lineHeight: 1.4,
    }}>
      {props.children}
    </Typography>
  );
}

export const HR = () => {
  return <Divider sx={{ my: 4 }} />
}

export const Code = (props) => {
  /*<div style={{ maxWidth: props.large ? '100%' : props.medium ? '800px' : '500px' }}>*/

  // All code elements in this div will have a background color of transparent
  return (
    <Box sx={{ 
      maxWidth: '800px', 
      'code': { bgcolor: 'transparent' },
      '& pre': {
        borderRadius: '8px !important',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        border: '1px solid',
        borderColor: 'divider',
      }
    }}> 
      <SyntaxHighlighter
        style={a11yDark}
        language={props.lang}
      >
        {props.children}
      </SyntaxHighlighter>
    </Box>
  )
}

export const Example = (props) => (
  <ExampleAccordionWrapper title={props.title}>
    {props.bads && props.bads.map((bad, idx) => {
      return (
        <React.Fragment key={`bad-${idx}`}>
          <Body tyle={{paddingTop: '20px'}} key={idx}><b>🔴 Bad</b></Body>
          <Code lang={props.lang} large={props.large} medium={props.medium}>{bad}</Code>
        </React.Fragment>
      )
    })}
    {props.goods && props.goods.map((good, idx) => {
      return (
        <React.Fragment key={`good-${idx}`}>
          <Body style={{paddingTop: '20px'}} ><b>🟢 Good</b></Body>
          <Code lang={props.lang} large={props.large} medium={props.medium}>{good}</Code>
        </React.Fragment>
      )
    })}
  </ExampleAccordionWrapper>
)

export const ExampleImages = ({ title, srcArray = [] }) => (
  <ExampleAccordionWrapper title={title}>
    {srcArray.map((asset, idx) => (
      <CaptionedImage src={asset.src} alt={`Example #${idx + 1}`} caption={asset.caption} key={`Example #${idx + 1}`}/>
    ))}
  </ExampleAccordionWrapper>
)

const ExampleAccordionWrapper = ({ children, title = 'Example' }) => {
  const [expand, setExpand] = React.useState(false);

  return (
    <Box sx={{ 
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      borderRadius: '12px',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        borderColor: 'primary.main',
      }
    }} my={2}>
      <Box sx={{ 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center',
        backgroundColor: expand ? 'primary.main' : 'background.paper',
        color: expand ? 'white' : 'text.primary',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: expand ? 'primary.dark' : 'action.hover',
        }
      }} p={2} onClick={() => setExpand(!expand)}>
        <ExpandLessIcon style={{ 
          rotate: (expand) ? '180deg' : '0deg', 
          transition: 'rotate 0.3s ease-in-out',
          marginRight: '8px',
        }} />
        <Body sx={{ margin: 0, padding: 0 }}>
          <b>{`💡 ${(title)}:`} </b>
        </Body>
      </Box>
      <Collapse in={expand} unmountOnExit>
        <Box component='hr' m={0} sx={{ borderColor: 'divider', opacity: 0.3 }}/>
        <Box p={3}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}

const CaptionedImage = ({ src, alt, caption }) => (
  <Box component='figure' m={0} mb={4}>
    <Box
      component='img'
      src={src}
      alt={alt}
      maxWidth='700px'
      width='100%'
    />
    <Typography component='figcaption'><i>{caption ?? ''}</i></Typography>
  </Box>
)
