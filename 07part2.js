const fs = require("fs")
const data = fs.readFileSync("./input07.txt", { encoding: "utf8" }).split("\n")
// const data = fs.readFileSync("./07example.txt", { encoding: "utf8" }).split("\n")

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
      .replace(/T/g, "D")
      .replace(/9/g, "E")
      .replace(/8/g, "F")
      .replace(/7/g, "G")
      .replace(/6/g, "H")
      .replace(/5/g, "I")
      .replace(/4/g, "K")
      .replace(/3/g, "L")
      .replace(/2/g, "M")
      .replace(/J/g, "N")
    return [replacedHand, ...countCharacters(replacedHand), +bid]
  })
  .sort((a, b) => a[1] - b[1] || b[0].localeCompare(a[0]))
  .reduce((acc, curr, index) => {
    return acc + (index + 1) * curr[3]
  }, 0)

function countCharacters(input) {
  const charCount = {}

  for (const char of input) {
    charCount[char] = (charCount[char] || 0) + 1
  }

  let counts = Object.values(charCount)

  const isN = !!charCount["N"]

  // AAAAA, AAAAB, AAABB, AAABC, AABBC, AABCD, ABCDE
  // if N occurs, i will make it to the char which has the most occurences in the hand
  // i will assign it the number as there was no N

  let convertedCounts = { ...charCount }
  if (isN) {
    const countN = charCount["N"]
    if (countN !== 5) {
      delete convertedCounts["N"]
      const maxKey = Object.keys(convertedCounts)?.reduce((a, b) => (charCount[a] > charCount[b] ? a : b))
      convertedCounts[maxKey] = charCount[maxKey] + countN
      delete convertedCounts["N"]
    }
  }

  counts = Object.values(convertedCounts)

  if (counts.includes(5)) {
    return [6, Number(isN)]
  } else if (counts.includes(4)) {
    return [5, Number(isN)]
  } else if (counts.includes(3) && counts.includes(2)) {
    return [4, Number(isN)]
  } else if (counts.includes(3)) {
    return [3, Number(isN)]
  } else if (counts.includes(2) && counts.reduce((acc, curr) => acc * curr, 1) === 4) {
    return [2, Number(isN)]
  } else if (counts.includes(2)) {
    return [1, Number(isN)]
  } else return [0, Number(isN)]
}

console.log(result)
