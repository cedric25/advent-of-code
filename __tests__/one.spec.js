import { findBiggestElf } from '../index.js';

describe('findBiggestElf', function () {

  describe('When giving an easy two elves file', function () {
    it('should find the good max', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const biggestElf = findBiggestElf(inputPath)

      // --- THEN
      expect(biggestElf).toEqual({
        totalRation: 2000
      })
    })
  })

  describe('When some elf have more than one portion', function () {
    it('should find the good max', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputTwo.txt'

      // --- WHEN
      const biggestElf = findBiggestElf(inputPath)

      // --- THEN
      expect(biggestElf).toEqual({
        totalRation: 5000
      })
    })
  })

  describe('When using the real input!', function () {
    it('should find the good max', function () {
      // --- GIVEN
      const inputPath = './__tests__/realInput.txt'

      // --- WHEN
      const biggestElf = findBiggestElf(inputPath)

      // --- THEN
      expect(biggestElf).toEqual({
        totalRation: 70698
      })
    })
  })

})
