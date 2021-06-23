function mineGen (mines) {
  const mineField = []
  const width = 9
  const height = 9
  for (var i = 0; i < height; ++i) {
    mineField.push(Array(width).fill(0))
  }

  let squaresLeft = width * height
  for (var i = 0; i < mines; ++i) {
    const nextSquare = Math.floor(Math.random() * squaresLeft)
    let insertX = 0
    let insertY = 0;
    [insertY, insertX] = nthOpenSquare(mineField, nextSquare)
    mineField[insertY][insertX] = -1

    // Incrementing the mine counts of surrounding squares
    for (var j = -1; j <= 1; ++j) {
      for (let k = -1; k <= 1; ++k) {
        const currY = insertY + j
        const currX = insertX + k
        if ((currY < 0 || currY >= height) || (currX < 0 || currX >= width)) {
          continue
        }
        if (mineField[currY][currX] != -1) {
          ++mineField[currY][currX]
        }
      }
    }

    --squaresLeft
    if (squaresLeft == 0) {
      break
    }
  }

  let boardStr = ''
  for (var i = 0; i < height; ++i) {
    for (var j = 0; j < width; ++j) {
      boardStr += codeToEmoji(mineField[i][j])
    }
    boardStr += '\n'
  }

  return boardStr
}

function nthOpenSquare (mineField, n) {
  let openSquaresSeen = 0
  const height = mineField.length
  const width = mineField[0].length

  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      if (mineField[i][j] != -1) {
        if (openSquaresSeen == n) {
          return [i, j]
        }
        ++openSquaresSeen
      }
    }
  }
}

function codeToEmoji (n) {
  switch (n) {
    case 0:
      return ' ||:zero:|| '
      break
    case 1:
      return ' ||:one:|| '
      break
    case 2:
      return ' ||:two:|| '
      break
    case 3:
      return ' ||:three:|| '
      break
    case 4:
      return ' ||:four:|| '
      break
    case 5:
      return ' ||:five:|| '
      break
    case 6:
      return ' ||:six:|| '
      break
    case 7:
      return ' ||:seven:|| '
      break
    case 8:
      return ' ||:eight:|| '
      break
    case -1:
      return ' ||:boom:|| '
      break
  }
}
module.exports = mineGen
