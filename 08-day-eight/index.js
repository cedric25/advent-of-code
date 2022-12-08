import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trimEnd()

  const lines = content.split('\n')

  const game = Array(lines.length)
    .fill(null)
    .map(x => Array(lines[0].length).fill(null))
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      game[y][x] = line[x]
    }
  }
  // console.log('game', game)

  let visibles = 0
  for (let y = 0; y < game.length; y++) {
    for (let x = 0; x < game[y].length; x++) {
      if (y === 0 || x === 0 || y === lines.length - 1 || x === game[y].length - 1) {
        visibles++
        continue
      }
      const isVisible = computeIsVisible(game, x, y)
      isVisible && visibles++
    }
  }
  // console.log('visibles', visibles)

  return visibles
}

function computeIsVisible(game, x, y) {
  // On line
  const cellValue = game[y][x]
  const lengthOfOneLine = game[y].length

  let isVisibleFromTop = true
  for (let i = 0; i < y; i++) {
    if (game[i][x] >= cellValue) {
      isVisibleFromTop = false
      break
    }
  }
  if (isVisibleFromTop) return true

  let isVisibleFromBottom = true
  for (let i = y + 1; i < game.length; i++) {
    if (game[i][x] >= cellValue) {
      isVisibleFromBottom = false
      break
    }
  }
  if (isVisibleFromBottom) return true

  let isVisibleOnLeft = true
  for (let i = 0; i < x; i++) {
    if (game[y][i] >= cellValue) {
      isVisibleOnLeft = false
      break
    }
  }
  if (isVisibleOnLeft) return true

  let isVisibleOnRight = true
  for (let i = x + 1; i < game[0].length; i++) {
    if (game[y][i] >= cellValue) {
      isVisibleOnRight = false
      break
    }
  }
  if (isVisibleOnRight) return true

  return false
}
