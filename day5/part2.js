const toMin = (a, b) => a < b ? a : b;
const mapRanges = (ranges, rules) => {
    let [mappedRanges, unmappedRanges] = rules.reduce(([mappedRanges, unmappedRanges], rule) => {
        const ruleInputStart = rule[1];
        const ruleLength = rule[2];
        const ruleOffset = rule[0] - rule[1];
        let newUnmappedRanges = [];
        unmappedRanges.forEach(range => {
            const rangeStart = range[0];
            const rangeLength = range[1];
            if (rangeStart + rangeLength < ruleInputStart || rangeStart > ruleInputStart + ruleLength) {
                newUnmappedRanges.push(range);
                return;
            }
            const rangeStartsWithinRule = rangeStart >= ruleInputStart && rangeStart <= ruleInputStart + ruleLength;
            const rangeEndsWithinRule = rangeStart + rangeLength >= ruleInputStart && rangeStart + rangeLength <= ruleInputStart + ruleLength;
            if (rangeStartsWithinRule && rangeEndsWithinRule) {
                mappedRanges.push([rangeStart + ruleOffset, rangeLength]);
            } else if (rangeStartsWithinRule) {
                const ruleEnd = ruleInputStart + ruleLength;
                mappedRanges.push([rangeStart + ruleOffset, ruleEnd - rangeStart]);
                newUnmappedRanges.push([ruleEnd, (rangeStart + rangeLength) - ruleEnd]);
            } else if (rangeEndsWithinRule) {
                const newUnmappedLength = ruleInputStart - rangeStart;
                newUnmappedRanges.push([rangeStart, newUnmappedLength]);
                mappedRanges.push([ruleInputStart + ruleOffset, rangeLength - newUnmappedLength]);
            } else {
                // Range overlaps rule
                newUnmappedRanges.push([rangeStart, ruleInputStart - rangeStart]);
                mappedRanges.push([ruleInputStart + ruleOffset, ruleLength]);
                newUnmappedRanges.push([ruleInputStart + ruleLength, rangeLength - ruleLength - (ruleInputStart - rangeStart)]);
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
        .reduce(mapRanges, seedRanges)
        .map(result => result[0])
        .reduce(toMin);
}
