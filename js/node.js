const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:63342',  // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));

app.get('/api/events', (req, res) => {
    // Your logic to fetch events
});

// Other routes...

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
