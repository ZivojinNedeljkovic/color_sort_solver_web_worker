import { areEqualBottles, Bottle, isClosedBottle } from './bottle'

export type Step = Bottle[]

export function areEqualSteps(step1: Step, step2: Step) {
  if (step1.length !== step1.length) return false

  for (let i = 0; i < step1.length; i++) {
    if (!areEqualBottles(step1[i], step2[i])) {
      return false
    }
  }

  return true
}

export const getNumOfClosedBottles = (step: Step) =>
  step.reduce<number>(
    (sum, bottle) => (isClosedBottle(bottle) ? sum + 1 : sum),
    0
  )
