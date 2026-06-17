import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { dbGet, dbRun } from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

// Passport Serialization (Required by Passport even if we use JWT to complete the flow)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [id]);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google OAuth
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value || `${profile.id}@google.com`;
      let user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
      
      if (!user) {
        // Create new user
        const result = await dbRun(
          'INSERT INTO users (email, name, provider, provider_id, profile_picture) VALUES (?, ?, ?, ?, ?)',
          [email, profile.displayName, 'google', profile.id, profile.photos?.[0]?.value || '']
        );
        user = await dbGet('SELECT * FROM users WHERE id = ?', [result.id]);
      }
      return done(null, user);
    } catch (err) {
      return done(err as Error, undefined);
    }
  }));
}

// Configure GitHub OAuth
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback'
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const email = profile.emails?.[0]?.value || `${profile.id}@github.com`;
      let user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
      
      if (!user) {
        // Create new user
        const result = await dbRun(
          'INSERT INTO users (email, name, provider, provider_id, profile_picture) VALUES (?, ?, ?, ?, ?)',
          [email, profile.displayName || profile.username, 'github', profile.id, profile.photos?.[0]?.value || '']
        );
        user = await dbGet('SELECT * FROM users WHERE id = ?', [result.id]);
      }
      return done(null, user);
    } catch (err) {
      return done(err as Error, undefined);
    }
  }));
}

// Helper to format user object for frontend
const formatUser = (user: any) => {
  const formatted = { ...user };
  delete formatted.password;
  
  if (formatted.saved_states) {
    formatted.savedStates = JSON.parse(formatted.saved_states);
    delete formatted.saved_states;
  }
  if (formatted.recent_activities) {
    formatted.recentActivities = JSON.parse(formatted.recent_activities);
    delete formatted.recent_activities;
  }
  if (formatted.address) formatted.address = JSON.parse(formatted.address);
  if (formatted.preferences) formatted.preferences = JSON.parse(formatted.preferences);
  if (formatted.trips) formatted.trips = JSON.parse(formatted.trips);
  
  return formatted;
};

// Helper to generate JWT
const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// --- Local Auth Routes ---

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
    
    const result = await dbRun(
      'INSERT INTO users (email, password, name, provider, profile_picture) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, name, 'local', profilePicture]
    );

    const user = await dbGet('SELECT * FROM users WHERE id = ?', [result.id]);
    const formattedUser = formatUser(user);

    const token = generateToken(formattedUser);
    
    res.json({ success: true, token, user: formattedUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.provider !== 'local') {
      return res.status(401).json({ error: `Please login with ${user.provider}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const formattedUser = formatUser(user);
    const token = generateToken(formattedUser);

    res.json({ success: true, token, user: formattedUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Middleware to verify JWT token
export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get('/me', verifyToken, async (req: any, res: any) => {
  try {
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [req.userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const formattedUser = formatUser(user);
    res.json({ success: true, user: formattedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/update', verifyToken, async (req: any, res: any) => {
  try {
    const { bio, phone, address, preferences, trips, saved_states, recent_activities } = req.body;
    
    // We only update fields that are provided
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [req.userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await dbRun(
      `UPDATE users SET 
        bio = COALESCE(?, bio),
        phone = COALESCE(?, phone),
        address = COALESCE(?, address),
        preferences = COALESCE(?, preferences),
        trips = COALESCE(?, trips),
        saved_states = COALESCE(?, saved_states),
        recent_activities = COALESCE(?, recent_activities)
      WHERE id = ?`,
      [
        bio, 
        phone, 
        address ? JSON.stringify(address) : null,
        preferences ? JSON.stringify(preferences) : null,
        trips ? JSON.stringify(trips) : null,
        saved_states ? JSON.stringify(saved_states) : null,
        recent_activities ? JSON.stringify(recent_activities) : null,
        req.userId
      ]
    );

    const updatedUser = await dbGet('SELECT * FROM users WHERE id = ?', [req.userId]);
    const formattedUser = formatUser(updatedUser);

    res.json({ success: true, user: formattedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// --- OAuth Routes ---

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login?error=oauth_failed` }),
  (req: any, res: any) => {
    const token = generateToken(req.user);
    // Redirect to frontend with token in URL so frontend can save it
    res.redirect(`${FRONTEND_URL}/login/success?token=${token}`);
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: `${FRONTEND_URL}/login?error=oauth_failed` }),
  (req: any, res: any) => {
    const token = generateToken(req.user);
    res.redirect(`${FRONTEND_URL}/login/success?token=${token}`);
  }
);

export default router;
