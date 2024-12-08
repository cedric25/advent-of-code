import { readFileTrimEnd } from '../../helpers/helpers.js'

/**
 * node ./05-day-five/index.js
 */

function sumMiddlePagesOfValidLines(inputPath) {
  const content = readFileTrimEnd(inputPath)
  const [rules, pagesToPrint] = content.split('\n\n')

  const pagesRules = rules.split('\n').reduce((accu, current) => {
    const rule = current.split('|')
    if (!accu[rule[0]]) {
      accu[rule[0]] = []
    }
    accu[rule[0]].push(rule[1])
    return accu
  }, {})

  const validLines = []

  for (const lineToPrint of pagesToPrint.split('\n')) {
    let isLineValid = true
    const pages = lineToPrint.split(',')
    for (const [pageIndex, page] of pages.entries()) {
      const pageRules = pagesRules[page]
      if (!pageRules) {
        continue
      }
      for (const rule of pageRules) {
        const pageRuleIndex = pages.indexOf(rule)
        if (pageRuleIndex !== -1 && pageRuleIndex < pageIndex) {
          isLineValid = false
          break
        }
      }
      if (!isLineValid) {
        break
      }
    }
    if (isLineValid) {
      validLines.push(pages)
    }
  }

  let sum = 0
  for (const line of validLines) {
    sum += Number(line[(line.length - 1) / 2])
  }
  console.log('sum', sum)
}

// sumMiddlePagesOfValidLines('./2024/05-day-five/inputs/inputOne.txt')
sumMiddlePagesOfValidLines('./2024/05-day-five/inputs/realInputOne.txt')

// sumMiddlePagesOfValidLines('./2024/05-day-five/inputs/inputOne.txt')
// sumMiddlePagesOfValidLines('./2024/05-day-five/inputs/realInputOne.txt')
