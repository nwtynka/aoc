const fs = require("fs")
const input = fs.readFileSync("./input04.txt", { encoding: "utf8" })

const data = input.split(/\n/)
let map = new Map()
let countMap = new Map()
for (let i = 0; i < data.length; i++) {
  const matches = [...data[i].matchAll(/(?<Winning>[\d\s]+)\|(?<Own>[\d\s]+)/g)]
  for (const match of matches) {
    const winning = match.groups["Winning"].trim().split(/\s+/)
    const own = match.groups["Own"].trim().split(/\s+/)
    let count = 0
    for (let number of winning) {
      if (own.includes(number)) {
        if (map.has(i)) {
          map.set(i, map.get(i) * 2)
        } else map.set(i, 1)
        if (countMap.has(i)) {
          countMap.set(i, countMap.get(i) + 1)
        } else countMap.set(i, 1)
      }
    }
  }
}
let sum = 0
for (let value of map.values()) {
  sum = sum + value
}

// console.log(sum)

let multiplicationMap = new Map()

// set zero counts
for (let i = 0; i < data.length; i++) {
  multiplicationMap.set(i, 1)
}
console.log(multiplicationMap)

for (let [key, value] of multiplicationMap) {
  if (countMap.get(key) > 0) {
    for (let i = 1; i <= countMap.get(key); i++) {
      const index = key + i
      if (multiplicationMap.has(index)) {
        // console.log(multiplicationMap.get(index))
        multiplicationMap.set(index, multiplicationMap.get(index) + multiplicationMap.get(key))
        // console.log(multiplicationMap.get(index))
      }
    }
  }
}
let multiplicationSum = 0
for (let value of multiplicationMap.values()) {
  console.log(value)
  multiplicationSum = multiplicationSum + value
}

// console.log(countMap)
// console.log(multiplicationMap)
console.log(countMap)
console.log(multiplicationSum)
