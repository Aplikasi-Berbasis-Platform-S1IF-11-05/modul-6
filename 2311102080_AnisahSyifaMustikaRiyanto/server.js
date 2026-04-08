const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'products.json';

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.get('/api/products', (req, res) => {
  res.json(readData());
});

app.post('/api/products', (req, res) => {
  const data = readData();
  const newData = { id: Date.now(), ...req.body };
  data.push(newData);
  writeData(data);
  res.json(newData);
});

app.put('/api/products/:id', (req, res) => {
  let data = readData();
  const id = parseInt(req.params.id);
  data = data.map(d => d.id === id ? { ...d, ...req.body } : d);
  writeData(data);
  res.json({ message: 'updated' });
});

app.delete('/api/products/:id', (req, res) => {
  let data = readData();
  const id = parseInt(req.params.id);
  data = data.filter(d => d.id !== id);
  writeData(data);
  res.json({ message: 'deleted' });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));