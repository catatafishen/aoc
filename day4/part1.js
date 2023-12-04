const toSum = (a, b) => (a ?? 0) + b;
export default (input) => input.split("\n")
    .map(row => row.split(/:\s+/)[1])
    .map(game => game.split(/\s+\|\s+/))
    .map(([winningNumbersString, myNumbersString]) => {
        const myNumbers = myNumbersString.split(/\s+/);
        const winningNumbers = winningNumbersString.split(/\s+/);
        let winningNumberAmount = myNumbers
            .filter(myNumber => winningNumbers.includes(myNumber))
            .length;
        return winningNumberAmount === 0 ? winningNumberAmount : Math.pow(2, winningNumberAmount - 1);
    })
    .reduce(toSum);
