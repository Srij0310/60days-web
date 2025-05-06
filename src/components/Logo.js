import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.02)',
    transition: 'transform 0.3s ease',
  },
  '& .logo-emoji': {
    fontSize: '2.5rem',
    animation: 'float 3s ease-in-out infinite',
  },
  '& .paper-boat': {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '2rem',
    animation: 'sail 4s ease-in-out infinite',
  },
  '& .sun': {
    position: 'absolute',
    top: '-20px',
    right: '20px',
    fontSize: '2rem',
    animation: 'rotate 10s linear infinite',
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' },
  },
  '@keyframes sail': {
    '0%': { transform: 'translateX(-50%) rotate(0deg)' },
    '50%': { transform: 'translateX(-50%) rotate(5deg)' },
    '100%': { transform: 'translateX(-50%) rotate(0deg)' },
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const Logo = () => {
  const navigate = useNavigate();

  return (
    <LogoContainer onClick={() => navigate('/')}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <span className="logo-emoji">🌞</span>
        <span className="logo-emoji">👨‍👩‍👧‍👦</span>
        <span className="logo-emoji">🎨</span>
        <span className="logo-emoji">🎮</span>
        <span className="logo-emoji">🏖️</span>
        <span className="logo-emoji">📚</span>
        <span className="logo-emoji">🦋</span>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Comic Sans MS", cursive',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        SummerCircle
      </Typography>
      <span className="paper-boat">🛶</span>
      <span className="sun">☀️</span>
    </LogoContainer>
  );
};

export default Logo; 