import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Grid,
  Fade,
  Zoom,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.98)',
  borderRadius: '30px',
  boxShadow: '0 10px 40px rgba(108, 99, 255, 0.08)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(108, 99, 255, 0.1)',
}));

const WheelContainer = styled(Box)(({ theme, rotation, isSpinning }) => ({
  position: 'relative',
  width: '320px',
  height: '320px',
  margin: '0 auto',
  transition: 'transform 3s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
  transform: `rotate(${rotation}deg)`,
  '&:hover': {
    cursor: 'pointer',
  },
  animation: isSpinning ? 'shake 0.5s ease-in-out' : 'none',
  '@keyframes shake': {
    '0%, 100%': { transform: `rotate(${rotation}deg)` },
    '25%': { transform: `rotate(${rotation + 2}deg)` },
    '75%': { transform: `rotate(${rotation - 2}deg)` }
  }
}));

const WheelPointer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-40px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '50px',
  height: '50px',
  background: '#6C63FF',
  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  zIndex: 2,
  filter: 'drop-shadow(0 4px 8px rgba(108, 99, 255, 0.2))',
  animation: 'bounce 1s infinite',
  '@keyframes bounce': {
    '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
    '50%': { transform: 'translateX(-50%) translateY(-5px)' }
  }
}));

const WheelSegment = styled(Box)(({ theme, index, total }) => ({
  position: 'absolute',
  width: '50%',
  height: '50%',
  transformOrigin: '100% 100%',
  transform: `rotate(${(360 / total) * index}deg)`,
  background: index % 2 === 0 ? '#6C63FF' : '#8F88FF',
  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.1)',
  },
}));

const WheelLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.98)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 30px rgba(108, 99, 255, 0.1)',
  zIndex: 1,
  border: '2px solid rgba(108, 99, 255, 0.2)',
  backdropFilter: 'blur(5px)',
}));

const SpinButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6C63FF 30%, #8F88FF 90%)',
  borderRadius: '50px',
  padding: '15px 40px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#fff',
  textTransform: 'none',
  boxShadow: '0 8px 20px rgba(108, 99, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 25px rgba(108, 99, 255, 0.3)',
    background: 'linear-gradient(45deg, #8F88FF 30%, #6C63FF 90%)',
  },
  '&:disabled': {
    background: '#ccc',
    transform: 'scale(0.95)',
    boxShadow: 'none',
  },
}));

const ResultCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.98)',
  borderRadius: '30px',
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: '0 10px 40px rgba(108, 99, 255, 0.08)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(108, 99, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 45px rgba(108, 99, 255, 0.12)',
  },
}));

const TreatReveal = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #8F88FF 30%, #6C63FF 90%)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  boxShadow: '0 8px 20px rgba(108, 99, 255, 0.2)',
  animation: 'fadeIn 0.5s ease-in',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'scale(0.9)' },
    '100%': { opacity: 1, transform: 'scale(1)' }
  }
}));

const tasks = {
  parent: [
    { text: 'Read a story', emoji: '📚', treat: 'Extra screen time' },
    { text: 'Play board game', emoji: '🎲', treat: 'New toy' },
    { text: 'Bake cookies', emoji: '🍪', treat: 'Ice cream treat' },
    { text: 'Movie night', emoji: '🎬', treat: 'Pizza party' },
    { text: 'Art & craft', emoji: '🎨', treat: 'New art supplies' },
    { text: 'Dance party', emoji: '💃', treat: 'Special dessert' },
    { text: 'Science experiment', emoji: '🧪', treat: 'Science kit' },
    { text: 'Garden time', emoji: '🌱', treat: 'Plant a new flower' }
  ],
  child: [
    { text: 'Clean room', emoji: '🧹', treat: 'Small reward' },
    { text: 'Do homework', emoji: '📝', treat: 'Game time' },
    { text: 'Help with dishes', emoji: '🍽️', treat: 'Special snack' },
    { text: 'Make bed', emoji: '🛏️', treat: 'Extra play time' },
    { text: 'Water plants', emoji: '💧', treat: 'Choose dinner' },
    { text: 'Set table', emoji: '🍴', treat: 'Watch favorite show' },
    { text: 'Fold clothes', emoji: '👕', treat: 'Small surprise' },
    { text: 'Organize toys', emoji: '🧸', treat: 'New book' }
  ]
};

