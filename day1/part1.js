const findFirstDigit = (string) => {
    return string.match(/[0-9]/);
};

function reverse(s) {
    return s.split("").reverse().join("");
}

export default (input) => {
    return input.split("\n")
        .map(row => findFirstDigit(row) + findFirstDigit(reverse(row)))
        .map(digits => parseInt(digits, 10))
        .reduce((a, b) => a + b, 0);
};
