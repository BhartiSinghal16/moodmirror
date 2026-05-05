import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EMOTIONS = ['😊 happy', '😢 sad', '😰 anxious', '😡 angry', '🌟 hopeful', '😤 overwhelmed', '🙏 grateful', '😔 lonely', '🎉 excited', '😐 neutral'];

export default function Landing() {
  const navigate = useNavigate();
  const [activeEmotion, setActiveEmotion] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveEmotion(prev => (prev + 1) % EMOTIONS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const btn = (text, primary, onClick) => (
    <button onClick={onClick} style={{
      padding: '0.75rem 1.75rem', borderRadius: '12px', cursor: 'pointer',
      fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 600,
      border: primary ? 'none' : '1px solid #3d3520',
      background: primary ? 'linear-gradient(135deg, #e8956d, #d4956a)' : 'rgba(37,32,16,0.8)',
      color: primary ? '#fff' : '#f0e6d0', transition: 'opacity 0.2s'
    }}>{text}</button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#1a1207', color: '#f0e6d0', fontFamily: 'Georgia, serif' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.1rem 2.5rem', borderBottom: '1px solid #3d3520',
        background: 'rgba(26,18,7,0.95)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#f4b87a' }}>🪞 MoodMirror</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['How it works', 'Features', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} style={{
              color: '#9d8f72', textDecoration: 'none', fontSize: '0.88rem', fontFamily: 'Inter, sans-serif'
            }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {btn('Sign in', false, () => navigate('/login'))}
          {btn('Get Started', true, () => navigate('/login'))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '5rem 1.5rem 3rem', background: 'radial-gradient(ellipse at center top, rgba(232,149,109,0.08) 0%, transparent 60%)' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 1rem', marginBottom: '2rem',
          background: 'rgba(232,149,109,0.1)', border: '1px solid rgba(232,149,109,0.25)',
          borderRadius: '999px', fontSize: '0.8rem', color: '#e8956d', fontFamily: 'Inter, sans-serif'
        }}>✨ MoodMirror is live — Free forever</div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, maxWidth: '700px', margin: '0 auto 0.75rem' }}>
          Feel{' '}
          <span style={{
            color: '#f4b87a',
            display: 'inline-block',
            animation: 'fadeWord 0.5s ease',
            minWidth: '140px'
          }}>{EMOTIONS[activeEmotion]}</span>
          ?<br />Let's talk about it.
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#9d8f72', maxWidth: '500px', margin: '1.25rem auto 2.5rem', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>
          MoodMirror is a private AI journaling companion that listens without judgment,
          detects your emotions, and helps you understand yourself better.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {btn('Start Journaling Free →', true, () => navigate('/login'))}
          {btn('Sign In', false, () => navigate('/login'))}
        </div>
        <p style={{ fontSize: '0.78rem', color: '#5a4f3a', fontFamily: 'Inter, sans-serif' }}>No credit card · No email verification · 100% private</p>

        {/* App preview */}
        <div style={{
          margin: '3.5rem auto 0', maxWidth: '820px',
          background: '#252010', border: '1px solid #3d3520',
          borderRadius: '20px', padding: '1.5rem',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,149,109,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
            {['#ef4444','#f59e0b','#22c55e'].map(c => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
            <div style={{ flex: 1, background: '#1a1207', borderRadius: '6px', height: '22px', marginLeft: '8px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
              <span style={{ fontSize: '0.7rem', color: '#5a4f3a', fontFamily: 'monospace' }}>localhost:3000/journal</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#9d8f72', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>Your journal entry</div>
              <div style={{ background: '#2e2a1a', border: '1px solid #3d3520', borderRadius: '10px', padding: '0.85rem', fontSize: '0.82rem', color: '#c8b89a', lineHeight: 1.7, minHeight: '100px' }}>
                I feel so overwhelmed today. Everything is piling up and I don't know where to start. I just need a moment to breathe...
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ background: 'linear-gradient(135deg, #e8956d, #d4956a)', borderRadius: '8px', padding: '0.45rem 1rem', fontSize: '0.78rem', color: '#fff', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>✨ Reflect</div>
                  <div style={{ background: '#2e2a1a', border: '1px solid #3d3520', borderRadius: '8px', padding: '0.45rem 0.75rem', fontSize: '0.78rem', color: '#9d8f72', fontFamily: 'Inter, sans-serif' }}>🎤 Voice</div>
                  <div style={{ background: '#2e2a1a', border: '1px solid #3d3520', borderRadius: '8px', padding: '0.45rem 0.75rem', fontSize: '0.78rem', color: '#9d8f72', fontFamily: 'Inter, sans-serif' }}>📄 PDF</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#9d8f72', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>AI response</div>
              <div style={{ background: 'rgba(232,149,109,0.08)', border: '1px solid rgba(232,149,109,0.2)', borderRadius: '10px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span>🪞</span>
                  <span style={{ background: '#c97a7a', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}>overwhelmed</span>
                  <span style={{ fontSize: '0.7rem', color: '#9d8f72', fontFamily: 'Inter, sans-serif' }}>8/10</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#c8b89a', lineHeight: 1.65 }}>
                  It sounds like you're carrying so much right now. Your feelings are completely valid. What feels heaviest for you today?
                </p>
                <div style={{ marginTop: '0.6rem', background: 'rgba(232,149,109,0.1)', borderRadius: '8px', padding: '0.5rem', fontSize: '0.72rem', color: '#e8956d', fontFamily: 'Inter, sans-serif' }}>
                  ✨ Take 3 slow deep breaths
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '5rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#e8956d', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.12em', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>HOW IT WORKS</p>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Start in 3 simple steps</h2>
        <p style={{ textAlign: 'center', color: '#9d8f72', marginBottom: '3rem', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>Journaling with AI has never been this easy or this warm</p>
        {[
          { n: '1', title: 'Create a free account', desc: 'Sign up in seconds — no credit card, no email confirmation. Just pick an email and password.' },
          { n: '2', title: 'Write or speak how you feel', desc: 'Type freely or use voice input. No format, no rules — just your honest thoughts and feelings.' },
          { n: '3', title: 'Get AI emotional insights', desc: 'MoodMirror detects your emotion, validates your feelings, gives a micro-action, and tracks your mood over 30 days.' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: '1.25rem', background: '#252010',
            border: '1px solid #3d3520', borderRadius: '16px',
            padding: '1.5rem', marginBottom: '1rem'
          }}>
            <div style={{
              minWidth: '2.5rem', height: '2.5rem', borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8956d, #d4956a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: '#fff', flexShrink: 0
            }}>{s.n}</div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#9d8f72', fontFamily: 'Inter, sans-serif', marginBottom: '0.2rem' }}>Step {s.n}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{s.title}</h3>
              <p style={{ color: '#9d8f72', fontSize: '0.87rem', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '2rem 1.5rem 5rem', maxWidth: '920px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#e8956d', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.12em', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>FEATURES</p>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: '3rem' }}>Everything you need to know yourself</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: '🧠', title: 'AI Emotion Detection', desc: '10 emotion types with intensity scores powered by Llama AI.' },
            { icon: '📈', title: '30-Day Mood Tracking', desc: 'Beautiful charts showing your emotional patterns over time.' },
            { icon: '🎤', title: 'Voice Journaling', desc: 'Speak your thoughts and let AI transcribe and analyze them.' },
            { icon: '🔥', title: 'Streak Tracking', desc: 'Build a daily journaling habit with your streak counter.' },
            { icon: '🧘', title: 'Meditation Timer', desc: 'Built-in 1, 3, and 5 minute timers to breathe before writing.' },
            { icon: '📄', title: 'PDF Export', desc: 'Download any journal entry with AI insights as a PDF.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#252010', border: '1px solid #3d3520', borderRadius: '14px', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.title}</h3>
              <p style={{ color: '#9d8f72', fontSize: '0.84rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '4rem 1.5rem', textAlign: 'center', borderTop: '1px solid #3d3520', background: 'radial-gradient(ellipse at center, rgba(232,149,109,0.06) 0%, transparent 70%)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Ready to understand yourself?</h2>
        <p style={{ color: '#9d8f72', marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>Join others journaling with AI. Free, private, takes less than a minute.</p>
        <div style={{ display: 'inline-block', background: '#252010', border: '1px solid #3d3520', borderRadius: '20px', padding: '2.5rem 3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🪞</div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f4b87a', marginBottom: '0.25rem' }}>MoodMirror</div>
          <div style={{ color: '#9d8f72', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>Your private AI journaling companion</div>
          {btn('Start Your Journal Free →', true, () => navigate('/login'))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #3d3520', padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#120e05' }}>
        <div style={{ fontWeight: 700, color: '#f4b87a', fontSize: '1rem' }}>🪞 MoodMirror</div>
        <div style={{ color: '#5a4f3a', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>© 2026 MoodMirror · Private AI Journaling · Made with ❤️</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Home', 'Journal', 'Dashboard'].map(l => (
            <a key={l} href={l === 'Home' ? '/' : `/${l.toLowerCase()}`} style={{ color: '#9d8f72', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'Inter, sans-serif' }}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes fadeWord { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}