const performers = [
  { text: 'Parent', emoji: '👨‍👩‍👧‍👦' },
  { text: 'Child', emoji: '👶' }
];

function NegotiationBoothScreen() {
  const navigate = useNavigate();
  const [performerRotation, setPerformerRotation] = useState(0);
  const [taskRotation, setTaskRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinStage, setSpinStage] = useState('idle'); // 'idle', 'performer', 'task', 'treat'
  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showTreat, setShowTreat] = useState(false);
  const performerWheelRef = useRef(null);
  const taskWheelRef = useRef(null);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);

  const spinWheels = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setIsWheelSpinning(true);
    setShowResult(false);
    setShowTreat(false);
    setSpinStage('performer');
    
    // First spin the performer wheel with a more dynamic animation
    const newPerformerRotation = performerRotation + 3600 + Math.random() * 360;
    setPerformerRotation(newPerformerRotation);
    
    // After performer wheel stops, show who was selected
    setTimeout(() => {
      setIsWheelSpinning(false);
      const selectedPerformerIndex = Math.floor(Math.random() * performers.length);
      const selectedPerformer = performers[selectedPerformerIndex];
      setSelectedPerformer(selectedPerformer);
      setShowResult(true);
      
      // After showing who was selected, spin the task wheel
      setTimeout(() => {
        setIsWheelSpinning(true);
        setSpinStage('task');
        const newTaskRotation = taskRotation + 3600 + Math.random() * 360;
        setTaskRotation(newTaskRotation);
        
        // After task wheel stops, show the task
        setTimeout(() => {
          setIsWheelSpinning(false);
          const taskList = selectedPerformer.text === 'Parent' ? tasks.parent : tasks.child;
          const selectedTaskIndex = Math.floor(Math.random() * taskList.length);
          setSelectedTask(taskList[selectedTaskIndex]);
          
          // After showing the task, reveal the treat
          setTimeout(() => {
            setSpinStage('treat');
            setShowTreat(true);
            setIsSpinning(false);
            setSpinStage('idle');
          }, 1000); // Reduced from 2000 to 1000
        }, 2000); // Reduced from 3000 to 2000
      }, 1000); // Reduced from 2000 to 1000
    }, 2000); // Reduced from 3000 to 2000
  };

  const getButtonText = () => {
    if (!isSpinning) return 'Start Spinning!';
    if (spinStage === 'performer') return 'Spinning for who...';
    if (spinStage === 'task') return 'Spinning for task...';
    if (spinStage === 'treat') return 'Revealing treat...';
    return 'Spinning...';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        textAlign: 'center', 
        py: 6,
        background: 'linear-gradient(135deg, #6C63FF 0%, #8F88FF 100%)',
        borderRadius: '30px',
        mb: 6,
        boxShadow: '0 15px 45px rgba(108, 99, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }
      }}>
        <IconButton
          onClick={() => navigate('/')}
          sx={{ 
            position: 'absolute', 
            left: 20, 
            top: 20, 
            color: '#fff',
            background: 'rgba(255,255,255,0.2)',
            '&:hover': {
              background: 'rgba(255,255,255,0.3)',
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontFamily: '"Comic Sans MS", cursive',
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          Task & Treats Carousel 🎠
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#fff',
            fontFamily: '"Comic Sans MS", cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            opacity: 0.9
          }}
        >
          Spin both wheels to see who does what! 🎡
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={1000}>
            <StyledPaper>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#6C63FF',
                  fontFamily: '"Comic Sans MS", cursive',
                  mb: 3
                }}
              >
                Who's Turn?
              </Typography>
              <Box sx={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto' }}>
                <WheelPointer />
                <WheelContainer 
                  ref={performerWheelRef} 
                  rotation={performerRotation}
                  isSpinning={isWheelSpinning && spinStage === 'performer'}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      position: 'relative',
                      boxShadow: '0 0 30px rgba(0,0,0,0.15)',
                      overflow: 'hidden',
                      background: 'linear-gradient(45deg, #6C63FF 30%, #8F88FF 90%)',
                      border: '4px solid rgba(108, 99, 255, 0.3)',
                    }}
                  >
                    {performers.map((performer, index) => (
                      <WheelSegment key={index} index={index} total={performers.length}>
                        <Box sx={{ transform: `rotate(${90}deg)`, textAlign: 'center' }}>
                          <Typography variant="h3" sx={{ mb: 1, fontSize: '3rem' }}>
                            {performer.emoji}
                          </Typography>
                          <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                            {performer.text}
                          </Typography>
                        </Box>
                      </WheelSegment>
                    ))}
                  </Box>
                  <WheelLabel>
                    <Typography variant="h6" sx={{ color: '#6C63FF', fontWeight: 'bold', fontSize: '1.4rem' }}>
                      Who?
                    </Typography>
                  </WheelLabel>
                </WheelContainer>
              </Box>
            </StyledPaper>
          </Fade>
        </Grid>

        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={1500}>
            <StyledPaper>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#6C63FF',
                  fontFamily: '"Comic Sans MS", cursive',
                  mb: 3
                }}
              >
                Task & Treat
              </Typography>
              <Box sx={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto' }}>
                <WheelPointer />
                <WheelContainer 
                  ref={taskWheelRef} 
                  rotation={taskRotation}
                  isSpinning={isWheelSpinning && spinStage === 'task'}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      position: 'relative',
                      boxShadow: '0 0 30px rgba(0,0,0,0.15)',
                      overflow: 'hidden',
                      background: 'linear-gradient(45deg, #6C63FF 30%, #8F88FF 90%)',
                      border: '4px solid rgba(108, 99, 255, 0.3)',
                    }}
                  >
                    {tasks.parent.map((task, index) => (
                      <WheelSegment key={index} index={index} total={tasks.parent.length}>
                        <Box sx={{ transform: `rotate(${90}deg)`, textAlign: 'center' }}>
                          <Typography variant="h3" sx={{ mb: 1, fontSize: '2.5rem' }}>
                            {task.emoji}
                          </Typography>
                          <Typography variant="body2" sx={{ maxWidth: '100px', margin: '0 auto', fontSize: '0.9rem' }}>
                            {task.text}
                          </Typography>
                        </Box>
                      </WheelSegment>
                    ))}
                  </Box>
                  <WheelLabel>
                    <Typography variant="h6" sx={{ color: '#6C63FF', fontWeight: 'bold', fontSize: '1.4rem' }}>
                      What?
                    </Typography>
                  </WheelLabel>
                </WheelContainer>
              </Box>
            </StyledPaper>
          </Fade>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <SpinButton
              onClick={spinWheels}
              disabled={isSpinning}
              sx={{
                transform: isSpinning ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              {getButtonText()}
            </SpinButton>
          </Box>
        </Grid>

        {showResult && selectedPerformer && (
          <Grid item xs={12}>
            <Zoom in={true} timeout={500}>
              <ResultCard>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#6C63FF',
                    fontFamily: '"Comic Sans MS", cursive',
                    mb: 4
                  }}
                >
                  {spinStage === 'task' ? 'Selected Task!' : 'Who Will Do It?'} 🎯
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h1" sx={{ fontSize: '5rem', mb: 2 }}>
                    {selectedPerformer.emoji}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: '"Comic Sans MS", cursive', 
                      color: '#6C63FF', 
                      mb: 2,
                      fontSize: '1.8rem'
                    }}
                  >
                    {selectedPerformer.text} will:
                  </Typography>
                  {selectedTask && (
                    <>
                      <Typography variant="h1" sx={{ fontSize: '5rem', mb: 2 }}>
                        {selectedTask.emoji}
                      </Typography>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive', 
                          color: '#6C63FF', 
                          mb: 2,
                          fontSize: '2rem'
                        }}
                      >
                        {selectedTask.text}
                      </Typography>
                    </>
                  )}
                  {showTreat && selectedTask && (
                    <TreatReveal>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive', 
                          color: '#fff', 
                          fontWeight: 'bold',
                          fontSize: '1.8rem'
                        }}
                      >
                        And gets: {selectedTask.treat} 🎁
                      </Typography>
                    </TreatReveal>
                  )}
                </Box>
              </ResultCard>
            </Zoom>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default NegotiationBoothScreen; 