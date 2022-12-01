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
      return accu + current;
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
