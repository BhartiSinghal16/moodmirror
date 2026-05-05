require('dotenv').config();
const express = require('express');
const cors = require('cors');
const journalRoutes = require('./routes/journal');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/journal', journalRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'MoodMirror server running ✅' });
});

app.listen(PORT, () => {
  console.log(`🪞 MoodMirror server running on port ${PORT}`);
});