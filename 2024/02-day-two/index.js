import { readFileTrimEnd } from '../../helpers/helpers.js';

/**
 * node ./02-day-two/index.js
 */

function countSafeReports(inputPath) {
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
  }

  console.log('countSafeReports', countSafeReports)
}

// --- Star 2

function countSafeReportsStarTwo(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const lines = content.split('\n')

  let countSafeReports = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const levels = line.split(' ').map(Number);
    const isReportSafe = isLineSafe(levels)
    if (isReportSafe === true) {
      countSafeReports++
      continue
    }
    // Untouched line is unsafe
    for (let j = 0; j < levels.length; j++) {
      const lineWithoutOneLevel = immutableSplice(levels, j)
      const isReportSafe = isLineSafe(lineWithoutOneLevel)
      if (isReportSafe === true) {
        countSafeReports++
        break
      }
    }
  }

  console.log('countSafeReports', countSafeReports)
}

function isLineSafe(levels) {
  let isIncreasing = null
  let isDecreasing = null
  for (let j = 0; j < levels.length; j++) {
    if (levels[j + 1] === undefined) {
      continue
    }
    if (levels[j + 1] > levels[j]) {
      isIncreasing = true;
      if (isDecreasing) {
        return false
      }
    }
    if (levels[j + 1] < levels[j]) {
      isDecreasing = true;
      if (isIncreasing) {
        return false
      }
    }
    if (Math.abs(levels[j + 1] - levels[j]) > 3) {
      return false
    }
    if (levels[j + 1] === levels[j]) {
      return false
    }
  }
  return true
}

function immutableSplice(arr, start) {
  return [
    ...arr.slice(0, start),
    ...arr.slice(start + 1)
  ];
}

// countSafeReports('./2024/02-day-two/inputs/inputOne.txt')
// countSafeReports('./2024/02-day-two/inputs/realInputOne.txt')

// countSafeReportsStarTwo('./2024/02-day-two/inputs/inputOne.txt')
countSafeReportsStarTwo('./2024/02-day-two/inputs/realInputOne.txt')
