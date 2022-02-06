import { Bottle, pour } from './bottle'
import { isGameWon } from './game'
import Node from './node'
import { areEqualSteps, getNumOfClosedBottles, Step } from './step'

class SolutionSearch {
  private bestMoveCount = Number.MAX_SAFE_INTEGER
  private foundASolution = false
  private closedBottlesPreStepInCurrentBestSolution: number[] = []

  constructor(
    bottles: Bottle[],
    private onFindSolution: (solution: Step[]) => void
  ) {
    this.search(new Node(bottles, undefined))
  }

  private removeLastAddedNodeFromParent<T>(node: Node<T>) {
    node.parent?.children.pop()
  }

  private saveSearchProgress(solution: Step[]) {
    this.bestMoveCount = solution.length - 1
    this.closedBottlesPreStepInCurrentBestSolution = solution.map(step =>
      getNumOfClosedBottles(step)
    )
    this.foundASolution = true
  }

  private madeProgress(step: Step, stepIndex: number) {
    if (!this.foundASolution) return true
    return (
      getNumOfClosedBottles(step) >=
      this.closedBottlesPreStepInCurrentBestSolution[stepIndex]
    )
  }

  private search(node: Node<Step>, moveCount = 0) {
    const bottles = node.key
    if (
      !(this.foundASolution
        ? this.madeProgress(bottles, moveCount)
        : node.hasUniqueKeyInBranch(areEqualSteps))
    ) {
      this.removeLastAddedNodeFromParent(node)
      return
    }

    if (isGameWon(bottles) && moveCount < this.bestMoveCount) {
      const solution = node.getBranchKeys()
      this.onFindSolution(solution)
      this.saveSearchProgress(solution)
      return
    }

    bottles.forEach((fromBottle, i) => {
      bottles.forEach((toBottle, j) => {
        if (i === j) return

        const changedBottles = pour(fromBottle, toBottle)

        if (!changedBottles) return

        const { emptiedBottle, filledBottle } = changedBottles

        const nextStep = [...bottles]

        nextStep[i] = emptiedBottle
        nextStep[j] = filledBottle

        const newNode = new Node(nextStep, node)

        node.children.push(newNode)

        this.search(newNode, moveCount + 1)
      })
    })

    if (node.children.length === 0) this.removeLastAddedNodeFromParent(node)
  }
}

export default SolutionSearch
