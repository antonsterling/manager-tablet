import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import db from './db/index.js'

dotenv.config()

const app = express()

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(helmet())

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`)
  next()
})

app.get('/api', (req, res) => {
  res.json({ message: 'Backend funcionando' })
})

// Health check for database connection
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT 1 FROM RDB$DATABASE', [])
    res.json({ ok: true, result })
  } catch (err) {
    console.error('DB test error', err)
    res.status(500).json({ ok: false, error: err.message })
  }
})

// Generic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

export default app