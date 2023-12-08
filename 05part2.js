const { log } = require("console")
const fs = require("fs")
const { connected } = require("process")
const data = fs.readFileSync("./input05.txt", { encoding: "utf8" }).split("\n")

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

const ranges = []
for (let i = 0; i < Seeds.length; i = i + 2) {
  ranges.push([+Seeds[i], +Seeds[i] + +Seeds[i + 1] - 1])
}

const result = function partTwo() {
  let map = new Map()

  for (let minLocation = 100_000_000; minLocation < 100_000_000_000; minLocation++) {
    map.set(minLocation, minLocation)

    // console.log(minLocation)
    for (let [key, line] of Object.entries(MAPPER).reverse()) {
      let value = map.get(minLocation)
      let closestFrom = 0
      let closestTo = 0
      let closestStep = 0
      for (let set of line) {
        const [to, from, step] = set.split(" ").map((x) => +x)
        if (value < to) {
          continue
        }
        if (value === to) {
          // map.set(ini, to)
          closestFrom = from
          closestTo = to
          closestStep = step
          break
        } else if (to < value && to >= closestTo) {
          closestFrom = from
          closestTo = to
          closestStep = step
        }
      }

      if (closestFrom || closestTo || closestStep) {
        if (value === closestTo) {
          map.set(minLocation, closestFrom)
        } else if (closestTo + closestStep >= value) {
          map.set(minLocation, closestFrom + value - closestTo)
        }
      } else {
      }

      closestFrom = 0
      closestTo = 0
      closestStep = 0
    }

    let seed = map.get(minLocation)
    for (let firstIndex = 0; firstIndex < ranges.length; firstIndex++) {
      const [from, to] = ranges[firstIndex]
      if (from <= seed && to >= seed) {
        console.log("seed", seed, minLocation, from, to)
        return seed
      }
    }

    map.delete(minLocation)
  }
}
console.log(result())
