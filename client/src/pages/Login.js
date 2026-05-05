import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {
    setError(''); setMsg('');
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setLoading(true);

    const { error: authError } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
    } else if (isSignUp) {
      setMsg('Account created! Check your email to confirm, or sign in directly.');
    }
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-title">🪞 MoodMirror</div>
        <p className="login-sub">Your private AI journaling companion</p>

        <div className="form-group">
          <label>Email</label>
          <input className="input" type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input className="input" type="password" placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>

        {error && <p className="error-msg">{error}</p>}
        {msg && <p style={{ color: '#22c55e', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.75rem' }}>{msg}</p>}

        <div className="auth-toggle">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(''); setMsg(''); }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}