import * as fs from 'fs';

function getInputData(): string {
	const inputBuffer: Buffer = fs.readFileSync('input.txt');
	return inputBuffer.toString();
}

function cleanSplit(input: string, split: string): string[] {
	const lines = input.split(split)
	lines.pop()
	return lines;
}

function map(spelledDigit: string): string {
	switch(spelledDigit){
		case 'one':
			return '1';
		case 'two':
			return '2';
		case 'three':
			return '3';
		case 'four':
			return '4';
		case 'five':
			return '5';
		case 'six':
			return '6';
		case 'seven':
			return '7';
		case 'eight':
			return '8';
		case 'nine':
			return '9';
		default:
			return spelledDigit;
	}
}


function getMatchFromPosition(startIndex: number, line: string): string {
	const match = new RegExp('[0-9]|one|two|three|four|five|six|seven|eight|nine');
	//console.log(startIndex)

	for(let i: number = startIndex; i<=line.length; i++){
		const currSubString = line.substring(startIndex, i);
		//console.log(currSubString,match.test(currSubString) )
		if(match.test(currSubString)){
			return currSubString;
		} 
	}
	return ''
}


const input = getInputData();
const lines = cleanSplit(input, '\n');


const lookAheadRegex = new RegExp('(?=[0-9]|one|two|three|four|five|six|seven|eight|nine)', 'g');

let sum: number = 0;

for(const line of lines){
	//console.log(line)
	const indexes = [...line.matchAll(lookAheadRegex)];
	//console.log(indexes)
	const firstIndex = indexes[0].index;
	const lastIndex = indexes[indexes.length-1].index;
	//console.log(firstIndex, lastIndex);

	if(firstIndex != undefined && lastIndex != undefined){
		const firstMatch = map(getMatchFromPosition(firstIndex, line));
		const lastMatch = map(getMatchFromPosition(lastIndex, line));
		//console.log(firstMatch, lastMatch);

		const concat = firstMatch + lastMatch
		sum += parseInt(concat)
	}



}
console.log(sum)
