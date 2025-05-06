import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
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

const activities = [
  {
    id: 1,
    title: 'Morning Exercise',
    description: 'Start your day with some fun exercises!',
    duration: '30 mins',
    difficulty: 'Easy',
    materials: ['Yoga mat', 'Water bottle'],
    emoji: '🧘‍♀️',
    videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak' // Fun Kids Exercise
  },
  {
    id: 2,
    title: 'Art & Craft',
    description: 'Create beautiful summer-themed crafts',
    duration: '45 mins',
    difficulty: 'Medium',
    materials: ['Paper', 'Scissors', 'Glue', 'Colors'],
    emoji: '🎨',
    videoUrl: null,
    learningTips: `Here are some fun art and craft ideas for summer:

1. Paper Sun Catchers: Create colorful sun catchers using tissue paper and contact paper!

2. Summer Collage: Make a collage using magazine cutouts of summer things like ice cream, beach, and sun!

3. Nature Art: Use leaves, flowers, and twigs to create beautiful nature art!

4. DIY Wind Chimes: Make wind chimes using old keys, beads, and string!

5. Painted Rocks: Collect smooth rocks and paint them with fun designs!

6. Paper Plate Animals: Transform paper plates into your favorite animals!

7. Summer Memory Book: Create a scrapbook of your summer adventures!

8. DIY Bookmarks: Make colorful bookmarks using cardstock and stickers!

9. Tissue Paper Flowers: Create beautiful flowers using tissue paper and pipe cleaners!

10. Summer Mobile: Make a hanging mobile with summer-themed items!

Remember: The best art comes from your imagination! 🎨✨`
  },
  {
    id: 3,
    title: 'Science Experiment',
    description: 'Fun and safe experiments to learn about science',
    duration: '1 hour',
    difficulty: 'Medium',
    materials: ['Baking soda', 'Vinegar', 'Food coloring'],
    emoji: '🧪',
    videoUrl: 'https://www.youtube.com/embed/4MHn9Q5NtdY' // Cool Science Experiments
  },
  {
    id: 4,
    title: 'Cooking Class',
    description: 'Learn to make simple and delicious recipes',
    duration: '1 hour',
    difficulty: 'Medium',
    materials: ['Basic kitchen utensils', 'Ingredients'],
    emoji: '🍳',
    videoUrl: null,
    learningTips: `Here are some fun and easy recipes to try:

1. Fruit Kabobs: Thread colorful fruits onto skewers for a healthy snack!

2. Mini Pizzas: Use English muffins as bases and add your favorite toppings!

3. Smoothie Bowls: Blend fruits and top with granola and berries!

4. No-Bake Cookies: Mix oats, honey, and peanut butter for quick treats!

5. Rainbow Sandwiches: Layer different colored vegetables in sandwiches!

6. Fruit Popsicles: Freeze fruit juice with fresh fruit pieces!

7. Trail Mix: Combine nuts, dried fruits, and cereal for a healthy snack!

8. Mini Pancakes: Make tiny pancakes and top with fresh fruits!

9. Yogurt Parfait: Layer yogurt, granola, and fruits in a glass!

10. Veggie Wraps: Roll up vegetables and hummus in tortillas!

Remember: Always ask an adult for help in the kitchen! 👨‍🍳✨`
  },
  {
    id: 5,
    title: 'Dance Party',
    description: 'Move and groove to your favorite music',
    duration: '30 mins',
    difficulty: 'Easy',
    materials: ['Music player', 'Space to dance'],
    emoji: '💃',
    videoUrl: 'https://www.youtube.com/embed/ymigWt5TOV8' // Kids Dance Party
  },
  {
    id: 6,
    title: 'Garden Time',
    description: 'Learn about plants and gardening',
    duration: '45 mins',
    difficulty: 'Easy',
    materials: ['Seeds', 'Soil', 'Pots'],
    emoji: '🌱',
    videoUrl: 'https://www.youtube.com/embed/w77zPAtVTuI' // Kids Gardening Tips
  },
  {
    id: 7,
    title: 'Stargazing Adventure',
    description: 'Explore the night sky and learn about constellations',
    duration: '1 hour',
    difficulty: 'Easy',
    materials: ['Star chart', 'Blanket', 'Flashlight'],
    emoji: '✨',
    videoUrl: 'https://www.youtube.com/embed/1sZ15SUeS9w' // Astronomy for Kids
  },
  {
    id: 8,
    title: 'Fun Science Projects',
    description: 'Exciting experiments like rainbow in a jar and balloon rockets',
    duration: '45 mins',
    difficulty: 'Medium',
    materials: ['Clear jar', 'Food coloring', 'Balloon', 'String'],
    emoji: '🚀',
    videoUrl: 'https://www.youtube.com/embed/K0PJ4LiWl8w' // DIY Science Projects
  },
  {
    id: 9,
    title: 'Easy Baking Fun',
    description: 'Make delicious cookies and cupcakes with simple recipes',
    duration: '1 hour',
    difficulty: 'Easy',
    materials: ['Flour', 'Sugar', 'Eggs', 'Baking tools'],
    emoji: '🍪',
    videoUrl: 'https://www.youtube.com/embed/3QJ6zH3b-nU', // Easy Baking Tutorial
    learningTips: `Fun Baking Tips for Kids:
1. Measure ingredients carefully - it's like a science experiment!
2. Mix ingredients slowly - watch the magic happen!
3. Use cookie cutters for fun shapes
4. Decorate with colorful sprinkles
5. Share your treats with family and friends

Remember: Always ask an adult for help in the kitchen! 👨‍🍳✨`
  },
  {
    id: 10,
    title: 'SpellBee Challenge',
    description: 'Fun spelling game with exciting rewards',
    duration: '30 mins',
    difficulty: 'Easy',
    materials: ['Word cards', 'Score board', 'Prizes'],
    emoji: '📝',
    videoUrl: null,
    learningTips: `Quick Tips for Spelling Success:
1. Break words into parts (beau-ti-ful)
2. Draw pictures to remember words
3. Group similar words together
4. Make up fun rhymes
5. Create letter stories

Fun Games to Play:
1. Spelling Bee Contest - Take turns being judge and contestant
2. Word Chain - Start with a word, next word begins with last letter
3. Spelling Charades - Act out words for others to guess
4. Word Building Race - Add letters to make new words
5. Spelling Treasure Hunt - Find and spell hidden words

Remember: Learning to spell is like solving a fun puzzle! 🎯`
  }
];

