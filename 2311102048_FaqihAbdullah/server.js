const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// READ
app.get('/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});

// CREATE
app.post('/products', (req, res) => {
    console.log("BODY:", req.body);
    
  const data = JSON.parse(fs.readFileSync('data.json'));
  const newData = { id: Date.now(), ...req.body };
  data.push(newData);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(newData);
});

// DELETE
app.delete('/products/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json'));
  data = data.filter(p => p.id != req.params.id);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Deleted' });
});

// UPDATE
app.put('/products/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json'));
  data = data.map(p => 
    p.id == req.params.id ? { ...p, ...req.body } : p
  );
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Updated' });
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));