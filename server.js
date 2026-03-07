import express from "express"
import dotenv from "dotenv"
const app = express()
dotenv.config()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World Zaib Bro....!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
