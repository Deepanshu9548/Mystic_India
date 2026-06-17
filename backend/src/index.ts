import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import axios from 'axios';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Session and Passport
app.use(session({
  secret: process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/api/auth', authRoutes);

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', apiLimiter);

// Endpoints

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location},in&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error: unknown) {
    console.error('Weather API error:', axios.isAxiosError(error) ? error.response?.data : (error instanceof Error ? error.message : String(error)));
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// News endpoint
app.get('/api/news', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'News API key not configured' });
    }

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error: unknown) {
    console.error('News API error:', axios.isAxiosError(error) ? error.response?.data : (error instanceof Error ? error.message : String(error)));
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
});

// Chat endpoint (OpenAI)
app.post('/api/chat', async (req, res) => {
  const { prompt, conversationHistory = [], model = "gpt-3.5-turbo", temperature = 0.7, maxTokens = 150 } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const messages = [
      { role: "system", content: "You are a knowledgeable AI assistant focused on Indian culture, geography, travel, and heritage. You know the capital cities, important landmarks, historical facts, festivals, cuisine, and cultural aspects about all Indian states and union territories. Provide detailed information about India's geography, history, arts, sports, wildlife, economy, and travel tips. When asked about current information like weather, news, or events, mention that you can pull live data for the most accurate information. Keep responses concise but informative." },
      ...conversationHistory,
      { role: "user", content: prompt }
    ];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          ...(process.env.OPENAI_ORG ? { "OpenAI-Organization": process.env.OPENAI_ORG } : {})
        }
      }
    );

    res.json(response.data);
  } catch (error: unknown) {
    console.error('OpenAI API error:', axios.isAxiosError(error) ? error.response?.data : (error instanceof Error ? error.message : String(error)));
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
