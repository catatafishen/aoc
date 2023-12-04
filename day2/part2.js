const toSum = (a, b) => (a ?? 0) + b;
const toProduct = (a, b) => (a ?? 1) * b;
const getKnownAmountsInstance = () => {
    const values = {};
    return {
        getPower: () => Object.values(values).reduce(toProduct), setAmount: function (amount, color) {
            values[color] = Math.max(values[color] ?? 0, amount);
            return this;
        }
    };
};
const getPower = (row) => row.split(": ")[1].split("; ")
    .flatMap(set => set.split(", "))
    .map(colorAmount => colorAmount.split(" "))
    .reduce((knownAmounts, [amount, color]) => knownAmounts.setAmount(parseInt(amount, 10), color), getKnownAmountsInstance())
    .getPower();

export default input => input.split("\n").map(getPower).reduce(toSum);
