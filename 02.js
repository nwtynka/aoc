const fs = require("fs")
const input = fs.readFileSync("./input02.txt", { encoding: "utf8" })
const data = input.split(/\r?\n/)

let result = 0
let minimumCombObj = {}

data.forEach((line, j) => {
  const combinations = line.split(/:/)?.[1]?.trim()
  const lineNr = Number(j + 1)
  let isCombinationValid = true
  minimumCombObj[lineNr] = { red: 0, green: 0, blue: 0 }

  combinations.split(/;/).forEach((comb) => {
    comb
      .trim()
      .split(/,/)
      .forEach((combination) => {
        const [number, color] = combination.trim().split(/\s+/)
        const count = Number(number)

        switch (color) {
          case "red":
            if (count > 12) {
              isCombinationValid = false
            }
            if (minimumCombObj[lineNr].red < count) {
              minimumCombObj[lineNr].red = count
            }
            break
          case "green":
            if (count > 13) {
              isCombinationValid = false
            }
            if (minimumCombObj[lineNr].green < count) {
              minimumCombObj[lineNr].green = count
            }
            break
          case "blue":
            if (count > 14) {
              isCombinationValid = false
            }
            if (minimumCombObj[lineNr].blue < count) {
              minimumCombObj[lineNr].blue = count
            }
            break
        }
      })
  })

  if (isCombinationValid) {
    result = result + lineNr
  }
})

console.log(result)

let result2 = 0
Object.values(minimumCombObj).forEach((combination) => {
  let power = combination.red * combination.blue * combination.green
  result2 = result2 + power
})

console.log(result2)
