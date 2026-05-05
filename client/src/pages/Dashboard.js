import React, { useState, useEffect, useCallback } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine
} from 'recharts';

const EMOTION_COLORS = {
  happy: '#22c55e', hopeful: '#84cc16', grateful: '#10b981',
  excited: '#f59e0b', neutral: '#6b7280', sad: '#60a5fa',
  lonely: '#818cf8', anxious: '#f97316', overwhelmed: '#ef4444', angry: '#dc2626'
};

const SERVER = process.env.REACT_APP_SERVER_URL || 'http://localhost:5001';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function generateInsights(entries) {
  if (entries.length < 2) return [];
  const insights = [];

  const emotionCounts = {};
  entries.forEach(e => { emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1; });
  const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
  if (topEmotion) insights.push({ icon: '📊', text: `Your most frequent mood is "${topEmotion[0]}" (${topEmotion[1]} entries)` });

  const avg = entries.reduce((s, e) => s + (e.emotion_score || 5), 0) / entries.length;
  insights.push({ icon: avg >= 6 ? '🌟' : avg >= 4 ? '🔄' : '💙', text: `Your average emotional intensity is ${avg.toFixed(1)}/10` });

  const negativeEmotions = ['sad', 'anxious', 'overwhelmed', 'angry', 'lonely'];
  const negCount = entries.filter(e => negativeEmotions.includes(e.emotion)).length;
  const negPct = Math.round((negCount / entries.length) * 100);
  if (negPct > 50) insights.push({ icon: '💙', text: `${negPct}% of your entries reflect difficult emotions — be gentle with yourself.` });
  else if (negPct < 30 && entries.length >= 5) insights.push({ icon: '✨', text: `${100 - negPct}% of your entries carry positive energy — wonderful!` });

  return insights;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div style={{ background: '#1a1a24', border: '1px solid #2e2e3d', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.82rem' }}>
        <p style={{ color: '#8888aa' }}>{label}</p>
        <p style={{ color: EMOTION_COLORS[d.emotion] || '#6b7280', fontWeight: 600, textTransform: 'capitalize' }}>
          {d.emotion} — {d.score}/10
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard({ user }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER}/api/journal/entries/${user.id}?days=30`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEntries(data.entries || []);
    } catch (err) {
      setError('Failed to load entries. Is the server running?');
    }
    setLoading(false);
  }, [user.id]);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  const chartData = [...entries].reverse().map(e => ({
    date: formatDate(e.created_at),
    score: e.emotion_score,
    emotion: e.emotion
  }));

  const insights = generateInsights(entries);

  if (loading) return <div className="loading-screen">Loading your mood data...</div>;

  return (
    <main className="page">
      <div className="journal-header">
        <h1>Your Mood Dashboard</h1>
        <p>30-day emotional pattern overview</p>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {entries.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '3rem' }}>🪞</div>
          <p>No entries yet. Start journaling to see your mood patterns here!</p>
        </div>
      ) : (
        <div className="dash-grid">

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-value">{entries.length}</div>
              <div className="stat-label">Total Entries</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {(entries.reduce((s, e) => s + (e.emotion_score || 5), 0) / entries.length).toFixed(1)}
              </div>
              <div className="stat-label">Avg Intensity</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: '1.4rem', textTransform: 'capitalize' }}>
                {Object.entries(
                  entries.reduce((acc, e) => { acc[e.emotion] = (acc[e.emotion] || 0) + 1; return acc; }, {})
                ).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'}
              </div>
              <div className="stat-label">Top Mood</div>
            </div>
          </div>

          <div className="chart-card">
            <div className="section-title">Mood Intensity Over 30 Days</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3d" />
                <XAxis dataKey="date" tick={{ fill: '#8888aa', fontSize: 11 }} />
                <YAxis domain={[1, 10]} tick={{ fill: '#8888aa', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={5} stroke="#2e2e3d" strokeDasharray="4 4" />
                <Line
                  type="monotone" dataKey="score"
                  stroke="#7c6aff" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#7c6aff', stroke: '#0f0f13', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {insights.length > 0 && (
            <div className="insight-card">
              <div className="section-title">✨ Patterns & Insights</div>
              {insights.map((ins, i) => (
                <div key={i} className="insight-item">
                  <span className="insight-icon">{ins.icon}</span>
                  <span>{ins.text}</span>
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="section-title">Recent Entries</div>
            <div className="entry-list">
              {entries.map(entry => (
                <div key={entry.id} className="entry-item">
                  <div style={{ flex: 1 }}>
                    <p className="entry-content-preview">
                      {entry.content.length > 120 ? entry.content.slice(0, 120) + '...' : entry.content}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <span className="emotion-tag" style={{ backgroundColor: EMOTION_COLORS[entry.emotion] || '#6b7280' }}>
                      {entry.emotion}
                    </span>
                    <span className="entry-date">{formatDate(entry.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}