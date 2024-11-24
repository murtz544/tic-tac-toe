export default function Gameover({winner, onRematch}) {
    return (
        <div id='game-over'>
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>Its a Draw!</p>}
            <p>
                <button onClick={onRematch}>Rematch!</button>
            </p>
        </div>
    )
}