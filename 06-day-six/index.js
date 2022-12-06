import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8')

  const forPuzzleOne = 4
  const forPuzzleTwo = 14

  // const loopInput = forPuzzleOne
  const loopInput = forPuzzleTwo

  for (let i = 0; i < content.length - 1; i++) {
    const letters = content.substring(i, i + loopInput)
    const unique = [...new Set(letters.split(''))].length
    if (unique === loopInput) {
      return i + loopInput
    }
  }

  return -1
}
