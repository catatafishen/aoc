const toMin = (a, b) => a < b ? a : b;
const mapRanges = (rules, ranges) => {
    let [mappedRanges, unmappedRanges] = rules.reduce(([mappedRanges, unmappedRanges], rule) => {
        const ruleInputStart = rule[1];
        const ruleLength = rule[2];
        const ruleOffset = rule[0] - rule[1];
        let newUnmappedRanges = [];
        unmappedRanges.forEach(range => {
            const rangeStart = range[0];
            const rangeLength = range[1];
            if (rangeStart >= ruleInputStart && rangeStart <= ruleInputStart + ruleLength &&
                rangeStart + rangeLength >= ruleInputStart && rangeStart + rangeLength <= ruleInputStart + ruleLength) { // Range within rule
                mappedRanges.push([rangeStart + ruleOffset, rangeLength]);
            } else if (rangeStart >= ruleInputStart && rangeStart <= ruleInputStart + ruleLength) { // Range starts within rule
                newUnmappedRanges.push([ruleInputStart + ruleLength, (rangeStart + rangeLength) - (ruleInputStart + ruleLength)]);
                mappedRanges.push([rangeStart + ruleOffset, ruleInputStart + ruleLength - rangeStart]);
            } else if (rangeStart + rangeLength >= ruleInputStart && rangeStart + rangeLength <= ruleInputStart + ruleLength) { // Range ends within rule
                newUnmappedRanges.push([rangeStart, ruleInputStart - rangeStart]);
                mappedRanges.push([ruleInputStart + ruleOffset, rangeLength - (ruleInputStart - rangeStart)]);
            } else if (rangeStart < ruleInputStart && rangeStart + rangeLength > ruleInputStart + ruleLength) { // Range overlaps rule
                newUnmappedRanges.push([rangeStart, ruleInputStart - rangeStart]);
                mappedRanges.push([ruleInputStart + ruleOffset, ruleLength]);
                newUnmappedRanges.push([ruleInputStart + ruleLength, rangeLength - ruleLength - (ruleInputStart - rangeStart)]);
            } else {
                newUnmappedRanges.push([rangeStart, rangeLength]);
            }
        });
        return [mappedRanges, newUnmappedRanges];
    }, [[], ranges]);
    return [...mappedRanges, ...unmappedRanges];
};
export default (input) => {
    const sections = input.split("\n\n");
    const seedRanges = [...sections.shift().substring("seeds: ".length).matchAll(/\d+\s\d+/g)]
        .map(match => match[0])
        .map(seedRange => seedRange.split(" "))
        .map(seedRange => [parseInt(seedRange[0], 10), parseInt(seedRange[1], 10)]);
    return sections
        .map(section => section.split(":\n")[1].split("\n").map(rule => rule.split(" ").map(s => parseInt(s, 10))))
        .reduce((ranges, rules) => mapRanges(rules, ranges), seedRanges)
        .map(result => result[0])
        .reduce(toMin);
}
