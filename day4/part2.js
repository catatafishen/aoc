const toSum = (a, b) => (a ?? 0) + b;

export default (input) => {
    const rows = input.split("\n");
    return rows
        .map(row => row.split(/:\s+/)[1])
        .map(game => game.split(/\s+\|\s+/))
        .reduce((multipliers, [winningNumbersString, myNumbersString], game) => {
            const myNumbers = myNumbersString.split(/\s+/);
            const winningNumbers = winningNumbersString.split(/\s+/);
            let winningNumberAmount = myNumbers.filter(myNumber => winningNumbers.includes(myNumber)).length;
            for (let i = 1; i <= winningNumberAmount; i++) {
                multipliers[game + i] += multipliers[game];
            }
            return multipliers;
        }, Array(rows.length).fill(1, 0, rows.length))
        .reduce(toSum);
}
