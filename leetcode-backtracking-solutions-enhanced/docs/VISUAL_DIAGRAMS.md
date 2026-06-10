# Visual Diagrams for Backtracking

Visualizing the decision-making process is crucial for understanding backtracking. Here, we'll use ASCII art to represent simplified decision trees and board states.

---

## 1. Permutations - `permutations([1, 2, 3])`

This diagram illustrates how the `backtrack` function explores different paths to generate all permutations. Each node represents a state (`current_permutation`). Edges represent choices.

```
                                    "" (start, path=[], used=[F,F,F])
                                     |
              +----------------------+----------------------+
              |                      |                      |
            [1] (pick 1)           [2] (pick 2)           [3] (pick 3)
         used=[T,F,F]           used=[F,T,F]           used=[F,F,T]
            /   \                  /   \                  /   \
           /     \                /     \                /     \
    [1,2] (pick 2) [1,3] (pick 3) [2,1] (pick 1) [2,3] (pick 3) [3,1] (pick 1) [3,2] (pick 2)
  used=[T,T,F]   used=[T,F,T]   used=[T,T,F]   used=[F,T,T]   used=[T,F,T]   used=[F,T,T]
      |               |               |               |               |               |
    [1,2,3]         [1,3,2]         [2,1,3]         [2,3,1]         [3,1,2]         [3,2,1]
 (Goal: len=3)   (Goal: len=3)   (Goal: len=3)   (Goal: len=3)   (Goal: len=3)   (Goal: len=3)
  add to results  add to results  add to results  add to results  add to results  add to results
```

**Key takeaways:**
*   **Depth-First Search:** The algorithm explores one path fully before backtracking.
*   **Choices at each level:** At each level (depth), the choices are from the *remaining* available elements.
*   **Backtracking:** After `[1,2,3]` is found, it backtracks from `[1,2]` (undoing pick 3), then from `[1]` (undoing pick 2), then tries `[1,3]`.

---

## 2. Combination Sum II - `combination_sum_ii([1,1,2], 3)`

Here, we need combinations that sum to 3, and each number from `[1,1,2]` can be used once. Input is sorted `[1,1,2]`.

