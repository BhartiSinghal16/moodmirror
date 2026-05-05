import React, { useState, useEffect, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';

const EMOTION_COLORS = {
  happy: '#7bc67e', hopeful: '#a3c97a', grateful: '#5dbea3',
  excited: '#e8956d', neutral: '#9d8f72', sad: '#7ab3d4',
  lonely: '#9b8fcc', anxious: '#d4956a', overwhelmed: '#c97a7a', angry: '#c96a6a'
};

const QUOTES = [
  "Every emotion is a teacher. What is yours saying today?",
  "You don't have to be positive all the time. It's okay to feel sad, angry, or overwhelmed.",
  "Journaling is like whispering to yourself and listening at the same time.",
  "Your feelings are valid. All of them.",
  "The act of writing is the act of discovering what you believe.",
  "Be gentle with yourself. You are a child of the universe.",
  "One entry at a time. One breath at a time.",
  "Your story matters. Write it.",
];

const SERVER = process.env.REACT_APP_SERVER_URL || 'http://localhost:5001';

export default function Journal({ user }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

  const fetchStreak = useCallback(async () => {
    try {
      const res = await fetch(`${SERVER}/api/journal/entries/${user.id}?days=30`);
      const data = await res.json();
      if (data.entries) {
        let s = 0;
        const today = new Date(); today.setHours(0,0,0,0);
        const dates = [...new Set(data.entries.map(e => {
          const d = new Date(e.created_at); d.setHours(0,0,0,0); return d.getTime();
        }))].sort((a,b) => b-a);
        for (let i = 0; i < dates.length; i++) {
          const expected = new Date(today); expected.setDate(today.getDate() - i);
          if (dates[i] === expected.getTime()) s++;
          else break;
        }
        setStreak(s);
      }
    } catch {}
  }, [user.id]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser. Try Chrome!');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setContent(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const startTimer = (minutes) => {
    if (timerRunning) {
      clearInterval(timerRef.current);
      setTimerRunning(false);
      setTimerSeconds(0);
      setTimer(null);
      return;
    }
    const totalSeconds = minutes * 60;
    setTimerSeconds(totalSeconds);
    setTimer(minutes);
    setTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const handleSubmit = async () => {
    if (!content.trim() || content.trim().length < 10) {
      setError('Please write at least a few words.');
      return;
    }
    setError(''); setLoading(true); setResult(null);
    try {
      const res = await fetch(`${SERVER}/api/journal/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, userId: user.id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setResult(data);
      setContent('');
      fetchStreak();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  const exportPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('MoodMirror Journal Entry', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Emotion: ${result.emotion} (${result.score}/10)`, 20, 45);
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(content, 170);
    doc.text(lines, 20, 60);
    const responseLines = doc.splitTextToSize(`AI Response: ${result.response}`, 170);
    doc.text(responseLines, 20, 60 + lines.length * 7 + 10);
    doc.save(`moodmirror-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const color = result ? (EMOTION_COLORS[result.emotion] || '#9d8f72') : '#9d8f72';

  return (
    <main className="page">

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="journal-header" style={{ marginBottom: 0 }}>
          <h1>{greeting} 👋</h1>
          <p>How are you feeling today? Write freely — this is your safe space.</p>
        </div>
        {streak > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(232,149,109,0.15), rgba(244,184,122,0.1))',
            border: '1px solid rgba(232,149,109,0.3)',
            borderRadius: '12px', padding: '0.75rem 1.25rem', textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem' }}>🔥</div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent2)' }}>{streak}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>day streak</div>
          </div>
        )}
      </div>

      <div style={{
        background: 'rgba(232,149,109,0.06)', border: '1px solid rgba(232,149,109,0.15)',
        borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.5rem',
        fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7
      }}>
        💭 "{quote}"
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>🧘 Meditation Timer</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Breathe before you write</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {timerRunning && (
              <div style={{
                fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent2)',
                fontFamily: 'monospace', minWidth: '70px', textAlign: 'center'
              }}>{formatTime(timerSeconds)}</div>
            )}
            {[1, 3, 5].map(m => (
              <button key={m} onClick={() => startTimer(m)} style={{
                padding: '0.4rem 0.9rem', borderRadius: '8px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 600,
                background: timer === m && timerRunning ? 'var(--accent)' : 'var(--surface2)',
                border: '1px solid var(--border)', color: 'var(--text)',
                transition: 'all 0.2s'
              }}>{timer === m && timerRunning ? '⏹ Stop' : `${m} min`}</button>
            ))}
          </div>
        </div>
        {timerRunning && (
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '999px',
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                width: `${(timerSeconds / (timer * 60)) * 100}%`,
                transition: 'width 1s linear'
              }} />
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ position: 'relative' }}>
          <textarea
            className="journal-textarea"
            placeholder="Start writing... What's on your mind? How does your body feel? What happened today?"
            value={content}
            onChange={e => setContent(e.target.value)}
            maxLength={2000}
          />
          <button onClick={toggleVoice} style={{
            position: 'absolute', bottom: '12px', right: '12px',
            background: isListening ? '#ef4444' : 'var(--surface2)',
            border: '1px solid var(--border)', borderRadius: '50%',
            width: '36px', height: '36px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', transition: 'all 0.2s',
            animation: isListening ? 'pulse 1s infinite' : 'none'
          }} title={isListening ? 'Stop listening' : 'Start voice input'}>
            🎤
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem' }}>
          <div style={{ fontSize: '0.75rem', color: isListening ? '#ef4444' : 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            {isListening ? '🔴 Listening...' : '🎤 Click mic to use voice'}
          </div>
          <div className="char-count">{content.length}/2000</div>
        </div>

        {error && <p className="error-msg" style={{ textAlign: 'left', marginTop: '0.5rem' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-submit" onClick={handleSubmit} disabled={loading || !content.trim()}>
            {loading ? <><div className="spinner" /> Reflecting...</> : '✨ Reflect'}
          </button>
          {result && (
            <button onClick={exportPDF} style={{
              padding: '0.75rem 1.5rem', borderRadius: '12px', cursor: 'pointer',
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>📄 Export PDF</button>
          )}
        </div>
      </div>

      {result && (
        <div className="ai-response-card">
          <div className="ai-response-header">
            <span className="ai-avatar">🪞</span>
            <div>
              <h3>MoodMirror reflects...</h3>
              <span className="emotion-tag" style={{ backgroundColor: color }}>{result.emotion}</span>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                intensity {result.score}/10
              </span>
            </div>
          </div>

          <div className="intensity-bar-wrap">
            <div className="intensity-label">Emotional intensity</div>
            <div className="intensity-bar">
              <div className="intensity-fill" style={{ width: `${(result.score / 10) * 100}%` }} />
            </div>
          </div>

          <p className="ai-message">{result.response}</p>

          {result.micro_action && (
            <div className="micro-action">
              <strong>✨ Micro-action:</strong> {result.micro_action}
            </div>
          )}

          <button onClick={exportPDF} style={{
            marginTop: '1rem', padding: '0.6rem 1.25rem', borderRadius: '10px',
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem',
            fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>📄 Save this entry as PDF</button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
      `}</style>
    </main>
  );
}