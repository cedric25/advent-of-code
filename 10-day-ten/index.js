import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trimEnd()

  const lines = content.split('\n')

  let x = 1
  let cycleNo = 1
  const interestingValues = {}
  let nextInterestingValue = 20
  for (let i = 0; i < lines.length; i++) {
    const [operation, countStr] = lines[i].split(' ')
    const count = Number(countStr)

    if (nextInterestingValue === cycleNo) {
      interestingValues[cycleNo] = x
      nextInterestingValue += 40
    }
    if (nextInterestingValue === cycleNo + 1) {
      interestingValues[cycleNo + 1] = x
      nextInterestingValue += 40
    }

    if (operation === 'noop') {
      cycleNo++
      continue
    }
    // operation === 'addx'
    x += count
    cycleNo += 2
  }

  const sum = Object.entries(interestingValues).reduce((sum, [index, value]) => {
    sum += Number(index) * value
    console.log('sum', sum)
    return sum
  }, 0)

  console.log('interestingValues', interestingValues)

  return sum
}
