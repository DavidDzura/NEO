require('dotenv').config()
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const NEO_API_URL = process.env.NEO_API_URL


const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/neo', async (req, res) => {
    const {start_date, end_date} = req.query;

    if (!start_date || !end_date) {
        return res.status(400).send('Start date and end date are required');
    }

    try {
        console.log(`Fetching NEO data from ${start_date} to ${end_date}`);
        const response = await axios.get(NEO_API_URL, {
            params: {
                start_date,
                end_date,
                api_key: API_KEY,
            },
        });

        const neoData = response.data.near_earth_objects;
        let results = [];

        for (let date in neoData) {
            results = results.concat(neoData[date]);
        }

        results.sort((a, b) => {
            const aDistance = a.close_approach_data[0]?.miss_distance?.kilometers || Infinity;
            const bDistance = b.close_approach_data[0]?.miss_distance?.kilometers || Infinity;
            return aDistance - bDistance;
        });

        const formattedResults = results.map(neo => ({
            name: neo.name,
            size: neo.estimated_diameter.kilometers.estimated_diameter_max,
            closest_approach_time: neo.close_approach_data[0]?.close_approach_date_full || 'N/A',
            miss_distance: neo.close_approach_data[0]?.miss_distance?.kilometers || 'N/A',
        }));

        res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching NEO data:', error.response ? error.response.data : error.message);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
