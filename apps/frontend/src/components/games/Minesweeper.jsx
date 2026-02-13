import React, { useState, useEffect } from 'react';

const Minesweeper = ({ rows = 10, cols = 10, mines = 10 }) => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [revealedCells, setRevealedCells] = useState(new Set());
  const [flaggedCells, setFlaggedCells] = useState(new Set());

  // Initialize the game board
  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    // Create an empty board
    const newBoard = Array(rows).fill().map(() => 
      Array(cols).fill({ isMine: false, adjacentMines: 0, isRevealed: false })
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      
      if (!newBoard[row][col].isMine) {
        newBoard[row][col] = { ...newBoard[row][col], isMine: true };
        minesPlaced++;
      }
    }

    // Calculate adjacent mines for each cell
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!newBoard[r][c].isMine) {
          newBoard[r][c] = {
            ...newBoard[r][c],
            adjacentMines: countAdjacentMines(newBoard, r, c)
          };
        }
      }
    }

    setBoard(newBoard);
    setRevealedCells(new Set());
    setFlaggedCells(new Set());
    setGameStatus('playing');
  };

  const countAdjacentMines = (board, row, col) => {
    let count = 0;
    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
        if (board[r][c].isMine) count++;
      }
    }
    return count;
  };

  const revealCell = (row, col) => {
    if (gameStatus !== 'playing' || 
        revealedCells.has(`${row},${col}`) || 
        flaggedCells.has(`${row},${col}`)) return;

    const newBoard = [...board];
    const cellsToReveal = [[row, col]];
    const newRevealedCells = new Set(revealedCells);

    while (cellsToReveal.length > 0) {
      const [currentRow, currentCol] = cellsToReveal.pop();
      const cellKey = `${currentRow},${currentCol}`;

      // Skip if already revealed or flagged
      if (newRevealedCells.has(cellKey) || 
          flaggedCells.has(cellKey)) continue;

      // Add to revealed cells
      newRevealedCells.add(cellKey);

      // If it's a mine, game over
      if (newBoard[currentRow][currentCol].isMine) {
        setGameStatus('lost');
        // Reveal all cells
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            newRevealedCells.add(`${r},${c}`);
          }
        }
        setRevealedCells(newRevealedCells);
        return;
      }

      // Mark cell as revealed
      newBoard[currentRow][currentCol] = {
        ...newBoard[currentRow][currentCol],
        isRevealed: true
      };

      // If cell has no adjacent mines, add neighboring cells to reveal
      if (newBoard[currentRow][currentCol].adjacentMines === 0) {
        for (let r = Math.max(0, currentRow - 1); r <= Math.min(rows - 1, currentRow + 1); r++) {
          for (let c = Math.max(0, currentCol - 1); c <= Math.min(cols - 1, currentCol + 1); c++) {
            if (!newRevealedCells.has(`${r},${c}`)) {
              cellsToReveal.push([r, c]);
            }
          }
        }
      }
    }

    setBoard(newBoard);
    setRevealedCells(newRevealedCells);

    // Check if all non-mine cells are revealed
    const nonMineCells = rows * cols - mines;
    if (newRevealedCells.size === nonMineCells) {
      setGameStatus('won');
    }
  };

  const toggleFlag = (row, col, e) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || revealedCells.has(`${row},${col}`)) return;

    const newFlaggedCells = new Set(flaggedCells);
    if (newFlaggedCells.has(`${row},${col}`)) {
      newFlaggedCells.delete(`${row},${col}`);
    } else {
      newFlaggedCells.add(`${row},${col}`);
    }
    setFlaggedCells(newFlaggedCells);
  };

  const renderCell = (row, col) => {
    const cell = board[row][col];
    const cellKey = `${row},${col}`;
    const isRevealed = revealedCells.has(cellKey);
    const isFlagged = flaggedCells.has(cellKey);

    let cellContent = '';
    let cellClass = 'cell';

    if (gameStatus === 'lost' && cell.isMine) {
      cellContent = '💥';
      cellClass += ' mine';
    } else if (isRevealed) {
      cellClass += ' revealed';
      if (cell.isMine) {
        cellContent = '💥';
      } else if (cell.adjacentMines > 0) {
        cellContent = cell.adjacentMines;
      }
    } else if (isFlagged) {
      cellContent = '🚩';
      cellClass += ' flagged';
    }

    return (
      <div 
        key={cellKey}
        className={cellClass}
        onClick={() => revealCell(row, col)}
        onContextMenu={(e) => toggleFlag(row, col, e)}
      >
        {cellContent}
      </div>
    );
  };

  return (
    <div className="minesweeper">
      <div className="game-status">
        {gameStatus === 'won' && 'Tava fácil, né? Parabéns!'}
        {gameStatus === 'lost' && 'Game over noob!'}
      </div>
      <div 
        className="board" 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 40px)`,
          gap: '2px'
        }}
      >
        {board.map((row, rowIndex) => 
          row.map((_, colIndex) => renderCell(rowIndex, colIndex))
        )}
      </div>
      <button onClick={initializeBoard} className="reset-button">
        New Game
      </button>
      <style jsx>{`
        .minesweeper {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        .board {
          background-color: #ddd;
          padding: 10px;
          border-radius: 5px;
        }
        .cell {
          width: 40px;
          height: 40px;
          border: 1px solid #999;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          background-color: #bbb;
          user-select: none;
        }
        .cell.revealed {
          background-color: #eee;
          color: blue;
          font-weight: bold;
        }
        .cell.mine {
          background-color: red;
        }
        .cell.flagged {
          background-color: yellow;
        }
        .game-status {
          margin: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
        .reset-button {
          margin-top: 10px;
          padding: 5px 10px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default Minesweeper;