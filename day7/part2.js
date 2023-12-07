import {getType, toSum} from "./common.js";

function sortByMappedValue(mapper) {
    return (a, b) => {
        const mappedA = mapper(a);
        const mappedB = mapper(b);
        if (mappedA < mappedB) {
            return -1;
        }
        if (mappedA > mappedB) {
            return 1;
        }
        return 0;
    };
}

const parseHand = (hand) => {
    let parsedHand = hand.split("").reduce((counts, card) => {
        counts[card] = counts[card] ? counts[card] + 1 : 1;
        return counts;
    }, {});
    if (parsedHand["J"]) {
        let highestAmount = Object.entries(parsedHand)
            .filter(entry => entry[0] !== "J")
            .sort(sortByMappedValue(entry => -entry[1]))[0];
        let jokerCard;
        if (highestAmount) {
            if (highestAmount[1] > 1) {
                jokerCard = highestAmount;
            } else {
                jokerCard = Object.entries(parsedHand)
                    .filter(entry => entry[0] !== "J")
                    .sort(sortByMappedValue(entry => -getValue(entry[0])))[0];
            }
        }
        if (!jokerCard) {
            jokerCard = ["1", 5];
        }
        parsedHand[jokerCard[0]] += parsedHand["J"];
        delete parsedHand["J"];
    }
    return parsedHand;
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
        return 1;
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
    .reduce(toSum);
