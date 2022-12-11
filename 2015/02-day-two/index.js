import { readFileTrimEnd, compareNumbers } from '../../helpers/helpers.js'

/**
 * node ./2015/02-day-two/index.js
 */

function compute() {
  const content = readFileTrimEnd('./2015/02-day-two/inputOne.txt')

  const lines = content.split('\n')

  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Part 1
    // sum += getPaperForLine(line)
    // Part 2
    sum += getRibbonForPackage(line)
  }

  // Part One: 1588178
  // Part Two: 3783758
  console.log('Answer is', sum)
}

function getPaperForLine(line) {
  const [length, width, height] = line.split('x')
  const totalSurface = 2 * length * width + 2 * width * height + 2 * height * length
  const areaOfSmallestSide = Math.min(length * width, width * height, length * height)
  return totalSurface + areaOfSmallestSide
}

function getRibbonForPackage(line) {
  const [min1, min2, max] = line.split('x').map(Number).sort(compareNumbers)
  const ribbonToWrap = min1 + min1 + min2 + min2
  const ribbonForBow = min1 * min2 * max
  return ribbonToWrap + ribbonForBow
}

// console.log(getPaperForLine('2x3x4'))

// console.log(getRibbonForPackage('2x3x4'))
// console.log(getRibbonForPackage('2x5x4'))
// console.log(getRibbonForPackage('1x1x10'))
// console.log(getRibbonForPackage('3x11x24'))
// 3+3+11+11 + 3*11*24 = 820

// console.log(getRibbonForPackage('24x8x21'))
// 8+8+21+21 + 24*8*21
// 58 + 4032 = 4090

compute()
