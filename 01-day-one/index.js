import fs from 'node:fs'

export function findBiggestElf(inputPath) {
  const content = fs.readFileSync(inputPath, 'utf-8')
  const elves = content.split('\n\n')
  const max = elves.reduce((accu, current) => {
    const allForCurrentElf = current.split('\n').map(Number)
    const allForElf = allForCurrentElf.reduce((accu, current) => {
      if (!current) {
        return accu
      }
      return accu + current
    }, 0)
    if (allForElf > accu) {
      accu = allForElf
    }
    return accu
  }, 0)
  return {
    totalRation: max,
  }
}

export function findTopThreeElves(inputPath) {
  const content = fs.readFileSync(inputPath, 'utf-8')
  const result = computeAndSortRations(content)
  return {
    topThree: result,
    totalForThem: result.reduce((accu, current) => accu + current, 0),
  }
}

export function computeAndSortRations(content) {
  const elves = content.split('\n\n')
  const totalByElf = elves.map(elfRations =>
    elfRations
      .split('\n')
      .map(Number)
      .reduce((accu, current) => {
        if (!current) {
          return accu
        }
        return accu + current
      }, 0)
  )
  return totalByElf
    .sort(function (a, b) {
      return a - b
    })
    .reverse()
    .slice(0, 3)
}
