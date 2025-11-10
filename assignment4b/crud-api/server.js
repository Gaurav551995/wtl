const express = require('express'); 
const mongoose = require('mongoose'); 
const Item = require('./models/itemModel'); 
const cors = require('cors'); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.static('public'));    // Serve frontend files

mongoose.connect('mongodb://localhost:27017/assignment3C')
.then(() => console.log("MongoDB Connected"))
.catch(error => console.log(error));

app.post('/items', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.put('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
