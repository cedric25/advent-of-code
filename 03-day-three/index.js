import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trim()
  const lines = content.split('\n')
  // console.log('lines', lines)
  let sum = 0
  for (const line of lines) {
    const halfOne = line.substring(0, line.length / 2)
    console.log('halfOne', halfOne)
    const halfTwo = line.substring(line.length / 2, line.length)
    console.log('halfTwo', halfTwo)
    for (const letterOne of halfOne.split('')) {
      if (halfTwo.includes(letterOne)) {
        const letterScore = getLetterScore(letterOne)
        console.log('letterScore', letterScore)
        sum += letterScore
        break
      }
    }
  }
  return sum
}

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function getLetterScore(letter) {
  return alphabet.indexOf(letter) + 1
}
