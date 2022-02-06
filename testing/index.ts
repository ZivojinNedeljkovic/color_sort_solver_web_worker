import SolutionSearch from '../src/solutionSearch'
import { bossLevel, level6 } from './dummyData'

document.getElementById('runBtn')?.addEventListener('click', runHandler)

function runHandler() {
  console.log('run')
  const startTime: any = new Date()
  new SolutionSearch(bossLevel, steps => {
    const endTime: any = new Date()
    const time = (endTime - startTime) / 1000
    console.log(steps)
    console.log(time)
  })
  // const worker = new Worker('/src/worker.js', { type: 'module' })

}
