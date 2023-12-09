/*  467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..
*/

import * as fs from 'fs';

interface Position{
    x: number,
    y: number,
}

function getInputData(): string {
	const inputBuffer: Buffer = fs.readFileSync('input.txt');
	return inputBuffer.toString();
}

function isCharNumber(c: string): boolean {
    return c >= '0' && c <= '9';
}

function isSymbol(c: string): boolean{
    return !isCharNumber(c) && c != ".";

}

function hasAdjacentSymbol(inputData: string[], pos: Position): boolean{
    /*if(pos.y === 0 && pos.x === 2){

        console.log(
            Math.min(pos.y + 1, inputData.length - 1),
            Math.min(pos.x + 1, inputData[pos.y].length -1),
            inputData[Math.min(pos.y + 1, inputData.length - 1)][Math.min(pos.x + 1, inputData[pos.y].length -1)],
            isSymbol(inputData[Math.min(pos.y + 1, inputData.length - 1)][Math.min(pos.x + 1, inputData[pos.y].length -1)]))

        console.log(
            isSymbol(inputData[Math.min(pos.y + 1, inputData.length - 1)][pos.x])
            || isSymbol(inputData[Math.max(pos.y + 1, inputData.length - 1)][Math.max(pos.x - 1, 0)])
            || isSymbol(inputData[pos.y][Math.max(pos.x - 1, 0)])
            || isSymbol(inputData[Math.max(pos.y - 1, 0)][Math.max(pos.x - 1, 0)])
            || isSymbol(inputData[Math.max(pos.y - 1, 0)][pos.x])
            || isSymbol(inputData[Math.max(pos.y - 1, 0)][Math.min(pos.x + 1, inputData[pos.y].length -1)])
            || isSymbol(inputData[pos.y][Math.min(pos.x + 1, inputData[pos.y].length - 1)])
            || isSymbol(inputData[Math.min(pos.y + 1, inputData.length - 1)][Math.min(pos.x + 1, inputData[pos.y].length -1)])
)
    }*/
        return isSymbol(inputData[Math.min(pos.y + 1, inputData.length - 1)][pos.x])
            || isSymbol(inputData[Math.min(pos.y + 1, inputData.length - 1)][Math.max(pos.x - 1, 0)])
            || isSymbol(inputData[pos.y][Math.max(pos.x - 1, 0)])
            || isSymbol(inputData[Math.max(pos.y - 1, 0)][Math.max(pos.x - 1, 0)])
            || isSymbol(inputData[Math.max(pos.y - 1, 0)][pos.x])
            || isSymbol(inputData[Math.max(pos.y - 1, 0)][Math.min(pos.x + 1, inputData[pos.y].length -1)])
            || isSymbol(inputData[pos.y][Math.min(pos.x + 1, inputData[pos.y].length - 1)])
            || isSymbol(inputData[Math.min(pos.y + 1, inputData.length - 1)][Math.min(pos.x + 1, inputData[pos.y].length -1)])
}

const inputData = getInputData();

const lines = inputData.split('\n').filter((line) => line !== '')
let sum: number = 0;

for(let y = 0; y<lines.length; y++){
    for(let x = 0; x<lines[y].length; x++){

        const char = lines[y][x];


        if(isCharNumber(char) && hasAdjacentSymbol(lines, {x: x, y: y})){
            console.log(char)
            let nextX = x-1;
            let nextChar = lines[y][nextX];
            let currentX = x;
            let currentChar = lines[y][currentX]; 

            while(isCharNumber(nextChar) && nextX >= 0){
                nextX -= 1;
                nextChar = lines[y][nextX];
                currentX -= 1;
                currentChar = lines[y][currentX];
            }

            let number = currentChar;
            nextX = currentX + 1;
            nextChar = lines[y][nextX]
            while(isCharNumber(nextChar) && nextX <= lines[y].length - 1){
                nextX += 1
                nextChar = lines[y][nextX]
                currentX += 1;
                currentChar = lines[y][currentX]; 
                number += currentChar;
            }
            console.log(number)

            sum += parseInt(number);
            x = nextX;
        }
    }
}

console.log(sum);

