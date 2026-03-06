export const COLORS = ['rouge', 'bleu', 'vert', 'jaune'];
export const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const generateDeck = () => {
    const deck = [];
    COLORS.forEach(color => {
        NUMBERS.forEach(number => {
            // créer deux cartes de chaque sauf 0 en une fois
            deck.push({ id: `${color}-${number}-1`, color, number });
            if (number !== 0) {
                deck.push({ id: `${color}-${number}-2`, color, number });
            }
        });
    });
    return deck.sort(() => Math.random() - 0.5);
};