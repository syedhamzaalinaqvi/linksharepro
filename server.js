const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the current directory
app.use(express.static('./'));

// Proxy endpoint for Freepik API
app.get('/api/search', async (req, res) => {
    try {
        const { search, limit } = req.query;
        const FREEPIK_API_KEY = 'FPSX067996b5e02e455ba130f32620e47943';
        const FREEPIK_API_URL = 'https://api.freepik.com/v1/resources';

        const response = await fetch(`${FREEPIK_API_URL}?search=${search}&limit=${limit}`, {
            headers: {
                'x-freepik-api-key': FREEPIK_API_KEY,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch data from Freepik API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 