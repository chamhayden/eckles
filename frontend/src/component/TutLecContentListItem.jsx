import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';

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
          maxHeight: '100px',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <CardContent sx={{ padding: '10px 0px' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <img
                src={thumbnail ? thumbnail : `https://picsum.photos/id/${hash}/200`}
                alt={name}
                style={{ width: 'auto', height: '100px', display: 'block' }}
              />
              <Stack direction="column" sx={{ paddingLeft: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#5b7edb',
                    },
                  }}
                >
                  {name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                  {duration_mins} minutes
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Chip label={topic} />
              <Chip label={fullWeek} />
              <Chip color={relevanceChip.color} label={relevanceChip.label} />
              {isLive && <Chip color="secondary" label={'Live'} />}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
