import { readFileTrimEnd } from '../../helpers/helpers.js'

/**
 * node ./04-day-four/index.js
 */

function countXMAS(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const lines = content.split('\n')

  let count = 0

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]
      if (char !== 'X') {
        continue
      }
      const hasHorizontal =
        lines[i][j + 1] === 'M' && lines[i][j + 2] === 'A' && lines[i][j + 3] === 'S'
      if (hasHorizontal) {
        count += 1
      }

      const hasHorizontalBackward =
        lines[i][j - 1] === 'M' && lines[i][j - 2] === 'A' && lines[i][j - 3] === 'S'
      if (hasHorizontalBackward) {
        count += 1
      }

      const hasVertical =
        lines[i + 1]?.[j] === 'M' && lines[i + 2]?.[j] === 'A' && lines[i + 3]?.[j] === 'S'
      if (hasVertical) {
        count += 1
      }

      const hasVerticalBackward =
        lines[i - 1]?.[j] === 'M' && lines[i - 2]?.[j] === 'A' && lines[i - 3]?.[j] === 'S'
      if (hasVerticalBackward) {
        count += 1
      }

      const hasDiagonalUpRight =
        lines[i - 1]?.[j + 1] === 'M' &&
        lines[i - 2]?.[j + 2] === 'A' &&
        lines[i - 3]?.[j + 3] === 'S'
      if (hasDiagonalUpRight) {
        count += 1
      }

      const hasDiagonalDownRight =
        lines[i + 1]?.[j + 1] === 'M' &&
        lines[i + 2]?.[j + 2] === 'A' &&
        lines[i + 3]?.[j + 3] === 'S'
      if (hasDiagonalDownRight) {
        count += 1
      }

      const hasDiagonalDownLeft =
        lines[i + 1]?.[j - 1] === 'M' &&
        lines[i + 2]?.[j - 2] === 'A' &&
        lines[i + 3]?.[j - 3] === 'S'
      if (hasDiagonalDownLeft) {
        count += 1
      }

      const hasDiagonalUpLeft =
        lines[i - 1]?.[j - 1] === 'M' &&
        lines[i - 2]?.[j - 2] === 'A' &&
        lines[i - 3]?.[j - 3] === 'S'
      if (hasDiagonalUpLeft) {
        count += 1
      }
    }
  }

  console.log('count', count)
}

// --- Star 2

function countCrossMAS(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const lines = content.split('\n')

  let count = 0

  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    for (let colIndex = 0; colIndex < lines[rowIndex].length; colIndex++) {
      const char = lines[rowIndex][colIndex]
      if (char !== 'M' && char !== 'S') {
        continue
      }

      if (char === 'M') {
        // M.S
        // .A.
        // M.S
        const isX1 =
          lines[rowIndex]?.[colIndex + 2] === 'S' &&
          lines[rowIndex + 1]?.[colIndex + 1] === 'A' &&
          lines[rowIndex + 2]?.[colIndex] === 'M' &&
          lines[rowIndex + 2]?.[colIndex + 2] === 'S'
        if (isX1) {
          count += 1
        }

        // M.M
        // .A.
        // S.S
        const isX2 =
          lines[rowIndex]?.[colIndex + 2] === 'M' &&
          lines[rowIndex + 1]?.[colIndex + 1] === 'A' &&
          lines[rowIndex + 2]?.[colIndex] === 'S' &&
          lines[rowIndex + 2]?.[colIndex + 2] === 'S'
        if (isX2) {
          count += 1
        }
      }

      if (char === 'S') {
        // S.S
        // .A.
        // M.M
        const isX3 =
          lines[rowIndex]?.[colIndex + 2] === 'S' &&
          lines[rowIndex + 1]?.[colIndex + 1] === 'A' &&
          lines[rowIndex + 2]?.[colIndex] === 'M' &&
          lines[rowIndex + 2]?.[colIndex + 2] === 'M'
        if (isX3) {
          count += 1
        }

        // S.M
        // .A.
        // S.M
        const isX4 =
          lines[rowIndex]?.[colIndex + 2] === 'M' &&
          lines[rowIndex + 1]?.[colIndex + 1] === 'A' &&
          lines[rowIndex + 2]?.[colIndex] === 'S' &&
          lines[rowIndex + 2]?.[colIndex + 2] === 'M'
        if (isX4) {
          count += 1
        }
      }
    }
  }

  console.log('count', count)
}

// countXMAS('./2024/04-day-four/inputs/inputOne.txt')
// countXMAS('./2024/04-day-four/inputs/realInputOne.txt')

// countCrossMAS('./2024/04-day-four/inputs/inputOne.txt')
countCrossMAS('./2024/04-day-four/inputs/realInputOne.txt')
