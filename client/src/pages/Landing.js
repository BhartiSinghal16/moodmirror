import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EMOTIONS = ['😊 happy', '😢 sad', '😰 anxious', '😡 angry', '🌟 hopeful', '😤 overwhelmed', '🙏 grateful', '😔 lonely', '🎉 excited', '😐 neutral'];

export default function Landing() {
  const navigate = useNavigate();
  const [activeEmotion, setActiveEmotion] = useState(0);
 
  const isMobile = window.innerWidth < 768;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveEmotion(prev => (prev + 1) % EMOTIONS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const btn = (text, primary, onClick) => (
    <button onClick={onClick} style={{
      padding: '0.7rem 1.4rem', borderRadius: '12px', cursor: 'pointer',
      fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600,
      border: primary ? 'none' : '1px solid #3d3520',
      background: primary ? 'linear-gradient(135deg, #e8956d, #d4956a)' : 'rgba(37,32,16,0.8)',
      color: primary ? '#fff' : '#f0e6d0', transition: 'opacity 0.2s'
    }}>{text}</button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#1a1207', color: '#f0e6d0', fontFamily: 'Georgia, serif' }}>

      {/* ── Navbar ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 1.25rem', borderBottom: '1px solid #3d3520',
        background: 'rgba(26,18,7,0.97)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100, flexWrap: 'wrap', gap: '0.5rem'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f4b87a' }}>🪞 MoodMirror</div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['How it works', 'Features', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{
                color: '#9d8f72', textDecoration: 'none', fontSize: '0.88rem', fontFamily: 'Inter, sans-serif'
              }}>{l}</a>
            ))}
          </div>
        )}

        {/* Desktop buttons */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {btn('Sign in', false, () => navigate('/login'))}
            {btn('Get Started', true, () => navigate('/login'))}
          </div>
        )}

        {/* Mobile buttons */}
        {isMobile && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => navigate('/login')} style={{
              padding: '0.45rem 0.9rem', borderRadius: '8px', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 600,
              border: '1px solid #3d3520', background: 'transparent', color: '#f0e6d0'
            }}>Sign in</button>
            <button onClick={() => navigate('/login')} style={{
              padding: '0.45rem 0.9rem', borderRadius: '8px', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 700,
              border: 'none', background: 'linear-gradient(135deg, #e8956d, #d4956a)', color: '#fff'
            }}>Get Started</button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section style={{
        textAlign: 'center', padding: isMobile ? '3rem 1rem 2rem' : '5rem 1.5rem 3rem',
        background: 'radial-gradient(ellipse at center top, rgba(232,149,109,0.08) 0%, transparent 60%)'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 1rem', marginBottom: '1.5rem',
          background: 'rgba(232,149,109,0.1)', border: '1px solid rgba(232,149,109,0.25)',
          borderRadius: '999px', fontSize: '0.78rem', color: '#e8956d', fontFamily: 'Inter, sans-serif'
        }}>✨ MoodMirror is live — Free forever</div>

        <h1 style={{
          fontSize: isMobile ? '2rem' : 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 900, lineHeight: 1.15, maxWidth: '700px', margin: '0 auto 0.75rem'
        }}>
          Feel{' '}
          <span style={{ color: '#f4b87a', display: 'inline-block', animation: 'fadeWord 0.5s ease' }}>
            {EMOTIONS[activeEmotion]}
          </span>
          ?<br />Let's talk about it.
        </h1>

        <p style={{
          fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#9d8f72',
          maxWidth: '500px', margin: '1rem auto 2rem', lineHeight: 1.8, fontFamily: 'Inter, sans-serif'
        }}>
          MoodMirror is a private AI journaling companion that listens without judgment,
          detects your emotions, and helps you understand yourself better.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {btn('Start Journaling Free →', true, () => navigate('/login'))}
          {btn('Sign In', false, () => navigate('/login'))}
        </div>
        <p style={{ fontSize: '0.75rem', color: '#5a4f3a', fontFamily: 'Inter, sans-serif' }}>
          No credit card · No email verification · 100% private
        </p>

        {/* App preview */}
        <div style={{
          margin: '2.5rem auto 0', maxWidth: '820px',
          background: '#252010', border: '1px solid #3d3520',
          borderRadius: '16px', padding: isMobile ? '1rem' : '1.5rem',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)'
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <div style={{ flex: 1, background: '#1a1207', borderRadius: '6px', height: '20px', marginLeft: '8px', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
              <span style={{ fontSize: '0.65rem', color: '#5a4f3a', fontFamily: 'monospace' }}>moodmirror-ten.vercel.app/journal</span>
            </div>
          </div>

          {/* Stack on mobile, grid on desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1rem', textAlign: 'left'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#9d8f72', marginBottom: '0.4rem', fontFamily: 'Inter, sans-serif' }}>Your journal entry</div>
              <div style={{ background: '#2e2a1a', border: '1px solid #3d3520', borderRadius: '10px', padding: '0.85rem', fontSize: '0.82rem', color: '#c8b89a', lineHeight: 1.7 }}>
                I feel so overwhelmed today. Everything is piling up and I don't know where to start...
              </div>
              <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[['✨ Reflect', '#e8956d'], ['🎤 Voice', '#3d3520'], ['📄 PDF', '#3d3520']].map(([label, bg]) => (
                  <div key={label} style={{
                    background: label === '✨ Reflect' ? 'linear-gradient(135deg, #e8956d, #d4956a)' : '#2e2a1a',
                    border: `1px solid ${bg}`, borderRadius: '8px',
                    padding: '0.4rem 0.8rem', fontSize: '0.75rem',
                    color: label === '✨ Reflect' ? '#fff' : '#9d8f72', fontFamily: 'Inter, sans-serif'
                  }}>{label}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#9d8f72', marginBottom: '0.4rem', fontFamily: 'Inter, sans-serif' }}>AI response</div>
              <div style={{ background: 'rgba(232,149,109,0.08)', border: '1px solid rgba(232,149,109,0.2)', borderRadius: '10px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span>🪞</span>
                  <span style={{ background: '#c97a7a', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}>overwhelmed</span>
                  <span style={{ fontSize: '0.7rem', color: '#9d8f72', fontFamily: 'Inter, sans-serif' }}>8/10</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#c8b89a', lineHeight: 1.65 }}>
                  It sounds like you're carrying so much right now. Your feelings are completely valid. What feels heaviest for you today?
                </p>
                <div style={{ marginTop: '0.5rem', background: 'rgba(232,149,109,0.1)', borderRadius: '8px', padding: '0.45rem 0.75rem', fontSize: '0.72rem', color: '#e8956d', fontFamily: 'Inter, sans-serif' }}>
                  ✨ Take 3 slow deep breaths
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" style={{ padding: isMobile ? '3rem 1rem' : '5rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#e8956d', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.12em', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>HOW IT WORKS</p>
        <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Start in 3 simple steps</h2>
        <p style={{ textAlign: 'center', color: '#9d8f72', marginBottom: '2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.92rem' }}>Journaling with AI has never been this easy or this warm</p>
        {[
          { n: '1', title: 'Create a free account', desc: 'Sign up in seconds — no credit card, no email confirmation. Just pick an email and password.' },
          { n: '2', title: 'Write or speak how you feel', desc: 'Type freely or use voice input. No format, no rules — just your honest thoughts and feelings.' },
          { n: '3', title: 'Get AI emotional insights', desc: 'MoodMirror detects your emotion, validates your feelings, gives a micro-action, and tracks your mood over 30 days.' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: '1rem', background: '#252010',
            border: '1px solid #3d3520', borderRadius: '14px',
            padding: '1.25rem', marginBottom: '0.9rem'
          }}>
            <div style={{
              minWidth: '2.2rem', height: '2.2rem', borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8956d, #d4956a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: '#fff', flexShrink: 0, fontSize: '0.9rem'
            }}>{s.n}</div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#9d8f72', fontFamily: 'Inter, sans-serif', marginBottom: '0.2rem' }}>Step {s.n}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.95rem' }}>{s.title}</h3>
              <p style={{ color: '#9d8f72', fontSize: '0.84rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: isMobile ? '1rem 1rem 3rem' : '2rem 1.5rem 5rem', maxWidth: '920px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#e8956d', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.12em', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>FEATURES</p>
        <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 800, marginBottom: '2rem' }}>Everything you need to know yourself</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { icon: '🧠', title: 'AI Emotion Detection', desc: '10 emotion types with intensity scores.' },
            { icon: '📈', title: '30-Day Mood Tracking', desc: 'Charts showing your emotional patterns.' },
            { icon: '🎤', title: 'Voice Journaling', desc: 'Speak and let AI transcribe and analyze.' },
            { icon: '🔥', title: 'Streak Tracking', desc: 'Build a daily journaling habit.' },
            { icon: '🧘', title: 'Meditation Timer', desc: '1, 3, and 5 minute timers.' },
            { icon: '📄', title: 'PDF Export', desc: 'Download entries with AI insights.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#252010', border: '1px solid #3d3520', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.6rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.88rem' }}>{f.title}</h3>
              <p style={{ color: '#9d8f72', fontSize: '0.8rem', lineHeight: 1.55, fontFamily: 'Inter, sans-serif' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ padding: isMobile ? '3rem 1rem' : '4rem 1.5rem', textAlign: 'center', borderTop: '1px solid #3d3520', background: 'radial-gradient(ellipse at center, rgba(232,149,109,0.06) 0%, transparent 70%)' }}>
        <h2 style={{ fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Ready to understand yourself?</h2>
        <p style={{ color: '#9d8f72', marginBottom: '2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.92rem' }}>Free, private, takes less than a minute.</p>
        <div style={{ display: 'inline-block', background: '#252010', border: '1px solid #3d3520', borderRadius: '20px', padding: isMobile ? '1.5rem' : '2.5rem 3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🪞</div>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f4b87a', marginBottom: '0.25rem' }}>MoodMirror</div>
          <div style={{ color: '#9d8f72', fontSize: '0.82rem', marginBottom: '1.25rem', fontFamily: 'Inter, sans-serif' }}>Your private AI journaling companion</div>
          {btn('Start Your Journal Free →', true, () => navigate('/login'))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid #3d3520', padding: '1.5rem 1.25rem',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
        gap: '1rem', background: '#120e05'
      }}>
        <div style={{ fontWeight: 700, color: '#f4b87a', fontSize: '1rem' }}>🪞 MoodMirror</div>
        <div style={{ color: '#5a4f3a', fontSize: '0.78rem', fontFamily: 'Inter, sans-serif' }}>© 2026 MoodMirror · Made with ❤️</div>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          {['Home', 'Journal', 'Dashboard'].map(l => (
            <a key={l} href={l === 'Home' ? '/' : `/${l.toLowerCase()}`} style={{ color: '#9d8f72', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'Inter, sans-serif' }}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes fadeWord { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}