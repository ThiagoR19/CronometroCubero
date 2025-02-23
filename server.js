import express from 'express'
import cors from 'cors'
import { newTime, getTimes, deleteTime } from './bd.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.post('/newtime', async (req, res) => {
  const actualData = req.body
  await newTime(actualData)
  res.send('New time inserted!!')
})

app.get('/getTimes', async (req, res) => {
  const { data } = await getTimes()
  res.json({ data })
})

app.post('/deleteTime', (req, res) => {
  const timeId = req.body
  deleteTime(timeId)
  res.send('Time deleted succesfully!')
})


const PORT = process.env.PORT ?? 1235

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
})

