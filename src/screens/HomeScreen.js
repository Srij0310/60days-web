import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid, Zoom } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import WelcomeMessage from '../components/WelcomeMessage';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
    '& .emoji': {
      transform: 'scale(1.2) rotate(10deg)',
    },
    '& .title': {
      transform: 'scale(1.05)',
      color: props => props.color || '#FF6B6B',
    },
    '& .description': {
      transform: 'scale(1.02)',
    },
  },
  '& .emoji': {
    fontSize: '4rem',
    marginBottom: theme.spacing(2),
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '& .title': {
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '& .description': {
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: props => props.color || '#FF6B6B',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover::before': {
    height: '6px',
  },
}));

const HomeScreen = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menuItems = [
    {
      title: 'Daily Activities',
      description: 'Fun activities for every day!',
      path: '/activities',
      emoji: '🎨',
      color: '#FFD700'
    },
    {
      title: 'Movies & Shows',
      description: 'Watch amazing stories!',
      path: '/movies',
      emoji: '🎬',
      color: '#98FB98'
    },
    {
      title: 'Bedtime Stories',
      description: 'Magical tales before sleep!',
      path: '/stories',
      emoji: '📚',
      color: '#87CEEB'
    },
    {
      title: 'Summer Diary',
      description: 'Capture special moments!',
      path: '/diary',
      emoji: '📸',
      color: '#DDA0DD'
    },
    {
      title: 'Negotiation Booth',
      description: 'Make deals with parents!',
      path: '/negotiation',
      emoji: '🤝',
      color: '#FFB6C1'
    }
  ];

  const handleNavigation = (path) => {
    // Add a small delay for animation
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <WelcomeMessage />
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            color: '#FF6B6B',
            fontFamily: '"Comic Sans MS", cursive',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          Let's Start Our Adventure! 🚀
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
              <StyledPaper
                onClick={() => handleNavigation(item.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                color={item.color}
                sx={{
                  background: `linear-gradient(135deg, ${item.color}40 0%, ${item.color}20 100%)`,
                  transform: hoveredIndex === index ? 'translateY(-8px) scale(1.02)' : 'none',
                  boxShadow: hoveredIndex === index ? '0 12px 20px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                <Typography variant="h2" className="emoji" sx={{ fontSize: '4rem', mb: 2 }}>
                  {item.emoji}
                </Typography>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  className="title"
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    fontFamily: '"Comic Sans MS", cursive'
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body1"
                  className="description"
                  sx={{ 
                    color: '#666',
                    fontFamily: '"Comic Sans MS", cursive'
                  }}
                >
                  {item.description}
                </Typography>
              </StyledPaper>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeScreen; 