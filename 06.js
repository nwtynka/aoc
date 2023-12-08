const fs = require("fs")
const input = fs.readFileSync("./input06.txt", { encoding: "utf8" })

const data = input.split(/\r?\n/)

const time = [+data[0].replace("Time:", "").trim().replaceAll(/\s+/g, "")]

const distance = [+data[1].replace("Distance:", "").trim().replaceAll(/\s+/g, "")]

console.log(time)
const result = [time]
  .map((value, i) => {
    const raceTime = time[i]
    const recordTime = distance[i]

    console.log(raceTime, recordTime)
    const timePressed = 0
    const dist = timePressed * (raceTime - timePressed)

    let count = 0
    for (let j = 0; j < raceTime; j++) {
      const timePressed = j
      const dist = timePressed * (raceTime - timePressed)
      if (dist > recordTime) {
        count++
      }
    }
    return count
  })
  .reduce((acc, curr) => acc * curr, 1)
console.log(result)
