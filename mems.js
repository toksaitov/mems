import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'

import { User, Message, dbStart } from './src/db.js'
import users from './src/users.js'
import messages from './src/messages.js'

dotenv.config()

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.MEMS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.handleError = (res, status, error = 'Something went wrong') => {
    return res.status(status).json({ error })
}

const host = process.env.MEMS_HOST || 'localhost'
const port = process.env.MEMS_PORT || 8080

users(app, User)
messages(app, Message, User)

dbStart()
app.listen(port, () => {
    console.log(`mems server is listening at http://${host}:${port}`)
})
