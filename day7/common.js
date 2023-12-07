const getType = (hand) => {
    const CARDS = 14;
    let keys = Object.keys(hand);
    if (keys.length === 1) {
        // Five of a kind
        return 7;
    }
    if (keys.length === 2) {
        if (hand[keys[0]] === 1) {
            // Four of a kind
            return 6;
        }
        if (hand[keys[1]] === 1) {
            // Four of a kind
            return 6;
        }
        // Full House
        return 5;
    }
    if (keys.length === 3) {
        if (keys.find(key => hand[key] === 3)) {
            // Three fo a kind
            return 4;
        } else {
            // Two pairs
            return 3;
        }
    }
    if (keys.length === 4) {
        // One pair
        return 2;
    }
    if (keys.length === 5) {
        // High Card
        return 1;
    }
};

const toSum = (a, b) => (a ?? 0) + b;
export {getType, toSum};
