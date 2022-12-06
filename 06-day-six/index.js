import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8')

  for (let i = 3; i < content.length - 1; i++) {
    const fourLetters = [
      content[i],
      content[i - 1],
      content[i - 2],
      content[i - 3],
    ]
    const unique = [...new Set(fourLetters)].length
    console.log('unique', unique)
    if (unique === 4) {
      return i + 1
    }
  }

  return -1
}
