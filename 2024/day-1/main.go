package main

import (
	"fmt"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func partOne(left []int, right []int) {

	sort.Slice(left, func(i, j int) bool {
		return left[i] < left[j]
	})

	sort.Slice(right, func(i, j int) bool {
		return right[i] < right[j]
	})

	if len(left) != len(right) {
		panic("Something went wrong!")
	}

	differenceSum := 0
	for i := range left {
		difference := math.Abs(float64(left[i] - right[i]))
		differenceSum += int(difference)
	}

	fmt.Printf("Result: %d", differenceSum)

}

func partTwo(left []int, right []int) {
	m := map[int]int{}

	for _, v := range right {
		if val, ok := m[v]; ok {
			m[v] = val + 1
		} else {
			m[v] = 1
		}
	}

	similarityScoreSum := 0
	for _, v := range left {
		if amount, ok := m[v]; ok {
			similarityScoreSum += v * amount
		}
	}

	fmt.Printf("Result: %d", similarityScoreSum)
}

func main() {
	input, err := os.ReadFile("./input.txt")
	if err != nil {
		panic("Couldn't open file")
	}

	rows := strings.Split(string(input), "\r\n")

	left := []int{}
	right := []int{}

	inputData := [][]string{}

	for _, row := range rows {
		values := strings.Split(row, " ")
		cleanedValues := []string{}

		for _, value := range values {
			if value == "" {
				continue
			}
			cleanedValues = append(cleanedValues, value)
		}
		inputData = append(inputData, cleanedValues)
	}

	for _, row := range inputData {
		if len(row) != 2 {
			panic("Something went wrong!")
		}

		leftValue, _ := strconv.Atoi(row[0])

		rightValue, err := strconv.Atoi(row[1])
		if err != nil {
			panic(err)
		}

		left = append(left, leftValue)
		right = append(right, rightValue)

		if len(left) != len(right) {
			panic("Something went wrong!")
		}
	}

	//partOne(left, right)
	partTwo(left, right)

}
