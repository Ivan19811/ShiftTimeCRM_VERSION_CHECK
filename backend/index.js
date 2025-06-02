const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors({
  origin: '*',
  methods: ['GET']
}));

app.get('/version', (req, res) => {
  const filePath = path.join(__dirname, 'version.json');
  const data = fs.readFileSync(filePath, 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));
