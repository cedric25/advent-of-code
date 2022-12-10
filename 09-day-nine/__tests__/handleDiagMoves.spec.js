import { expect } from 'chai'
import { computeSomething, handleMoves } from '../index.js'

describe('handle diagonal moves', function () {
  describe('When moving once right and once up', function () {
    it('should NOT move tail', function () {
      // --- WHEN
      const { visited, head, tail } = handleMoves(['R 1', 'U 1'])

      // --- THEN
      expect(visited).to.eql([{ x: 0, y: 0 }])
      expect(head).to.eql({ x: 1, y: 1 })
      expect(tail).to.eql({ x: 0, y: 0 })
    })
  })

  describe('When moving right, up and right', function () {
    it('should move tail diagonal', function () {
      // --- WHEN
      const { visited, head, tail } = handleMoves(['R 1', 'U 1', 'R 1'])

      // --- THEN
      expect(visited).to.eql([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ])
      expect(head).to.eql({ x: 2, y: 1 })
      expect(tail).to.eql({ x: 1, y: 1 })
    })
  })

  describe('When head moves around the tail', function () {
    it('should NOT move tail', function () {
      // --- WHEN
      const { visited, head, tail } = handleMoves(['L 1', 'U 1', 'L 1', 'D 1', 'R 2', 'U 2', 'L 2'])

      // --- THEN
      expect(visited).to.eql([
        { x: 0, y: 0 },
        { x: -1, y: 1 },
      ])
      expect(head).to.eql({ x: -2, y: 2 })
      expect(tail).to.eql({ x: -1, y: 1 })
    })
  })
})
