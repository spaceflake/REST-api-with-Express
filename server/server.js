const express = require('express')
// import middleware
const cors = require('cors')
// import routes
const memberRouter = require('./routes/members.route')

// default port
const PORT = process.env.PORT || 4000
// create express app
const app = express()
// implement middleware
app.use(express.json())
app.use(cors())

// implement routes
app.use('/api/members', memberRouter)

// 404 middleware
app.use((req, res) => {
  res.status(404).json('not found')
})

// route for errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// start express app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
