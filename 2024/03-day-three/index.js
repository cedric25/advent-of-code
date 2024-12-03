import { readFileTrimEnd } from '../../helpers/helpers.js'

/**
 * node ./03-day-three/index.js
 */

function sumOfMul(inputPath) {
  const content = readFileTrimEnd(inputPath)

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

  console.log('sum', sum)
}

// sumOfMul('./2024/03-day-three/inputs/inputOne.txt')
sumOfMul('./2024/03-day-three/inputs/realInputOne.txt')

// sumOfMul('./2024/03-day-three/inputs/inputOne.txt')
// sumOfMul('./2024/03-day-three/inputs/realInputOne.txt')
