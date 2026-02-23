# Backtracking Visual Diagrams (ASCII Art)

Visualizing the backtracking process can greatly aid understanding. Here, we use ASCII art to depict state-space trees for typical backtracking problems.

## 1. N-Queens (N=4) - Partial State-Space Tree

Let's visualize a tiny portion of the N-Queens problem for N=4.
Each level represents placing a queen in a row. A node `Q(r,c)` means a queen is placed at row `r`, column `c`.

```
                  Root (Empty Board)
                        |
            +-----------+-----------+-----------+-----------+
            |           |           |           |           |
        Q(0,0)      Q(0,1)      Q(0,2)      Q(0,3)
          /|\         /|\         /|\         /|\
         / | \       / | \       / | \       / | \
        /  |  \     /  |  \     /  |  \     /  |  \

(Path 1: Q(0,0))
Current board:
Q . . .
. . . .
. . . .
. . . .
Possible columns for Q(1,c):
C0 (X) C1 (ok) C2 (ok) C3 (ok)
So, try Q(1,2) or Q(1,3) (Q(1,1) also OK, but diag clash for Q(0,0))
(Q(0,0) blocks C0, D1, AD-1)

                  Root
                    |
                Q(0,0) (place Queen at (0,0))
                    |
                    +--------------------+--------------------+
                    |                    |                    |
                Q(1,2) (place Queen at (1,2))
                    |
                    +--------------------+
                    |                    |
             (Q(2,1))       (Q(2,3) -> blocks Q(1,2) from C2, D3, AD1 - X)
                 |
                 | (Q(2,1) blocks C1, D3, AD0)
                 |
               Q(3,3) (Q(3,3) blocks C3, D6, AD0)
                 |
              NO VALID COLUMN LEFT FOR Q(3,c)
                (Q(3,0) blocked by Q(0,0) AD-1, Q(3,1) by Q(2,1) C1, Q(3,2) by Q(1,2) AD1, Q(3,3) C3)
                 |
             BACKTRACK TO Q(2,1)
                    | (Try other choices for Q(2,c))
                 Q(2,X) (No other valid choice for row 2)
                    |
             BACKTRACK TO Q(1,2)
                    | (Try other choices for Q(1,c))
                 Q(1,X) (No other valid choice for row 1 after Q(1,2) failed path)
                    |
             BACKTRACK TO Q(0,0)
                    | (Try other choices for Q(0,c))
                  ... explore Q(0,1), Q(0,2), Q(0,3) ...

Eventually finds solutions like:
.Q..
...Q
Q...
..Q.
(Path: Q(0,1) -> Q(1,3) -> Q(2,0) -> Q(3,2))

```

## 2. Subsets (e.g., [1, 2, 3]) - Decision Tree

For each element, we have two choices: include it or exclude it.

```
                             [] (start_index = 0)
                            /  \
                           /    \
                       [1]        []
                     (pick 1)   (skip 1)
                     i = 1        i = 1
                      /  \         /  \
                     /    \       /    \
                  [1,2]    [1]   [2]    []
                 (pick 2) (skip 2)(pick 2)(skip 2)
                 i = 2    i = 2   i = 2    i = 2
                  / \     / \     / \     / \
                 /   \   /   \   /   \   /   \
              [1,2,3] [1,2] [1,3] [1] [2,3] [2] [3] []
             (pick 3) (skip 3) ... (all 8 subsets)
```
Each node represents a current `current_subset` that is added to `all_subsets`.
For `Subsets II` (with duplicates like `[1,2,2]`), the tree branches look similar, but pruning rules (`if (i > start_index && nums[i] == nums[i-1]) continue;`) would cut redundant branches. For example, after visiting `[1,2]` using the first '2', the branch exploring `[1,2]` using the second '2' would be skipped.

## 3. Permutations (e.g., [1, 2, 3]) - Decision Tree

For permutations, we pick one unused element at each step.

```
                             [] (used = [F,F,F])
                /          |          \
               /           |           \
            [1]           [2]           [3]
         (used[0]=T)   (used[1]=T)   (used[2]=T)
          /     \        /     \         /     \
         /       \      /       \       /       \
      [1,2]     [1,3]  [2,1]   [2,3]   [3,1]   [3,2]
   (used[1]=T) (used[2]=T) (used[0]=T) ...
       |         |        |         |         |        |
    [1,2,3]   [1,3,2]  [2,1,3]   [2,3,1]   [3,1,2]   [3,2,1]
 (used[2]=T) (used[1]=T) (used[2]=T) ...
(All 6 permutations)
```
For `Permutations II` (with duplicates like `[1,1,2]`), the pruning rule (`if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue;`) would prevent branches like:
`[1 (first), ...]` and `[1 (second), ...]` from both being explored if `nums[i-1]` was available and identical. This ensures only unique permutations are generated.
---