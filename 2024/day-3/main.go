package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func partOne(input string) {
	re := regexp.MustCompile(`(mul\(\d{1,3},\d{1,3}\))`)
	instructions := re.FindAll([]byte(input), -1)

	instructionSum := 0

	for _, instruction := range instructions {
		re := regexp.MustCompile(`(\d{1,3})`)
		nums := re.FindAll(instruction, -1)

		if len(nums) != 2 {
			panic("There should only be two parameters to the mul instruction")
		}

		n1, err := strconv.Atoi(string(nums[0]))
		if err != nil {
			panic(err)
		}
		n2, err := strconv.Atoi(string(nums[1]))
		if err != nil {
			panic(err)
		}
		instructionSum += n1 * n2
	}
	fmt.Printf("%d\n", instructionSum)
}

func partTwo(input string) {
	re := regexp.MustCompile(`(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))`)
	instructions := re.FindAll([]byte(input), -1)

	enabled := true
	instructionSum := 0
	for _, instruction := range instructions {
		sInstruction := string(instruction)

		if sInstruction == "don't()" {
			enabled = false
		} else if sInstruction == "do()" {
			enabled = true
		} else {
			if enabled {
				re := regexp.MustCompile(`(\d{1,3})`)
				nums := re.FindAll(instruction, -1)

				if len(nums) != 2 {
					panic("There should only be two parameters to the mul instruction")
				}

				n1, err := strconv.Atoi(string(nums[0]))
				if err != nil {
					panic(err)
				}
				n2, err := strconv.Atoi(string(nums[1]))
				if err != nil {
					panic(err)
				}

				instructionSum += n1 * n2
			}
		}

	}
	fmt.Printf("%d\n", instructionSum)

}

func main() {
	input, err := os.ReadFile("./input.txt")
	if err != nil {
		panic("Couldn't open file")
	}

	//partOne(string(input))
	partTwo(string(input))

}
