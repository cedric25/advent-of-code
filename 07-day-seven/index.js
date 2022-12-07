import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8')

  const lines = content.split('\n')

  const tree = {
    key: '/',
    size: 0,
    parentPointer: null,
    children: [],
  }
  let currentDirPointer = tree
  for (const line of lines.slice(1)) {
    if (line === '$ cd ..') {
      currentDirPointer = currentDirPointer.parentPointer
      continue
    }
    if (line.startsWith('$ cd')) {
      const folderName = line.substring(5)
      const newFolder = {
        key: folderName,
        size: 0,
        parentPointer: currentDirPointer,
        children: [],
      }
      currentDirPointer.children.push(newFolder)
      currentDirPointer = newFolder
      continue
    }
    // File with its size
    if (/^\d/.test(line)) {
      const [size, fileName] = line.split(' ')
      currentDirPointer.children.push({ fileName, size: Number(size) })
      currentDirPointer.size += Number(size)
      alsoAddSizeToParent(currentDirPointer, Number(size))
    }
  }

  console.log('result', tree)
  // Can't stringify an object with circular references
  // console.log('tree', JSON.stringify(tree, null, 2))

  // --- Part One
  // const totalFilesSize = getTotalFilesSize(tree)
  // console.log('totalFilesSize', totalFilesSize)
  // return totalFilesSize

  // --- Part Two
  const totalSpaceAvailable = 70_000_000
  const spaceNeededForUpdate = 30_000_000
  const usedSpace = tree.size
  const freeSpace = totalSpaceAvailable - usedSpace // 29_427_043
  const freeSpaceStillNeeded = spaceNeededForUpdate - freeSpace // 572_957

  const candidates = findSizeOfDirectoryToDelete([], tree, freeSpaceStillNeeded)
  console.log(
    'candidates',
    candidates.sort((a, b) => a - b)
  )
  return candidates.sort((a, b) => a - b)[0]
}

function alsoAddSizeToParent(dirPointer, size) {
  if (dirPointer.parentPointer) {
    dirPointer.parentPointer.size += size
    alsoAddSizeToParent(dirPointer.parentPointer, size)
  }
}

function getTotalFilesSize(tree) {
  let sum = 0
  for (const node of tree.children) {
    if (node.key) {
      if (node.size <= 100_000) {
        sum += node.size
      }
    }
    if (node.children) {
      sum += getTotalFilesSize(node)
    }
  }
  return sum
}

function findSizeOfDirectoryToDelete(candidates, tree, freeSpaceStillNeeded) {
  for (const node of tree.children) {
    if (node.key) {
      if (node.size >= freeSpaceStillNeeded) {
        candidates.push(node.size)
      }
    }
    if (node.children) {
      findSizeOfDirectoryToDelete(candidates, node, freeSpaceStillNeeded)
    }
  }
  return candidates
}
