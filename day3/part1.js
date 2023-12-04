const includesSymbol = (string) => !(/^[0-9.]+$/.test(string));
const toSum = (a, b) => (a ?? 0) + b;
export default (input) => {

    const rows = input.split("\n");
    return rows
        .flatMap((row, rowIndex) => [...row.matchAll(/\d+/g)].map(match => ({
            col: match.index, row: rowIndex, number: match[0]
        })))
        .filter(numberLocation => {
            let row1 = rows[Math.max(0, numberLocation.row - 1)];
            let row2 = rows[numberLocation.row];
            let row3 = rows[Math.min(rows.length - 1, numberLocation.row + 1)];
            return includesSymbol(row1.substring(Math.max(0, numberLocation.col - 1), Math.min(numberLocation.col + numberLocation.number.length + 1, row1.length)))
                || includesSymbol(row2.substring(Math.max(0, numberLocation.col - 1), Math.min(numberLocation.col + numberLocation.number.length + 1, row2.length)))
                || includesSymbol(row3.substring(Math.max(0, numberLocation.col - 1), Math.min(numberLocation.col + numberLocation.number.length + 1, row3.length)));
        })
        .map(numberLocation => parseInt(numberLocation.number, 10))
        .reduce(toSum);
}
