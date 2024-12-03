/* eslint-disable react/prop-types */
import { useState } from "react";
// import { createLogger } from "vite";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function validateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || validateWinner(squares)) {
      return alert("Kotak sudah terisi!");
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const winner = validateWinner(squares);

  let status = winner ? `Winner ${winner}` : `Turn : ${xIsNext ? "X" : "O"}`;
  console.log(status);

  return (
    <div className="container">
      <h1>Tic-Tac-Toe Game</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = `Go to move (${move})`;
    } else {
      description = "Go to game start";
    }

    return (
      <li
        key={move}
        className="game-decision"
        onClick={() => {
          jumpTo(move);
        }}
      >
        <button className="game-decision-button">{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h2>Time Travel Feature</h2>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
