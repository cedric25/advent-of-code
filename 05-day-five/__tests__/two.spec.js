import { computeSomething, hasSomeOverlap } from '../index.js';

describe('computeSomething', function () {
  describe('When giving an easy file', function () {
    it('should get the right result', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const totalScore = computeSomething(inputPath)

      // --- THEN
      expect(totalScore).toEqual(4)
    })
  })

  describe('When giving the real input!', function () {
    it('should get the right result', function () {
      // --- GIVEN
      const inputPath = './__tests__/realInput.txt'

      // --- WHEN
      const totalScore = computeSomething(inputPath)

      // --- THEN
      expect(totalScore).toEqual(602)
    })
  })
})

describe('hasSomeOverlap', function () {
  describe('When no overlap', function () {
    it('should answer no', function () {
      // --- WHEN
      const result = hasSomeOverlap('2-4,6-8')

      // --- THEN
      expect(result).toBe(0)
    })
  })

  describe('When one is contained in two', function () {
    it('should answer yes', function () {
      // --- WHEN
      const result = hasSomeOverlap('4-4,4-6')

      // --- THEN
      expect(result).toBe(1)
    })
  })

  describe('When two overlaps some of one', function () {
    it('should answer yes', function () {
      // --- WHEN
      const result = hasSomeOverlap('3-8,7-9')

      // --- THEN
      expect(result).toBe(1)
    })
  })
})
