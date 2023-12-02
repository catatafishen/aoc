const availableCubes = {
    "red": 12, "green": 13, "blue": 14,
};

const parseGame = (row) => {
    const [gamePart, setsPart] = row.split(": ");
    const gameId = parseInt(gamePart.substring("game ".length), 10);
    const sets = setsPart.split("; ");
    return {gameId, sets};
};
const setIsPossible = (set) => set.split(", ").every(amountOfCubes => {
    const [amount, color] = amountOfCubes.split(" ");
    return amount <= availableCubes[color];
});
export default (input) => {
    const rows = input.split("\n");
    return rows
        .map(parseGame)
        .filter(parsedGame => parsedGame.sets.every(setIsPossible))
        .reduce((idSum, parsedGame) => idSum + parsedGame.gameId, 0);
};
