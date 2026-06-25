import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logoutUser(); navigate('/login'); };

  return (
    <nav style={{ background: '#1a1a2e', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#e94560', fontSize: '22px', fontWeight: 'bold', textDecoration: 'none' }}>
        🎬 CineMatch
      </Link>
      {user && (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Movies</Link>
          <Link to="/recommendations" style={{ color: 'white', textDecoration: 'none' }}>For You</Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
          <button onClick={handleLogout} style={{ background: '#e94560', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}