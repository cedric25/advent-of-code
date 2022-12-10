import { expect } from 'chai'
import { handleMoves } from '../index.js'

describe('handleMoves', function () {
  describe('When moving twice to the right', function () {
    it('should move tail once to the right', function () {
      // --- WHEN
      const { visited, head, tail } = handleMoves(['R 2'])

      // --- THEN
      expect(visited).to.eql([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ])
      expect(head).to.eql({ x: 2, y: 0 })
      expect(tail).to.eql({ x: 1, y: 0 })
    })
  })

  describe('When moving three times to the left', function () {
    it('should move tail twice to the left', function () {
      // --- WHEN
      const { visited, head, tail } = handleMoves(['L 3'])

      // --- THEN
      expect(visited).to.eql([
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: -2, y: 0 },
      ])
      expect(head).to.eql({ x: -3, y: 0 })
      expect(tail).to.eql({ x: -2, y: 0 })
    })
  })

  describe('When moving twice up', function () {
    it('should move tail once up', function () {
      // --- WHEN
      const { visited, head, tail } = handleMoves(['U 2'])

      // --- THEN
      expect(visited).to.eql([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ])
      expect(head).to.eql({ x: 0, y: 2 })
      expect(tail).to.eql({ x: 0, y: 1 })
    })
  })

  describe('When moving three times down', function () {
    it('should move tail twice down', function () {
      // --- WHEN
      const { visited, head, tail } = handleMoves(['D 3'])

      // --- THEN
      expect(visited).to.eql([
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 },
      ])
      expect(head).to.eql({ x: 0, y: -3 })
      expect(tail).to.eql({ x: 0, y: -2 })
    })
  })
})
