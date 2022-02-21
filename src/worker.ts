import SolutionSearch from './solutionSearch'

const isArrayOfBottles = (data: any) =>
  Array.isArray(data) &&
  data.every(el => typeof el === 'string') &&
  data.length < 4

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
