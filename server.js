const express = require('express')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({path: './config/config.env'})
// Load routes
const bootcamps = require('./routes/bootcamps')

const app = express()

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in mode ${process.env.NODE_ENV} on port ${PORT}`))
