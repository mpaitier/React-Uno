import { useState } from 'react';
import Home from './pages/Home';
import { useGame } from './hooks/useGame';
import './App.css';

function App() {
  const { gameStarted, gameState, startGame, playCard } = useGame();
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!gameStarted) return <Home onStart={startGame} />;

  const bots = gameState.players.filter(p => p.isBot);
  const human = gameState.players[0];
  const currentCard = gameState.discard[gameState.discard.length - 1];

  return (
    <div className="game-board">
      <div className="top-section">
        <h2>Tour de : <span style={{color: '#f1c40f'}}>{gameState.players[gameState.turn].id}</span></h2>
        <div className="bots-area">
          {bots.map(bot => (
            <div key={bot.id} className="bot-info">
              <span className="card-count">{bot.hand.length}</span>
              <small>{bot.id}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="center-area">
        <div className="pile-container">
          <small>Défausse</small>
          <div className={`card ${currentCard?.color}`}>{currentCard?.number}</div>
        </div>
        <div className="pile-container">
          <small>{gameState.deck.length} cartes</small>
          <div className="deck-card">UNO</div>
        </div>
      </div>

      <div className="player-area">
        <div className="cards-row player-hand">
          {human.hand.map(card => (
            <div 
              key={card.id} 
              className={`card ${card.color}`}
              onMouseEnter={() => setHoveredCard(card)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => playCard(card.id)}
            >
              {card.number}
            </div>
          ))}
        </div>
        <div className="card-effect-preview">
          {hoveredCard ? `${hoveredCard.number} ${hoveredCard.color.toUpperCase()}` : " "}
        </div>
        <h3>{human.id}</h3>
      </div>
    </div>
  );
}

export default App;