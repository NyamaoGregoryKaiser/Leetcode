# Backtracking Algorithm Explanation

Backtracking is a general algorithmic technique used for solving problems that involve searching for a solution among many possible candidates. It systematically builds a solution incrementally, and if a partial solution is found to be invalid or not leading to a complete solution, it "backtracks" to an earlier state and tries a different path.

## Core Concepts of Backtracking

1.  **State Space Tree**: Backtracking can be visualized as exploring a state-space tree. Each node in the tree represents a partial solution, and the children of a node represent possible choices to extend that partial solution.
2.  **Choices**: At each step of the algorithm, there are multiple options or choices that can be made to extend the current partial solution.
3.  **Constraints**: Rules or conditions that determine if a choice is valid or if a partial solution is still promising. If a choice violates constraints, the path is pruned (no need to explore further down this branch).
4.  **Goal**: A condition that defines a complete and valid solution. When this condition is met, a solution is found.
5.  **Recursive Nature**: Backtracking is almost always implemented using recursion. A function makes a choice, recursively calls itself, and then *undoes* that choice (backtracks) before trying another.

## General Pseudocode Template

```
function backtrack(state, choices):
    if is_goal_state(state):
        add_solution(state)
        return

    for choice in choices_at_current_state(state):
        if is_valid_choice(state, choice):
            # Make a choice (explore)
            apply_choice(state, choice)

            # Recurse
            backtrack(new_state, new_choices)

            # Undo the choice (backtrack)
            remove_choice(state, choice)
```

## Problem-Specific Explanations

Let's apply these concepts to the problems in this project.

### 1. N-Queens Problem

**Problem**: Place N non-attacking queens on an N×N chessboard.

**Backtracking Components**:
*   **State**: The current arrangement of queens on the board up to a certain row. Represented by `currentBoard` and boolean arrays (`colUsed`, `diag1Used`, `diag2Used`).
*   **Choices**: For each row, trying to place a queen in any of the N columns.
*   **Constraints**: A queen cannot attack another queen horizontally, vertically, or diagonally.
    *   Horizontal check: Not needed because we place one queen per row.
    *   Vertical check: Use `colUsed` array.
    *   Diagonal checks: Use `diag1Used` (for `row - col`) and `diag2Used` (for `row + col`) arrays.
*   **Goal**: When a queen has been successfully placed in all `N` rows (`row == N`).
*   **"Undo"**: After recursively exploring a placement, remove the queen (`.`) and reset the `colUsed`, `diag1Used`, `diag2Used` flags.

**Visualization (N=4, Partial Search Tree)**:

```
                                  (Start)
                                 /   |   \
                     (Row 0, Col 0)  (Row 0, Col 1)  (Row 0, Col 2)
                     Q...            .Q..            ..Q.
                     ...             ...             ...
                     ...             ...             ...
                     ...             ...             ...
                        |                |                |
                (Row 1, Col 2)   (Row 1, Col 3)   (Row 1, Col 0)
                Q...             .Q..             ..Q.
                ..Q.             ...Q             Q...
                ....             ....             ....
                ....             ....             ....
                   |                 |                |
           (Row 2, Col ?)        (Row 2, Col 1)   (Row 2, Col 3)
           (NO VALID COL)        .Q..             ..Q.
           (BACKTRACK)           ...Q             Q...
                                 Q...             ....Q.
                                 ....             ...
                                   |                |
                           (Row 3, Col 3)   (Row 3, Col 1)
                           .Q..             ..Q.
                           ...Q             Q...
                           Q...             ....Q.
                           ..Q.             .Q..   <-- Solution 2
                           <-- Solution 1
```

### 2. Sudoku Solver

**Problem**: Fill empty cells ('.') in a 9x9 Sudoku grid according to Sudoku rules.

**Backtracking Components**:
*   **State**: The current 9x9 Sudoku board.
*   **Choices**: For each empty cell, trying digits '1' through '9'.
*   **Constraints**:
    1.  Digit must be unique in its row.
    2.  Digit must be unique in its column.
    3.  Digit must be unique in its 3x3 sub-grid.
