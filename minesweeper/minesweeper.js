document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('click', checkForWin)
document.addEventListener('contextmenu', checkForWin)

let board = { cells: [] };

function generateBoard(boardSize) {

  for (let w = 0; w < boardSize; w++) {
    for (let h = 0; h < boardSize; h++) {
      board.cells.push({
        row: w,
        col: h,
        isMine: generateMines(),
        hidden: true,
        isMarked: false
      })
    }
  }
}

function generateMines() {

  return Boolean(Math.floor(Math.random() * Math.floor(2)))
}

generateBoard(6);

function startGame() {
  let cells = board.cells
  for (var i = 0; i < cells.length; i++) {
    let numberOfMines = countSurroundingMines(cells[i])
    cells[i].surroundingMines = numberOfMines
  }
  lib.initBoard()
}

function checkForWin() {
  cells = board.cells
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].isMine == true) {
      if (cells[i].isMarked == true) {
        if (cells[i].hidden == false) {
          return
        }
      } else {
        return
      }
    }
  }
  lib.displayMessage('You win!')
}

function countSurroundingMines(cell) {
  let surrounding = lib.getSurroundingCells(
    cell.row,
    cell.col
  )
  let count = 0
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      count++
    }

  }
  return count
}

function reset() {
  document.location.reload();
}