import React, { useEffect } from 'react';
import Square from '../components/Square';
import { Player } from '../components/Square';

const Board = () => {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  // [nul,null,....,null]
  const [currentPlayer, setCurrentPlayer] = React.useState<'X' | 'O'>(
    Math.random() > 0.5 ? 'X' : 'O'
  );
  const [winner, setWinner] = React.useState<Player | 'draw'>(null);

  const setSquareValue = (index: number) => {
    const newSquares = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetHandler = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer(Math.random() > 0.5 ? 'X' : 'O');
    setWinner(null);
  };

  const checkWinner = (squares: Player[]) => {
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
  };

  useEffect(() => {
    const w = checkWinner(squares);
    if (w) setWinner(w);
    if (!w && !squares.filter((square) => !square).length) {
      setWinner('draw');
    }
  }, [squares]);

  return (
    <div>
      {winner === null && <p>Hey {currentPlayer} its your turn</p>}
      {winner && winner !== 'draw' && <p>Congratulations {winner}</p>}
      {winner === 'draw' && <p>Its a draw</p>}

      <div className="grid grid-cols-3 gap-3 bg-red ">
        {Array(9)
          .fill(null)
          .map((_, index) => {
            return (
              <Square
                key={index}
                onClick={() => setSquareValue(index)}
                value={squares[index]}
                winner={winner}
              />
            );
          })}
      </div>
      <button
        className="mt-4 text-lg border-none rounded-sm cursor-pointer"
        onClick={resetHandler}
      >
        Reset
      </button>
    </div>
  );
};

export default Board;
