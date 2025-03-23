import express from 'express'
import 'dotenv/config';
const app = express()
const port = 3000
import mongoose from "mongoose"
import cors from 'cors'
mongoose.connect(`${process.env.CONNECTION_STRING}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

import History from './models/history.js'

app.use(cors());


app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post('/history', async (req, res) => {
  await History.create({
    searched: `${req.body.searched}`,
    date: Date.now(),
  })
  res.json({message:'Added to database', text:`${req.query.searched}`});
})

app.get('/history', async (req, res) => {
  const data = await History.find();
  console.log(data)
  res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
