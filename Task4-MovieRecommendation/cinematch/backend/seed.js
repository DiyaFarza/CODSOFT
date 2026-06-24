const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Movie = require('./models/Movie');

const movies = [
  { title: 'The Dark Knight', genre: ['Action', 'Crime', 'Drama'], year: 2008, description: 'Batman faces the Joker in Gotham City.', averageRating: 4.9 },
  { title: 'Inception', genre: ['Sci-Fi', 'Thriller'], year: 2010, description: 'A thief enters dreams to plant an idea.', averageRating: 4.8 },
  { title: 'Interstellar', genre: ['Sci-Fi', 'Drama'], year: 2014, description: 'Astronauts travel through a wormhole.', averageRating: 4.7 },
  { title: 'Parasite', genre: ['Thriller', 'Drama'], year: 2019, description: 'A poor family schemes to work for a rich family.', averageRating: 4.6 },
  { title: 'The Shawshank Redemption', genre: ['Drama'], year: 1994, description: 'Two imprisoned men bond over years.', averageRating: 4.9 },
  { title: 'Pulp Fiction', genre: ['Crime', 'Drama'], year: 1994, description: 'Interconnected stories of crime in LA.', averageRating: 4.7 },
  { title: 'The Matrix', genre: ['Sci-Fi', 'Action'], year: 1999, description: 'A hacker discovers reality is a simulation.', averageRating: 4.7 },
  { title: 'Avengers: Endgame', genre: ['Action', 'Sci-Fi'], year: 2019, description: 'The Avengers reverse Thanos\'s snap.', averageRating: 4.5 },
  { title: 'Forrest Gump', genre: ['Drama', 'Romance'], year: 1994, description: 'A slow-witted man witnesses history.', averageRating: 4.8 },
  { title: 'The Lion King', genre: ['Animation', 'Drama'], year: 1994, description: 'A lion cub flees his kingdom.', averageRating: 4.6 },
  { title: 'Goodfellas', genre: ['Crime', 'Drama'], year: 1990, description: 'A man rises through the mob.', averageRating: 4.7 },
  { title: 'Schindler\'s List', genre: ['Drama', 'History'], year: 1993, description: 'A businessman saves Jews during WWII.', averageRating: 4.9 },
  { title: 'Fight Club', genre: ['Drama', 'Thriller'], year: 1999, description: 'A man starts an underground fight club.', averageRating: 4.7 },
  { title: 'The Silence of the Lambs', genre: ['Thriller', 'Crime'], year: 1991, description: 'An FBI trainee consults a cannibal.', averageRating: 4.7 },
  { title: 'Joker', genre: ['Drama', 'Crime'], year: 2019, description: 'A failed comedian becomes a villain.', averageRating: 4.5 },
  { title: 'Whiplash', genre: ['Drama', 'Music'], year: 2014, description: 'A drummer pushes limits under a strict teacher.', averageRating: 4.8 },
  { title: 'La La Land', genre: ['Romance', 'Music'], year: 2016, description: 'Two artists fall in love in LA.', averageRating: 4.4 },
  { title: 'Get Out', genre: ['Horror', 'Thriller'], year: 2017, description: 'A man visits his girlfriend\'s family with dark secrets.', averageRating: 4.5 },
  { title: 'Mad Max: Fury Road', genre: ['Action', 'Sci-Fi'], year: 2015, description: 'A post-apocalyptic car chase for freedom.', averageRating: 4.5 },
  { title: 'Coco', genre: ['Animation', 'Family'], year: 2017, description: 'A boy visits the Land of the Dead.', averageRating: 4.6 },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Movie.deleteMany();
  await Movie.insertMany(movies);
  console.log('Movies seeded!');
  process.exit();
});