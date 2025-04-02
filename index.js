require('dotenv/config');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL || '/api/v1';

app.get(`${apiUrl}/`, (req, res) => {
  console.log({ req });
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
