import express from 'express'
import 'dotenv/config'
import mongoose, { model, Model, Mongoose } from 'mongoose'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

await mongoose.connect(process.env.MONGO_URI)

const passSchema = new mongoose.Schema({
  site: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  }
})

const passModel = new mongoose.model('passwords', passSchema)

// const passData = new passModel({ site: 'one', password: '012', id: 'unique' })
// await passData.save()
app.get('/', async (req, res) => {
  const finalResult = await passModel.find({})
  res.json(finalResult)
})

//saving password
app.post('/', async (req, res) => {
  // console.log(req.body)

  const passToSave = await new passModel(req.body)
  await passToSave.save()

  res.json(passToSave)
})

app.delete('/', async (req, res) => {
  // console.log(req.body)
  // Model.deleteOne()
  await passModel.deleteOne({ _id: req.body._id })
  // console.dir(req.body._id)
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `)
})
