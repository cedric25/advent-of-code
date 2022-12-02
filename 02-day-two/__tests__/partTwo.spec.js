import { computeTotalScore } from '../index.js'

describe('chooseWhatToPlay and computeTotalScore', function () {
  describe('When giving an easy 3 rounds file', function () {
    it('should choose what to play and compute the total score', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const totalScore = computeTotalScore(inputPath)

      // --- THEN
      expect(totalScore).toEqual(12)
    })
  })

  describe('When giving the real input file!', function () {
    it('should choose what to play and compute the total score', function () {
      // --- GIVEN
      const inputPath = './__tests__/realInput.txt'

      // --- WHEN
      const totalScore = computeTotalScore(inputPath)

      // --- THEN
      expect(totalScore).toEqual(15508)
    })
  })
})
