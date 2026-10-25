import pkg from 'pg'

import 'dotenv/config'

const { Pool } = pkg

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
  ssl: { rejectUnauthorized: false }
})

// Insertar nuevo tiempo
export async function newTime(actualData) {
  await pool.query(
    'INSERT INTO times (timeValue, scramble) VALUES ($1, $2)',
    [actualData.time, actualData.scramble]
  )
}

// Obtener todos los tiempos
export async function getTimes() {
  const result = await pool.query('SELECT * FROM times')
  return { data: result.rows }
}

// Eliminar tiempo por ID
export async function deleteTime(timeId) {
  await pool.query(
    'DELETE FROM times WHERE timeId = $1',
    [timeId.time]
  )
}
