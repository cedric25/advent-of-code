import { findTopThreeElves } from '../index.js'

describe('findTopThreeElves', function () {
  describe('When giving an easy two elves file', function () {
    it('should find the good max', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const biggestThreeElves = findTopThreeElves(inputPath)

      // --- THEN
      expect(biggestThreeElves).toEqual({
        topThree: [2000, 1000],
        totalForThem: 3000,
      })
    })
  })

  describe('When some elf have more than one portion', function () {
    it('should find the good max', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputTwo.txt'

      // --- WHEN
      const biggestThreeElves = findTopThreeElves(inputPath)

      // --- THEN
      expect(biggestThreeElves).toEqual({
        topThree: [5000, 3000, 1110],
        totalForThem: 9110,
      })
    })
  })

  describe('When using the real input!', function () {
    it('should find the good max', function () {
      // --- GIVEN
      const inputPath = './__tests__/realInput.txt'

      // --- WHEN
      const biggestThreeElves = findTopThreeElves(inputPath)

      // --- THEN
      expect(biggestThreeElves).toEqual({
        topThree: [70698, 69773, 66172],
        totalForThem: 206643,
      })
    })
  })
})
