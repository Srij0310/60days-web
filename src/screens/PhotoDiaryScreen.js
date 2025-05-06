import React, { useState, useRef } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
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

const ImagePreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  background: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const MediaPreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  background: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '& video, & audio': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

function PhotoDiaryScreen() {
  const navigate = useNavigate();
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    description: '',
    image: null,
    media: null,
    mediaType: null,
    specialMoment: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isRecording, setIsRecording] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEntry({ ...newEntry, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async (type) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        type === 'video' ? { video: true, audio: true } : { audio: true }
      );
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setNewEntry({ ...newEntry, media: url, mediaType: type });
        setShowPreview(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleAddEntry = () => {
    if (newEntry.title && (newEntry.image || newEntry.media)) {
      setDiaryEntries([...diaryEntries, { ...newEntry, id: Date.now() }]);
      setNewEntry({
        title: '',
        description: '',
        image: null,
        media: null,
        mediaType: null,
        specialMoment: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowPreview(false);
    }
  };

  const handleDeleteEntry = (id) => {
    setDiaryEntries(diaryEntries.filter(entry => entry.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        textAlign: 'center', 
        py: 6,
        background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
        borderRadius: '20px',
        mb: 6,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }}>
        <IconButton
          onClick={() => navigate('/')}
          sx={{ position: 'absolute', left: 20, top: 20, color: '#fff' }}
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
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Summer Diary
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#fff',
            fontFamily: '"Comic Sans MS", cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          Capture your special moments! 📸✨
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
              Add New Memory
            </Typography>
            <TextField
              fullWidth
              label="Title"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="What made today special?"
              multiline
              rows={2}
              value={newEntry.specialMoment}
              onChange={(e) => setNewEntry({ ...newEntry, specialMoment: e.target.value })}
              margin="normal"
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  sx={{
                    mr: 1,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                    },
                  }}
                >
                  Add Photo
                </Button>
              </label>
              <Button
                variant="contained"
                startIcon={isRecording ? <PauseIcon /> : <MicIcon />}
                onClick={() => isRecording ? stopRecording() : startRecording('audio')}
                sx={{
                  mr: 1,
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                  },
                }}
              >
                {isRecording ? 'Stop Recording' : 'Record Voice'}
              </Button>
              <Button
                variant="contained"
                startIcon={isRecording ? <PauseIcon /> : <VideocamIcon />}
                onClick={() => isRecording ? stopRecording() : startRecording('video')}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                  },
                }}
              >
                {isRecording ? 'Stop Recording' : 'Record Video'}
              </Button>
            </Box>
            {newEntry.image && (
              <ImagePreview>
                <img src={newEntry.image} alt="Preview" />
              </ImagePreview>
            )}
            {newEntry.media && (
              <MediaPreview>
                {newEntry.mediaType === 'video' ? (
                  <video src={newEntry.media} controls />
                ) : (
                  <audio src={newEntry.media} controls />
                )}
              </MediaPreview>
            )}
            <Button
              variant="contained"
              onClick={handleAddEntry}
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                },
              }}
            >
              Save Memory
            </Button>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
            Your Memories
          </Typography>
          {diaryEntries.map((entry) => (
            <StyledPaper key={entry.id} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#FF6B6B' }}>
                  {entry.title}
                </Typography>
                <IconButton onClick={() => handleDeleteEntry(entry.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {entry.date}
              </Typography>
              {entry.image && (
                <ImagePreview>
                  <img src={entry.image} alt={entry.title} />
                </ImagePreview>
              )}
              {entry.media && (
                <MediaPreview>
                  {entry.mediaType === 'video' ? (
                    <video src={entry.media} controls />
                  ) : (
                    <audio src={entry.media} controls />
                  )}
                </MediaPreview>
              )}
              <Typography variant="body1" paragraph>
                {entry.description}
              </Typography>
              {entry.specialMoment && (
                <Box sx={{ mt: 2, p: 2, background: '#FFF0F3', borderRadius: '10px' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                    What made today special:
                  </Typography>
                  <Typography variant="body1">
                    {entry.specialMoment}
                  </Typography>
                </Box>
              )}
            </StyledPaper>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PhotoDiaryScreen; 