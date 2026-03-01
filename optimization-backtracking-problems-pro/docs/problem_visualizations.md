# Backtracking Problem Visualizations (ASCII Art)

This document provides ASCII art diagrams to illustrate the decision-making process in backtracking for some of the problems implemented.

## 1. Subsets (Power Set) - `nums = [1, 2, 3]`

The decision tree for generating subsets. At each element, we have two choices: include it or exclude it.

```
                                []  (Start)
                               / \
                              /   \
                             /     \
                (Include 1) [1]     [] (Exclude 1)
                           / \      / \
                          /   \    /   \
                         /     \  /     \
            (Include 2) [1,2]   [1]     [2]     []
                       / \     / \     / \     / \
                      /   \   /   \   /   \   /   \
                     /     \ /     \ /     \ /     \
        (Include 3) [1,2,3] [1,2] [1,3] [1] [2,3] [2] [3] []  (End of decision for all elements)

Final Subsets (from leaf nodes):
[1,2,3], [1,2], [1,3], [1], [2,3], [2], [3], []
```
*Note: The actual recursive calls build the `current_subset` and add its copy to `results` when all elements are considered (base case), effectively collecting all leaf nodes.*

## 2. Permutations - `nums = [1, 2, 3]`

The state-space tree for generating permutations. At each step, we choose an unused element.

```
                                  [] (Start)
                                 / | \
                                /  |  \
                               /   |   \
                           [1]    [2]   [3] (Choose first element)
                          /   \  /   \  /   \
                         /     \/     \/     \
                     [1,2]   [1,3] [2,1] [2,3] [3,1] [3,2] (Choose second element from remaining)
                      |       |     |     |     |     |
                      |       |     |     |     |     |
                      |       |     |     |     |     |
                   [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1] (Choose third element from remaining)

Final Permutations (from leaf nodes):
[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
```
*Note: The `visited` array (or swapping elements) helps track which numbers are "remaining" for selection at each level.*

## 3. N-Queens - `N = 4`

Illustrating the N-Queens problem for `N=4`. We try to place queens row by row.
`board_state[row]` stores the column index of the queen in that row.

```
Initial state:
[_,_,_,_]  (row 0 to 3, all -1)

Try placing Q at (0,0): (invalid as it blocks other queens early on)
[Q,_,_,_]

Let's try a path that leads to a solution for N=4:

Row 0: Try placing Q at (0,1)
Board_state: [1, -1, -1, -1]
.Q..
....
....
....

  -> Recurse for Row 1: Try placing Q at (1,3) (safe)
     Board_state: [1, 3, -1, -1]
     .Q..
     ...Q
     ....
     ....

       -> Recurse for Row 2: Try placing Q at (2,0) (safe)
          Board_state: [1, 3, 0, -1]
          .Q..
          ...Q
          Q...
          ....

            -> Recurse for Row 3: Try placing Q at (3,2) (safe)
               Board_state: [1, 3, 0, 2]
               .Q..
               ...Q
               Q...
               ..Q.
               (Base case: row == N, add to results. THEN BACKTRACK)

            <- Backtrack from (3,2). Try other columns for Row 3 (none work).
         <- Backtrack from (2,0). Try other columns for Row 2 (none work).
      <- Backtrack from (1,3). Try other columns for Row 1 (none work).

(This path produced one solution)

Let's trace another solution path:

Initial state:
[_,_,_,_]

Row 0: Try placing Q at (0,2)
Board_state: [_,_,Q,_]
..Q.
....
....
....

  -> Recurse for Row 1: Try placing Q at (1,0) (safe)
     Board_state: [_,Q,_,_]
     ..Q.
     Q...
     ....
     ....

       -> Recurse for Row 2: Try placing Q at (2,3) (safe)
          Board_state: [_,_,_,Q]
          ..Q.
          Q...
          ...Q
          ....

            -> Recurse for Row 3: Try placing Q at (3,1) (safe)
               Board_state: [_,Q,_,Q]
               ..Q.
               Q...
               ...Q
               .Q..
               (Base case: row == N, add to results. THEN BACKTRACK)
```
*Note: The `is_safe` function prunes branches very effectively. For instance, if you try to place Q at (0,0) for N=4, it will immediately find no safe spots in subsequent rows, leading to quick backtracking.*