```
                                  (start, path=[], target=3)
                                      |
                      +---------------+----------------+
                      |                                |
   (pick 1st '1') [1] (path=[1], target=2)             (pick 2) [2] (path=[2], target=1)
   index=0                                             index=2
      |                                                    |
      +-------------------+-----------------+              +-------------------+
      |                   |                 |              |                   |
(pick 2nd '1') [1,1] (path=[1,1], target=1) (skip 2nd '1') (pick nothing else) (skip '1's) [2] (path=[2], target=1)
index=1 (not 0)          index=1           (because candidates[1]==candidates[0] and i>start_index=0 for this choice)
     |                                                      |
(pick 2) [1,1,2] (path=[1,1,2], target=-1)               (prune, target < 0)
index=2 (pruned, target < 0)

                                                     (pick 1st '1') [1] (path=[1], target=2)
                                                     index=0 (next choice from original start_index=0)
                                                          |
                                           +--------------+--------------+
                                           |              |              |
 (pick 2nd '1') [1,1] (path=[1,1], target=1) (skip 2nd '1' due to duplicate handling) (pick 2) [1,2] (path=[1,2], target=0)
 index=1                                                                 index=2
    |                                                                         |
(pick nothing else)                                                       (Goal: target=0) [1,2]
                                                                          Add to results.
                                                                          Results: [[1,2]]
```
*(Self-correction during generation: The first diagram had an issue with the "skip 2nd '1'" logic. It should be applied when processing choices at a certain level to prevent picking `candidates[i]` if `candidates[i] == candidates[i-1]` and `i > current_start_index` in the loop, meaning it's a sibling duplicate. The path from [1] should still allow [1,2] and then [1,1,1] not possible, etc. The primary mechanism is `i > start_index and candidates[i] == candidates[i-1]: continue` within the *same* loop iteration.)*

Let's refine the diagram for `combination_sum_ii([1,1,2], 3)` with proper duplicate handling:

```
                                  (start, path=[], remaining_target=3)
                                      |
              +-----------------------+-----------------------+
              |                                               |
(i=0) choose 1st '1'                (i=1) skip 2nd '1'       (i=2) choose '2'
candidates[0]=1                     (due to i > start_index and candidates[1]==candidates[0])
path=[1], rem_target=2                                       path=[2], rem_target=1
start_index=1                                                start_index=3
       |                                                            |
       +-----------------------+                                  (no more candidates at index 3)
       |                       |
(i=1) choose 2nd '1'          (i=2) choose '2'
candidates[1]=1               candidates[2]=2
path=[1,1], rem_target=1      path=[1,2], rem_target=0
start_index=2                 start_index=3
       |                          |
       +----------+          (GOAL: target=0)
       |          |          results.add([1,2])
(i=2) choose '2'  (no more candidates at index 2 for rem_target=1)
candidates[2]=2
path=[1,1,2], rem_target=-1
(PRUNE: target < 0)

Final Unique Results: [[1,2]]
```
Wait, the example `combination_sum_ii([10, 1, 2, 7, 6, 1, 5], 8)` with `candidates` sorted to `[1, 1, 2, 5, 6, 7, 10]` yields `[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]`. My small example `[1,1,2], 3` only yielded `[1,2]`. This means `[1,1]` is not possible as `[1,1]` doesn't sum to 3 itself, and `[1,1,X]` is not possible from `[1,1,2]` for `X` to sum to 1. My diagram should clearly show `start_index` and the pruning logic for duplicates.

Let's rethink `combination_sum_ii` with `candidates = [1, 1, 2], target = 3`:

Initial call: `backtrack(start_index=0, remaining_target=3)`

*   **Loop `i` from 0 to 2:**
    *   **`i = 0` (candidate `1`):**
        *   `path.append(1)` -> `path=[1]`
        *   `backtrack(start_index=1, remaining_target=2)`
            *   **Loop `i` from 1 to 2:**
                *   **`i = 1` (candidate `1`):** (This is `candidates[1]`. `i=1` is `start_index` for this call, so `i > start_index` is false, no duplicate skip.)
                    *   `path.append(1)` -> `path=[1,1]`
                    *   `backtrack(start_index=2, remaining_target=1)`
                        *   **Loop `i` from 2 to 2:**
                            *   **`i = 2` (candidate `2`):**
                                *   `path.append(2)` -> `path=[1,1,2]`
                                *   `backtrack(start_index=3, remaining_target=-1)`
                                    *   `remaining_target < 0`. **PRUNE.** Return `False`.
                                *   `path.pop()` -> `path=[1,1]`
                        *   No other choices for `i` in inner loop. Return `False`.
                    *   `path.pop()` -> `path=[1]`
                *   **`i = 2` (candidate `2`):** (This is `candidates[2]`. `i=2` is greater than `start_index=1`, but `candidates[2]` (2) is not equal to `candidates[1]` (1), so no duplicate skip.)
                    *   `path.append(2)` -> `path=[1,2]`
                    *   `backtrack(start_index=3, remaining_target=0)`
                        *   `remaining_target == 0`. **GOAL.** `results.append([1,2])`. Return `True`.
                    *   `path.pop()` -> `path=[1]`
            *   Return `True` (since `[1,2]` path was found).
        *   `path.pop()` -> `path=[]`
    *   **`i = 1` (candidate `1`):** (`i=1` is not `start_index=0`. `candidates[1]` (1) is equal to `candidates[0]` (1). **SKIP DUPLICATE.** Continue to next `i`.)
        *   No action.
    *   **`i = 2` (candidate `2`):**
        *   `path.append(2)` -> `path=[2]`
        *   `backtrack(start_index=3, remaining_target=1)`
            *   **Loop `i` from 3 to 2:** Loop does not run. Return `False`.
        *   `path.pop()` -> `path=[]`

Final Result: `[[1,2]]`. This makes sense for `[1,1,2], 3`.

The visual diagram needs to clearly show the `start_index` for the loop and the condition `i > start_index and candidates[i] == candidates[i-1]` for skipping.

```
                               (start, path=[], rem_target=3, start_idx=0)
                                        |
                      +-----------------+-----------------+
                      |                 |                 |
(i=0) Pick `1`    (i=1) Skip `1`      (i=2) Pick `2`
path=[1]          (candidates[1]==candidates[0] AND 1 > 0)
rem_target=2
start_idx=1
       |
       +-----------------+
       |                 |
(i=1) Pick `1`          (i=2) Pick `2`
path=[1,1]              path=[1,2]
rem_target=1            rem_target=0
start_idx=2             start_idx=3
       |                    |
       |                    (GOAL) results.add([1,2])
       |
(i=2) Pick `2`
path=[1,1,2]
rem_target=-1
(PRUNE: rem_target < 0)

Final Result: [[1,2]]
```

This is much clearer.

---

## 3. N-Queens (N=4)

Placing 4 queens on a 4x4 board.

```
Initial board:
. . . .
. . . .
. . . .
. . . .

backtrack(row=0)
  Try col=0:
    Q . . .  (cols={0}, diag1s={0}, diag2s={0})
    . . . .
    . . . .
    . . . .
    backtrack(row=1)
      Try col=0: (Conflict: col 0) -> Prune
      Try col=1: (Conflict: diag1: (1-1)=0) -> Prune
      Try col=2:
        Q . . .
        . . Q .  (cols={0,2}, diag1s={0,-1}, diag2s={0,3})
        . . . .
        . . . .
        backtrack(row=2)
          Try col=0: (Conflict: col 0, diag2: (2+0)=2) -> Prune
          Try col=1: (Conflict: diag1: (2-1)=1, diag2: (2+1)=3) -> Prune
          Try col=2: (Conflict: col 2) -> Prune
          Try col=3:
            Q . . .
            . . Q .
            . . . Q  (cols={0,2,3}, diag1s={0,-1,-1}, diag2s={0,3,5})
            . . . .
            backtrack(row=3)
              Try col=0: (Conflict: col 0, diag1: (3-0)=3) -> Prune
              Try col=1: (Conflict: diag1: (3-1)=2, diag2: (3+1)=4) -> Prune
              Try col=2: (Conflict: col 2, diag2: (3+2)=5) -> Prune
              Try col=3: (Conflict: col 3) -> Prune
            Backtrack from row=3 (no solution found for this path)
        Backtrack from row=2
      Backtrack from row=1
    Backtrack from row=0 (undoes first choice)

  Try col=1:
    . Q . .  (cols={1}, diag1s={-1}, diag2s={1})
    . . . .
    . . . .
    . . . .
    backtrack(row=1)
      Try col=0: (No conflict)
        . Q . .
        Q . . .  (cols={1,0}, diag1s={-1,1}, diag2s={1,1})
        . . . .
        . . . .
        backtrack(row=2)
          Try col=0: (Conflict: col 0) -> Prune
          Try col=1: (Conflict: col 1, diag1: (2-1)=1, diag2: (2+1)=3) -> Prune
          Try col=2: (Conflict: diag2: (2+2)=4) -> Prune
          Try col=3:
            . Q . .
            Q . . .
            . . . Q  (cols={1,0,3}, diag1s={-1,1,-1}, diag2s={1,1,5})
            . . . .
            backtrack(row=3)
              Try col=0: (Conflict: col 0) -> Prune
              Try col=1: (No conflict)
                . Q . .
                Q . . .
                . . . Q
                . . Q .  (cols={1,0,3,2}, diag1s={-1,1,-1,1}, diag2s={1,1,5,5})
                backtrack(row=4)
                  (Goal: row=4) Found solution! Add `[[.Q..],[Q...],[...Q],[..Q.]]` to results.
                Backtrack from row=4
              Backtrack from row=3
        Backtrack from row=2
      Backtrack from row=1
    ... and so on for all branches, eventually finding the second solution.
```

This visualization emphasizes:
*   **Sequential Placement:** Queens are placed row by row.
*   **Conflict Checking:** The power of `cols`, `diag1s`, `diag2s` sets for O(1) conflict checks.
*   **Early Pruning:** Invalid paths are abandoned immediately.

---