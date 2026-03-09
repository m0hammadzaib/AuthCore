import express from "express"
import dotenv from "dotenv"
import pool from './src/config/db.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()")
  res.json(result.rows)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
