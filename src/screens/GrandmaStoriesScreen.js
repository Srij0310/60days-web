import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Slider, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(135deg, #FFF5F5 0%, #FFE5E5 100%)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
}));

const StoryCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '15px',
  background: 'white',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const stories = [
  {
    id: 1,
    title: 'The Magic Garden',
    description: 'A story about a magical garden where flowers can talk and trees can dance.',
    emoji: '🌺',
    moral: 'The importance of taking care of nature',
    duration: '10 mins',
    category: 'Nature',
    audioUrl: 'https://storage.googleapis.com/storynory/audio/magic-garden.mp3',
    storyText: `Once upon a time, in a small village, there was a magical garden. This wasn't just any garden - the flowers could talk, and the trees could dance!

Every morning, the sunflowers would stretch their petals and say "Good morning!" to everyone who passed by. The roses would share their sweet perfume with the butterflies, and the daisies would play hide and seek with the bees.

The trees, oh the trees! They would sway their branches to the rhythm of the wind, creating beautiful music that made everyone smile. The apple tree would drop its fruits gently into children's hands, and the oak tree would tell stories of days long gone.

One day, a little girl named Lily discovered this magical garden. She was amazed to see flowers talking and trees dancing! The garden welcomed her with open petals and branches, and she became its best friend.

Lily learned that magic happens when you take care of nature. She watered the plants, talked to the flowers, and danced with the trees. The garden grew more beautiful each day, and Lily's heart grew full of joy.

The moral of the story is: When we take care of nature, nature takes care of us, and magic happens all around! 🌺✨`
  },
  {
    id: 2,
    title: 'The Brave Little Turtle',
    description: 'A tiny turtle\'s journey to overcome his fears and make new friends.',
    emoji: '🐢',
    moral: 'Courage comes in all sizes',
    duration: '8 mins',
    category: 'Adventure',
    audioUrl: 'https://storage.googleapis.com/storynory/audio/brave-turtle.mp3',
    storyText: `In a peaceful pond lived a tiny turtle named Timmy. Timmy was smaller than all the other turtles, and he was afraid of everything - the big fish, the deep water, and even the friendly frogs!

One day, Timmy saw a group of baby ducks learning to swim. They were splashing and having so much fun! Timmy wanted to join them, but he was too scared.

"Don't be afraid," said a wise old turtle. "Courage isn't about being big or strong. It's about trying new things, even when you're scared."

Timmy took a deep breath and slowly made his way to the baby ducks. At first, he was nervous, but soon he was splashing and playing with them! The ducks became his best friends, and they taught him that being small doesn't mean you can't be brave.

The moral of the story is: Courage comes in all sizes, and the biggest adventures begin with a small step! 🐢✨`
  },
  {
    id: 3,
    title: 'The Rainbow Bridge',
    description: 'A magical bridge that appears when friends work together.',
    emoji: '🌈',
    moral: 'The power of friendship and cooperation',
    duration: '12 mins',
    category: 'Friendship'
  },
  {
    id: 4,
    title: 'The Star Catcher',
    description: 'A young girl who learns to catch falling stars and make wishes come true.',
    emoji: '⭐',
    moral: 'Believe in your dreams',
    duration: '15 mins',
    category: 'Magic'
  },
  {
    id: 5,
    title: 'The Kind Elephant',
    description: 'An elephant who teaches others the importance of kindness.',
    emoji: '🐘',
    moral: 'Kindness is the greatest strength',
    duration: '10 mins',
    category: 'Values'
  },
  {
    id: 6,
    title: 'The Moon\'s Secret',
    description: 'A story about the moon\'s special connection with children\'s dreams.',
    emoji: '🌙',
    moral: 'Every night brings new possibilities',
    duration: '12 mins',
    category: 'Magic'
  },
  {
    id: 7,
    title: 'The Dancing Clouds',
    description: 'Clouds that dance in the sky and create beautiful patterns.',
    emoji: '☁️',
    moral: 'Find joy in simple things',
    duration: '8 mins',
    category: 'Nature'
  },
  {
    id: 8,
    title: 'The Wise Owl\'s Lesson',
    description: 'An owl who teaches young animals about wisdom and patience.',
    emoji: '🦉',
    moral: 'Wisdom comes with time and experience',
    duration: '10 mins',
    category: 'Learning'
  },
  {
    id: 9,
    title: 'The Magic Paintbrush',
    description: 'A paintbrush that brings drawings to life.',
    emoji: '🎨',
    moral: 'Creativity can make dreams real',
    duration: '12 mins',
    category: 'Magic'
  },
  {
    id: 10,
    title: 'The Friendly Dragon',
    description: 'A dragon who learns that friendship is more important than being scary.',
    emoji: '🐉',
    moral: 'Don\'t judge by appearances',
    duration: '15 mins',
    category: 'Friendship'
  },
  {
    id: 11,
    title: 'The Ocean\'s Treasure',
    description: 'A journey to find the ocean\'s greatest treasure.',
    emoji: '🌊',
    moral: 'The greatest treasures are often found in unexpected places',
    duration: '12 mins',
    category: 'Adventure'
  },
  {
    id: 12,
    title: 'The Sleepy Bear\'s Winter',
    description: 'A bear who learns to appreciate each season.',
    emoji: '🐻',
    moral: 'Every season has its own beauty',
    duration: '10 mins',
    category: 'Nature'
  }
];

