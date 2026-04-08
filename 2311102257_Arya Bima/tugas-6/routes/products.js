const express = require("express");
const router = express.Router();
const fs = require("fs-extra");

const FILE = "./data/products.json";

// GET all
router.get("/", async (req, res) => {
  const data = await fs.readJson(FILE);
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {
  const data = await fs.readJson(FILE);
  const newItem = {
    id: Date.now(),
    ...req.body,
  };

  data.push(newItem);
  await fs.writeJson(FILE, data);
  res.json(newItem);
});

// UPDATE
router.put("/:id", async (req, res) => {
  let data = await fs.readJson(FILE);

  data = data.map((item) =>
    item.id == req.params.id ? { ...item, ...req.body } : item,
  );

  await fs.writeJson(FILE, data);
  res.json({ message: "Updated" });
});

// DELETE
router.delete("/:id", async (req, res) => {
  let data = await fs.readJson(FILE);

  data = data.filter((item) => item.id != req.params.id);

  await fs.writeJson(FILE, data);
  res.json({ message: "Deleted" });
});

module.exports = router;
