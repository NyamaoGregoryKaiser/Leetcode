# Backtracking Algorithm Explained

Backtracking is an algorithmic paradigm for solving problems, typically constraint-satisfaction problems, that incrementally builds candidates to the solutions. It abandons a candidate (backtracks) as soon as it determines that the candidate cannot possibly be completed to a valid solution.

## 1. What is Backtracking?

Imagine you're navigating a maze. At each junction, you have several paths. You pick one, go down it, and if it leads to a dead end, you retrace your steps to the last junction and try another path. This process of trying a path, realizing it's wrong, and going back to try another is the essence of backtracking.

In algorithmic terms, backtracking involves:
*   **Building a solution step-by-step**: Each step makes a "choice".
*   **Checking for constraints**: After each choice, verify if the current partial solution is still valid.
*   **Pruning**: If the partial solution violates any constraints, abandon this path immediately.
*   **Backtracking**: Undo the last choice and try a different one. This means restoring the state to what it was before the choice was made.
*   **Finding all solutions/a solution**: Continue until a complete, valid solution is found (or all solutions are found), or all paths have been exhausted.

Many problems that can be solved with backtracking can be visualized as exploring a **decision tree** or **state-space tree**. Each node in the tree represents a partial solution, and edges represent choices. Backtracking essentially performs a Depth-First Search (DFS) on this tree.

## 2. General Backtracking Template (Pseudo-code)

A typical backtracking algorithm can be structured as a recursive function:

```python
function backtrack(state, choices_made_so_far):
    # 1. Base Case / Goal Check:
    #    If 'state' represents a complete and valid solution:
    #        Add 'choices_made_so_far' to results.
    #        Return.

    # 2. Explore Choices:
    #    For each 'choice' available from the current 'state':
    #        # 2a. Check Constraints (Pruning):
    #        #    If 'choice' leads to an invalid partial solution, skip this choice.
    #        #    (Optimization: Check constraints *before* making the choice if possible)

    #        # 2b. Make a Choice:
    #        #    Apply 'choice' to 'state' (update state, add to current_solution).

    #        # 2c. Recurse:
    #        #    backtrack(new_state, choices_made_so_far_plus_choice)

    #        # 2d. Un-choose / Backtrack:
    #        #    Revert 'state' to its previous condition (undo the choice).
    #        #    (Crucial for exploring alternative paths)
```

## 3. When to Use Backtracking

Backtracking is suitable for problems that involve:
*   **Finding all possible solutions (or a single solution) to a problem.**
*   **Exploring a search space that can be represented as a decision tree.**
*   **Problems with constraints that can prune branches of the search tree early.**

Common problem categories include:
*   **Combinatorial problems**: Subsets, Permutations, Combinations.
*   **Constraint satisfaction problems**: N-Queens, Sudoku Solver.
*   **Pathfinding problems**: Maze solving (finding all paths or shortest path, though for shortest path BFS is often better).
*   **Game playing**: Some simple game AI.

## 4. Core Concepts and Patterns

*   **Decision Tree**: Every backtracking problem implicitly explores a decision tree. Visualizing this tree helps in understanding the recursive calls.
*   **State**: The information needed at any point in the recursion to make a decision and check constraints (e.g., `current_subset`, `board_configuration`, `remaining_target`).
*   **Choices**: The options available at the current state (e.g., "take this element" or "don't take it"; "place queen in this column").
*   **Constraints**: Rules that limit valid choices. These are critical for pruning the search space and making the algorithm efficient.
*   **Goal/Base Case**: The condition under which a valid, complete solution has been found.
*   **Backtracking Step**: The most characteristic part. After exploring a path, you must undo the changes made by the last choice to explore alternative paths. This is often done by `pop()` from a list, resetting a boolean flag, or reverting a swap.

---

## 5. Problem Specific Explanations

Let's apply these concepts to the problems in this project.

### 5.1. Subsets

**Problem**: Given `nums` (unique elements), return all subsets.

**Decision Tree Visualization**:
For `nums = [1, 2, 3]`:

