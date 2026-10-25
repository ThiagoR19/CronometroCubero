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

function quoteIdentifier(identifier) {
  return `"${identifier.replaceAll('"', '""')}"`
}

async function getTimesColumns() {
  const result = await pool.query(
    `SELECT column_name
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'times'`
  )

  const columns = new Map(
    result.rows.map(({ column_name }) => [column_name.toLowerCase(), column_name])
  )
  const id = columns.get('timeid')
  const value = columns.get('timevalue')
  const scramble = columns.get('scramble')

  if (!id || !value || !scramble) {
    throw new Error('The times table must contain timeId, timeValue and scramble columns')
  }

  return { id, value, scramble }
}

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "times" (
      timeid SERIAL PRIMARY KEY,
      timevalue VARCHAR(15) NOT NULL,
      scramble TEXT NOT NULL
    )
  `)
}

// Insertar nuevo tiempo
export async function newTime(actualData) {
  const columns = await getTimesColumns()
  await pool.query(
    `INSERT INTO "times" (${quoteIdentifier(columns.value)}, ${quoteIdentifier(columns.scramble)}) VALUES ($1, $2)`,
    [actualData.time, actualData.scramble]
  )
}

// Obtener todos los tiempos
export async function getTimes() {
  const columns = await getTimesColumns()
  const result = await pool.query(
    `SELECT ${quoteIdentifier(columns.id)} AS "timeId",
            ${quoteIdentifier(columns.value)} AS "timeValue",
            ${quoteIdentifier(columns.scramble)} AS "scramble"
     FROM "times"
     ORDER BY ${quoteIdentifier(columns.id)} ASC`
  )
  return { data: result.rows }
}

// Eliminar tiempo por ID
export async function deleteTime(timeId) {
  const columns = await getTimesColumns()
  await pool.query(
    `DELETE FROM "times" WHERE ${quoteIdentifier(columns.id)} = $1`,
    [timeId.time]
  )
}
