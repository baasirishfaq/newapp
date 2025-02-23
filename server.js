const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const OPENAI_API_KEY = 'your key here';

app.use(cors());
app.use(express.json());

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // Use GPT-3.5 or GPT-4
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Send the AI's response back to the frontend
        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Error processing your message' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});