```
           [] (start_index=0)
          / \
         /   \
        /     \
       [1]    [] (no 1)
      / \     / \
     /   \   /   \
   [1,2] [1] [2]   [] (no 2)
   / \   / \ / \   / \
  ...   ... ... ...   ... (end_index=3)
[1,2,3] [1,2] [1,3] [1] [2,3] [2] [3] []
```
*In the provided `find_subsets` solution, the iteration `for i in range(index, n)` implicitly handles this by exploring paths where `nums[index]` is taken, then `nums[index+1]` is taken (effectively `nums[index]` is *not* taken for the current level's branch but is a future candidate).*

**Approach 1: Iterative Choice (`for i in range(index, n)`)**
*   **State**: `index` (current position in `nums` to consider), `current_subset` (the subset being built).
*   **Choices**: At each `index`, you can choose `nums[index]`, `nums[index+1]`, ..., `nums[n-1]` to extend the current subset.
*   **Constraints**: None explicitly to prune, as all combinations are valid subsets.
*   **Goal**: Any `current_subset` formed by adding elements from `index` onwards (including an empty selection) is a valid subset. So, `result.append(list(current_subset))` happens at the beginning of each `backtrack` call.
*   **Backtracking Step**: `current_subset.pop()` after a recursive call.

**Time/Space Complexity**:
*   **Time**: O(2^N * N) - 2^N subsets, each requiring O(N) to copy.
*   **Space**: O(N) auxiliary space (recursion stack, `current_subset`).

**Approach 2: Take or Leave It (Alternative)**
*   **State**: `index` (current element `nums[index]` being considered), `current_subset`.
*   **Choices**: For `nums[index]`, either *include* it or *exclude* it.
*   **Constraints**: None.
*   **Goal**: When `index == n`, all elements have been considered, so `current_subset` is complete.
*   **Backtracking Step**: `current_subset.pop()` after the "include" branch.

**Time/Space Complexity**: Same as Approach 1.

### 5.2. Permutations

**Problem**: Given `nums` (distinct elements), return all permutations.

**Decision Tree Visualization**:
For `nums = [1, 2, 3]`:

```
              []
             / | \
            1  2  3
           / \ | / \
          /   \|/   \
        1,2  1,3 ...
       /     /
     1,2,3 1,3,2 ...
```

**Approach 1: Using a `used` array/set**
*   **State**: `current_permutation` (list), `used` (boolean array tracking used elements).
*   **Choices**: For each position in `current_permutation`, iterate through `nums`. Pick an `nums[i]` that has `not used[i]`.
*   **Constraints**: An element `nums[i]` cannot be used if `used[i]` is True.
*   **Goal**: `len(current_permutation) == n`.
*   **Backtracking Step**: `current_permutation.pop()` and `used[i] = False`.

**Time/Space Complexity**:
*   **Time**: O(N * N!) - N! permutations, each taking O(N) to copy.
*   **Space**: O(N) auxiliary space (recursion stack, `current_permutation`, `used` array).

**Approach 2: Swap-based (Heap's Algorithm variation)**
*   **State**: `index` (the starting position for swaps), `arr` (the list being permuted).
*   **Choices**: For the current `index`, swap `arr[index]` with any `arr[i]` where `i >= index`.
*   **Constraints**: None.
*   **Goal**: `index == n`.
*   **Backtracking Step**: Swap `arr[index]` and `arr[i]` back to restore the array.

**Time/Space Complexity**:
*   **Time**: O(N * N!) - Same as above.
*   **Space**: O(N) auxiliary space (recursion stack). More memory-efficient as it avoids `used` array and separate `current_permutation` list.

### 5.3. Combination Sum II

**Problem**: Given `candidates` (with duplicates), `target`, find unique combinations that sum to `target`. Each number used once.

**Key Difference from Subsets/Permutations**:
*   **Duplicates in input**: Requires sorting and a specific pruning rule (`if i > start_index and candidates[i] == candidates[i-1]: continue`) to ensure unique combinations in the output.
*   **Target sum**: Introduces pruning conditions based on the `remainder`.
*   **Each number used once**: The `start_index` for the next recursive call becomes `i + 1`.

**Decision Tree Visualization**:
For `candidates = [1, 1, 2], target = 2` (after sorting):

```
              (rem=2, idx=0, combo=[])
             /
          (pick 1)
         /
      (rem=1, idx=1, combo=[1])
     / \
    /   \
(pick 1) (skip 1 as duplicate for idx=1)  (prune if next candidate is > remainder)
 /
(rem=0, idx=2, combo=[1,1]) -> Solution: [1,1]
```

**Algorithm Details**:
*   **Sort `candidates`**: Essential for duplicate skipping.
*   **State**: `remainder` (what's left to sum), `start_index` (from where to pick candidates to avoid duplicate combinations and reuse of elements from the same position), `current_combination`.
*   **Choices**: Pick `candidates[i]` from `start_index` onwards.
*   **Constraints/Pruning**:
    *   `remainder < 0`: Prune path (sum exceeded target).
    *   `candidates[i] > remainder`: Prune path (current and subsequent candidates are too large).
    *   `i > start_index and candidates[i] == candidates[i-1]`: Skip this duplicate candidate at the current decision level to avoid generating duplicate *combinations*.
*   **Goal**: `remainder == 0`.
*   **Backtracking Step**: `current_combination.pop()`.

**Time/Space Complexity**:
*   **Time**: O(2^N) in the worst case, but often much better due to pruning. More precisely, `S * T`, where S is the number of solutions and T is the average time to construct a solution.
*   **Space**: O(N) auxiliary space (recursion stack, `current_combination`).

### 5.4. N-Queens

**Problem**: Place N non-attacking queens on an N×N board.

**Decision Tree Visualization**:
For N=4, each level of the tree represents a row. Each branch represents placing a queen in a column.

```
       Row 0
      / | \ \
     Q. . . (col 0)
    /  |  \
   .Q. . (col 1)
  /   |   \
... ... ... ... (check validity, then recurse for Row 1)
```

**Algorithm Details**:
*   **State**: `row` (current row to place a queen), `board` (2D list representing the current board), `cols_occupied`, `diag1_occupied`, `diag2_occupied` (sets for efficient conflict checking).
    *   `cols_occupied`: `set()` of column indices.
    *   `diag1_occupied`: `set()` of `row - col` values (for `/` diagonals).
    *   `diag2_occupied`: `set()` of `row + col` values (for `\` diagonals).
*   **Choices**: For the current `row`, try placing a queen in each `col` from `0` to `n-1`.
*   **Constraints/Pruning**:
    *   A queen at `(r, c)` is safe if:
        *   `c` is not in `cols_occupied`.
        *   `(r - c)` is not in `diag1_occupied`.
        *   `(r + c)` is not in `diag2_occupied`.
    *   If any of these conditions are violated, this choice is invalid; skip it.
*   **Goal**: `row == n` (all N queens placed).
*   **Backtracking Step**: Remove the queen from `board[row][col]`, remove `col`, `row-col`, `row+col` from respective sets.

**Time/Space Complexity**:
*   **Time**: O(N!) in the practical sense due to heavy pruning. Constructing string representations of boards adds another O(N^2) for each solution. So, closer to O(N! * N^2).
*   **Space**: O(N^2) auxiliary space (for the `board` itself) + O(N) for sets and recursion stack.

---

## 6. Edge Cases and Gotchas

*   **Empty input (`[]` or `n=0`)**:
    *   **Subsets**: Should return `[[]]` (the empty set is a subset of itself).
    *   **Permutations**: Should return `[[]]` (empty list has one permutation, itself).
    *   **Combination Sum II**: `([], 0)` should return `[[]]`. `([], non-zero)` should return `[]`.
    *   **N-Queens (`n=0`)**: `[[]]` (empty board with 0 queens).
*   **Single element input (`[X]` or `n=1`)**: Should produce expected trivial results.
*   **Duplicate handling**: Crucial for `Combination Sum II`. Sorting combined with `if i > start_index and candidates[i] == candidates[i-1]: continue` is the standard pattern.
*   **Copying lists**: Always remember to `result.append(list(current_list))` or `result.append(current_list[:])` when storing a temporary list, as the list object itself will be modified by subsequent backtracking steps.
*   **Restoring state**: The "un-choose" or "backtrack" step is paramount. Failing to revert the state correctly will lead to incorrect results and often bugs that are hard to debug.

---

## 7. Interview Tips and Variations

*   **Understand the core template**: This is the most important tip. Most backtracking problems follow the `choose -> explore -> unchoose` pattern.
*   **Draw the decision tree**: Visualizing helps clarify the recursive calls, state, and choices.
*   **Identify the "state" parameters**: What needs to be passed to your recursive helper function? (e.g., `index`, `current_list`, `remaining_target`, `row`, `used_elements`).
*   **Pruning is key**: Always look for opportunities to cut off invalid branches early. This dramatically improves performance. For example, `if remainder < 0` or `if candidate > remainder`.
*   **Handle duplicates carefully**: Sorting the input array is almost always the first step when dealing with duplicate elements that need to form unique combinations/subsets/permutations.
*   **Practice string conversion for N-Queens**: The output format often requires converting an internal 2D array representation into a list of strings.
*   **Variations**:
    *   **Find *a* solution vs. *all* solutions**: If you only need one, you can return immediately after finding the first one.
    *   **Minimum/maximum path**: Backtracking can be adapted, often combined with keeping track of min/max values found so far.
    *   **Count solutions**: Instead of storing solutions, just increment a counter.
    *   **Optimization with memoization/dynamic programming**: Some backtracking problems exhibit overlapping subproblems, making them suitable for DP. This is often the case when "all" solutions aren't required, but an optimized single solution (e.g., shortest path, minimum coins). Backtracking focuses on generating all possibilities.
    *   **Iterative Backtracking**: While recursive is natural, any recursive solution can be converted to an iterative one using an explicit stack. This is usually more complex to write for backtracking problems and less intuitive, but avoids Python's recursion depth limit for very large inputs (though usually problem constraints keep N small enough).

By mastering these problems and understanding the underlying principles, you'll be well-prepared to tackle a wide range of backtracking questions in coding interviews.