import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trim()
  let lines = content.split('\n')
  let overlaps = 0
  for (const line of lines) {
    overlaps += hasOverlap(line)
  }
  return overlaps
}

export function hasOverlap(line) {
  const [ one, two ] = line.split(',')
  const numbersInOne = getNumbersInRange(one)
  const numbersInTwo = getNumbersInRange(two)
  const oneWithinTwo = numbersInOne.every(one => numbersInTwo.includes(one))
  const twoWithinOne = numbersInTwo.every(two => numbersInOne.includes(two))
  return (oneWithinTwo || twoWithinOne) ? 1 : 0
}

export function getNumbersInRange(input) {
  const [first, last] = input.split('-').map(Number)
  return [...Array((last + 1) - first).keys()].map(k => k + first)
}
