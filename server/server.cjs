const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../dist')));
// Catch-all route (for frontend routing, AFTER all API routes)
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


// Routes
const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');

app.use('/api', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/courses/:courseSlug/lessons', lessonRoutes);

// Start server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
