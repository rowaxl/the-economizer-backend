const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const router = require('./routes')

const keys = require('./keys');

const app = express();

const CORS_ALLOWED_ORIGINS = process.env['NODE_ENV'] === 'production' ?
  ['https://the-economizer.vercel.app'] :
  ['http://localhost:3000']

app.use(cors({
  origin: CORS_ALLOWED_ORIGINS,
  allowedHeaders: ['Access-Control-Allow-Origin', 'access-token', 'Origin, X-Requested-With', 'Content-Type', 'Accept']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

const PORT = process.env['NODE_ENV'] === 'production' ? process.env.PORT : 5000;

app.listen(PORT, async () => {
  console.log(`Server has started running on port: ${PORT}`)

  const db = await mongoose.connect(keys.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  if (!db) {
    console.log('Failed to connect to DB')
    process.exit(1)
  }
})
