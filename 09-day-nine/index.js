import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

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
  let head = { x: 0, y: 0 }
  let tail = { x: 0, y: 0 }
  let visited = [{ x: 0, y: 0 }]

  for (const line of moves) {
    console.log('=====', line)
    const [direction, movesCount] = line.split(' ')
    for (let i = 0; i < movesCount; i++) {
      console.log('---')
      head = move(head, direction)
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
        visited = trackHaveBeenThere(visited, tail.x, tail.y)
        // drawVisited(visited)
        continue
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
        visited = trackHaveBeenThere(visited, tail.x, tail.y)
        // drawVisited(visited)
        continue
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
        visited = trackHaveBeenThere(visited, tail.x, tail.y)
        // drawVisited(visited)
        continue
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
        visited = trackHaveBeenThere(visited, tail.x, tail.y)
        // drawVisited(visited)
        continue
      }
      console.log('Tail does not move')
    }
  }

  return {
    visited,
    head,
    tail,
  }
}