const pogoShows = [
  {
    title: 'Rob\'s Special Message',
    description: 'Hey Kids! I\'m Rob, and I love turning everyday things into amazing creations! Watch how I mix music, art, and dance to make learning super fun. Let\'s create something magical together! 🎨✨',
    schedule: 'Watch Anytime!',
    link: 'https://www.youtube.com/embed/tX-eLgQEk5M' // Rob's Special Message
  }
];

const faqs = [
  {
    question: 'What time should we start the activities?',
    answer: 'Morning activities are best started between 9 AM to 11 AM when energy levels are high.'
  },
  {
    question: 'How long should each activity last?',
    answer: 'Activities are designed to last between 30 minutes to 1 hour, depending on the child\'s age and interest.'
  },
  {
    question: 'Do we need special materials?',
    answer: 'Most activities use common household items. Any special materials needed are listed in the activity description.'
  },
  {
    question: 'Can we modify the activities?',
    answer: 'Yes! Feel free to adapt activities to suit your child\'s interests and abilities.'
  }
];

function ActivitiesScreen() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showFaqs, setShowFaqs] = useState(false);

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
          Daily Activities
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#fff',
            fontFamily: '"Comic Sans MS", cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          Fun activities for every day of summer! 🌞
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => setShowFaqs(true)}
          sx={{
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
            },
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          View FAQs
        </Button>
      </Box>

      <Grid container spacing={4}>
        {activities.map((activity) => (
          <Grid item xs={12} md={6} key={activity.id}>
            <StyledPaper>
              <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
                {activity.emoji}
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                {activity.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {activity.description}
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Chip label={`⏱️ ${activity.duration}`} sx={{ mr: 1, mb: 1 }} />
                <Chip label={`📊 ${activity.difficulty}`} sx={{ mr: 1, mb: 1 }} />
              </Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Materials needed:
              </Typography>
              <Box sx={{ mb: 2 }}>
                {activity.materials.map((material, index) => (
                  <Chip
                    key={index}
                    label={material}
                    size="small"
                    sx={{ mr: 1, mb: 1, background: '#FFE5E5' }}
                  />
                ))}
              </Box>
              {activity.videoUrl ? (
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => setSelectedVideo(activity)}
                  sx={{
                    mt: 'auto',
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                    },
                    fontFamily: '"Comic Sans MS", cursive',
                  }}
                >
                  Watch Tutorial
                </Button>
              ) : activity.learningTips ? (
                <Box sx={{ mt: 'auto', p: 2, background: '#FFF0F3', borderRadius: '10px' }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-line',
                      fontFamily: '"Comic Sans MS", cursive',
                      color: '#666'
                    }}
                  >
                    {activity.learningTips}
                  </Typography>
                </Box>
              ) : null}
            </StyledPaper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#FF6B6B', fontFamily: '"Comic Sans MS", cursive' }}>
          Meet Rob - Your Creative Friend! 🎨🎵💃
        </Typography>
        <Grid container spacing={3}>
          {pogoShows.map((show, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledPaper>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                  {show.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {show.description}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Schedule: {show.schedule}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  href={show.link}
                  target="_blank"
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                    },
                    fontFamily: '"Comic Sans MS", cursive',
                  }}
                >
                  Watch Rob's Special Message
                </Button>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedVideo?.title}
          <IconButton
            onClick={() => setSelectedVideo(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              src={selectedVideo?.videoUrl}
              title={`${selectedVideo?.title} Tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showFaqs}
        onClose={() => setShowFaqs(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Frequently Asked Questions
          <IconButton
            onClick={() => setShowFaqs(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {faqs.map((faq, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {faq.question}
              </Typography>
              <Typography variant="body1">
                {faq.answer}
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFaqs(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ActivitiesScreen; 