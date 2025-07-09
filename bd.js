import mysql from 'mysql2/promise'

// const config = {
//   user: "renderclickea",
//   port: "5432",
//   password: "eB00vXuFg4752FbHLL5oCNNKfzIp69Lh",
//   database: "timer_34o2",
//   host: "postgresql://renderclickea:eB00vXuFg4752FbHLL5oCNNKfzIp69Lh@dpg-cutjksl2ng1s73db6pag-a/timer_34o2"
// }

const config = {
  user: 'root',
  port: '3306',
  password: '1234',
  database: 'timer',
  host: 'localhost'
}

const connection = await mysql.createConnection(config)

export async function newTime (actualData) {
  await connection.query('insert into times (timeValue, scramble) values (?,?)', [actualData.time, actualData.scramble])
}

export async function getTimes () {
  const [times] = await connection.query('SELECT * from times')
  return { data: times }
}

export async function deleteTime (timeId) {
  await connection.query('DELETE FROM times WHERE timeId = ?', [timeId.time])
}
