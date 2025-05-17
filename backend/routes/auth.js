const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    
    // In a real app, you would:
    // 1. Find or create user in database
    // 2. Generate JWT token
    // 3. Return user data
    
    res.json({
      success: true,
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name
      }
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;