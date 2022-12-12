import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'
import { compareNumbersDesc } from '../helpers/helpers.js'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8').trimEnd()

  const lines = content.split('\n')

  const monkeys = getInitialState(lines)
  // console.log('initialState', monkeys)

  for (let i = 0; i < 20; i++) {
    for (const monkey of Object.values(monkeys)) {
      for (const item of monkey.items) {
        let newWorryLevel
        if (monkey.op === '+') {
          if (monkey.value === 'old') {
            newWorryLevel = item + item
          } else {
            newWorryLevel = item + monkey.value
          }
        } else {
          if (monkey.value === 'old') {
            newWorryLevel = item * item
          } else {
            newWorryLevel = item * monkey.value
          }
        }
        const lessWorried = Math.floor(newWorryLevel / 3)
        if (lessWorried % monkey.divisibleBy === 0) {
          monkeys[monkey.monkeyIndexIfTrue].items.push(lessWorried)
        } else {
          monkeys[monkey.monkeyIndexIfFalse].items.push(lessWorried)
        }
        monkeys[monkey.monkeyIndex].hasInspected++
      }
      monkey.items = []
    }
  }

  // console.log('monkeys', monkeys)

  const allInspected = Object.values(monkeys)
    .map(({ hasInspected }) => hasInspected)
    .sort(compareNumbersDesc)
  console.log('allInspected', allInspected)

  return allInspected[0] * allInspected[1]
}

function getInitialState(lines) {
  const monkeys = {}
  for (const [index, line] of lines.entries()) {
    if (line.startsWith('  Starting items')) {
      const monkeyIndex = lines[index - 1].split(' ')[1].replace(':', '')
      const items = getItemsFromLine(line)
      const opLine = lines[index + 1]
      const op = opLine.split('+').length === 2 ? '+' : '*'
      const valueStr = op === '+' ? opLine.split('+')[1] : opLine.split('*')[1]
      const value = !isNaN(Number(valueStr)) ? Number(valueStr) : valueStr.trim()
      const divisibleBy = Number(lines[index + 2].split('by')[1])
      const monkeyIndexIfTrue = Number(lines[index + 3].split('monkey')[1])
      const monkeyIndexIfFalse = Number(lines[index + 4].split('monkey')[1])
      monkeys[monkeyIndex] = {
        monkeyIndex,
        items,
        hasInspected: 0,
        op,
        value,
        divisibleBy,
        monkeyIndexIfTrue,
        monkeyIndexIfFalse,
      }
    }
  }
  return monkeys
}

function getItemsFromLine(line) {
  return line.split(':')[1].split(',').map(Number)
}
