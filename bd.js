import pkg from 'pg'

import 'dotenv/config'

const { Pool } = pkg

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  : {
      user: process.env.PGUSER ?? process.env.user,
      host: process.env.PGHOST ?? process.env.host,
      database: process.env.PGDATABASE ?? process.env.database,
      password: process.env.PGPASSWORD ?? process.env.password,
      port: Number(process.env.PGPORT ?? process.env.port) || 5432,
      ssl: { rejectUnauthorized: false }
    }

const pool = new Pool(poolConfig)

// Insertar nuevo tiempo
export async function newTime(actualData) {
  await pool.query(
    'INSERT INTO times (timeValue, scramble) VALUES ($1, $2)',
    [actualData.time, actualData.scramble]
  )
}

// Obtener todos los tiempos
export async function getTimes() {
  const result = await pool.query(
    'SELECT timeid AS "timeId", timevalue AS "timeValue", scramble FROM times ORDER BY timeid ASC'
  )
  return { data: result.rows }
}

// Eliminar tiempo por ID
export async function deleteTime(timeId) {
  await pool.query(
    'DELETE FROM times WHERE timeId = $1',
    [timeId.time]
  )
}
