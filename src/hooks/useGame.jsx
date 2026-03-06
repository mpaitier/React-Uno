import { useState } from 'react';
import { generateDeck } from '../constants/gameConfig';

export const useGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState({
    deck: [],
    discard: [],
    players: [
      { id: '', hand: [], isBot: false },
      { id: 'Bot 1', hand: [], isBot: true },
      { id: 'Bot 2', hand: [], isBot: true }
    ],
    turn: 0 
  });

  const startGame = (playerName) => {
    const newDeck = generateDeck();
    const updatedPlayers = gameState.players.map((p, index) => {
      const hand = newDeck.splice(0, 7);
      return index === 0 ? { ...p, id: playerName, hand } : { ...p, hand };
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

  const playCard = (cardId) => {
    setGameState(prevState => {
      const currentPlayerIndex = prevState.turn;
      const player = prevState.players[currentPlayerIndex];
      
      const cardToPlay = player.hand.find(c => c.id === cardId);
      if (!cardToPlay) return prevState;

      const newHand = player.hand.filter(c => c.id !== cardId);
      const newPlayers = [...prevState.players];
      newPlayers[currentPlayerIndex] = { ...player, hand: newHand };

      return {
        ...prevState,
        players: newPlayers,
        discard: [...prevState.discard, cardToPlay]
      };
    });
  };

  return { gameStarted, gameState, startGame, playCard };
};