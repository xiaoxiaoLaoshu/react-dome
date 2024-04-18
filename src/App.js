import { useState } from "react";
function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [historySquares, setHistorySquares] = useState([]);
  const [winner, setWinner] = useState(null);
  const handleClick = (i) => {
    if (squares[i] || winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setHistorySquares([...historySquares, newSquares]);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newSquares));
  };
  function calculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  function Reset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setHistorySquares([]);
  }
  function handleGoto(index) {
    setSquares(historySquares[index]);
    setIsXNext(index % 2 === 0);
    setWinner(calculateWinner(historySquares[index]));
  }
  return (
    <div className="game">
      <div className="game-board">
        <div>
          {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`}
        </div>
        <p></p>
        {squares.map((square, i, arr) =>
          i % 3 === 0 ? (
            <div key={i} className="board-row">
              <Square
                key={i}
                value={square}
                handleClick={() => handleClick(i)}
              />
              <Square
                key={i + 1}
                value={arr[i + 1]}
                handleClick={() => handleClick(i + 1)}
              />
              <Square
                key={i + 2}
                value={arr[i + 2]}
                handleClick={() => handleClick(i + 2)}
              />
            </div>
          ) : null
        )}
        <p></p>
        <div>
          <button onClick={() => Reset()}>Reset</button>
        </div>
      </div>
      <GameInfo historySquares={historySquares} handleGoto={handleGoto} />
    </div>
  );
}

function GameInfo({ historySquares, handleGoto }) {
  return (
    <div className="game-info">
      <p>History</p>
      <ol>
        {historySquares.map((squares, index) => (
          <li key={index}>
            <button onClick={() => handleGoto(index)}>goto {index + 1}</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Game() {
  return <Board />;
}
