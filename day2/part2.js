const getPower = (row) => row.split(": ")[1].split("; ")
    .flatMap(set => set.split(", "))
    .map(colorAmount => colorAmount.split(" "))
    .map(([amount, color]) => [parseInt(amount, 10), color])
    .reduce((knownAmounts, [amount, color], index, array) => {
        if (amount > knownAmounts[color]) {
            knownAmounts[color] = amount;
        }
        if (index < array.length - 1) {
            return knownAmounts;
        }
        return knownAmounts["red"] * knownAmounts["green"] * knownAmounts["blue"];
    }, {"red": 0, "green": 0, "blue": 0});

export default input => input.split("\n").map(getPower).reduce((a, b) => a + b, 0);
