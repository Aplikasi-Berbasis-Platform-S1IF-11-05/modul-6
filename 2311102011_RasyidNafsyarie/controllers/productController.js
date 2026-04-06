const fs = require('fs');
const path = './data/products.json';

const getAll = (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
};

const create = (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));

  console.log("BODY:", req.body);

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };

  data.push(newProduct);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  res.json(newProduct);
};

const update = (req, res) => {
  let data = JSON.parse(fs.readFileSync(path));
  const id = parseInt(req.params.id);

  data = data.map(p => 
    p.id === id 
      ? { ...p, name: req.body.name, price: req.body.price, stock: req.body.stock }
      : p
  );

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  res.json({ message: "Updated" });
};

const remove = (req, res) => {
  let data = JSON.parse(fs.readFileSync(path));
  const id = parseInt(req.params.id);

  data = data.filter(p => p.id !== id);

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  res.json({ message: "Deleted" });
};

module.exports = { getAll, create, update, remove };