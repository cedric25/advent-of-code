import { readFileTrimEnd } from '../../helpers/helpers.js'

/**
 * node ./03-day-three/index.js
 */

function sumOfMulStarOne(inputPath) {
  const content = readFileTrimEnd(inputPath)

  const sum = sumOfMul(content)

  // Log useful for star 1
  console.log('sum', sum)

  // return sum
}

function sumOfMul(content) {
  const regex = /mul\(\d+,\d+\)/g

  let match
  const matches = []

  while ((match = regex.exec(content)) !== null) {
    matches.push(match[0])
  }

  let sum = 0
  for (const match of matches) {
    const digits = match.match(/mul\((\d+),(\d+)\)/)
    sum += Number(digits[1]) * Number(digits[2])
  }

  return sum
}

// --- Star 2

// 3203510 Too low
// 68015012 Too low
// 74838033 Good!

function sumOfMulStarTwo(inputPath) {
  let content = readFileTrimEnd(inputPath)
  content = content.replaceAll('\n', '') // !!! :(

  const beginning = /(.*?)don't/.exec(content)
  let sum = sumOfMul(beginning[1])

  const inBetweenRegex = /do(?!n't)(.*?)don\'t/g
  let match
  while ((match = inBetweenRegex.exec(content)) !== null) {
    sum += sumOfMul(match[1])
  }

  console.log(sum)
}

// sumOfMulStarOne('./2024/03-day-three/inputs/inputOne.txt')
// sumOfMulStarOne('./2024/03-day-three/inputs/realInputOne.txt')

// sumOfMulStarTwo('./2024/03-day-three/inputs/inputStar2.txt')
// sumOfMulStarTwo('./2024/03-day-three/inputs/inputStar2_02.txt')
// sumOfMulStarTwo('./2024/03-day-three/inputs/inputStar2_03.txt')
sumOfMulStarTwo('./2024/03-day-three/inputs/realInputOne.txt')
