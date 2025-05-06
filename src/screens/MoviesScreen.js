import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(108, 99, 255, 0.15)',
  },
}));

const movies = [
  {
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    image: "https://m.media-amazon.com/images/M/MV5BMTA0Nzg5NjQ4MDBeQTJeQWpwZ15BbWU3MDE2MTQ4MTk@._V1_.jpg",
    rating: 4.5,
    year: 2005,
    duration: "2h 23m",
    genre: ["Fantasy", "Adventure"],
    description: "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.",
    ageRating: "PG",
  },
  {
    title: "The Chronicles of Narnia: Prince Caspian",
    image: "https://m.media-amazon.com/images/M/MV5BMjE0MDkzMDI5MF5BMl5BanBnXkFtZTcwNzM2MjQ4OQ@@._V1_.jpg",
    rating: 4.2,
    year: 2008,
    duration: "2h 30m",
    genre: ["Fantasy", "Adventure"],
    description: "The Pevensie siblings return to Narnia to help Prince Caspian reclaim his rightful throne.",
    ageRating: "PG",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    image: "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOS00NmQ3LWE2YzItODk3YzFjMTU0ZTY2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg",
    rating: 4.7,
    year: 2001,
    duration: "2h 32m",
    genre: ["Fantasy", "Adventure"],
    description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    ageRating: "PG",
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    image: "https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg",
    rating: 4.6,
    year: 2002,
    duration: "2h 41m",
    genre: ["Fantasy", "Adventure"],
    description: "An ancient prophecy seems to be coming true when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed.",
    ageRating: "PG",
  },
  {
    title: "Home Alone",
    image: "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    rating: 4.8,
    year: 1990,
    duration: "1h 43m",
    genre: ["Comedy", "Family"],
    description: "When 8-year-old Kevin is accidentally left behind while his family flies to Paris, he must defend his home against bumbling burglars using an array of ingenious traps.",
    ageRating: "PG",
  },
  {
    title: "Home Alone 2: Lost in New York",
    image: "https://m.media-amazon.com/images/M/MV5BNDI1MzM0Y2YtYmIyMS00ODE3LTlhZjEtZTUyNmEzMTNhZWU5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    rating: 4.5,
    year: 1992,
    duration: "2h 0m",
    genre: ["Comedy", "Family"],
    description: "Kevin McCallister is back, but this time he's in New York City, where he must outsmart the same bumbling burglars in a new setting.",
    ageRating: "PG",
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    image: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_.jpg",
    rating: 4.8,
    year: 2004,
    duration: "2h 22m",
    genre: ["Fantasy", "Adventure"],
    description: "Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.",
    ageRating: "PG",
  },
  {
    title: "The Chronicles of Narnia: The Voyage of the Dawn Treader",
    image: "https://m.media-amazon.com/images/M/MV5BMjE5NTU3Njc3Ml5BMl5BanBnXkFtZTcwNjU4NTQ1NA@@._V1_.jpg",
    rating: 4.0,
    year: 2010,
    duration: "1h 53m",
    genre: ["Fantasy", "Adventure"],
    description: "Lucy and Edmund Pevensie return to Narnia with their cousin Eustace where they meet up with Prince Caspian for a trip across the sea aboard the royal ship The Dawn Treader.",
    ageRating: "PG",
  },
  {
    title: "Grave of the Fireflies",
    image: "https://m.media-amazon.com/images/M/MV5BZmY2NjUzNDQtNTgxNC00M2Q4LTljOWQtMjNjNDBjNWUxNmJlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    rating: 4.8,
    year: 1988,
    duration: "1h 29m",
    genre: ["Animation", "Drama", "War"],
    description: "A devastating story of two siblings trying to survive in Japan during World War II. A powerful tale of love, loss, and the human spirit.",
    ageRating: "PG-13",
  },
  {
    title: "Moana",
    image: "https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_.jpg",
    rating: 4.7,
    year: 2016,
    duration: "1h 47m",
    genre: ["Animation", "Adventure", "Comedy"],
    description: "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right.",
    ageRating: "PG",
  },
  {
    title: "The Lion King",
    image: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzYyLWE5NjYtY2YxZjY5ZWZhMTVkXkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg",
    rating: 4.9,
    year: 1994,
    duration: "1h 28m",
    genre: ["Animation", "Adventure", "Drama"],
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself. A timeless story of love, loss, and redemption.",
    ageRating: "G",
  },
  {
    title: "The Incredibles",
    image: "https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_.jpg",
    rating: 4.8,
    year: 2004,
    duration: "1h 55m",
    genre: ["Animation", "Action", "Adventure"],
    description: "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
    ageRating: "PG",
  },
  {
    title: "Spirited Away",
    image: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    rating: 4.9,
    year: 2001,
    duration: "2h 5m",
    genre: ["Animation", "Adventure", "Family"],
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    ageRating: "PG",
  },
  {
    title: "My Neighbor Totoro",
    image: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    rating: 4.8,
    year: 1988,
    duration: "1h 26m",
    genre: ["Animation", "Family", "Fantasy"],
    description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
    ageRating: "G",
  },
  {
    title: "Howl's Moving Castle",
    image: "https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    rating: 4.7,
    year: 2004,
    duration: "1h 59m",
    genre: ["Animation", "Adventure", "Family"],
    description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
    ageRating: "PG",
  },
  {
    title: "The Incredibles 2",
    image: "https://m.media-amazon.com/images/M/MV5BMTEzNzY0OTg0NTdeQTJeQWpwZ15BbWU3MDU2NjE4Nzk@._V1_.jpg",
    rating: 4.6,
    year: 2018,
    duration: "1h 58m",
    genre: ["Animation", "Action", "Adventure"],
    description: "The Incredibles family takes on a new mission which involves a change in family roles: Bob Parr (Mr. Incredible) must manage the house while his wife Helen (Elastigirl) goes out to save the world.",
    ageRating: "PG",
  },
  {
    title: "Kiki's Delivery Service",
    image: "https://m.media-amazon.com/images/M/MV5BOTc0ODM1Njk1NF5BMl5BanBnXkFtZTcwMDI5OTEyNw@@._V1_.jpg",
    rating: 4.7,
    year: 1989,
    duration: "1h 43m",
    genre: ["Animation", "Adventure", "Comedy"],
    description: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.",
    ageRating: "G",
  },
  {
    title: "Ponyo",
    image: "https://m.media-amazon.com/images/M/MV5BMTYzOTc2OTU0NF5BMl5BanBnXkFtZTcwNjU5NTU1Mg@@._V1_.jpg",
    rating: 4.6,
    year: 2008,
    duration: "1h 41m",
    genre: ["Animation", "Adventure", "Comedy"],
    description: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.",
    ageRating: "G",
  }
];

function MoviesScreen() {
  const navigate = useNavigate();

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
          Movie Time 🎬
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
          Let's watch some amazing movies together! 🍿
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardMedia
                component="img"
                height="400"
                image={movie.image}
                alt={movie.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, background: 'rgba(255, 255, 255, 0.98)' }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ 
                  fontWeight: 'bold',
                  color: '#2D3142',
                  fontFamily: '"Comic Sans MS", cursive',
                }}>
                  {movie.title}
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={movie.rating} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    ({movie.rating})
                  </Typography>
                </Box>
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {movie.genre.map((g, i) => (
                    <Chip 
                      key={i} 
                      label={g} 
                      size="small"
                      sx={{ 
                        background: 'rgba(108, 99, 255, 0.1)',
                        color: '#6C63FF',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {movie.year} • {movie.duration} • {movie.ageRating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MoviesScreen; 