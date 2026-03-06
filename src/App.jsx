import { useState } from 'react';
import Home from './pages/Home';
import { generateDeck } from './constants/gameConfig';
import './App.css';

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [gameState, setGameState] = useState({
        deck: [],
        discard: [],
        players: [
        { id: '', hand: [], isBot: false }, // Le nom sera mis ici
        { id: 'Bot 1', hand: [], isBot: true },
        { id: 'Bot 2', hand: [], isBot: true }
        ],
        turn: 0 
    });

    const startGame = (playerName) => {
        const newDeck = generateDeck();
        
        const updatedPlayers = gameState.players.map((p, index) => {
        const hand = newDeck.splice(0, 7);
        if (index === 0) return { ...p, id: playerName, hand }; // On injecte le nom
        return { ...p, hand };
        });

        const firstCard = newDeck.splice(0, 1);
        
        setGameState({
        ...gameState,
        deck: newDeck,
        discard: firstCard,
        players: updatedPlayers,
        turn: 0
        });
        setGameStarted(true);
    };

    if (!gameStarted) return <Home onStart={startGame} />;

    const currentPlayer = gameState.players[gameState.turn];
    const bots = gameState.players.filter(p => p.isBot);
    const human = gameState.players.find(p => !p.isBot);

    return (
        <div className="game-board">
            <div className="top-section">
                <h2>Tour de : <span style={{color: '#f1c40f'}}>{currentPlayer.id}</span></h2>
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
                <div className={`card ${gameState.discard[gameState.discard.length - 1]?.color}`}>
                    {gameState.discard[gameState.discard.length - 1]?.number}
                </div>
                </div>

                <div className="pile-container">
                <small>{gameState.deck.length} cartes</small>
                <div className="deck-card">UNO</div>
                </div>
            </div>

            {/* Section Basse */}
            <div className="player-area">
                {/* 1. Les cartes en premier */}
                <div className="cards-row player-hand">
                    {human.hand.map(card => (
                    <div 
                        key={card.id} 
                        className={`card ${card.color}`}
                        onMouseEnter={() => setHoveredCard(card)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => console.log("Carte cliquée :", card.id)} // Pour la suite
                    >
                        {card.number}
                    </div>
                    ))}
                </div>

                {/* 2. L'info de la carte en dessous */}
                <div className="card-effect-preview">
                    {hoveredCard ? `${hoveredCard.number} ${hoveredCard.color.toUpperCase()}` : " "}
                </div>

                {/* 3. Le nom du joueur */}
                <h3>{human.id}</h3>
            </div>
        </div>
    );
}

export default App;