import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  user: 'timer_59fq_user',
  host: 'dpg-d1n97gjipnbc73crejq0-a.oregon-postgres.render.com',
  database: 'timer_59fq',
  password: 'PZzEShfR1P0mFlufE84teqgUjo6volVx',
  port: 5432,
  ssl: { rejectUnauthorized: false } // necesario para Render
})

// Insertar nuevo tiempo
export async function newTime (actualData) {
  await pool.query(
    'INSERT INTO times (timeValue, scramble) VALUES ($1, $2)',
    [actualData.time, actualData.scramble]
  )
}

// Obtener todos los tiempos
export async function getTimes () {
  const result = await pool.query('SELECT * FROM times')
  return { data: result.rows }
}

// Eliminar tiempo por ID
export async function deleteTime (timeId) {
  await pool.query(
    'DELETE FROM times WHERE timeId = $1',
    [timeId.time]
  )
}
