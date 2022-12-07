import path from 'node:path'
import fs from 'node:fs'
import * as url from 'node:url'

export function computeSomething(inputPath) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
  const content = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8')

  const lines = content.split('\n')

  const result = {
    key: '/',
    size: 0,
    parentPointer: null,
    children: [],
  }
  let currentDirPointer = result
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

  console.log('result', result)
  // Can't stringify an object with circular references
  // console.log('result', JSON.stringify(result, null, 2))

  const totalFilesSize = getTotalFilesSize(result)
  console.log('totalFilesSize', totalFilesSize)

  return totalFilesSize
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
