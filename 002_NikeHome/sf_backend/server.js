const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/sf_products', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  cuisine: String,
  rating: Number
});


const user = mongoose.model('sf_users', userSchema);


app.get('/sf_users', async (req, res) => {
  try {
    const users = await user.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


app.post('/sf_users', async (req, res) => {
  const users = new user(req.body);
  try {
    await users.save();
    return res.status(201).json(users);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


app.put('/sf_users/:id', async (req, res) => {
  try {
    const users = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!users) return res.status(404).json({ message: 'User not found' });
    return res.json(users);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


app.delete('/sf_users/:id', async (req, res) => {
  try {
    const users = await user.findByIdAndDelete(req.params.id);
    if (!users) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
