import Fb from 'node-firebird'
import dotenv from 'dotenv'

dotenv.config()

const POOL_SIZE = parseInt(process.env.FB_POOL_SIZE || '5', 10)

const options = {
  host: process.env.FB_HOST || '127.0.0.1',
  port: parseInt(process.env.FB_PORT || '3050', 10),
  database: process.env.FB_DATABASE || '',
  user: process.env.FB_USER || 'SYSDBA',
  password: process.env.FB_PASSWORD || 'masterkey',
  lowercase_keys: false,
  role: null,
  pageSize: 4096
}

let pool

function initPool() {
  if (pool) return pool
  pool = Fb.pool(POOL_SIZE, options)
  return pool
}

function getConnection() {
  return new Promise((resolve, reject) => {
    const p = initPool()
    p.get((err, db) => {
      if (err) return reject(err)
      resolve(db)
    })
  })
}

function query(sql, params = []) {
  return new Promise(async (resolve, reject) => {
    let db
    try {
      db = await getConnection()
      db.query(sql, params, (err, result) => {
        // release connection
        try { db.detach() } catch (e) { /* ignore */ }
        if (err) return reject(err)
        resolve(result)
      })
    } catch (err) {
      if (db) {
        try { db.detach() } catch (e) { /* ignore */ }
      }
      reject(err)
    }
  })
}

export default { query, getConnection, initPool }
