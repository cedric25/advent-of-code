import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

/* -----------------
 * ----- SNAKE -----
 * ----------------- */

const right = 'R'
const left = 'L'
const up = 'U'
const down = 'D'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trimEnd()

  const lines = content.split('\n')
  // const lines = content.split('\n').slice(0, 5)
  console.log('lines', lines)

  const { visited } = handleMoves(lines)
  return visited.length

  // Move 1: Don't move tail
  // const [direction, movesCount] = lines[0].split(' ')
  // move(head, direction)
  // lines[0] = `${direction} ${movesCount - 1}`
  //
  // console.log('head', head)
  //
  // drawVisited(visited)
  //
  // for (const line of lines) {
  //   console.log('=====')
  //   const [direction, movesCount] = line.split(' ')
  //   for (let i = 0; i < movesCount; i++) {
  //     console.log('---')
  //     head = move(head, direction)
  //   }
  // }
  //
  // return Object.values(visited).reduce((accu, line) => {
  //   return accu + line.filter(x => x === 'X').length
  // }, 0)
}

function move(thing, direction) {
  switch (direction) {
    case right: {
      thing.x++
      break
    }
    case left: {
      thing.x--
      break
    }
    case up: {
      thing.y++
      break
    }
    case down: {
      thing.y--
      break
    }
  }
  return thing
}

function trackHaveBeenThere(visited, tailX, tailY) {
  if (!visited.find(({ x, y }) => x === tailX && y === tailY)) {
    visited.push({ x: tailX, y: tailY })
  }
  return visited
}

function drawVisited(game) {
  console.log('Keys:', Object.keys(game).sort().reverse())
  Object.keys(game)
    .sort()
    .reverse()
    .map(lineKey => {
      console.log(game[lineKey])
    })
}

export function handleMoves(moves) {
  let snake = [
    { x: 0, y: 0 }, // head
    { x: 0, y: 0 }, // 1
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }, // 9
  ]

  // let head = { x: 0, y: 0 }
  // let tail = { x: 0, y: 0 }

  let nineVisited = [{ x: 0, y: 0 }]

  for (const line of moves) {
    console.log('=====', line)
    const [direction, movesCount] = line.split(' ')
    for (let i = 0; i < movesCount; i++) {
      console.log('---')
      const newHeadPosition = move(snake[0], direction)
      snake[0] = newHeadPosition

      for (let j = 1; j < snake.length; j++) {
        const head = snake[j - 1]
        let tail = snake[j]

        // right
        if (head.x - tail.x === 2) {
          if (head.y < tail.y) {
            console.log('Tail moves down ⬇')
            tail = move(tail, down)
          }
          if (head.y > tail.y) {
            console.log('Tail moves up ⬆')
            tail = move(tail, up)
          }
          console.log('Tail moves right ⮕')
          tail = move(tail, right)
        }
        // left
        if (head.x - tail.x === -2) {
          if (head.y < tail.y) {
            console.log('Tail moves down ⬇')
            tail = move(tail, down)
          }
          if (head.y > tail.y) {
            console.log('Tail moves up ⬆')
            tail = move(tail, up)
          }
          console.log('Tail moves left ⬅')
          tail = move(tail, left)
        }
        // up
        if (head.y - tail.y === 2) {
          if (head.x < tail.x) {
            console.log('Tail moves left ⬅')
            tail = move(tail, left)
          }
          if (head.x > tail.x) {
            console.log('Tail moves right ⮕')
            tail = move(tail, right)
          }
          console.log('Tail moves up ⬆')
          tail = move(tail, up)
        }
        // down
        if (head.y - tail.y === -2) {
          if (head.x < tail.x) {
            console.log('Tail moves left ⬅')
            tail = move(tail, left)
          }
          if (head.x > tail.x) {
            console.log('Tail moves right ⮕')
            tail = move(tail, right)
          }
          console.log('Tail moves down ⬇')
          tail = move(tail, down)
        }
        if (j === snake.length - 1) {
          nineVisited = trackHaveBeenThere(nineVisited, tail.x, tail.y)
        }
      }
      // console.log('Tail does not move')
    }
  }

  return {
    visited: nineVisited,
    // head,
    // tail,
  }
}
