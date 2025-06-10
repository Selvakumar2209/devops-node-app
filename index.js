const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const build = process.env.BUILD_NUMBER || 'dev';
const env = process.env.ENVIRONMENT || 'development';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>DevOps Demo App</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <h1>🚀 Welcome to DevOps CI/CD Project</h1>
        <p><strong>Environment:</strong> ${env}</p>
        <p><strong>Build Number:</strong> ${build}</p>
        <p><strong>Server:</strong> Node.js on Express</p>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP', build, env });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
