const fs = require("fs")
const data = fs.readFileSync("./05example.txt", { encoding: "utf8" }).split("\n")

const indices = [
  data.indexOf("seed-to-soil map:"),
  data.indexOf("soil-to-fertilizer map:"),
  data.indexOf("fertilizer-to-water map:"),
  data.indexOf("water-to-light map:"),
  data.indexOf("light-to-temperature map:"),
  data.indexOf("temperature-to-humidity map:"),
  data.indexOf("humidity-to-location map:"),
  data.length + 1,
]

const maps = []
for (let i = 0; i < indices.length - 1; i++) {
  const firstIndex = indices[i]
  const secondIndex = indices[i + 1] - 1

  const lines = data.slice(firstIndex + 1, secondIndex) // +1 to skip the keyword, second index is always new line
  const split = []

  for (const line of lines) {
    split.push(line)
  }
  maps.push(split)
}

const Seeds = data[0].replace("seeds: ", "").split(" ").map(Number)

const MAPPER = {
  SeedToSoil: maps[0],
  SoilToFertilizer: maps[1],
  FertilizerToWater: maps[2],
  WaterToLight: maps[3],
  LightToTemperature: maps[4],
  TemperatureToHumidity: maps[5],
  HumidityToLocation: maps[6],
}

let map = new Map()

function partOne() { // tvl nejak sem si to rozbila :D 
  for (let initialSeed of Seeds) {
    for (let [key, line] of Object.entries(MAPPER)) {
      let closestFrom = 0
      let closestTo = 0
      let closestStep = 0
      let value = map.get(initialSeed)
      for (let set of line) {
        const [to, from, step] = set.split(" ").map((x) => +x)
        if (value < from) {
          continue
        }

        if (value === from) {
          map.set(initialSeed, to)
          closestFrom = from
          closestTo = to
          closestStep = step
          break
        } else if (closestFrom <= from) {
          closestFrom = +from
          closestTo = +to
          closestStep = +step
        }
      }

      if (closestFrom || closestTo || closestStep) {
        if (closestFrom + closestStep >= value) {
          map.set(initialSeed, closestTo + value - closestFrom)
        }

        if (!map.get(initialSeed)) {
          map.set(initialSeed, +initialSeed)
        }
      }
    }
  }

  return Math.min(...map.values())
}

console.log(partOne())
