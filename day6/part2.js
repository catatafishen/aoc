import {calculateSpeedUsed, getNextInt, getPreviousInt} from "./common.js";

export default (input) => {
    let [timeRow, distanceRow] = input.split("\n");
    let time = parseInt(timeRow.match(/\d+/g).join(""), 10);
    let distance = parseInt(distanceRow.match(/\d+/g).join(""), 10);
    const solutions = calculateSpeedUsed(time, distance);
    let solution1 = getPreviousInt(solutions[0]);
    let solution2 = getNextInt(solutions[1]);
    return solution1 - solution2 + 1;
}
