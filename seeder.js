const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const Bootcamp = require('./models/Bootcamp')

dotenv.config({path: './config/config.env'})
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    console.log('Data imported...'.green.inverse)
    process.exit()
  } catch (e) {
    console.error(e)
  }
}

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    console.log('Data destroyed...'.red.inverse)
    process.exit()
  } catch (e) {
    console.error(e)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
