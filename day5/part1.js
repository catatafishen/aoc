const toMin = (a, b) => a < b ? a : b;
export default (input) => {
    const sections = input.split("\n\n");
    const seeds = sections.shift().substring("seeds: ".length).split(" ").map(s => parseInt(s, 10));
    const maps = sections
        .map(section => section.split(":\n")[1].split("\n").map(rule => rule.split(" ").map(s => parseInt(s, 10))));
    return seeds.map(seed => {
        return maps.reduce((cursor, map) => {
            const rule = map.find(rule => cursor >= rule[1] && cursor < rule[1] + rule[2]);
            return rule ? cursor + rule[0] - rule[1] : cursor;
        }, seed);
    }).reduce(toMin);
}
