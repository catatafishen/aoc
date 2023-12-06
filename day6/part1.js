import {calculateSpeedUsed, getNextInt, getPreviousInt, toProduct} from "./common.js";

export default (input) => {
    let [timeRow, distanceRow] = input.split("\n");
    let times = timeRow.match(/\d+/g).map(s => parseInt(s, 10));
    let distances = distanceRow.match(/\d+/g).map(s => parseInt(s, 10));

    return times.map((time, index) => {
        const distance = distances[index];
        const solutions = calculateSpeedUsed(time, distance);
        let solution1 = getPreviousInt(solutions[0]);
        let solution2 = getNextInt(solutions[1]);
        return solution1 - solution2 + 1;
    }).reduce(toProduct);
}
