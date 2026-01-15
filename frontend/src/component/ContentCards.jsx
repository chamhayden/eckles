import gradient from 'random-gradient';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import imageBg from '../asset/VideoBg.png';

// https://stackoverflow.com/questions/40958727/javascript-generate-unique-number-based-on-string
const hashCode = (str) => {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const ContentCards = ({ data, minHeight }) => {
  return (
    <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '16px' }}>
      {data.map(({
        linkUrl,
        imageUrl,
        imageBackground,
        title,
        description,
        duration,
        staff,
        weektopic,
        label,
        labelBackground,
      }, key) => {
        const hash = hashCode(description) % 400;
        return (
          <Box sx={{ 
            minWidth: '220px', 
            flex: 1, 
            maxWidth: '400px',
          }} key={key}>
            <Card sx={{ 
              minHeight,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              },
              overflow: 'hidden',
            }}>
              <Link to={linkUrl}>
                {label &&
                  <div style={{
                    position: 'absolute',
                    width: '120px',
                    height: '40px',
                    zIndex: 10,
                  }}>
                    <div style={{
                      padding: '8px 12px',
                      margin: '15px 0 0 15px',
                      background: labelBackground,
                      borderRadius: '8px',
                      textAlign: 'center',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      fontWeight: 600,
                      fontSize: '0.85em',
                    }}>{label}</div>
                  </div>
                }

                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="210"
                    sx={{ 
                      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                      background: imageBg ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                    image={imageBg ?? `https://picsum.photos/id/${hash}/400/300` }
                  />
                  <Typography variant="h6" component="div" color="white" sx={{ 
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    lineHeight: 1.4,
                    textAlign: 'center',
                    padding: '0 12px',
                    zIndex: 1,
                    fontSize: '2rem',
                  }}>
                    {title}
                  </Typography>
                </Box>
                <CardContent sx={{ padding: '20px' }}>
                  {weektopic &&
                    <Box style={{float: 'left'}}>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        padding: '6px 10px',
                        borderRadius: '6px',
                      }}>{weektopic}</Typography>
                    </Box>
                  }
                  {duration && 
                    <Box style={{float: 'right'}}>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        padding: '6px 10px',
                        borderRadius: '6px',
                      }}>⏱️ {duration} mins</Typography>
                    </Box>
                  }
                  {staff && 
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: '0.875rem', 
                      marginTop: '12px',
                      fontWeight: 500,
                      lineHeight: 1.6,
                    }}>By {staff}</Typography>
                  }
                  {description && <Typography variant="body2" color="text.secondary" sx={{ 
                    fontSize: '0.875rem', 
                    marginTop: '14px', 
                    fontStyle: 'italic',
                    lineHeight: 1.65,
                  }}>{description}</Typography>}
                </CardContent>
              </Link>
            </Card>
          </Box>
        );
      })}
    </Box> 
  )
};

export default ContentCards;
