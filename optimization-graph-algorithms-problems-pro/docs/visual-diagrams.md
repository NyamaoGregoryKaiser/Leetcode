```markdown
# Graph Algorithms: Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the steps and concepts of some fundamental graph algorithms.

---

## 1. Breadth-First Search (BFS) - Shortest Path in Unweighted Graph

**Problem:** Find the shortest path from node `A` to node `F`.

**Graph Structure:**

```
      A -- B
     /      \
    C        D -- F
     \      /
      E
```

**Step-by-Step Visualization (BFS from A to F):**

1.  **Initial State:**
    *   Queue: `[A]`
    *   Visited: `{A}`
    *   Parent Map: `{ A: null }`
    *   Path: (unknown)

    ```
        (A) - B
       /       \
      C         D - F
     /         /
    E
    ```
    `(A)`: Current node

2.  **Dequeue A. Neighbors of A: B, C.**
    *   Queue: `[B, C]`
    *   Visited: `{A, B, C}`
    *   Parent Map: `{ A: null, B: A, C: A }`

    ```
        A -- (B)
       /  /
      (C)
     /   \
    E     D - F
         /
    ```
    `(B), (C)`: Enqueued neighbors

3.  **Dequeue B. Neighbors of B: A (visited), D.**
    *   Queue: `[C, D]`
    *   Visited: `{A, B, C, D}`
    *   Parent Map: `{ A: null, B: A, C: A, D: B }`

    ```
        A -- B
       /      \
      C        (D) - F
     /         /
    E
    ```
    `(D)`: Enqueued neighbor

4.  **Dequeue C. Neighbors of C: A (visited), E.**
    *   Queue: `[D, E]`
    *   Visited: `{A, B, C, D, E}`
    *   Parent Map: `{ A: null, B: A, C: A, D: B, E: C }`

    ```
        A -- B
       /      \
      C        D - F
     /         /
    (E)
    ```
    `(E)`: Enqueued neighbor

5.  **Dequeue D. Neighbors of D: B (visited), E (visited), F.**
    *   Queue: `[E, F]`
    *   Visited: `{A, B, C, D, E, F}`
    *   Parent Map: `{ A: null, B: A, C: A, D: B, E: C, F: D }`

    ```
        A -- B
       /      \
      C        D -- (F) <-- TARGET FOUND!
     /         /
    E
    ```
    `(F)`: Enqueued neighbor, which is the target!

6.  **Target Found (F)! Reconstruct Path:**
    *   F <- Parent(F) = D
    *   D <- Parent(D) = B
    *   B <- Parent(B) = A
    *   A <- Parent(A) = null (STOP)

    **Shortest Path: `A -> B -> D -> F`**

---

## 2. Dijkstra's Algorithm - Shortest Path in Weighted Graph

**Problem:** Find the shortest path from node `A` to all other nodes.

**Graph Structure (Directed, Weighted):**

```
        (A)
       / | \
    (4)/  | \ (2)
      /   |   \
    (B) --|--(3)-- (C)
     \    |    /
    (5)\  |   / (2)
        \ |  /
         (D) --(1)-- (E)
```

**Weights:** A-B: 4, A-C: 2, B-D: 5, C-D: 2, D-E: 1. (Self-loop for visualization clarity, ignore in actual graph for simple path)

**Step-by-Step Visualization (Dijkstra from A):**

*   **Initialization:**
    *   Distances: `A:0, B:∞, C:∞, D:∞, E:∞`
    *   Paths: `A:null, B:null, C:null, D:null, E:null`
    *   PQ: `[(A, 0)]`
    *   Visited: `{}`

1.  **Extract (A, 0) from PQ.**
    *   Visited: `{A}`
    *   Neighbors of A: B (weight 4), C (weight 2)
        *   Relax B: `0 + 4 = 4 < ∞`. `distances[B]=4`, `paths[B]=A`. Add `(B, 4)` to PQ.
        *   Relax C: `0 + 2 = 2 < ∞`. `distances[C]=2`, `paths[C]=A`. Add `(C, 2)` to PQ.
    *   PQ: `[(C, 2), (B, 4)]`

2.  **Extract (C, 2) from PQ.**
    *   Visited: `{A, C}`
    *   Neighbors of C: D (weight 2)
        *   Relax D: `2 + 2 = 4 < ∞`. `distances[D]=4`, `paths[D]=C`. Add `(D, 4)` to PQ.
    *   PQ: `[(B, 4), (D, 4)]`

3.  **Extract (B, 4) from PQ.** (Note: B and D have same priority, order depends on PQ implementation)
    *   Visited: `{A, C, B}`
    *   Neighbors of B: D (weight 5)
        *   Relax D: `4 + 5 = 9`. `9` is NOT less than `distances[D]` (which is `4`). No update.
    *   PQ: `[(D, 4)]`

4.  **Extract (D, 4) from PQ.**
    *   Visited: `{A, C, B, D}`
    *   Neighbors of D: E (weight 1)
        *   Relax E: `4 + 1 = 5 < ∞`. `distances[E]=5`, `paths[E]=D`. Add `(E, 5)` to PQ.
    *   PQ: `[(E, 5)]`

5.  **Extract (E, 5) from PQ.**
    *   Visited: `{A, C, B, D, E}`
    *   Neighbors of E: (none)
    *   PQ: `[]`

**Final Results:**

*   **Distances from A:**
    *   A: 0
    *   B: 4 (Path: A -> B)
    *   C: 2 (Path: A -> C)
    *   D: 4 (Path: A -> C -> D)
    *   E: 5 (Path: A -> C -> D -> E)

---

## 3. Cycle Detection in Directed Graph (DFS)

**Problem:** Detect if a cycle exists in the given directed graph.

**Graph Structure 1 (with Cycle):**

```
  A <--- B
  ^      |
  |      v
  D ---> C
```
(Cycle: B -> C -> D -> A -> B)

**Step-by-Step Visualization (DFS-based Cycle Detection):**

*   **Node States:**
    *   White (Unvisited)
    *   Gray (Visiting - in recursion stack)
    *   Black (Visited - finished exploring)

1.  **Start DFS from A (assuming alphabetical iteration):**
    *   `dfs(A)`: Set A to Gray.
        *   Neighbors of A: B
        *   `dfs(B)`: Set B to Gray.
            *   Neighbors of B: C
            *   `dfs(C)`: Set C to Gray.
                *   Neighbors of C: D
                *   `dfs(D)`: Set D to Gray.
                    *   Neighbors of D: A
                    *   A is Gray! **CYCLE DETECTED (D -> A)!** Return true.
            *   `dfs(C)` returns true (propagated).
        *   `dfs(B)` returns true (propagated).
    *   `dfs(A)` returns true (propagated).

    **Result: Cycle Detected.**

---

**Graph Structure 2 (without Cycle - DAG):**

```
  A ---> B
  |      |
  v      v
  C ---> D
```

**Step-by-Step Visualization (DFS-based Cycle Detection):**

1.  **Start DFS from A:**
    *   `dfs(A)`: Set A to Gray.
        *   Neighbors of A: B, C
        *   `dfs(B)`: Set B to Gray.
            *   Neighbors of B: D
            *   `dfs(D)`: Set D to Gray.
                *   Neighbors of D: (none)
            *   Set D to Black. `dfs(D)` returns false.
        *   Set B to Black. `dfs(B)` returns false.
        *   `dfs(C)`: Set C to Gray.
            *   Neighbors of C: D
            *   D is Black (Visited). Ignore.
        *   Set C to Black. `dfs(C)` returns false.
    *   Set A to Black. `dfs(A)` returns false.

**Result: No Cycle Detected.**

---
```