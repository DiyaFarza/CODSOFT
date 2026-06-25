import { useState } from 'react';
import StarRating from './StarRating';
import { rateMovie } from '../api/api';

export default function MovieCard({ movie, userRating }) {
  const [rated, setRated] = useState(userRating || 0);
  const [saved, setSaved] = useState(false);

  const handleRate = async (rating) => {
    setRated(rating);
    await rateMovie({ movieId: movie._id, rating });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div style={{ background: '#16213e', borderRadius: '12px', padding: '16px', width: '200px', color: 'white' }}>
      <div style={{ background: '#0f3460', height: '120px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '10px' }}>
        🎬
      </div>
      <h4 style={{ margin: '4px 0', fontSize: '14px' }}>{movie.title}</h4>
      <p style={{ margin: '2px 0', color: '#aaa', fontSize: '12px' }}>{movie.year} • {movie.genre.join(', ')}</p>
      <p style={{ margin: '4px 0', color: '#f5c518', fontSize: '12px' }}>⭐ {movie.averageRating}</p>
      <StarRating onRate={handleRate} currentRating={rated} />
      {saved && <p style={{ color: '#4caf50', fontSize: '12px', margin: '4px 0' }}>✓ Saved!</p>}
    </div>
  );
}