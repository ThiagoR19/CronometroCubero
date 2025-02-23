import mysql from 'mysql2/promise'

const config = {
  user: "root",
  port: "3306",
  password: "1234",
  database: "timer",
  host: "localhost"
}

const connection = await mysql.createConnection(config)

export async function newTime(actualData) {
  await connection.query('insert into times (timeValue, scramble) values (?,?)', [actualData.time, actualData.scramble])
}

export async function getTimes() {
  const [times] = await connection.query('SELECT * from times');
  return { data: times };
}

export async function deleteTime(timeId) {
  await connection.query('DELETE FROM times WHERE timeId = ?', [timeId.time])
}