import { readFileTrimEnd } from '../../helpers/helpers.js'

/**
 * node ./2015/02-day-two/index.js
 */

function partOne() {
  const content = readFileTrimEnd('./2015/02-day-two/inputOne.txt')

  const lines = content.split('\n')

  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    sum += getPaperForLine(line)
  }

  // 1588178
  console.log('Answer is', sum)
}

function partTwo() {
  const content = readFileTrimEnd('./2015/01-day-one/inputOne.txt')

  let answer
  let floor = 0
  for (let i = 0; i < content.length; i++) {
    if (floor === -1) {
      answer = i
      break
    }
    if (content[i] === '(') {
      floor++
    }
    if (content[i] === ')') {
      floor--
    }
  }

  // 1797
  console.log('Answer is', answer)
}

function getPaperForLine(line) {
  const [length, width, height] = line.split('x')
  const totalSurface = 2 * length * width + 2 * width * height + 2 * height * length
  const areaOfSmallestSide = Math.min(length * width, width * height, length * height)
  return totalSurface + areaOfSmallestSide
}

// console.log(getPaperForLine('2x3x4'))

partOne()

// partTwo()
