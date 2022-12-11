import { readFileTrimEnd } from '../../helpers/helpers.js'

/**
 * node ./2015/01-day-one/index.js
 */

function partOne() {
  const content = readFileTrimEnd('./2015/01-day-one/inputOne.txt')

  const up = content.replaceAll(')', '').length
  const down = content.replaceAll('(', '').length

  // 280
  console.log('Answer is', up - down)
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

// partOne()

partTwo()
