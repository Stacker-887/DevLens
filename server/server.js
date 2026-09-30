const express = require('express')
const cors = require('cors')
const projectRoutes = require('./routes/projectRoutes')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

const PORT = 5000

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/projects', projectRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the DevLens backend!'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'DevLens API'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

