import { readFileTrimEnd, sortAsc } from '../../helpers/helpers.js';

/**
 * node ./01-day-one/index.js
 */

export function calculateDistance(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const lines = content.split('\n')

  const firstList = []
  const secondList = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    firstList.push(Number(line.split('   ')[0]))
    secondList.push(Number(line.split('   ')[1]))
  }
  // console.log('firstList', firstList)
  // console.log('secondList', secondList)

  const orderedFirstList = sortAsc(firstList)
  const orderedSecondList = sortAsc(secondList)
  // console.log('orderedFirstList', orderedFirstList)
  // console.log('orderedSecondList', orderedSecondList)

  let sumDistance = 0
  for (let i = 0; i < orderedFirstList.length; i++) {
    const distance = orderedFirstList[i] - orderedSecondList[i]
    sumDistance += Math.abs(distance)
  }
  console.log('sumDistance', sumDistance)
}

export function calculateDistanceStarTwo(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const lines = content.split('\n')

  const firstList = []
  const secondList = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    firstList.push(Number(line.split('   ')[0]))
    secondList.push(Number(line.split('   ')[1]))
  }
  // console.log('firstList', firstList)
  // console.log('secondList', secondList)

  let sum = 0
  for (let i = 0; i < firstList.length; i++) {
    // console.log('firstList[0]', firstList[0])
    const timesInListTwo = secondList.filter(item => item === firstList[i]).length;
    // console.log('timesInListTwo', timesInListTwo)
    sum += firstList[i] * timesInListTwo
  }
  console.log('sum', sum)
}

// calculateDistance('./2024/01-day-one/inputs/inputOne.txt')
// calculateDistance('./2024/01-day-one/inputs/realInputOne.txt')

// calculateDistanceStarTwo('./2024/01-day-one/inputs/inputOne.txt')
calculateDistanceStarTwo('./2024/01-day-one/inputs/realInputOne.txt')
