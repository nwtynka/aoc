const fs = require("fs")
const data = fs.readFileSync("./input07.txt", { encoding: "utf8" }).split("\n")

let map = new Map()
for (let i = 0; i < data.length; i++) {
  map.set(data[i].split(" ")[0], data[i].split(" ")[1])
}

const result = data
  .map((line) => {
    const [hand, bid] = line.split(" ")
    const replacedHand = hand
      .replace(/A/g, "A")
      .replace(/K/g, "B")
      .replace(/Q/g, "C")
      .replace(/J/g, "D")
      .replace(/T/g, "E")
      .replace(/9/g, "F")
      .replace(/8/g, "G")
      .replace(/7/g, "H")
      .replace(/6/g, "I")
      .replace(/5/g, "J")
      .replace(/4/g, "K")
      .replace(/3/g, "L")
      .replace(/2/g, "M")

    return [replacedHand, countCharacters(replacedHand), +bid]
  })
  .sort((a, b) => a[1] - b[1] || b[0].localeCompare(a[0]))
  .reduce((acc, curr, index) => {
    return acc + (index + 1) * curr[2]
  }, 0)

function countCharacters(input) {
  const charCount = {}

  for (const char of input) {
    charCount[char] = (charCount[char] || 0) + 1
  }

  const counts = Object.values(charCount)
  if (counts.includes(5)) {
    return 6
  } else if (counts.includes(4)) {
    return 5
  } else if (counts.includes(3) && counts.includes(2)) {
    return 4
  } else if (counts.includes(3)) {
    return 3
  } else if (counts.includes(2) && counts.reduce((acc, curr) => acc * curr, 1) === 4) {
    return 2
  } else if (counts.includes(2)) {
    return 1
  } else return 0
}

console.log(result)
