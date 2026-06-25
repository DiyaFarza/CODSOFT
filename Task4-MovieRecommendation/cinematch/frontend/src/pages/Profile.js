import { useEffect, useState } from 'react';
import { getMyRatings } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const { user } = useAuth();
  const [genreData, setGenreData] = useState([]);
  const [totalRated, setTotalRated] = useState(0);

  useEffect(() => {
    async function load() {
      const res = await getMyRatings();
      const ratings = res.data;
      setTotalRated(ratings.length);

      // Count ratings by genre
      const genreCounts = {};
      ratings.forEach(r => {
        r.movie?.genre?.forEach(g => {
          genreCounts[g] = (genreCounts[g] || 0) + r.rating;
        });
      });

      const data = Object.entries(genreCounts)
        .map(([genre, score]) => ({ genre, score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
      setGenreData(data);
    }
    load();
  }, []);

  return (
    <div style={{ background: '#0f0f1a', minHeight: '90vh', padding: '24px', color: 'white' }}>
      <h2 style={{ textAlign: 'center', color: '#e94560' }}>👤 {user?.name}'s Taste Profile</h2>
      <p style={{ textAlign: 'center', color: '#aaa' }}>You've rated {totalRated} movies</p>
      {genreData.length > 0 ? (
        <div style={{ maxWidth: '500px', margin: '30px auto' }}>
          <h3 style={{ textAlign: 'center', color: '#7ec8e3' }}>Your Genre Preferences</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={genreData}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="genre" tick={{ fill: '#aaa', fontSize: 12 }} />
              <Radar dataKey="score" stroke="#e94560" fill="#e94560" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#aaa' }}>Rate some movies to see your taste profile!</p>
      )}
    </div>
  );
}