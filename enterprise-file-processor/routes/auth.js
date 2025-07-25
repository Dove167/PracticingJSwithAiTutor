const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session'); // session used in app.js
const { ConvexHttpClient } = require('convex/browser');

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// In-memory user store for demo
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: '$2b$10$rBiE1LDzlORheeX8w5dq0OW9BN5.hUaEQgaR.OW0Vn9OY/dOykV/W', // "password123"
    name: 'Admin',
    role: 'admin'
  }
];

// Middleware to require authentication
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Render login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', layout: 'layouts/main' });
});

// Render register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', layout: 'layouts/main' });
});

// Register route
router.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const userId = Date.now().toString();
  // Store in Convex and capture document ID
  const convexId = await convex.mutation('users:create', {
    name,
    email,
    role: 'user',
    lastLogin: new Date().toISOString()
  });
  const newUser = { id: userId, convexId, name, email, password: hashed, role: 'user' };
  users.push(newUser);
  // Save session with Convex ID
  req.session.user = { id: userId, convexId, name, email, role: 'user' };
  res.redirect('/');
});

// Login route with body parser middleware
router.post('/api/login', express.urlencoded({ extended: true }), async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).render('login', { title: 'Login', error: 'Invalid credentials', layout: 'layouts/main' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', { title: 'Login', error: 'Invalid credentials', layout: 'layouts/main' });
  }
  // Update last login if Convex ID exists
  if (user.convexId) {
    await convex.mutation('users:updateLastLogin', {
      id: user.convexId,
      lastLogin: new Date().toISOString()
    });
  }
  // Refresh session including Convex ID
  req.session.user = {
    id: user.id,
    convexId: user.convexId,
    name: user.name,
    email: user.email,
    role: user.role
  };
  res.redirect('/');
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// Current user
router.get('/api/me', requireAuth, (req, res) => {
  res.json(req.session.user);
});

module.exports = router;
module.exports.requireAuth = requireAuth;