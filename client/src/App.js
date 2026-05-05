import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Journal from './pages/Journal';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function Navbar({ user }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  if (!user) return null;
  return (
    <nav className="navbar">
      <NavLink to="/journal" className="navbar-brand">🪞 MoodMirror</NavLink>
      <div className="navbar-links">
        <NavLink to="/journal" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Journal</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Dashboard</NavLink>
        <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="loading-screen">Loading MoodMirror...</div>;

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/journal" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/journal" />} />
          <Route path="/journal" element={user ? <Journal user={user} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={user ? "/journal" : "/"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
