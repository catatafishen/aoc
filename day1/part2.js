let spelledDigits = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
};
const findFirstDigitOrSpelledDigit = (string) => {
    let foundIndex = Number.POSITIVE_INFINITY;
    let foundDigit;
    Object.entries(spelledDigits).forEach(([spelling, digit]) => {
        const index = string.indexOf(spelling);
        if (index !== -1 && index < foundIndex) {
            foundIndex = index;
            foundDigit = digit;
        }
    });
    return foundDigit;
};
const findLastDigitOrSpelledDigit = (string) => {
    let foundIndex = -1;
    let foundDigit;
    Object.entries(spelledDigits).forEach(([spelling, digit]) => {
        const index = string.lastIndexOf(spelling);
        if (index !== -1 && index > foundIndex) {
            foundIndex = index;
            foundDigit = digit;
        }
    });
    return foundDigit;
};

export default (input) => {
    return input.split("\n")
        .map(row => findFirstDigitOrSpelledDigit(row) + findLastDigitOrSpelledDigit(row))
        .map(digits => parseInt(digits, 10))
        .reduce((a, b) => a + b, 0);
};
