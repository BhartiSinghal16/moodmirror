const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const { createClient } = require("@supabase/supabase-js");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const SYSTEM_PROMPT = `You are MoodMirror, an empathetic AI journaling companion.
Analyze the journal entry and respond with a JSON object:
{
  "emotion": one of [happy, sad, anxious, angry, hopeful, overwhelmed, grateful, lonely, excited, neutral],
  "score": intensity 1-10,
  "response": warm empathetic 2-3 sentences, no advice, just validate feelings, end with one thoughtful question,
  "micro_action": one tiny positive action they can take right now (e.g. "Take 3 deep breaths")
}
Return ONLY the JSON. No markdown, no backticks, no extra text.`;

// POST /api/journal/analyze — analyze a journal entry
router.post("/analyze", async (req, res) => {
  const { content, userId } = req.body;

  if (!content || !userId) {
    return res.status(400).json({ error: "Content and userId are required" });
  }

  try {
    // Call Groq AI
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: content },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const rawResponse = completion.choices[0]?.message?.content || "{}";
    console.log("RAW AI RESPONSE:", JSON.stringify(rawResponse));

    let aiData;
    try {
      const cleaned = rawResponse
        .replace(/[\x00-\x1F\x7F]/g, " ")
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\t/g, " ");
      const jsonMatch = cleaned.match(/\{.*\}/s);
      const jsonStr = jsonMatch ? jsonMatch[0] : cleaned;
      aiData = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error("JSON parse error:", rawResponse);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }
    // Save to Supabase
    const { data, error } = await supabase
      .from("journal_entries")
      .insert([
        {
          user_id: userId,
          content: content,
          emotion: aiData.emotion || "neutral",
          emotion_score: aiData.score || 5,
          ai_response: aiData.response || "",
          micro_action: aiData.micro_action || "",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to save entry" });
    }

    res.json({
      entry: data,
      emotion: aiData.emotion,
      score: aiData.score,
      response: aiData.response,
      micro_action: aiData.micro_action,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ error: "Server error during analysis" });
  }
});

// GET /api/journal/entries/:userId — get all entries
router.get("/entries/:userId", async (req, res) => {
  const { userId } = req.params;
  const { days = 30 } = req.query;

  try {
    const since = new Date();
    since.setDate(since.getDate() - parseInt(days));

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: "Failed to fetch entries" });
    }

    res.json({ entries: data });
  } catch (err) {
    console.error("Fetch entries error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
