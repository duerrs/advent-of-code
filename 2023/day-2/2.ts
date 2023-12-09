/*Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green*/

import * as fs from 'fs';

interface GameData {
	red: number,
	blue: number,
	green: number,
}

function getInputData(): string {
	const inputBuffer: Buffer = fs.readFileSync('input.txt');
	return inputBuffer.toString();
}

function parseData(inputData: string): GameData[][]{
	const lines = inputData.split('\n').filter((line) => line != '');
	const data: GameData[][] = [];
	console.log(lines)

	for(const line of lines){
		const gameData: GameData[] = [];
		const game = line.split(': ')[1];
		const rounds = game.split(';');

		for(const round of rounds) {
			const roundData: GameData = {
				red: 0,
				green: 0,
				blue: 0,
			};
			const draws = round.split(',');

			for(const rawDraw of draws){
				const draw = rawDraw.split(' ').filter((line) => line != '');
				if(draw[1] == 'red'){
					roundData.red = parseInt(draw[0]);
				} else if (draw[1] == 'blue') {
					roundData.blue = parseInt(draw[0]);
				} else if (draw[1] == 'green'){
					roundData.green = parseInt(draw[0]);
				} else {
					throw new Error('Wrong Color')
				}

			}
			gameData.push(roundData);

		}
		data.push(gameData);
	}
	return data
}


const inputData = getInputData();
const gameData: GameData[][] = parseData(inputData);


let sum: number = 0;

gameData.forEach((game, index) => {
	const minSet: GameData = {
		red: 0,
		blue: 0,
		green: 0,
	}

	for(const round of game){
		minSet.red = Math.max(minSet.red, round.red);
		minSet.blue = Math.max(minSet.blue, round.blue);
		minSet.green = Math.max(minSet.green, round.green);
	}

	const power = minSet.red * minSet.blue * minSet.green;
	sum += power;

})

console.log(sum);









