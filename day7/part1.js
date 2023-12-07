import {getType, toSum} from "./common.js";


const parseHand = (hand) => {
    return hand.split("").reduce((counts, card) => {
        counts[card] = counts[card] ? counts[card] + 1 : 1;
        return counts;
    }, {});
};

let getValue = (card) => {
    if (/\d/.test(card)) {
        return parseInt(card, 10);
    }
    if (card === "A") {
        return 14;
    }
    if (card === "K") {
        return 13;
    }
    if (card === "Q") {
        return 12;
    }
    if (card === "J") {
        return 11;
    }
    if (card === "T") {
        return 10;
    }
};
export default (input) => input.split("\n")
    .map(row => row.split(" "))
    .map(([hand, bid]) => ({hand, bid: parseInt(bid, 10)}))
    .map(parsedHand => ({...parsedHand, type: getType(parseHand(parsedHand.hand))}))
    .sort((a, b) => {
        if (a.type < b.type) {
            return -1;
        }
        if (a.type > b.type) {
            return 1;
        }
        for (let i = 0; i < 5; i++) {
            if (getValue(a.hand.charAt(i)) < getValue(b.hand.charAt(i))) {
                return -1;
            }
            if (getValue(a.hand.charAt(i)) > getValue(b.hand.charAt(i))) {
                return 1;
            }
        }
        throw new Error("Could not compare hands");
    })
    .map((hand, index) => hand.bid * (index + 1))
    .reduce(toSum)
