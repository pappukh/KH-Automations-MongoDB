const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
// Load config
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors())

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // This will allow connections from any IP address
app.listen(PORT,HOST, () => console.log(`Server started on port ${PORT} ${HOST}`));
