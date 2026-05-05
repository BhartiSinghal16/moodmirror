# 🪞 MoodMirror — AI Journaling Companion

> Your private AI-powered journaling app that listens without judgment, detects your emotions, and helps you understand yourself better — one entry at a time.

![MoodMirror](https://img.shields.io/badge/MoodMirror-AI%20Journaling-e8956d?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Vercel](https://img.shields.io/badge/deployed-Vercel-black?style=for-the-badge&logo=vercel)
![Railway](https://img.shields.io/badge/backend-Railway-purple?style=for-the-badge&logo=railway)

---

## ✨ Live Demo

🌐 **[moodmirror-ten.vercel.app](https://moodmirror-ten.vercel.app)**

---

## 📸 Features

| Feature | Description |
|---|---|
| 🧠 **AI Emotion Detection** | Detects 10 emotion types with intensity scores 1-10 powered by Llama AI |
| 📈 **30-Day Mood Tracking** | Beautiful charts showing your emotional patterns over time |
| 🎤 **Voice Journaling** | Speak your thoughts — AI transcribes and analyzes them |
| 🔥 **Streak Tracking** | Build a daily journaling habit with streak counter |
| 🧘 **Meditation Timer** | Built-in 1, 3, and 5 minute timers to breathe before writing |
| 📄 **PDF Export** | Download any journal entry with AI insights as a PDF |
| 🔒 **Private & Secure** | Your journal is yours alone — secured with Supabase Auth |
| 🌙 **Warm Cozy UI** | Beautiful dark warm theme with smooth animations |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — UI framework
- **React Router** — Client-side routing
- **Recharts** — Mood graphs and charts
- **jsPDF** — PDF export
- **Supabase JS** — Auth client

### Backend
- **Node.js + Express.js** — REST API server
- **Groq SDK** — AI emotion analysis (llama-3.3-70b-versatile)
- **Supabase** — PostgreSQL database

### Infrastructure
- **Vercel** — Frontend hosting
- **Railway** — Backend hosting
- **Supabase** — Database & Authentication

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm
- Supabase account
- Groq API account

### 1. Clone the repository

```bash
git clone https://github.com/BhartiSinghal16/moodmirror.git
cd moodmirror
```

### 2. Set up the Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
PORT=5001
```

### 3. Set up the Client

```bash
cd client
npm install
```

Create `client/.env`:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SERVER_URL=http://localhost:5001
```

### 4. Set up Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE journal_entries (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  emotion TEXT,
  emotion_score INT,
  ai_response TEXT,
  micro_action TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE journal_entries DISABLE ROW LEVEL SECURITY;
```

### 5. Run the App

```bash
# Terminal 1 — Start server
cd server
node index.js

# Terminal 2 — Start client
cd client
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
moodmirror/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.js     # Landing page
│   │   │   ├── Login.js       # Auth page
│   │   │   ├── Journal.js     # Journal + AI response
│   │   │   └── Dashboard.js   # Mood charts & history
│   │   ├── styles/
│   │   │   └── global.css     # Global styles
│   │   ├── App.js             # Routes
│   │   ├── index.js           # Entry point
│   │   └── supabaseClient.js  # Supabase config
│   └── package.json
├── server/                    # Node.js backend
│   ├── routes/
│   │   └── journal.js         # AI analysis + DB routes
│   ├── index.js               # Express server
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Import repo on [vercel.com](https://vercel.com)
2. Set Root Directory to `client`
3. Add environment variables:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
REACT_APP_SERVER_URL=your_railway_url
```

### Backend → Railway

1. Import repo on [railway.app](https://railway.app)
2. Set Root Directory to `server`
3. Add environment variables:
```
GROQ_API_KEY=your_groq_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
```

---

## 🎭 Supported Emotions

| Emotion | Color |
|---|---|
| 😊 Happy | `#7bc67e` |
| 🌟 Hopeful | `#a3c97a` |
| 🙏 Grateful | `#5dbea3` |
| 🎉 Excited | `#e8956d` |
| 😐 Neutral | `#9d8f72` |
| 😢 Sad | `#7ab3d4` |
| 😔 Lonely | `#9b8fcc` |
| 😰 Anxious | `#d4956a` |
| 😤 Overwhelmed | `#c97a7a` |
| 😡 Angry | `#c96a6a` |

---

## 🤖 AI System Prompt

MoodMirror uses this prompt for emotion analysis:

```
You are MoodMirror, an empathetic AI journaling companion.
Analyze the journal entry and respond with a JSON object:
{
  "emotion": one of [happy, sad, anxious, angry, hopeful, overwhelmed, grateful, lonely, excited, neutral],
  "score": intensity 1-10,
  "response": warm empathetic 2-3 sentences, validate feelings, end with one thoughtful question,
  "micro_action": one tiny positive action they can take right now
}
```

---

## 📄 License

MIT License — feel free to use this project for learning or personal use.

---

## 👩‍💻 Built By

**Bharti Singhal** — Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-BhartiSinghal16-black?style=flat&logo=github)](https://github.com/BhartiSinghal16)

---

> 🪞 *"Every emotion is a teacher. What is yours saying today?"*
