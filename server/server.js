const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digitos-portfolio')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Form Schema
const contactFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Initialize admin account if not exists
const initializeAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@digitos.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    
    if (!adminEmail || !adminPassword) {
      console.error('Admin credentials not found in environment variables');
      return;
    }

    const adminExists = await Admin.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await Admin.create({
        email: adminEmail,
        password: hashedPassword
      });
      console.log('Admin account created successfully');
    } else {
      console.log('Admin account already exists');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

// Routes

// Store connected clients for real-time updates
const connectedClients = new Set();

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, mobileNumber, message } = req.body;
    
    if (!fullName || !email || !mobileNumber || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contactForm = new ContactForm({
      fullName,
      email,
      mobileNumber,
      message
    });

    await contactForm.save();
    
    // Send real-time update to all connected clients
    const newSubmission = contactForm.toObject();
    const updateData = JSON.stringify({
      type: 'new_submission',
      data: newSubmission
    });
    
    connectedClients.forEach(client => {
      client.res.write(`data: ${updateData}\n\n`);
    });

    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all contact form submissions (protected)
app.get('/api/admin/submissions', authenticateToken, async (req, res) => {
  try {
    const submissions = await ContactForm.find().sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get submission count (protected)
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const totalSubmissions = await ContactForm.countDocuments();
    const todaySubmissions = await ContactForm.countDocuments({
      submittedAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    
    res.json({ totalSubmissions, todaySubmissions });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete submission (protected)
app.delete('/api/admin/submissions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await ContactForm.findByIdAndDelete(id);
    
    // Send real-time update to all connected clients
    const updateData = JSON.stringify({
      type: 'delete_submission',
      data: { id }
    });
    
    connectedClients.forEach(client => {
      client.res.write(`data: ${updateData}\n\n`);
    });
    
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Server-Sent Events endpoint for real-time updates (protected)
app.get('/api/admin/realtime', (req, res) => {
  // Extract token from URL parameter for EventSource compatibility
  const token = req.query.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
  });
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // Send initial connection message
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

  // Add client to connected clients
  const client = { res, id: Date.now() };
  connectedClients.add(client);

  // Handle client disconnect
  req.on('close', () => {
    connectedClients.delete(client);
    console.log('Client disconnected from real-time updates');
  });

  // Keep connection alive
  const keepAlive = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'ping' })}\n\n`);
  }, 30000);

  req.on('close', () => {
    clearInterval(keepAlive);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeAdmin();
});
