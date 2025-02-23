import { deleteTime, getTimes, newTime } from "./utils/api.js"
import { startTimer } from "./utils/createInterval.js"
import { createScramble } from "./utils/randomScramble.js"

const timer = document.getElementById('timer')
const scramble = document.getElementById('scramble')

let flagTime = false
let interval = null

document.addEventListener('DOMContentLoaded', onDOMContentLoad)

async function onDOMContentLoad() {
  await getTimes()

  document.addEventListener('click', async (e) => {
    if (e.target.tagName === 'I') {
      await deleteTime({ time: e.target.id.toString() })
      await getTimes()
    }
  })

  scramble.innerHTML = createScramble()

  document.addEventListener('keydown', async (e) => {
    if (e.code !== 'Space') return

    let actualTime = timer.innerHTML.trim()
    let actualScramble = scramble.innerHTML

    timer.innerHTML = '00.00'

    if (flagTime) {
      flagTime = false

      scramble.innerHTML = createScramble()

      let actualData = {
        time: actualTime,
        scramble: actualScramble
      }

      clearInterval(interval)

      await newTime(actualData)
      getTimes()

    } else {
      document.addEventListener('keyup', () => {
        flagTime = true
        interval = startTimer()
      }, { once: true })
    }
  })
}