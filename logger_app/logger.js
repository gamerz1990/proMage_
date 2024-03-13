const express = require('express');
const app = express();
app.use(express.json());

app.post('/log-event', (req, res) => {
  console.log('Event Received:', req.body);
  res.status(200).send('Event logged');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Logging app listening on port ${PORT}`));
