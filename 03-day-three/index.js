import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trim()
  let lines = content.split('\n')
  // console.log('lines', lines)
  let sum = 0
  for (let i = 0; i < lines.length - 1; i += 3) {
    const lineOne = lines[i]
    console.log('-> lineOne', lineOne)
    if (!lineOne) {
      break
    }
    console.log('lines[1]', lines[i + 1])
    for (const letterOne of lineOne.split('')) {
      if (lines[i + 1].includes(letterOne) && lines[i + 2].includes(letterOne)) {
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
