import { computeRoundScore } from '../index.js'

describe('computeRoundScore', function () {
  describe('When both players play the same', function () {
    describe('and I played Rock', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('A X')

        // --- THEN
        expect(roundScore).toBe(3 + 1)
      })
    })
    describe('and I played Paper', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('B Y')

        // --- THEN
        expect(roundScore).toBe(3 + 2)
      })
    })
    describe('and I played Scissors', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('C Z')

        // --- THEN
        expect(roundScore).toBe(3 + 3)
      })
    })
  })

  describe('When I lose', function () {
    describe('and I played Rock', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('B X')

        // --- THEN
        expect(roundScore).toBe(1)
      })
    })
    describe('and I played Paper', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('C Y')

        // --- THEN
        expect(roundScore).toBe(2)
      })
    })
    describe('and I played Scissors', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('A Z')

        // --- THEN
        expect(roundScore).toBe(3)
      })
    })
  })

  describe('When I win', function () {
    describe('and I played Rock', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('C X')

        // --- THEN
        expect(roundScore).toBe(6 + 1)
      })
    })
    describe('and I played Paper', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('A Y')

        // --- THEN
        expect(roundScore).toBe(6 + 2)
      })
    })
    describe('and I played Scissors', function () {
      it('should return 1', function () {
        // --- WHEN
        const roundScore = computeRoundScore('B Z')

        // --- THEN
        expect(roundScore).toBe(6 + 3)
      })
    })
  })
})
