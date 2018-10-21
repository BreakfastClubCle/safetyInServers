const express = require('express')
const routes = require('./middleware/routes')
const db = require('./utils/db')

const app = express()
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/safetyinnumbers'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)


db.connect(mongoURI, err => {
  if (err) {
    console.log(err)
    console.log('Unable to create mongo connection')
    
    return process.exit(1)
  }

  app.listen(PORT, () => {
      console.log(`
                        __
                       <- )
                       /( \\
Server started on ${PORT} \\_\\_>
                        " "`)
  })
})
