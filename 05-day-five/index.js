import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8')
  let lines = content.split('\n')

  let stacksCount
  let stacks
  for (const line of lines) {
    if (line.startsWith(' 1')) {
      stacksCount = Number(line[line.length - 1])
      console.log('stacksCount', stacksCount)
      stacks = [...Array(stacksCount + 1).keys()].map(k => [])
      break
    }
  }

  for (const line of lines) {
    if (line.startsWith(' 1')) {
      break
    }
    console.log('-> line', line)
    for (let i = 1; i <= stacksCount; i++) {
      const letter = line[1 + 4*(i-1)]?.trim()
      console.log('letter', letter)
      if (letter) {
        stacks[i].push(letter);
      }
    }
  }
  console.log('stacks', stacks)

  let instructions = ''
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].startsWith('move')) {
      instructions += lines[i] + '\n'
    }
  }
  // console.log(instructions)

  for (const instruction of instructions.split('\n')) {
    const words = instruction.split(' ')
    const stackFrom = words[3]
    const stackTo = words[5]
    const howMany = words[1]
    // console.log('stackFrom', stackFrom)
    // console.log('stackTo', stackTo)
    // console.log('howMany', howMany)

    for (let i = 0; i < howMany; i++) {
      const letter = stacks[stackFrom].shift()
      stacks[stackTo].unshift(letter)
    }
  }

  let result = ''
  for (const stack of stacks) {
    if (!stack[0]) {
      continue
    }
    result += stack[0];
  }
  console.log('result', result)

  return result
}
