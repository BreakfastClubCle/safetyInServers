const MongoClient = require('mongodb').MongoClient

const state = {
  db: null
}

const connect = (url, done) => {
  if (state.db) {
    return done()
  }
  const client = new MongoClient(url, {
    useNewUrlParser: true
  })

  client.connect(connErr => {
    if (connErr) {
      return done(connErr)
    }
    const db = client.db('safetyinnumbers')

    db.collections((collErr, colls) => {
      if (collErr) {
        return done(collErr)
      }

      if (!colls.length) {
        db.createCollection('reports', createErr => {
          if (createErr) {
            return done(createErr)
          }

          state.db = db

          return done()
        })
      } else {
        state.db = db
      }
      
      return done()
    })
  })
}

const get = () => state.db

const close = done => {
  if (state.db) {
    return state.db.close(err => {
      state.db = null
      state.mode = null
      done(err)
    })
  }

  return done()
}

module.exports = {
  connect,
  get,
  close
}
