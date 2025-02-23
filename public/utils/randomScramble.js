export function createScramble() {
  let scramble = ''
  let lastMove = ''
  let flag = true

  const variations = ['', "'", '2']
  const moves = ['U', 'D', 'F', 'R', 'L', 'B']

  for (let i = 0; i < 21; i++) {
    let letterRandom = Math.floor(Math.random() * 6)
    let variationRandom = Math.floor(Math.random() * 3)

    if (flag) {
      flag = false
      scramble += `${moves[letterRandom]}${variations[variationRandom]} `
      lastMove = moves[letterRandom]
    } else {
      if (lastMove == moves[letterRandom]) {
        i--
      } else {
        lastMove = moves[letterRandom]
        scramble += `${moves[letterRandom]}${variations[variationRandom]} `
      }
    }
  }
  return scramble
}