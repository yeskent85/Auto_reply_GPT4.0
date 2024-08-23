// // autoReply.js
// require('dotenv').config();
// const axios = require('axios');

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// async function generateReply(userMessage) {
//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//         model: "gpt-4",  // Change this to use GPT-4.0
//         messages: [
//             { role: "system", content: "You are an auto-reply assistant." },
//             { role: "user", content: userMessage }
//         ],
//         max_tokens: 100, // Adjust this as needed
//     }, {
//         headers: {
//             'Authorization': `Bearer ${OPENAI_API_KEY}`,
//             'Content-Type': 'application/json'
//         }
//     });

//     const reply = response.data.choices[0].message.content.trim();
//     return reply;
// }

// // Example usage:
// (async () => {
//     const userMessage = "Hello, I need help with my order.";
//     const reply = await generateReply(userMessage);
//     console.log("Auto-reply:", reply);
// })();

require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateReply(userMessage) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an auto-reply assistant." },
                { role: "user", content: userMessage }
            ],
            max_tokens: 100, // Adjust this as needed
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const reply = response.data.choices[0].message.content.trim();
        return reply;
    } catch (error) {
        console.error('Error generating reply:', error.response ? error.response.data : error.message);
        return "Sorry, I couldn't generate a reply at the moment.";
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startChat() {
    rl.question('You: ', async (userMessage) => {
        if (userMessage.toLowerCase() === 'exit') {
            console.log('Exiting chat...');
            rl.close();
            return;
        }

        const reply = await generateReply(userMessage);
        console.log("Assistant:", reply);

        // Continue the chat
        startChat();
    });
}

// Start the chat loop
startChat();
