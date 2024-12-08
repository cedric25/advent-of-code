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

// --- Star 2

async function fixIncorrectLines(inputPath) {
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

  const invalidLines = []

  for (const lineToPrint of pagesToPrint.split('\n')) {
    let isLineInvalid = false
    const pages = lineToPrint.split(',')
    for (const [pageIndex, page] of pages.entries()) {
      if (pageIndex === 0) {
        // No need to check first page
        continue
      }

      const pageRules = pagesRules[page]
      if (!pageRules) {
        continue
      }
      for (const rule of pageRules) {
        const pageRuleIndex = pages.indexOf(rule)
        if (pageRuleIndex !== -1 && pageRuleIndex < pageIndex) {
          isLineInvalid = true
          break
        }
      }
      if (isLineInvalid) {
        break
      }
    }
    if (isLineInvalid) {
      invalidLines.push(pages)
    }
  }

  const fixedLines = []

  // let sum = 0
  for (const originalLine of invalidLines) {
    console.log('\noriginalLine', originalLine.join(', '))
    let isLineValid = false
    let lineWithChanges = [...originalLine]
    while (!isLineValid) {
      for (const [pageIndex, page] of lineWithChanges.entries()) {
        let hasDoneSomeFixes = false

        if (pageIndex === 0) {
          // No need to check first page
          continue
        }

        const pageBeforeList = pagesRules[page]
        if (!pageBeforeList) {
          continue
        }
        for (const rulePage of pageBeforeList) {
          const pageRuleLineIndex = lineWithChanges.indexOf(rulePage)
          if (pageRuleLineIndex !== -1 && pageRuleLineIndex < pageIndex) {
            console.log(`\n😬 Something's wrong: page ${page} needs to be before ${rulePage}`)
            let fixedRuleLine = [...lineWithChanges]
            // Remove problematic number
            fixedRuleLine.splice(pageIndex, 1)
            console.log('remove it', fixedRuleLine.join(', '))
            const again = [...fixedRuleLine]
            again.splice(pageRuleLineIndex, 0, page)
            console.log('fix it   ', again.join(', '))
            // Some sleep for tests
            // await new Promise(resolve => {
            //   setTimeout(() => {
            //     resolve()
            //   }, 1000)
            // })
            hasDoneSomeFixes = true
            lineWithChanges = [...again]
            isLineValid = seeIfLineIsValid(again, pagesRules)
            if (isLineValid) {
              fixedLines.push(again)
            }
            break
          }
        }
        if (hasDoneSomeFixes) {
          break
        }
      }
    }
  }

  let sum = 0
  for (const line of fixedLines) {
    sum += Number(line[(line.length - 1) / 2])
  }
  console.log('sum', sum)
}

function seeIfLineIsValid(line, pagesRules) {
  let isLineValid = true
  for (const [pageIndex, page] of line.entries()) {
    const pageRules = pagesRules[page]
    if (!pageRules) {
      continue
    }
    for (const rule of pageRules) {
      const pageRuleIndex = line.indexOf(rule)
      if (pageRuleIndex !== -1 && pageRuleIndex < pageIndex) {
        isLineValid = false
        break
      }
    }
    if (!isLineValid) {
      break
    }
  }
  return isLineValid
}

// sumMiddlePagesOfValidLines('./2024/05-day-five/inputs/inputOne.txt')
// sumMiddlePagesOfValidLines('./2024/05-day-five/inputs/realInputOne.txt')

// fixIncorrectLines('./2024/05-day-five/inputs/inputOne.txt')
// await fixIncorrectLines('./2024/05-day-five/inputs/inputStar2Test01.txt')
fixIncorrectLines('./2024/05-day-five/inputs/realInputOne.txt')
