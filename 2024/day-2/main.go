package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile("./input.txt")
	if err != nil {
		panic("Couldn't open file")
	}

	rows := strings.Split(string(input), "\r\n")

	vss := [][]int{}
	for _, row := range rows {
		vs := []int{}
		column := strings.Split(row, " ")
		for _, v := range column {
			iv, err := strconv.Atoi(v)
			if err != nil {
				panic(err)
			}
			vs = append(vs, iv)
		}
		vss = append(vss, vs)
	}

	//partOne(vss)
	partTwo(vss)

}

func partTwo(vss [][]int) {
	validReportSum := 0

	for _, report := range vss {
		valid := validReport(report)
		if valid {
			validReportSum += 1
		} else {
			for i := range report {

				test := make([]int, len(report))
				copy(test, report)
				test = append(test[:i], test[i+1:]...)

				valid := validReport(test)
				if valid {
					validReportSum += 1
					break
				}
			}
		}
	}
	fmt.Printf("%d\n", validReportSum)
}

func partOne(vss [][]int) {
	validReportSum := 0
	for _, report := range vss {
		valid := validReport(report)
		if valid {
			validReportSum += 1
		}
	}

	fmt.Printf("%d\n", validReportSum)
}

func validReport(report []int) bool {
	for i := 0; i < len(report)-2; i++ {
		diff := report[i+1] - report[i]
		diff2 := report[i+2] - report[i+1]

		diffAbs := math.Abs(float64(diff))
		diff2Abs := math.Abs(float64(diff2))

		if diffAbs < 1 || diffAbs > 3 || diff2Abs < 1 || diff2Abs > 3 {
			return false
		}

		if (diff > 0 && diff2 < 0) || (diff < 0 && diff2 > 0) {
			return false
		}

	}
	return true
}

func validReport1(report []int) bool {
	for i := 0; i < len(report)-2; i++ {
		diff := report[i+1] - report[i]
		diff2 := report[i+2] - report[i+1]

		diffAbs := math.Abs(float64(diff))
		diff2Abs := math.Abs(float64(diff2))

		if diffAbs < 1 || diffAbs > 3 || diff2Abs < 1 || diff2Abs > 3 {
			return false
		}

		if (diff > 0 && diff2 < 0) || (diff < 0 && diff2 > 0) {
			return false
		}

	}
	return true
}
