import { useEffect, useState } from 'react';
import { getMovies, getMyRatings } from '../api/api';
import MovieCard from '../components/MovieCard';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [userRatings, setUserRatings] = useState({});

  useEffect(() => {
    async function load() {
      const [moviesRes, ratingsRes] = await Promise.all([getMovies(), getMyRatings()]);
      setMovies(moviesRes.data);
      const ratingsMap = {};
      ratingsRes.data.forEach(r => { ratingsMap[r.movie._id] = r.rating; });
      setUserRatings(ratingsMap);
    }
    load();
  }, []);

  return (
    <div style={{ background: '#0f0f1a', minHeight: '90vh', padding: '24px' }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>🎬 Rate Movies to Get Recommendations</h2>
      <p style={{ color: '#aaa', textAlign: 'center' }}>Rate at least 5 movies to unlock personalized picks</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} userRating={userRatings[movie._id]} />
        ))}
      </div>
    </div>
  );
}