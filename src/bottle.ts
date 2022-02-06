export type Bottle = string[]

const getTopColor = (bottle: Bottle) => bottle[bottle.length - 1]

export const isClosedBottle = (bottle: Bottle) =>
  bottle.length === 4 && hasOnlyOneColor(bottle)

const canPour = (fromBottle: Bottle, toBottle: Bottle) =>
  fromBottle.length > 0 &&
  toBottle.length < 4 &&
  (getTopColor(fromBottle) === getTopColor(toBottle) ||
    toBottle.length === 0) &&
  !isClosedBottle(fromBottle)

function hasOnlyOneColor(bottle: Bottle) {
  for (const color of bottle) {
    if (color !== bottle[0]) return false
  }
  return true
}

const getNumberOfEmptyFields = (bottle: Bottle) => 4 - bottle.length

const shodPour = (fromBottle: Bottle, toBottle: Bottle) =>
  !(
    hasOnlyOneColor(fromBottle) &&
    (toBottle.length === 0 ||
      getNumberOfEmptyFields(toBottle) < fromBottle.length)
  )

export function pour(fromBottle: Bottle, toBottle: Bottle) {
  if (!(canPour(fromBottle, toBottle) && shodPour(fromBottle, toBottle))) return
  ;[fromBottle, toBottle] = [[...fromBottle], [...toBottle]]

  do {
    toBottle.push(fromBottle.pop()!)
  } while (canPour(fromBottle, toBottle))

  return { emptiedBottle: fromBottle, filledBottle: toBottle }
}

export const areEqualBottles = (bottle1: Bottle, bottle2: Bottle) => {
  if (bottle1 === bottle2) return true

  if (bottle1.length !== bottle2.length) return false

  for (let i = 0; i < bottle1.length; i++) {
    if (bottle1[i] !== bottle2[i]) return false
  }

  return true
}
