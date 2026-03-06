// src/hooks/useGame.js
import { useState } from 'react';
import { generateDeck } from '../constants/gameConfig';

export const useGame = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameResult, setGameResult] = useState(null); // { winner: string, isVictory: boolean }
    
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
        setGameResult(null); // Reset du résultat
        setGameStarted(true);
    };

    const playCard = (cardId) => {
        if (gameResult) return; // Empêche de jouer si c'est fini

        setGameState(prevState => {
        const currentPlayerIndex = prevState.turn;
        const player = prevState.players[currentPlayerIndex];
        const cardToPlay = player.hand.find(c => c.id === cardId);
        
        if (!cardToPlay) return prevState;

        const newHand = player.hand.filter(c => c.id !== cardId);
        const newPlayers = [...prevState.players];
        newPlayers[currentPlayerIndex] = { ...player, hand: newHand };

        // VERIFICATION DE VICTOIRE
        if (newHand.length === 0) {
            setGameResult({
            winner: player.id,
            isVictory: !player.isBot // True si c'est le joueur humain
            });
        }

        return {
            ...prevState,
            players: newPlayers,
            discard: [...prevState.discard, cardToPlay]
        };
        });
    };

    const goToMenu = () => {
        setGameStarted(false);
        setGameResult(null);
    };

    return { gameStarted, gameState, gameResult, startGame, playCard, goToMenu };
};