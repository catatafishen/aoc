const toSum = (a, b) => (a ?? 0) + b;
const isDigit = (char) => /^\d$/.test(char);
export default (input) => {

    const rows = input.split("\n");
    return rows
        .flatMap((row, rowIndex) => [...row.matchAll(/\*/g)].map(match => ({col: match.index, row: rowIndex})))
        .map(location => {
                let digits = [];
                for (let searchRow = Math.max(0, location.row - 1); searchRow <= location.row + 1 && searchRow < rows.length; searchRow++) {
                    for (let searchCol = Math.max(0, location.col - 1); searchCol <= location.col + 1 && searchCol < rows[searchRow].length - 1; searchCol++) {
                        if (isDigit(rows[searchRow].charAt(searchCol))) {
                            let secondHalfMatch = rows[searchRow].substring(searchCol).match(/^\d+/);
                            let secondHalf = secondHalfMatch[0];
                            let firstHalfMatch = rows[searchRow].substring(0, searchCol).match(/\d+$/);
                            digits.push(parseInt((firstHalfMatch ? firstHalfMatch[0] : "") + secondHalf, 10));
                            searchCol = searchCol + secondHalf.length - 1;
                        }
                    }
                }
                if (digits.length === 2) {
                    return digits[0] * digits[1];
                }
                return 0;
            }
        )
        .reduce(toSum);
}
