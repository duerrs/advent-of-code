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

function getAdjacentNumber(inputData: string[], pos: Position): Position[]{
    const adjacentNumbers: Position[] = []
    if(isCharNumber(inputData[Math.min(pos.y + 1, inputData.length - 1)][pos.x])){
        adjacentNumbers.push({y: Math.min(pos.y + 1, inputData.length - 1), x: pos.x })
    }

    if (isCharNumber(inputData[Math.min(pos.y + 1, inputData.length - 1)][Math.max(pos.x - 1, 0)])){
        adjacentNumbers.push({y:Math.min(pos.y + 1, inputData.length - 1), x: Math.max(pos.x - 1, 0)})
    }

    if (isCharNumber(inputData[pos.y][Math.max(pos.x - 1, 0)])){
        adjacentNumbers.push({y: pos.y, x:Math.max(pos.x - 1, 0) })
    }

    if(isCharNumber(inputData[Math.max(pos.y - 1, 0)][Math.max(pos.x - 1, 0)])){
        adjacentNumbers.push({y:Math.max(pos.y - 1, 0),x:Math.max(pos.x - 1, 0)  })
    }

    if (isCharNumber(inputData[Math.max(pos.y - 1, 0)][pos.x])){
        adjacentNumbers.push({y:Math.max(pos.y - 1, 0), x:pos.x })
    }

    if (isCharNumber(inputData[Math.max(pos.y - 1, 0)][Math.min(pos.x + 1, inputData[pos.y].length -1)])){
        adjacentNumbers.push( {y:Math.max(pos.y - 1, 0), x:Math.min(pos.x + 1, inputData[pos.y].length -1)  })
    }

    if (isCharNumber(inputData[pos.y][Math.min(pos.x + 1, inputData[pos.y].length - 1)])){
        adjacentNumbers.push( {y:pos.y, x:Math.min(pos.x + 1, inputData[pos.y].length - 1)  })
    }

    if (isCharNumber(inputData[Math.min(pos.y + 1, inputData.length - 1)][Math.min(pos.x + 1, inputData[pos.y].length -1)])){
        adjacentNumbers.push({y:Math.min(pos.y + 1, inputData.length - 1), x:Math.min(pos.x + 1, inputData[pos.y].length -1)  })
    }

    return adjacentNumbers;
} 

const inputData = getInputData();

const lines = inputData.split('\n').filter((line) => line !== '')
let sum: number = 0;

let i = 0
for(let y = 0; y<lines.length; y++){
    for(let x = 0; x<lines[y].length; x++){
        const char = lines[y][x];
        if(char === "*" ){

            const adjacentNumbers: Position[] = getAdjacentNumber(lines, {x: x, y: y})
                const startPos = adjacentNumbers.map((digit) => {
                    let nextX = digit.x - 1;
                    let nextChar = lines[digit.y][nextX];
                    let currentX = digit.x;
                    let currentChar = lines[digit.y][currentX]; 


                    while(isCharNumber(nextChar) && nextX >= 0){
                        nextX -= 1;
                        nextChar = lines[digit.y][nextX];
                        currentX -= 1;
                        currentChar = lines[digit.y][currentX];
                    }
                    return {x: currentX, y: digit.y}
                })


                const startPosWithoutDuplicates = startPos.filter((pos, index) => startPos.findIndex((item) => pos.x === item.x && pos.y === item.y) === index)

            if(startPosWithoutDuplicates.length >= 2){
                console.log(startPosWithoutDuplicates)
                const gearRatio = startPosWithoutDuplicates.map((position) => {
                    let nextX = position.x + 1
                    let nextChar = lines[position.y][nextX]
                    let currentX = position.x
                    let currentChar = lines[position.y][currentX] 

                    let number = currentChar;
                    while(isCharNumber(nextChar) && nextX <= lines[y].length - 1){
                        nextX += 1
                        nextChar = lines[position.y][nextX]
                        currentX += 1;
                        currentChar = lines[position.y][currentX]; 
                        number += currentChar;
                    }
                    return parseInt(number)

                }).reduce((cur, next) => cur = cur * next)

                sum += gearRatio
            }
        }
    }
}
console.log(i)
console.log(sum);

