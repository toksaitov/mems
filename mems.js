import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const host = process.env.MEMS_HOST || 'localhost'
const port = process.env.MEMS_PORT || 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`mems server is listening at http://${host}:${port}`)
})
