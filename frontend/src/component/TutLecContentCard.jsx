import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Stack, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

// https://stackoverflow.com/questions/40958727/javascript-generate-unique-number-based-on-string
const hashCode = (str) => {
  var hash = 0,
    i,
    chr,
    len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
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
          height: '100%',
          width: '100%',
          paddingBottom: '12px',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            borderColor: 'primary.main',
          },
        }}
      >
        <CardContent
          sx={{
            flex: '1 0 auto',
            padding: '18px',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
            <Stack flex={1}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  lineHeight: 1.4,
                  fontSize: '1.15rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {name}
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                ⏱️ {duration_mins} minutes
              </Typography>
            </Stack>

            <Avatar
              src={thumbnail ? thumbnail : `https://picsum.photos/id/${hash}/200`}
              alt={name}
              sx={{
                width: 100,
                height: 100,
                border: '2px solid',
                borderColor: 'divider',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
          </Stack>
        </CardContent>

        <Stack
          direction="row"
          gap={1}
          rowGap={1}
          flexWrap="wrap"
          sx={{
            padding: '0 18px 14px 18px',
          }}
        >
          <Chip
            label={topic}
            sx={{
              fontWeight: 500,
              borderRadius: '8px',
            }}
          />
          <Chip
            label={fullWeek}
            sx={{
              fontWeight: 500,
              borderRadius: '8px',
            }}
          />
          <Chip
            color={relevanceChip.color}
            label={relevanceChip.label}
            sx={{
              fontWeight: 600,
              borderRadius: '8px',
            }}
          />
          {isLive && (
            <Chip
              color="secondary"
              label={'🔴 Live'}
              sx={{
                fontWeight: 600,
                borderRadius: '8px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 1,
                  },
                  '50%': {
                    opacity: 0.7,
                  },
                },
              }}
            />
          )}
        </Stack>
      </Card>
    </Link>
  );
}
