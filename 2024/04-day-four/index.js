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

// countXMAS('./2024/04-day-four/inputs/inputOne.txt')
countXMAS('./2024/04-day-four/inputs/realInputOne.txt')

// countSafeReportsStarFour('./2024/04-day-four/inputs/inputOne.txt')
// countSafeReportsStarFour('./2024/04-day-four/inputs/realInputOne.txt')