*   **Goal**: When all cells on the board are filled (no more '.').
*   **"Undo"**: If a digit placement doesn't lead to a solution, remove the digit (`.`) from the cell.

**Visualization (Sudoku Grid States)**:

```
Initial Board:        Attempt 1 (Cell 0,0='5'):    Attempt 2 (Cell 0,0='6', invalid):
5 3 . | . 7 . | . . .   5 3 . | . 7 . | . . .   ->  6 3 . | . 7 . | . . .  (Violates Row 0 or Col 0 or Box 0)
6 . . | 1 9 5 | . . .   6 . . | 1 9 5 | . . .   ->  6 . . | 1 9 5 | . . .
. 9 8 | . . . | . 6 .   . 9 8 | . . . | . 6 .       . 9 8 | . . . | . 6 .
---------------------   ---------------------       ---------------------
...                   ...                     ...

After `backtrack(board)` on initial:
5 3 4 | 6 7 8 | 9 1 2
6 7 2 | 1 9 5 | 3 4 8
1 9 8 | 3 4 2 | 5 6 7
---------------------
8 5 9 | 7 6 1 | 4 2 3
4 2 6 | 8 5 3 | 7 9 1
7 1 3 | 9 2 4 | 8 5 6
---------------------
9 6 1 | 5 3 7 | 2 8 4
2 8 7 | 4 1 9 | 6 3 5
3 4 5 | 2 8 6 | 1 7 9
```

### 3. Combination Sum II

**Problem**: Find unique combinations from a candidate list that sum to a target, where each number can be used once.

**Backtracking Components**:
*   **State**: The current sum and the list of numbers in `current_combination`.
*   **Choices**: At each step, selecting a number from the `candidates` list (starting from a `start_index` to avoid re-using previously considered elements in the current path).
*   **Constraints**:
    *   Sum of numbers in `current_combination` must not exceed `target`.
    *   Each number from `candidates` can be used at most once in a combination.
    *   To ensure unique combinations (despite duplicate candidates), sort `candidates` and skip duplicates (`if (i > start_index && candidates[i] == candidates[i - 1]) continue;`).
*   **Goal**: When `current_sum == target`.
*   **"Undo"**: Remove the last added number from `current_combination`.

**Visualization (Candidates={1,1,2,5}, Target=5)**:

```
        [] (target=5, start=0)
       /   |   \
    [1]    [2]    [5]
 (t=4,s=1) (t=3,s=2) (t=0,s=3)
   /   \    /   \        |
 [1,1] [1,2] [2,5] [X]    [5] <-- Solution!
(t=3,s=2) (t=2,s=3) (t=0,s=3) (t<0)
   |     |      |
 [1,1,2] [1,2] [2,5] <-- Solution!
(t=1,s=3) (t=2,s=3)
   |
  [X] (t<0)
```
*Note the `i > start_index && candidates[i] == candidates[i - 1]` condition prevents selecting the same '1' from `candidates[0]` and `candidates[1]` in the *same position* in the combination, effectively making them distinct choices from the pool.*

### 4. Permutations

**Problem**: Generate all possible permutations of a given array of distinct integers.

**Backtracking Components**:
*   **State**: The current `current_permutation` being built.
*   **Choices**: At each step, selecting an unused number from the input `nums` array.
*   **Constraints**: Each number from `nums` can be used exactly once in a permutation. Use a `used` boolean array.
*   **Goal**: When `current_permutation` has a length equal to `nums.size()`.
*   **"Undo"**: Remove the last added number from `current_permutation` and mark it as unused in the `used` array.

**Visualization (Nums={1,2,3})**:

```
                 [] (used=[F,F,F])
       /         |         \
     [1]       [2]       [3]
 (used=[T,F,F]) (used=[F,T,F]) (used=[F,F,T])
    /   \         /   \         /   \
  [1,2] [1,3]   [2,1] [2,3]   [3,1] [3,2]
(used=[T,T,F])(used=[T,F,T]) ...
   |      |       |      |       |      |
 [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]  <-- Solutions!
```

---