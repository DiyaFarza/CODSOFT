import { useEffect, useState } from 'react';
import { getRecommendations } from '../api/api';

export default function Recommendations() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getRecommendations();
        setRecs(res.data.recommendations || []);
        setMessage(res.data.message || '');
        setFromCache(res.data.fromCache);
      } catch { setMessage('Error loading recommendations'); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div style={{ background: '#0f0f1a', minHeight: '90vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>🤖 AI is thinking...</h2></div>;

  return (
    <div style={{ background: '#0f0f1a', minHeight: '90vh', padding: '24px', color: 'white' }}>
      <h2 style={{ textAlign: 'center', color: '#e94560' }}>✨ Picked Just For You</h2>
      {fromCache && <p style={{ textAlign: 'center', color: '#aaa', fontSize: '12px' }}>⚡ Served from cache</p>}
      {message && <p style={{ textAlign: 'center', color: '#aaa' }}>{message}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '24px' }}>
        {recs.map(movie => (
          <div key={movie._id} style={{ background: '#16213e', borderRadius: '12px', padding: '20px', width: '240px' }}>
            <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>🎬</div>
            <h3 style={{ margin: '4px 0', fontSize: '16px' }}>{movie.title}</h3>
            <p style={{ color: '#aaa', fontSize: '12px' }}>{movie.year} • {movie.genre?.join(', ')}</p>
            <p style={{ color: '#f5c518', fontSize: '12px' }}>⭐ {movie.averageRating}</p>
            <p style={{ color: '#7ec8e3', fontSize: '13px', marginTop: '10px', fontStyle: 'italic' }}>🤖 {movie.aiReason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}