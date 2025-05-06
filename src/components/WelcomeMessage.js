import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #FFF5F5 0%, #FFE5E5 100%)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,107,107,0.1) 0%, rgba(255,142,83,0.1) 100%)',
    zIndex: 1
  }
}));

const WelcomeMessage = () => {
  return (
    <StyledPaper>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#FF6B6B',
            fontFamily: '"Comic Sans MS", cursive',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3
          }}
        >
          🌟 Welcome to SummerCircle! 🌟
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '1.1rem',
            color: '#666',
            textAlign: 'center',
            mb: 3
          }}
        >
          Dear Tiny Tots,
        </Typography>

        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '1.1rem',
            color: '#666',
            mb: 2
          }}
        >
          Don't grow up too fast! These precious summer days are like magical treasures waiting to be discovered. 
          Every moment is a chance to learn, laugh, and create beautiful memories that will sparkle in your heart forever. ✨
        </Typography>

        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '1.1rem',
            color: '#666',
            mb: 2
          }}
        >
          I created SummerCircle because I believe childhood summers should be filled with wonder, creativity, and joy. 
          Here, you'll find exciting activities, magical stories, fun experiments, and so much more! Let's make every day 
          of these 60 days special and unforgettable. 🌈
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '1.1rem',
            color: '#666',
            textAlign: 'right',
            mt: 3
          }}
        >
          With love and sparkles, ❤️
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '1.2rem',
            color: '#FF6B6B',
            fontWeight: 'bold',
            textAlign: 'right'
          }}
        >
          ~ Srija Kolluri
        </Typography>
      </Box>
    </StyledPaper>
  );
};

export default WelcomeMessage; 