import { Bottle, isClosedBottle } from "./bottle"


export function isGameWon(bottles: Bottle[]) {
  for (const bottle of bottles) {
    if (!(isClosedBottle(bottle) || bottle.length === 0)) return false
  }

  return true
}
