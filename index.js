// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome Page</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #111;
          color: white;
          font-family: Arial, sans-serif;
          font-size: 2rem;
        }
        .message {
          text-align: center;
          animation: glow 1.5s infinite alternate;
        }
        @keyframes glow {
          from { text-shadow: 0 0 10px #ff0, 0 0 20px #f0f, 0 0 30px #0ff; }
          to { text-shadow: 0 0 20px #ff00ff, 0 0 30px #00ffff, 0 0 40px #ffff00; }
        }
      </style>
    </head>
    <body>
      <div class="message">⚡❤️ Welcome to Akhil Desini World's ❤️⚡</div>
    </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => console.log(\Server running at http://localhost:\${PORT}\));
