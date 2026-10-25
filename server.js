import express from 'express'
import cors from 'cors'
import { newTime, getTimes, deleteTime, initializeDatabase } from './bd.js'

const app = express()
const PORT = Number(process.env.PORT) || 1235

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/newtime', async (req, res) => {
  try {
    await newTime(req.body)
    res.send('New time inserted!!')
  } catch (error) {
    console.error('Error inserting time:', error)
    res.status(500).json({ error: 'Could not insert time' })
  }
})

app.get('/getTimes', async (req, res) => {
  try {
    const { data } = await getTimes()
    res.json({ data })
  } catch (error) {
    console.error('Error getting times:', error)
    res.status(500).json({ error: 'Could not get times' })
  }
})

app.post('/deleteTime', async (req, res) => {
  try {
    await deleteTime(req.body)
    res.send('Time deleted successfully!')
  } catch (error) {
    console.error('Error deleting time:', error)
    res.status(500).json({ error: 'Could not delete time' })
  }
})

async function startServer() {
  try {
    await initializeDatabase()
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`App listening on port ${PORT}`)
    })
  } catch (error) {
    console.error('Could not initialize database:', error)
    process.exit(1)
  }
}

startServer()
