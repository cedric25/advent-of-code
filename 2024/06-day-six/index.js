import { readFileTrimEnd, sleep } from '../../helpers/helpers.js'

/**
 * node ./06-day-six/index.js
 */

async function countGuardPositions(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const rows = content.split('\n').map(line => line.split(''))

  let guardColIndex
  const guardRowIndex = rows.findIndex(row => {
    const colIdx = row.findIndex(cellValue => cellValue === '^')
    if (colIdx !== -1) {
      guardColIndex = colIdx
      return true
    }
  })

  let countCellsVisited = 1
  const cellsVisited = [`${guardRowIndex},${guardColIndex}`]
  let row = guardRowIndex
  let col = guardColIndex
  let guardDirection = 'up'
  let nextCell
  do {
    // await sleep(250)
    const { x, y } = getNextCell(row, col, guardDirection)
    nextCell = rows[x]?.[y]

    if (nextCell === undefined) {
      break
    }

    if (nextCell === '#') {
      if (guardDirection === 'up') {
        guardDirection = 'right'
      } else if (guardDirection === 'right') {
        guardDirection = 'down'
      } else if (guardDirection === 'down') {
        guardDirection = 'left'
      } else if (guardDirection === 'left') {
        guardDirection = 'up'
      }
      continue
    }

    row = x
    col = y
    if (!cellsVisited.includes(`${x},${y}`)) {
      countCellsVisited++
      cellsVisited.push(`${x},${y}`)
    }
  } while (true)

  console.log('countCellsVisited', countCellsVisited)
}

function getNextCell(x, y, direction) {
  if (direction === 'up') {
    return { x: x - 1, y }
  }
  if (direction === 'right') {
    return { x, y: y + 1 }
  }
  if (direction === 'down') {
    return { x: x + 1, y }
  }
  if (direction === 'left') {
    return { x, y: y - 1 }
  }
}

// await countGuardPositions('./2024/06-day-six/inputs/inputOne.txt')
countGuardPositions('./2024/06-day-six/inputs/realInputOne.txt')

// countGuardPositions('./2024/06-day-six/inputs/inputOne.txt')
// countGuardPositions('./2024/06-day-six/inputs/realInputOne.txt')
