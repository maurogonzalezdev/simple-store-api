require('dotenv/config');
const express = require('express');
const configureLogger = require('./config/logger');

const app = express();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL || '/api/v1';

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log requests
configureLogger(app);

app.post(`${apiUrl}/`, (req, res) => {
  const product = req.body;
  console.log(req.body);
  res.status(201).json({
    message: 'Product created successfully',
    product,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
