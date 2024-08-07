const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

// Use CORS middleware to handle CORS issues
app.use(cors({
  origin: 'https://prime-code-rouge.vercel.app', // Allow requests from this origin
  credentials: true, // Allow credentials such as cookies to be sent
}));

app.use(express.json());

// Proxy endpoint for LeetCode GraphQL API
app.post('/graphql', async (req, res) => {
  try {
    const response = await axios.post('https://leetcode.com/graphql', req.body, {
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers required by the LeetCode API
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error in proxy:', error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.post('/piston/execute', async (req, res) => {
  try {
    const { code, language, stdin } = req.body;

    const requestBody = {
      language: language,
      version: "*", // Use the latest version
      files: [
        {
          name: `main.${language}`, // Adjust the extension based on the language
          content: code
        }
      ],
      stdin: stdin,
      args: [],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1
    };

    const response = await axios.post('https://emkc.org/api/v2/piston/execute', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error in Piston proxy:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
});

app.get('/piston/runtimes', async (req, res) => {
  try {
    const response = await axios.get('https://emkc.org/api/v2/piston/runtimes');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching runtimes:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
