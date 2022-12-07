import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeTotalScore(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8')
  const rounds = content.split('\n')
  return rounds.reduce((accu, oneRound) => {
    if (!oneRound) return accu
    // Part one:
    // return accu + computeRoundScore(oneRound)
    // Part two:
    return accu + chooseWhatToPlayAndComputeScore(oneRound)
  }, 0)
}

const rockPaperScissorsScore = {
  X: 1,
  Y: 2,
  Z: 3,
}

const LOSE = 0
const DRAW = 3
const WIN = 6

const winOrLose = {
  'A X': DRAW,
  'A Y': WIN,
  'A Z': LOSE,
  'B X': LOSE,
  'B Y': DRAW,
  'B Z': WIN,
  'C X': WIN,
  'C Y': LOSE,
  'C Z': DRAW,
}

export function computeRoundScore(roundLine) {
  const roundScore = winOrLose[roundLine]
  const myPlay = roundLine.split(' ')[1]
  const pointForPlay = rockPaperScissorsScore[myPlay]
  return roundScore + pointForPlay
}

export function chooseWhatToPlayAndComputeScore(roundLine) {
  const [hisLetter, myLetter] = roundLine.split(' ')
  const needsToPlay = findWhatToPlay(hisLetter, myLetter)
  return computeRoundScore(`${hisLetter} ${needsToPlay}`)
}

const endScore = {
  X: LOSE,
  Y: DRAW,
  Z: WIN,
}

function findWhatToPlay(hisLetter, myLetter) {
  const whatToPlay = Object.entries(winOrLose).find(([roundLine, score]) => {
    return roundLine.split(' ')[0] === hisLetter && score === endScore[myLetter]
  })
  return whatToPlay[0].split(' ')[1]
}
