import { Bottle } from './bottle'
import SolutionSearch from './solutionSearch'

// const isArrayOfStrings = (data: any) =>
//   Array.isArray(data) && data.every(el => typeof el === 'string')

// onmessage = function ({ data: bottlesAsString }: MessageEvent<string>) {
//   console.log('hello from worker')

//   let bottles: Bottle[]
//   try {
//     bottles = JSON.parse(bottlesAsString)

//     if (!isArrayOfStrings(bottles)) throw new Error('Invalid input data')
//   } catch (err: any) {
//     postMessage({ error: err.message })
//     return
//   }

//   new SolutionSearch(bottles, solution => postMessage({ solution }))

//   postMessage({ finished: true })
// }

onmessage = function (bottlesAsString: MessageEvent<string>) {
  console.log('hello from worker')
  const bottles: Bottle[] = JSON.parse(bottlesAsString.data)

  let foundSolution = false

  new SolutionSearch(bottles, solution => {
    foundSolution = true
    postMessage(solution)
  })

  if (!foundSolution) postMessage([])
}
