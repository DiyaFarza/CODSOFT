import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data.token, res.data.name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '90vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#16213e', padding: '40px', borderRadius: '12px', width: '360px', color: 'white' }}>
        <h2 style={{ textAlign: 'center', color: '#e94560' }}>Welcome Back 🎬</h2>
        {error && <p style={{ color: '#e94560', textAlign: 'center' }}>{error}</p>}
        <input placeholder="Email" type="email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: 'none', background: '#0f3460', color: 'white', boxSizing: 'border-box' }} />
        <input placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: 'none', background: '#0f3460', color: 'white', boxSizing: 'border-box' }} />
        <button onClick={handleSubmit}
          style={{ width: '100%', padding: '12px', background: '#e94560', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '12px', fontSize: '16px' }}>
          Login
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          No account? <Link to="/signup" style={{ color: '#e94560' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}