const categories = [
  'All',
  'Nature',
  'Adventure',
  'Friendship',
  'Magic',
  'Values',
  'Learning'
];

function GrandmaStoriesScreen() {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [audioError, setAudioError] = useState(false);
  const speechRef = useRef(null);

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechRef.current = window.speechSynthesis;
    }
    return () => {
      if (speechRef.current) {
        speechRef.current.cancel();
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (selectedStory) {
      if (isPlaying) {
        if (speechRef.current) {
          speechRef.current.pause();
        }
        setIsPlaying(false);
      } else {
        if (speechRef.current) {
          const utterance = new SpeechSynthesisUtterance(selectedStory.storyText);
          utterance.rate = 0.9; // Slightly slower for better comprehension
          utterance.pitch = 1;
          utterance.volume = volume;
          
          // Try to find a female voice
          const voices = speechRef.current.getVoices();
          const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
          if (femaleVoice) {
            utterance.voice = femaleVoice;
          }

          utterance.onend = () => {
            setIsPlaying(false);
          };

          utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setAudioError(true);
            startTextDisplay();
          };

          speechRef.current.speak(utterance);
          setAudioError(false);
          startTextDisplay();
          setIsPlaying(true);
        } else {
          setAudioError(true);
          startTextDisplay();
          setIsPlaying(true);
        }
      }
    }
  };

  const startTextDisplay = () => {
    if (!selectedStory?.storyText) return;
    
    setDisplayedText('');
    const words = selectedStory.storyText.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => prev + ' ' + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        if (!isPlaying) {
          setIsPlaying(false);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.volume = newValue;
    }
    setIsMuted(newValue === 0);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      if (speechRef.current) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.volume = volume;
      }
      setIsMuted(false);
    } else {
      if (speechRef.current) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.volume = 0;
      }
      setIsMuted(true);
    }
  };

  const handleClose = () => {
    if (isPlaying) {
      if (speechRef.current) {
        speechRef.current.cancel();
      }
      setIsPlaying(false);
    }
    setSelectedStory(null);
    setDisplayedText('');
    setAudioError(false);
  };

  const filteredStories = selectedCategory === 'All' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 4 }}
        >
          Back to Home
        </Button>

        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            color: '#FF6B6B',
            fontFamily: '"Comic Sans MS", cursive',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Bedtime Stories 🌙
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              sx={{
                background: selectedCategory === category ? '#FF6B6B' : 'white',
                color: selectedCategory === category ? 'white' : '#FF6B6B',
                '&:hover': {
                  background: selectedCategory === category ? '#FF6B6B' : '#FFF0F0',
                },
                fontFamily: '"Comic Sans MS", cursive',
              }}
            />
          ))}
        </Box>

        <Grid container spacing={4}>
          {filteredStories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story.id}>
              <StyledPaper onClick={() => setSelectedStory(story)}>
                <Typography variant="h2" sx={{ fontSize: '4rem', mb: 2 }}>
                  {story.emoji}
                </Typography>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    fontFamily: '"Comic Sans MS", cursive'
                  }}
                >
                  {story.title}
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: '#666',
                    fontFamily: '"Comic Sans MS", cursive',
                    mb: 2
                  }}
                >
                  {story.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={story.category} 
                    size="small"
                    sx={{ 
                      background: '#FFF0F0',
                      color: '#FF6B6B',
                      fontFamily: '"Comic Sans MS", cursive'
                    }}
                  />
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: '#999',
                      fontFamily: '"Comic Sans MS", cursive'
                    }}
                  >
                    {story.duration}
                  </Typography>
                </Box>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog 
        open={!!selectedStory} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {selectedStory && (
          <>
            <DialogTitle sx={{ 
              fontFamily: '"Comic Sans MS", cursive',
              color: '#FF6B6B',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4">{selectedStory.emoji}</Typography>
                <Typography variant="h5">{selectedStory.title}</Typography>
              </Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {audioError && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Audio narration is not available. Enjoy reading the story instead! 📖
                </Alert>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <IconButton onClick={handlePlayPause} color="primary">
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={handleMuteToggle}>
                  {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>
                <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.1}
                  sx={{ width: 100 }}
                />
              </Box>
              <Typography 
                variant="body1"
                sx={{ 
                  fontFamily: '"Comic Sans MS", cursive',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line'
                }}
              >
                {displayedText || selectedStory.storyText}
              </Typography>
              <Box sx={{ mt: 3, p: 2, background: '#FFF0F0', borderRadius: 2 }}>
                <Typography 
                  variant="h6"
                  sx={{ 
                    color: '#FF6B6B',
                    fontFamily: '"Comic Sans MS", cursive',
                    fontWeight: 'bold'
                  }}
                >
                  Moral of the Story: {selectedStory.moral}
                </Typography>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default GrandmaStoriesScreen; 