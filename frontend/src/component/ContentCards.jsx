import gradient from 'random-gradient';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import imageBg from '../asset/VideoBg.png';
import CardActionArea from '@mui/material/CardActionArea';

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
    <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
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
            width: '280px'
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
              
                    <CardActionArea
                        component="a"
                        href={linkUrl}
                        target='_blank'

                        sx={{
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'none' },
                          cursor: 'pointer',
                        }}
                            >
                {label &&
                  <div style={{
                    position: 'absolute',
                    zIndex: 10,
                  }}>
                     <Box label={label} variant="outlined" 
                      sx={{ 
                        color: 'white', 
                        backgroundColor: `${labelBackground}`,
                        fontSize: '0.75rem',
                        borderTopLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    >
                      <Typography variant="caption" sx={{ 
                        fontWeight: 600,padding: '4px 8px', display: 'block' }}>{label}</Typography>
                    </Box>
                 </div>
                }
                

                <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          sx={{ 
                            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                            background: imageBg ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            }
                          }}
                          image={imageBg ?? `https://picsum.photos/id/${hash}/400/300` }
                          alt={title}
                        />
                  <Typography variant="h6" component="div" color="white" sx={{ 
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    textAlign: 'center',
                    padding: '0 12px',
                    zIndex: 1,
                    fontSize: '2rem',
                  }}>
                    {title}
                  </Typography>
                </Box>
                <Box py={2} px={2} sx={{ paddingBottom: 0}}>
                   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' , justifyContent: 'space-between', alignContent: 'center' }}>
                    <Box sx={{ height: '8px',  alignContent: 'center', display: 'flex', gap: 1 }}>
                             {duration && 
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                              fontSize: '0.75rem',
                              fontWeight: 500,
                            }}>⏱️ {duration} mins</Typography>
                          </Box>
                        }
                        {staff && 
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}> {staff}</Typography>
                        }
                    </Box>  
                    <Box>
                        {weektopic &&
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              padding: '2px 4px',
                              borderRadius: '2px',
                            }}>{weektopic}</Typography>
                          </Box>
                        }
                      
                    </Box>
                  </Box>
                {description && 
                  <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                                  fontSize: '0.875rem', 
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  height: '3.4em',
                                }}>{description}</Typography>
                              </Box>
                  }
                </Box>
                
                  </CardActionArea>
            </Card>
          </Box>
        );
      })}
    </Box> 
  )
};

export default ContentCards;
