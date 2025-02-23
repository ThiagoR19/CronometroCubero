export function startTimer() {
  let seconds = 0
  let min = 0
  let deciseconds = 0
  let centisecond = 0

  let interval = setInterval(createInterval, 10)

  function createInterval() {

    centisecond++

    if (centisecond > 9) {
      centisecond = 0
      deciseconds += 1
      if (deciseconds > 9) {
        deciseconds = 0
        seconds += 1
        if (seconds > 59) {
          seconds = 0
          min += 1
        }
      }
    }
    if (min > 0) {
      timer.innerHTML = `${min.toString()}.${seconds.toString().padStart(2, '0')}.${deciseconds}${centisecond}`
    } else {
      timer.innerHTML = `${seconds.toString().padStart(2, '0')}.${deciseconds}${centisecond}`
    }
  }
  return interval
}