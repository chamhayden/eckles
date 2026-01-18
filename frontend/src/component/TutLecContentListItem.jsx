import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
const hashCode = (str) => {
  var hash = 0,
    i,
    chr,
    len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash);
};

export default function TutLecContentCard({
  name,
  contentKey,
  duration_mins,
  relevance,
  week,
  topicEmoji,
  topicName,
  live,
  lecture,
  thumbnail,
}) {
  const getRelevanceChip = (relevance) => {
    if (lecture) {
      switch (relevance) {
        case 'Mandatory':
          return { label: 'Mandatory', color: 'success' };
        case 'Catchup':
          return { label: 'Catchup', color: 'secondary' };
        case 'Recommended':
          return { label: 'Recommended', color: 'info' };
        case 'Extension':
          return { label: 'Extension', color: 'warning' };
        default:
          return { label: 'Unknown', color: 'default' };
      }
    } else {
      switch (relevance) {
        case 'COMPULSORY':
          return { label: 'Compulsory', color: 'success' };
        case 'REFINING':
          return { label: 'Refining', color: 'info' };
        case 'EXTENDED':
          return { label: 'Extended', color: 'warning' };
        default:
          return { label: 'Unknown', color: 'default' };
      }
    }
  };

  const isLive = live === '🔴 NEW';
  const relevanceChip = getRelevanceChip(relevance);
  const fullWeek = 'Week ' + week;
  const topic = topicEmoji + ' ' + topicName;
  const hash = hashCode(contentKey) % 400;
  const cardLink = lecture
    ? `/NOW/content/lectures/${contentKey}`
    : `/NOW/content/tutorials/${contentKey}`;

  return (
<Link to={cardLink} style={{ textDecoration: 'none' }}>
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: 'none',
      boxShadow: 'none',
      padding: '0px',
      borderBottom: '1px solid #ddd',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    }}
  >
    <CardContent sx={{ '&:last-child': { paddingBottom: '10px' }, padding: '10px 20px' }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        alignItems={{ xs: 'flex-start', md: 'center' }}
        gap={2}
      >
       
        <Stack 
          direction="row" 
          alignItems="center" 
          sx={{ 
            flex: 1, 
            minWidth: 0,
            width: { xs: '100%', md: 'auto' }
          }}
        >

          <Box sx={{ flexShrink: 0 }}>
            <img
              src={thumbnail ? thumbnail : `https://picsum.photos/id/${hash}/200`}
              alt={name}
              style={{ 
                width: 'auto', 
                height: '100px', 
                display: 'block', 
                borderRadius: '8px' 
              }}
            />
          </Box>

   
          <Stack 
            direction="column" 
            sx={{ 
              px: 2, 
              flex: 1, 
              minWidth: 0, 
              overflow: 'hidden' 
            }}
          >
            <Tooltip title={name} placement="top" arrow disableInteractive>
              <Typography
                variant="h6"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: { xs: 'normal', md: 'nowrap' }, 
                  cursor: 'pointer',
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 2, md: 1 }, 
                  WebkitBoxOrient: 'vertical',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#5b7edb',
                  },
                }}
              >
                {name}
              </Typography>
            </Tooltip>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              {duration_mins} minutes
            </Typography>
          </Stack>
        </Stack>


        <Stack
          direction="row"
          gap={1}
          sx={{
            flexShrink: 0,
            flexWrap: 'wrap',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            width: { xs: '100%', md: 'auto' },
            maxWidth: { md: '340px' },
            pl: { xs: 0, md: 2 },
          }}
        >
          <Chip label={topic} size="small" />
          <Chip label={fullWeek} size="small" />
          <Chip color={relevanceChip.color} label={relevanceChip.label} size="small" />
          {isLive && <Chip color="secondary" label={'Live'} size="small" />}
        </Stack>
      </Stack>
    </CardContent>
  </Card>
</Link>

  );
}
