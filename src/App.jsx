import { useState } from 'react';
import Home from './pages/Home';
import { useGame } from './hooks/useGame';
import './App.css';

function App() {
    // On regroupe tout dans un seul objet "game"
    const game = useGame();
    const [hoveredCard, setHoveredCard] = useState(null);

    // Écran d'accueil
    if (!game.gameStarted) {
        return <Home onStart={game.startGame} />;
    }

    // Variables calculées pour simplifier le JSX
    const human = game.gameState.players[0];
    const bots = game.gameState.players.filter(p => p.isBot);
    const currentCard = game.gameState.discard[game.gameState.discard.length - 1];
    const turnName = game.gameState.players[game.gameState.turn].id;

    return (
        <div className="game-board">
        {/* 1. Modal de fin de partie */}
        {game.gameResult && (
            <div className="modal-overlay">
            <div className="modal-content">
                <h2>{game.gameResult.isVictory ? "🎉 Félicitations !" : "💀 Dommage..."}</h2>
                <p><strong>{game.gameResult.winner}</strong> a remporté la partie !</p>
                <div className="button-group">
                <button onClick={() => game.startGame(human.id)}>Rejouer</button>
                <button onClick={game.goToMenu}>Menu Principal</button>
                </div>
            </div>
            </div>
        )}

        {/* 2. Section Haute : Tour et Bots */}
        <div className="top-section">
            <h2>Tour de : <span style={{ color: '#f1c40f' }}>{turnName}</span></h2>
            <div className="bots-area">
            {bots.map(bot => (
                <div key={bot.id} className="bot-info">
                <span className="card-count">{bot.hand.length}</span>
                <small>{bot.id}</small>
                </div>
            ))}
            </div>
        </div>

        {/* 3. Section Centrale : Défausse et Pioche */}
        <div className="center-area">
            <div className="pile-container">
            <small>Défausse</small>
            <div className={`card ${currentCard?.color}`}>
                {currentCard?.number}
            </div>
            </div>

            <div className="pile-container">
            <small>{game.gameState.deck.length} cartes</small>
            <div className="deck-card">UNO</div>
            </div>
        </div>

        {/* 4. Section Basse : Joueur */}
        <div className="player-area">
            <div className="cards-row player-hand">
            {human.hand.map(card => (
                <div 
                key={card.id} 
                className={`card ${card.color}`}
                onMouseEnter={() => setHoveredCard(card)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => game.playCard(card.id)}
                >
                {card.number}
                </div>
            ))}
            </div>

            <div className="card-effect-preview">
            {hoveredCard ? `${hoveredCard.number} ${hoveredCard.color.toUpperCase()}` : " "}
            </div>

            <h3>{human.id} (Vous)</h3>
        </div>
        </div>
    );
}

export default App;