const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to database
connectDB()

// Load routes
const bootcamps = require('./routes/bootcamps')

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'))
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in mode ${process.env.NODE_ENV} on port ${PORT}`))

// Handle unhadled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
