import { computeTotalScore } from '../index.js'

describe('computeTotalScore', function () {
  describe('When giving an easy 3 rounds file', function () {
    it('should compute the correct score', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const totalScore = computeTotalScore(inputPath)

      // --- THEN
      expect(totalScore).toEqual(15)
    })
  })

  describe('When giving the real input!', function () {
    it('should compute the correct score', function () {
      // --- GIVEN
      const inputPath = './__tests__/realInput.txt'

      // --- WHEN
      const totalScore = computeTotalScore(inputPath)

      // --- THEN
      expect(totalScore).toEqual(13268)
    })
  })
})
