import { readFileTrimEnd } from '../../helpers/helpers.js';

/**
 * node ./02-day-two/index.js
 */

export function countSafeReports(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const lines = content.split('\n')

  let countSafeReports = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const levels = line.split(' ').map(Number)
    let isReportSafe = true
    let isIncreasing = null
    let isDecreasing = null
    for (let j = 0; j < levels.length; j++) {
      if (levels[j + 1] === undefined) {
        continue
      }
      if (levels[j + 1] > levels[j]) {
        isIncreasing = true;
        if (isDecreasing) {
          isReportSafe = false
          break
        }
      }
      if (levels[j + 1] < levels[j]) {
        isDecreasing = true;
        if (isIncreasing) {
          isReportSafe = false
          break
        }
      }
      if (Math.abs(levels[j + 1] - levels[j]) > 3) {
        isReportSafe = false
        break
      }
      if (levels[j + 1] === levels[j]) {
        isReportSafe = false
        break
      }
    }
    if (isReportSafe === true) {
      countSafeReports++
    }
  }

  console.log('countSafeReports', countSafeReports)
}

// countSafeReports('./2024/02-day-two/inputs/inputOne.txt')
countSafeReports('./2024/02-day-two/inputs/realInputOne.txt')

// countSafeReports('./2024/02-day-two/inputs/inputOne.txt')
// countSafeReports('./2024/02-day-two/inputs/realInputOne.txt')
