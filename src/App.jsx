import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Gameover from "./components/Gameover";

const initGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedPlayer(prevTurns) {
  let currentPlayer = 'X';
  if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = derivedPlayer(gameTurns);

  let gameboard = [...initGameboard.map((array) => [...array])];

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameboard[row][col] = player;
  }

  let winner;
  for(const comb of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[comb[0].row][comb[0].column];
    const secondSquareSymbol = gameboard[comb[1].row][comb[1].column];
    const thirdSquareSymbol = gameboard[comb[2].row][comb[2].column];

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
        
      }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currentPlayer = derivedPlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex}, player: currentPlayer },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }
  
  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} changeName={handlePlayerName} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} changeName={handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} onRematch={handleRematch} />}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameboard}/>
      </div>
      <Log turns={gameTurns} />      
    </main>
  )
}

export default App
