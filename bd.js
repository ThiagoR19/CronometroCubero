import pg from 'pg'

// const config = {
//   user: "renderclickea",
//   port: "5432",
//   password: "eB00vXuFg4752FbHLL5oCNNKfzIp69Lh",
//   database: "timer_34o2",
//   host: "postgresql://renderclickea:eB00vXuFg4752FbHLL5oCNNKfzIp69Lh@dpg-cutjksl2ng1s73db6pag-a/timer_34o2"
// }

// const config = {
//   user: 'timer_59fq_user',
//   port: '5432',
//   password: 'PZzEShfR1P0mFlufE84teqgUjo6volVx',
//   database: 'timer_59fq',
//   host: 'dpg-d1n97gjipnbc73crejq0-a'
// }

const pool = new pg.Pool({
  connectionString: 'postgresql://timer_59fq_user:PZzEShfR1P0mFlufE84teqgUjo6volVx@dpg-d1n97gjipnbc73crejq0-a/timer_59fq'
})

export async function newTime (actualData) {
  await pool.query('insert into times (timeValue, scramble) values (?,?)', [actualData.time, actualData.scramble])
}

export async function getTimes () {
  const [times] = await pool.query('SELECT * from times')
  return { data: times }
}

export async function deleteTime (timeId) {
  await pool.query('DELETE FROM times WHERE timeId = ?', [timeId.time])
}
