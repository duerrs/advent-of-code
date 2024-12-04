package main

import (
	"fmt"
	"os"
	"strings"
)

func partOne(letters [][]string) {
	wordCount := 0

	for i := 0; i < len(letters); i++ {
		for j := 0; j < len(letters[i]); j++ {
			if letters[i][j] == "X" {
				// E
				if j+3 < len(letters[i]) && letters[i][j+1] == "M" && letters[i][j+2] == "A" && letters[i][j+3] == "S" {
					fmt.Printf("E - i: %d j: %d\n", i, j)
					wordCount += 1
				}
				// NE
				if i-3 >= 0 && j+3 < len(letters[i]) && letters[i-1][j+1] == "M" && letters[i-2][j+2] == "A" && letters[i-3][j+3] == "S" {
					fmt.Printf("NE - i: %d j: %d\n", i, j)
					wordCount += 1
				}
				// N
				if i-3 >= 0 && letters[i-1][j] == "M" && letters[i-2][j] == "A" && letters[i-3][j] == "S" {
					fmt.Printf("N - i: %d j: %d\n", i, j)
					wordCount += 1
				}
				// NW
				if i-3 >= 0 && j-3 >= 0 && letters[i-1][j-1] == "M" && letters[i-2][j-2] == "A" && letters[i-3][j-3] == "S" {
					fmt.Printf("NW - i: %d j: %d\n", i, j)
					wordCount += 1
				}

				// W
				if j-3 >= 0 && letters[i][j-1] == "M" && letters[i][j-2] == "A" && letters[i][j-3] == "S" {
					fmt.Printf("W - i: %d j: %d\n", i, j)
					wordCount += 1
				}

				// SW
				if i+3 < len(letters) && j-3 >= 0 && letters[i+1][j-1] == "M" && letters[i+2][j-2] == "A" && letters[i+3][j-3] == "S" {
					fmt.Printf("SW - i: %d j: %d\n", i, j)
					wordCount += 1
				}

				// S
				if i+3 < len(letters) && letters[i+1][j] == "M" && letters[i+2][j] == "A" && letters[i+3][j] == "S" {
					fmt.Printf("S - i: %d j: %d\n", i, j)
					wordCount += 1
				}

				// SE
				if i+3 < len(letters) && j+3 < len(letters[i]) && letters[i+1][j+1] == "M" && letters[i+2][j+2] == "A" && letters[i+3][j+3] == "S" {
					fmt.Printf("SE - i: %d j: %d\n", i, j)
					wordCount += 1

				}
			}
		}
	}
	fmt.Printf("%d\n", wordCount)
}

func partTwo(letters [][]string) {
	wordCount := 0
	for i := 0; i < len(letters); i++ {
		for j := 0; j < len(letters[i]); j++ {
			if letters[i][j] == "A" {

				if i == 0 || j == 0 || i == len(letters)-1 || j == len(letters[i])-1 {
					continue
				}

				/*
					M . M
					. A .
					S . S
				*/
				if letters[i-1][j-1] == "M" && letters[i+1][j+1] == "S" && letters[i-1][j+1] == "M" && letters[i+1][j-1] == "S" {
					wordCount += 1
				}

				/*
					M . S
					. A .
					M . S
				*/
				if letters[i-1][j-1] == "M" && letters[i+1][j+1] == "S" && letters[i-1][j+1] == "S" && letters[i+1][j-1] == "M" {
					wordCount += 1
				}

				/*
					S . M
					. A .
					S . M
				*/
				if letters[i-1][j-1] == "S" && letters[i+1][j+1] == "M" && letters[i-1][j+1] == "M" && letters[i+1][j-1] == "S" {
					wordCount += 1
				}

				/*
					S . S
					. A .
					M . M
				*/
				if letters[i-1][j-1] == "S" && letters[i+1][j+1] == "M" && letters[i-1][j+1] == "S" && letters[i+1][j-1] == "M" {
					wordCount += 1
				}
			}
		}
	}

	fmt.Printf("%d\n", wordCount)

}

func main() {
	input, err := os.ReadFile("./input.txt")
	if err != nil {
		panic("Couldn't open file")
	}

	rows := strings.Split(string(input), "\r\n")
	letters := [][]string{}

	for _, row := range rows {
		letters = append(letters, strings.Split(row, ""))
	}

	//partOne(letters)
	partTwo(letters)

}
