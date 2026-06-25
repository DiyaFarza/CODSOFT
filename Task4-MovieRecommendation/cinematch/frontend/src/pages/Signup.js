import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      loginUser(res.data.token, res.data.name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ minHeight: '90vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#16213e', padding: '40px', borderRadius: '12px', width: '360px', color: 'white' }}>
        <h2 style={{ textAlign: 'center', color: '#e94560' }}>Join CineMatch 🎬</h2>
        {error && <p style={{ color: '#e94560', textAlign: 'center' }}>{error}</p>}
        {['name', 'email', 'password'].map(field => (
          <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            type={field === 'password' ? 'password' : 'text'} value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: 'none', background: '#0f3460', color: 'white', boxSizing: 'border-box' }} />
        ))}
        <button onClick={handleSubmit}
          style={{ width: '100%', padding: '12px', background: '#e94560', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '12px', fontSize: '16px' }}>
          Create Account
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          Have an account? <Link to="/login" style={{ color: '#e94560' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}