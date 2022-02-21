import { isABottle } from './bottle'
import SolutionSearch from './solutionSearch'

const isArrayOfBottles = (data: any) => data.every((el: any) => isABottle(el))

onmessage = function ({ data }: MessageEvent<string>) {
  console.log('hello from worker')

  const bottles = JSON.parse(data)

  if (!isArrayOfBottles(bottles)) return

  let foundSolution = false

  new SolutionSearch(bottles, solution => {
    foundSolution = true
    postMessage(solution)
  })

  if (!foundSolution) postMessage([])
}
