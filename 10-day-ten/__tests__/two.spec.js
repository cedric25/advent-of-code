import { expect } from 'chai'
import { computeSomethingPartTwo } from '../index.js'

describe('computeSomething', function () {
  describe('When giving an easy file', function () {
    it('should get the right result', function () {
      // --- GIVEN
      const inputPath = './__tests__/inputOne.txt'

      // --- WHEN
      const crtScreen = computeSomethingPartTwo(inputPath)

      // --- THEN
      expect(crtScreen).to.equal(
        '##..##..##..##..##..##..##..##..##..##..\n' +
          '###...###...###...###...###...###...###.\n' +
          '####....####....####....####....####....\n' +
          '#####.....#####.....#####.....#####.....\n' +
          '######......######......######......####\n' +
          '#######.......#######.......#######.....'
      )
    })
  })

  describe('When giving the real input!', function () {
    it('should get the right result', function () {
      // --- GIVEN
      const inputPath = './__tests__/realInput.txt'

      // --- WHEN
      const totalScore = computeSomethingPartTwo(
        '####.#..#.###..###..####.####..##..#....\n' +
          '...#.#..#.#..#.#..#.#....#....#..#.#....\n' +
          '..#..#..#.#..#.#..#.###..###..#....#....\n' +
          '.##..#..#.###..###..#....#....#....#....\n' +
          '##...#..#.#....#.#..#....#....#..#.#....\n' +
          '####..##..#....#..#.#....####..##..####.'
      )
      // ZUPRFECL

      // --- THEN
      expect(totalScore).to.equal(-1)
    })
  })
})
