const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const seedController = require('./Controllers/seedController'); // Import the seed controller


const corsOptions = {
  origin: 'http://localhost:19006/', // Replace with your frontend's domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
const userRoutes = require('./Routes/userRoutes');
const subscriptionRoutes = require('./Routes/subscriptionRoutes');
const advertisementRoutes = require('./Routes/advertisementRoutes');

app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/advertisements', advertisementRoutes);

// Error Handling Middleware
app.use(require('./middleware/errorHandling'));

// HTTPS Configuration
const privateKey = fs.readFileSync('./ssl/newkey.pem', 'utf8');
const certificate = fs.readFileSync('./ssl/newcert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create HTTP server
const httpServer = http.createServer(app);

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Redirect HTTP to HTTPS (optional)
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// Start the HTTP server
const HTTP_PORT = process.env.HTTP_PORT || 8000;
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

// Start the HTTPS server
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});
