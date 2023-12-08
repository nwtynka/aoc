const fs = require("fs")
const input = fs.readFileSync("./input03.txt", { encoding: "utf8" })

const match = input.matchAll(/[^\s\.\d]/g)

let symbols = []
for (const m of match) {
  symbols.push(m[0])
}
symbols = [...new Set(symbols)]
  .toString()
  .replaceAll(",", "")
  .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
const regex = new RegExp("(\\d+)([" + symbols + "])(\\d+)|(\\d+)([" + symbols + "])|([" + symbols + "])(\\d+)", "g")
function replaceDigitsWithDots(input) {
  return input
}

const data1 = replaceDigitsWithDots(input)

function transposeData(data) {
  const transpose = (array) => array[0].map((col, position) => array.map((row) => row[position]))

  return transpose(data.split("\n").map((row) => row.split("")))
    .map((row) => row.join(""))
    .join("\n")
}

const data2 = transposeData(replaceDigitsWithDots(transposeData(data1)))

function compute() {
  let sum = 0
  let gear = 0
  const arrays = data1.split(/\r?\n/)
  for (let rowIndex = 0; rowIndex < arrays.length; rowIndex++) {
    const row = arrays[rowIndex]
    const matches = row.matchAll(/\d+/g)
    for (const match of matches) {
      let possiblePositions = []
      if (
        row[match.index - 1]?.match(new RegExp("[" + symbols + "]", "g")) ||
        row[match.index + match[0].length]?.match(new RegExp("[" + symbols + "]", "g"))
      ) {
        sum = sum + Number(match[0])
      } else {
        for (let position = match.index - 1; position <= match.index + match[0].length; position++) {
          possiblePositions.push(position)
        }
        for (const position of possiblePositions) {
          if (
            arrays[rowIndex + 1]?.[position]?.match(new RegExp("[" + symbols + "]", "g")) ||
            arrays?.[rowIndex - 1]?.[position]?.match(new RegExp("[" + symbols + "]", "g"))
          ) {
            sum = sum + Number(match[0])
          }
        }
      }
    }
  }

  return sum
}

console.log(compute())

// Example 2

const data = input.split("\n").map((row) => row.split(""))

let number = null
const GRID = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]
let starsMapWithNumbers = new Map()
let starPositionsSet = new Set()

// Function to get unique identifiers for star positions around a given point
const getStarIds = (x, y) => {
  const ids = new Set()
  // For all neighboring positions
  for (let position in GRID) {
    // Check if the neighboring position position (e.g. [-1,-1]) is within the grid
    if (!data[y + GRID[position][0]]) {
      continue
    }
    // Check if the neighboring position of number in position x,y is a star
    if (!data[y + GRID[position][0]][x + GRID[position][1]]?.match(/\*/)) {
      continue
    } else {
      // if it is, add the unique identifier to the set
      ids.add(x + GRID[position][1] + "," + (y + GRID[position][0]))
    }
  }
  return ids
}

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    if ((x === 0 || data[y][x].match(/[^\d]/)) && number) {
      // if im at the beginning of a row or at a non-digit character and position have stored number, position can push it to the map
      for (let position of starPositionsSet) {
        !starsMapWithNumbers.has(position) ? starsMapWithNumbers.set(position, [number]) : starsMapWithNumbers.get(position).push(number)
      }
      number = null
      starPositionsSet = new Set()
    }
    // otherwise, if position have a digit, position can add it to the number and find the star positions around it
    if (data[y][x].match(/\d/)) {
      number = number * 10 + data[y][x] * 1 // because my grid is from left to right, position can just multiply by 10 and add the new digit
      getStarIds(x, y).forEach((e) => starPositionsSet.add(e))
    }
  }
}

const result = [...starsMapWithNumbers.values()].reduce((acc, index) => {
  if (index.length === 1) {
    return acc
  }
  return Number(acc) + index.reduce((a, b) => Number(a * b))
}, 0)

console.log(result)
