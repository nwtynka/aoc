const fs = require("fs")

const input = fs.readFileSync("./input01.txt", { encoding: "utf8" })
const data = input.split(/\s+/)

const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const replacement = ["o1e", "t2o", "t3e", "f4r", "f5e", "s6x", "s7n", "e8t", "n9e"]

let final = 0
for (let index = 0; index < data.length; index++) {
  const res = data[index]

  for (let i = 0; i < numbers.length; i++) {
    res = res.replaceAll(numbers[i], replacement[i])
  }

  const num = res.match(/[0-9]/g).join("")
  let result = Number(num[0] + num[num.length - 1])

  final = final + result
  console.log(result)
}
