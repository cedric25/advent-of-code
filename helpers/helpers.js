import url from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

export function readFileTrimEnd(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  return fs.readFileSync(path.join(__dirname, '../', inputPath), 'utf-8').trimEnd()
}

export function compareNumbers(a, b) {
  return a - b
}

export function compareNumbersDesc(a, b) {
  return b - a
}
