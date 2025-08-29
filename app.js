const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

console.log('API Key Loaded:', process.env.HF_API_KEY);

const detectRoute = require('./routes/detectRoute');

const app = express();
app.use(cors({
  origin: 'https://fake-news-frontend-l3psnz659-rajatrg13s-projects.vercel.app',
  // methods: ['GET', 'POST'],
  // allowedHeaders: ['Content-Type']
}))
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected Succesfully"))
.catch(err => console.error("MongoDb connection Error:", err));

app.use('/api/detect',detectRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));