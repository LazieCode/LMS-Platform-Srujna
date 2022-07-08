const express = require('express')
const app = express()
const cors = require('cors')
const epl = require('express-pino-logger')
const logger = require('./pino.setup')
const user = require('../modules/router')
require('dotenv').config()

const port = process.env.PORT || 8000
exports.runServer = () => {
    app.use(express.urlencoded({ extended: true, limit: '50mb' }))
    app.use(express.json({ limit: '50mb' }))

    app.use(cors())



    const eplMiddleware = new epl({
        logger: logger,
        useLevel: "http"
    })

    app.use(eplMiddleware)
    app.get('/api/V1', (req, res) => {
        res.send("Welcome to CFG API")
    })


    app.use('/api/V1/user', user)

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}