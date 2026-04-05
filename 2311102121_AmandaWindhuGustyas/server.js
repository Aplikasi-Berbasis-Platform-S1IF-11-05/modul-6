const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// ambil data
app.get('/data', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json'));
    res.json(data);
});

// tambah data
app.post('/data', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json'));
    data.push(req.body);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({message: "success"});
});

// edit data
app.put('/data/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json'));
    data[req.params.id] = req.body;
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({message: "updated"});
});

// delete data
app.delete('/data/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json'));
    data.splice(req.params.id, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({message: "deleted"});
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));