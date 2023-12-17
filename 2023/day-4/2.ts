/*Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11*/

import * as fs from 'fs';

function getInputData(): string {
    const inputBuffer: Buffer = fs.readFileSync('input.txt');
    return inputBuffer.toString();
}


const input = getInputData()
const lines = input.split('\n').filter((line) => line != '')


const numberOfWinsPerLine = lines.map((line) => {
    const cleanInput = line.split(': ')[1]

    const numberTable = cleanInput.split('|')

    const winningNumbers = numberTable[0].split(' ').filter((line) => line != '')
    const myNumbers = numberTable[1].split(' ').filter((line) => line != '')


    let numberOfWins: number = 0;
    for (const myNumber of myNumbers) {
        if (winningNumbers.includes(myNumber)) {
            numberOfWins++;
        }
    }

    return numberOfWins

});

const numberOfScratchCards = lines.map((_) => 1);

for (let i: number = 0; i < lines.length; i++) {

    const numberOfWins = numberOfWinsPerLine[i];

    for (let j = i + 1; j <= i + numberOfWins; j++) {
        numberOfScratchCards[j] = numberOfScratchCards[j] + numberOfScratchCards[i];
    }
}

const sum = numberOfScratchCards.reduce((value, next) => value += next);

console.log(sum)



