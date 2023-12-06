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

const input = getInputData();
const lines = cleanSplit(input, '\n');


const regex = new RegExp('[0-9]', 'g');

let sum: number = 0;

for(const line of lines){
	console.log(line)
	const digits = line.match(regex)
	console.log(digits)
	if(digits){
		const firstDigit = digits[0]
		const secondDigit = digits[digits.length-1]
		const concat = firstDigit + secondDigit
		sum += parseInt(concat)
	}
}
console.log(sum)
