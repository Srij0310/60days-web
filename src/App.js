import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  EmojiEvents as EmojiEventsIcon,
  Casino as CasinoIcon,
  Movie as MovieIcon,
  PhotoCamera as PhotoCameraIcon,
  MenuBook as MenuBookIcon,
  WbSunny as SunIcon,
  Star as StarIcon,
  LocalActivity as ActivityIcon,
  EmojiEmotions as EmojiIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import NegotiationBoothScreen from './screens/NegotiationBoothScreen';
import MoviesScreen from './screens/MoviesScreen';
import PhotoDiaryScreen from './screens/PhotoDiaryScreen';
import GrandmaStoriesScreen from './screens/GrandmaStoriesScreen';

const theme = useMemo(() => createTheme({
  palette: {
    primary: {
      main: '#FF6B8B', // Playful pink
      light: '#FF8FA3',
      dark: '#E64D6C',
    },
    secondary: {
      main: '#4ECDC4', // Fresh mint
      light: '#7EDCD6',
      dark: '#2BB8B0',
    },
    background: {
      default: '#FFF9F0', // Warm cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3142',
      secondary: '#4F5665',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Poppins", cursive',
    h1: {
      fontWeight: 700,
      color: '#2D3142',
    },
    h2: {
      fontWeight: 700,
      color: '#2D3142',
    },
    h3: {
      fontWeight: 600,
      color: '#2D3142',
    },
    h4: {
      fontWeight: 600,
      color: '#2D3142',
    },
    h5: {
      fontWeight: 500,
      color: '#2D3142',
    },
    h6: {
      fontWeight: 500,
      color: '#2D3142',
    },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 30,
          padding: '12px 28px',
          fontWeight: 600,
          boxShadow: '0 8px 20px rgba(255, 107, 139, 0.2)',
          '&:hover': {
            boxShadow: '0 12px 25px rgba(255, 107, 139, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
}), []);

const drawerWidth = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF6B8B 0%, #FF8FA3 100%)',
  boxShadow: '0 4px 20px rgba(255, 107, 139, 0.15)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(255, 107, 139, 0.1)',
    boxShadow: '4px 0 20px rgba(255, 107, 139, 0.05)',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '8px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 107, 139, 0.08)',
    transform: 'translateX(5px) scale(1.02)',
  },
  '&.Mui-selected': {
    background: 'linear-gradient(45deg, #FF6B8B 30%, #FF8FA3 90%)',
    color: '#fff',
    '& .MuiListItemIcon-root': {
      color: '#fff',
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: theme.palette.primary.main,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #FFF9F0 0%, #FFFFFF 100%)',
  minHeight: '100vh',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23FF6B8B\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));

const menuItems = useMemo(() => [
  { text: 'Home', path: '/', icon: <HomeIcon />, color: '#FF6B8B' },
  { text: 'Daily Activities', path: '/activities', icon: <ActivityIcon />, color: '#4ECDC4' },
  { text: 'Task & Treats Carousel', path: '/negotiation', icon: <CasinoIcon />, color: '#FFD93D' },
  { text: 'Movie Time', path: '/movies', icon: <MovieIcon />, color: '#FF8FA3' },
  { text: 'Summer Diary', path: '/diary', icon: <PhotoCameraIcon />, color: '#7EDCD6' },
  { text: 'Bedtime Stories', path: '/stories', icon: <MenuBookIcon />, color: '#FFB347' },
], []);

function AppContent() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 2,
          gap: 1
        }}>
          <SunIcon sx={{ 
            fontSize: '2.5rem', 
            color: '#FFD700',
            animation: 'spin 10s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FF6B8B 30%, #FF8FA3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Comic Sans MS", cursive',
            }}
          >
            Summer Circle
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#4F5665' }}>
          Making summer memories together! 🌞
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <StyledListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
          >
            <StyledListItemIcon sx={{ color: item.color }}>{item.icon}</StyledListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 500,
                color: '#2D3142',
                fontFamily: '"Comic Sans MS", cursive',
              }}
            />
          </StyledListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed" sx={{ transition: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flexGrow: 1 
          }}>
            <SunIcon sx={{ 
              fontSize: '2rem', 
              color: '#FFD700',
              animation: 'spin 10s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontFamily: '"Comic Sans MS", cursive',
              }}
            >
              Summer Circle
            </Typography>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              transition: 'transform 0.2s ease-in-out'
            },
          }}
        >
          {drawer}
        </StyledDrawer>
        <StyledDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              transition: 'none'
            },
          }}
          open
        >
          {drawer}
        </StyledDrawer>
      </Box>

      <MainContent>
        <Toolbar />
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 107, 139, 0.1)',
            boxShadow: '0 8px 32px rgba(255, 107, 139, 0.05)',
            transition: 'none'
          }}
        >
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/activities" element={<ActivitiesScreen />} />
            <Route path="/negotiation" element={<NegotiationBoothScreen />} />
            <Route path="/movies" element={<MoviesScreen />} />
            <Route path="/diary" element={<PhotoDiaryScreen />} />
            <Route path="/stories" element={<GrandmaStoriesScreen />} />
          </Routes>
        </Paper>
      </MainContent>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

export default React.memo(App);
