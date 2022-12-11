import { readFileTrimEnd } from '../../helpers/helpers.js'

/**
 * node ./2015/01-day-one/index.js
 */

function computeSomething() {
  const content = readFileTrimEnd('./2015/01-day-one/inputOne.txt')

  const up = content.replaceAll(')', '').length
  const down = content.replaceAll('(', '').length

  // 280
  console.log('Answer is', up - down)
}

computeSomething()
