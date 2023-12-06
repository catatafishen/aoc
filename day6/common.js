const toProduct = (a, b) => (a ?? 1) * b;

const calculateSpeedUsed = (time, distance) => {
    let solution1 = (time + Math.sqrt(Math.pow(-time, 2) - 4 * distance)) / 2;
    let solution2 = (time - Math.sqrt(Math.pow(-time, 2) - 4 * distance)) / 2;
    return [solution1, solution2];
};

const getNextInt = (number) => Number.isInteger(number) ? number + 1 : Math.ceil(number);
const getPreviousInt = (number) => Number.isInteger(number) ? number - 1 : Math.floor(number);
export {toProduct, calculateSpeedUsed, getNextInt, getPreviousInt};
