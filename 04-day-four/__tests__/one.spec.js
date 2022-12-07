import { computeSomething, getNumbersInRange, hasOverlap } from '../index.js'

describe('computeSomething', function () {
  describe('When giving an easy file', function () {
    it('should get the right result', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const totalScore = computeSomething(inputPath)

      // --- THEN
      expect(totalScore).toEqual(2)
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

describe('hasOverlap', function () {
  describe('When no overlap', function () {
    it('should answer no', function () {
      // --- WHEN
      const result = hasOverlap('2-4,6-8')

      // --- THEN
      expect(result).toBe(0)
    })
  })

  describe('When one is contained in two', function () {
    it('should answer yes', function () {
      // --- WHEN
      const result = hasOverlap('4-4,4-6')

      // --- THEN
      expect(result).toBe(1)
    })
  })

  describe('When two is contained in one', function () {
    it('should answer yes', function () {
      // --- WHEN
      const result = hasOverlap('3-8,4-6')

      // --- THEN
      expect(result).toBe(1)
    })
  })
})

describe('getNumbersInRange', function () {
  describe('When giving 2-4', function () {
    it('should give 2, 3, 4', function () {
      // --- WHEN
      const result = getNumbersInRange('2-4')

      // --- THEN
      expect([2, 3, 4])
    })
  })
})
