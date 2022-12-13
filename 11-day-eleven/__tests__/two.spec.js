import { expect } from 'chai'
import { computeSomething } from '../index.js'

describe('computeSomething', function () {
  describe('When giving an easy file', function () {
    it('should get the right result', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const crtScreen = computeSomething(inputPath)

      // --- THEN
      expect(crtScreen).to.equal(2713310158)
    })
  })

  describe('When giving the real input!', function () {
    it('should get the right result', function () {
      // --- GIVEN
      const inputPath = './__tests__/realInput.txt'

      // --- WHEN
      const totalScore = computeSomething(inputPath)

      // --- THEN
      expect(totalScore).to.equal(30616425600)
    })
  })
})
