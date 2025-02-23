import express from 'express'
const app = express()
const port = 3000
import mongoose from "mongoose"
import cors from 'cors'
mongoose.connect('mongodb+srv://rahulgade03022004:freeAccountIsThis@cluster0.6ezji.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

import History from './models/history.js'

app.use(express.json())
app.use(cors())

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