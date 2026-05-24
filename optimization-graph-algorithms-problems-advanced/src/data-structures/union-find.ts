/**
 * src/data-structures/union-find.ts
 * Implements the Union-Find (Disjoint Set Union) data structure.
 * Essential for Kruskal's algorithm to efficiently detect cycles.
 */

/**
 * A generic Union-Find (Disjoint Set Union) data structure.
 * Supports path compression and union by rank/size for optimal performance.
 * @template T The type of the elements in the sets (e.g., number, string).
 */
export class UnionFind<T = number> {
  // `parent` maps an element to its parent. If an element is its own parent, it's a root.
  private parent: Map<T, T>;
  // `rank` (or size) maps a root to the rank (or size) of its tree. Used for optimizing union.
  private rank: Map<T, number>;

  constructor(elements?: T[]) {
    this.parent = new Map<T, T>();
    this.rank = new Map<T, number>();

    // Initialize each element into its own set
    if (elements) {
      for (const element of elements) {
        this.makeSet(element);
      }
    }
  }

  /**
   * Creates a new set containing only the given element.
   * If the element already exists, it does nothing.
   * @param element The element to make a new set for.
   *
   * Time Complexity: O(1) on average.
   * Space Complexity: O(1) if new element.
   */
  public makeSet(element: T): void {
    if (!this.parent.has(element)) {
      this.parent.set(element, element); // Element is its own parent (root of its set)
      this.rank.set(element, 0); // Initialize rank to 0 (or size to 1)
    }
  }

  /**
   * Finds the representative (root) of the set that `element` belongs to.
   * Applies path compression to flatten the tree structure for faster future lookups.
   * @param element The element to find the root for.
   * @returns The representative element of the set.
   * @throws Error if the element is not part of any set.
   *
   * Time Complexity: Amortized O(α(N)), where α is the inverse Ackermann function,
   *                  which is practically constant for all realistic N.
   * Space Complexity: O(D) in the worst case for recursion stack, where D is tree depth,
   *                   but effectively O(1) due to path compression.
   */
  public find(element: T): T {
    if (!this.parent.has(element)) {
      throw new Error(`Element ${element} not found in any set.`);
    }

    // Base case: if element is its own parent, it's the root
    if (this.parent.get(element) === element) {
      return element;
    }

    // Path compression: recursively find the root and set it as the direct parent
    const root = this.find(this.parent.get(element)!);
    this.parent.set(element, root);
    return root;
  }

  /**
   * Merges the sets containing `element1` and `element2` into a single set.
   * Uses union by rank/size heuristic to keep the trees flat.
   * @param element1 An element from the first set.
   * @param element2 An element from the second set.
   * @returns True if a union was performed (elements were in different sets), false otherwise.
   * @throws Error if either element is not part of any set.
   *
   * Time Complexity: Amortized O(α(N)).
   * Space Complexity: O(1).
   */
  public union(element1: T, element2: T): boolean {
    const root1 = this.find(element1);
    const root2 = this.find(element2);

    if (root1 !== root2) {
      // Union by rank: attach the smaller rank tree under the root of the larger rank tree.
      // If ranks are equal, pick one as root and increment its rank.
      const rank1 = this.rank.get(root1)!;
      const rank2 = this.rank.get(root2)!;

      if (rank1 < rank2) {
        this.parent.set(root1, root2);
      } else if (rank2 < rank1) {
        this.parent.set(root2, root1);
      } else {
        this.parent.set(root2, root1);
        this.rank.set(root1, rank1 + 1);
      }
      return true; // A union was performed
    }
    return false; // Elements were already in the same set
  }

  /**
   * Checks if two elements belong to the same set.
   * @param element1 The first element.
   * @param element2 The second element.
   * @returns True if they are in the same set, false otherwise.
   *
   * Time Complexity: Amortized O(α(N)).
   * Space Complexity: O(1).
   */
  public areConnected(element1: T, element2: T): boolean {
    return this.find(element1) === this.find(element2);
  }

  /**
   * Returns all elements currently managed by the Union-Find structure.
   * @returns An array of all elements.
   *
   * Time Complexity: O(N), where N is the number of elements.
   * Space Complexity: O(N).
   */
  public getElements(): T[] {
    return Array.from(this.parent.keys());
  }

  /**
   * Returns the number of disjoint sets.
   * @returns The count of unique representative roots.
   *
   * Time Complexity: O(N) to iterate through all elements. Could be optimized to O(1) with a counter.
   * Space Complexity: O(N) for storing `roots`.
   */
  public countSets(): number {
    const roots = new Set<T>();
    for (const element of this.parent.keys()) {
      roots.add(this.find(element));
    }
    return roots.size;
  }
}