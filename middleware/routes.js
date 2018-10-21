const path = require('path')
const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const { ObjectId } = require('mongodb')

// This will talk to the db to get all the reports 
router.get('/reports', (_, res) => {
  db.get().collection('reports').find().toArray((err, docs) => {
    if (err) {
      res.send({ success: false })

      throw err
    }

    return res.json({ success: true, reports: docs })
  })
})

// This will talk to the db to create a new report
router.post('/report', (req, res) => {
  db.get().collection('reports').insertOne(req.body, err => {
    if (err) {
      res.send({ success: false })

      throw err
    }

    res.json({ success: true, report: req.body })
  })
})

// This will talk to the db to delete a report
router.delete('/report/:id', (req, res) => {
  const currDB = db.get()

  currDB.collection('reports').deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) {
      res.send({ success: false })

      throw err
    }

    currDB.collection('reports').find().toArray((getErr, arr) => {
      if (getErr) {
        res.send({ success: false })

        throw getErr
      }
      
      return res.json({ success: true, reports: arr })
    })
  })
})

router.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'frontend-build', 'index.html'))
})

module.exports = router

