import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

/*
 * ----- Parcours d'un graph', dijkstra -----
 * Aide : https://github.com/RascalTwo/AdventOfCode/blob/master/2022/solutions/12/solve.ts
 */

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trimEnd()

  const lines = content.split('\n')
  // console.log('lines', lines)

  const { matrix, start, end } = parseGameInput(lines)

  const movesCount = getMovesCount({ matrix, start, end })
  console.log('movesCount', movesCount)

  return movesCount
}

function parseGameInput(lines) {
  const codeForFirstLetter = 96
  // Convert letters to numbers
  // a = 1, b = 2, etc.
  const matrix = lines.map(line =>
    line.split('').map(char => {
      return char.charCodeAt(0) - codeForFirstLetter
    })
  )

  // Find Start and End
  const codeForStart = 83 // 'S'
  const codeForEnd = 69 // 'E'
  let start
  let end
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === codeForStart - codeForFirstLetter) {
        start = [y, x]
      }
      if (matrix[y][x] === codeForEnd - codeForFirstLetter) {
        end = [y, x]
      }

      if (end && start) break
    }
    if (end && start) break
  }

  matrix[start[0]][start[1]] = 1
  matrix[end[0]][end[1]] = 26 // letter 'z'

  return { matrix, start, end }
}

function getMovesCount({ matrix, start, end }) {
  const queue = [{ coord: start, cost: 0 }]
  console.log('queue', queue)
  const seen = new Map()
  while (queue[0].coord[0] !== end[0] || queue[0].coord[1] !== end[1]) {
    const {
      coord: [y, x],
      cost,
    } = queue.shift()

    if (seen.get(y)?.has(x)) {
      // console.log('Already visited')
      continue
    }
    if (!seen.has(y)) {
      seen.set(y, new Set())
    }
    seen.get(y).add(x)

    for (const neighbor of [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
    ]) {
      const [i, j] = neighbor
      if (i < 0 || j < 0) {
        // console.log('Not in matrix')
        continue
      }
      if (i >= matrix.length || j >= matrix[0].length) {
        // console.log('Not in matrix')
        continue
      }
      // If is allowed to go to node
      if (matrix[i][j] <= matrix[y][x] + 1) {
        // Valid neighbor
        queue.push({ coord: [i, j], cost: cost + 1 })
      }
    }
  }

  return queue[0].cost
}
