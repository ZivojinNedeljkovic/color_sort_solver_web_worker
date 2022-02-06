class Node<T> {
  children: Node<T>[] = []

  constructor(public key: T, public parent: Node<T> | undefined) {}

  private _hasUniqueKeyInBranch(
    areEqualKeys: (key1: T, key2: T) => boolean,
    ancestorNode: Node<T> | undefined
  ): boolean {
    if (!ancestorNode) return true

    if (areEqualKeys(this.key, ancestorNode.key)) return false

    return this._hasUniqueKeyInBranch(areEqualKeys, ancestorNode.parent)
  }

  hasUniqueKeyInBranch(areEqualKeys: (key1: T, key2: T) => boolean) {
    return this._hasUniqueKeyInBranch(areEqualKeys, this.parent)
  }

  getBranchKeys() {
    const ancestryKeys: T[] = []
    let branchNode: Node<T> | undefined = this

    while (branchNode) {
      ancestryKeys.push(branchNode.key)
      branchNode = branchNode.parent
    }

    return ancestryKeys.reverse()
  }
}

export default Node
