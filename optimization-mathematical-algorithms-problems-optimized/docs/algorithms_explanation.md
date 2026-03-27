# Algorithms Explanation

This document provides in-depth explanations of the algorithms used for each problem, including step-by-step logic, complexity analysis, visual diagrams, and discussions on edge cases and common pitfalls.

---

## Problem 01: Prime Factorization

**Goal:** Find all prime factors of a given positive integer `n`.

### Approach 1: Brute-force Trial Division

This is the most straightforward approach.

*   **Logic:**
    1.  Start with the smallest prime, 2.
    2.  Continuously divide `n` by 2 as long as it's divisible, adding 2 to the list of factors.
    3.  Once `n` is no longer divisible by 2, move to the next odd number, 3.
    4.  Repeat the process: divide `n` by 3 until it's no longer divisible, then move to 5, 7, and so on.
    5.  Continue this process until `n` becomes 1.

*   **Example (n=12):**
    1.  `n = 12`. `i = 2`. `12 % 2 == 0`. Factors: `[2]`. `n = 12 / 2 = 6`.
    2.  `n = 6`. `i = 2`. `6 % 2 == 0`. Factors: `[2, 2]`. `n = 6 / 2 = 3`.
    3.  `n = 3`. `i = 2`. `3 % 2 != 0`. `i` becomes `3`.
    4.  `n = 3`. `i = 3`. `3 % 3 == 0`. Factors: `[2, 2, 3]`. `n = 3 / 3 = 1`.
    5.  `n = 1`. Loop terminates. Result: `[2, 2, 3]`.

*   **Time Complexity:** O(n) in the worst case (e.g., if `n` is a large prime, we check every number up to `n`).
*   **Space Complexity:** O(log n) for storing the factors.

### Approach 2: Optimized Trial Division

This approach significantly improves performance by reducing the search range for divisors.

*   **Logic:**
    1.  **Handle 2s:** Repeatedly divide `n` by 2 and add 2 to factors until `n` is odd. This is a special optimization because 2 is the only even prime.
    2.  **Handle odd factors up to `sqrt(n)`:**
        *   Start checking odd numbers `i = 3`.
        *   Loop while `i * i <= n`. This is the core optimization: if `n` has a prime factor larger than `sqrt(n)`, it must also have a prime factor smaller than `sqrt(n)` (which we would have already found and divided out). So, we only need to check up to `sqrt(n)`.
        *   Inside the loop, repeatedly divide `n` by `i` if `n % i == 0`, adding `i` to factors.
        *   Increment `i` by 2 (to check only odd numbers).
    3.  **Handle remaining `n`:** After the loop, if `n > 1`, it means the remaining `n` itself is a prime factor (and it must be `> sqrt(original_n)`). Add this `n` to the factors.

*   **Visual Diagram (Conceptual):**
    ```
    n = 100

    1. Handle 2s:
       100 / 2 = 50 -> Factors: [2]
        50 / 2 = 25 -> Factors: [2, 2]
        n is now 25.

    2. Handle odd factors up to sqrt(25) = 5:
       i = 3. 25 % 3 != 0. i becomes 5.
       i = 5. (5*5 <= 25) is true.
        25 / 5 = 5 -> Factors: [2, 2, 5]
         5 / 5 = 1 -> Factors: [2, 2, 5, 5]
        n is now 1.
        (5*5 <= 1) is false. Loop terminates.

    3. n > 1 check: n is 1. No remaining factor.

    Result: [2, 2, 5, 5]
    ```

*   **Time Complexity:** O(sqrt(n)). Much faster than brute-force for large `n`.
*   **Space Complexity:** O(log n) for storing the factors.

*   **Edge Cases/Gotchas:**
    *   `n=0` or `n=1`: No prime factors. Return empty list. (Handled in code).
    *   Negative `n`: Prime factorization is typically defined for positive integers. Raising a `ValueError` is appropriate. (Handled in code).
    *   Large primes: The optimized method is efficient even for large primes, as it only checks up to `sqrt(n)`.

## Problem 02: Nth Fibonacci Number

**Goal:** Calculate the `n`-th Fibonacci number, where F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).

### Approach 1: Naive Recursive Solution

This is a direct translation of the Fibonacci definition.

*   **Logic:**
    *   Base cases: F(0)=0, F(1)=1.
    *   Recursive step: `F(n) = F(n-1) + F(n-2)`.

*   **Visual Diagram (Recursion Tree for F(4)):**
    ```
                     fib(4)
                    /      \
               fib(3)      fib(2)
              /    \       /    \
           fib(2)  fib(1) fib(1) fib(0)
          /    \     (1)    (1)    (0)
       fib(1) fib(0)
         (1)    (0)
    ```
    Notice `fib(2)` is computed twice, `fib(1)` three times, etc. This is redundant work.

*   **Time Complexity:** O(2^n). Exponential due to overlapping subproblems.
*   **Space Complexity:** O(n) for the recursion stack depth.

### Approach 2: Memoized (Top-Down Dynamic Programming)

Improves naive recursion by storing results of subproblems.

*   **Logic:**
    1.  Same recursive structure as naive, but with a `memo` (dictionary/array) to store computed results.
    2.  Before computing `F(n)`, check if it's already in `memo`. If yes, return the stored value.
    3.  After computing `F(n)`, store it in `memo`.

*   **Time Complexity:** O(n). Each `F(k)` is computed only once.
*   **Space Complexity:** O(n) for recursion stack + O(n) for memoization table. Total O(n).

### Approach 3: Iterative (Bottom-Up Dynamic Programming)

Builds the solution from the base cases upwards, avoiding recursion.

*   **Logic:**
    1.  Initialize `a = F(0) = 0`, `b = F(1) = 1`.
    2.  Loop from `i = 2` to `n`. In each step:
        *   Calculate `next_fib = a + b`.
        *   Update `a = b`.
        *   Update `b = next_fib`.
    3.  After the loop, `b` will hold `F(n)`.

*   **Visual Diagram:**
    ```
    n=0: return 0
    n=1: return 1

    For n >= 2:
    i=0: a=0, b=1
    i=2: next_fib = 0+1=1. a=1, b=1   (F(2)=1)
    i=3: next_fib = 1+1=2. a=1, b=2   (F(3)=2)
    i=4: next_fib = 1+2=3. a=2, b=3   (F(4)=3)
    i=5: next_fib = 2+3=5. a=3, b=5   (F(5)=5)
    ...
    ```

*   **Time Complexity:** O(n). Simple loop.
*   **Space Complexity:** O(1). Only a few variables are used. This is the most memory-efficient approach for typical `n`.

### Approach 4: Matrix Exponentiation (for very large N)

For `n` up to 10^18, this method is significantly faster.

*   **Logic:**
    The Fibonacci sequence can be represented using matrix multiplication:
    ```
    | F(n+1) |   | 1  1 | ^ n   | F(1) |
    | F(n)   | = | 1  0 |     * | F(0) |
    ```
    Since F(1)=1 and F(0)=0, this simplifies to:
    ```
    | F(n+1) |   | 1  1 | ^ n   | 1 |
    | F(n)   | = | 1  0 |     * | 0 |
    ```
    We need to compute the `n`-th power of the matrix `M = [[1, 1], [1, 0]]`. This is done efficiently using binary exponentiation (also known as exponentiation by squaring), which takes O(log n) time.
    The `F(n)` will be the element `(M^(n-1))[0][0]` (with careful indexing and base cases).

*   **Visual Diagram (Binary Exponentiation for M^5):**
    ```
    M^5 = M * M^4
        = M * (M^2)^2
        = M * ( (M^1)^2 )^2

    Steps:
    1. Result = I (identity matrix [[1,0],[0,1]])
    2. Temp = M ([[1,1],[1,0]])
    3. n = 5 (odd): Result = Result * Temp = M. Temp = Temp*Temp = M^2. n = 2.
    4. n = 2 (even): Result = M. Temp = M^2*M^2 = M^4. n = 1.
    5. n = 1 (odd): Result = Result * Temp = M * M^4 = M^5. Temp = M^4*M^4 = M^8. n = 0.
    6. n = 0. Loop ends. Return Result = M^5.
    ```

*   **Time Complexity:** O(log n). Each matrix multiplication (2x2) is constant time.
*   **Space Complexity:** O(1). Only a few 2x2 matrices are stored.

*   **Edge Cases/Gotchas:**
    *   `n < 0`: Raise `ValueError`. Fibonacci is usually defined for non-negative integers.
    *   `n=0`, `n=1`: Base cases must be handled correctly in all solutions.
    *   Large numbers: Fibonacci numbers grow very fast. Python's arbitrary precision integers handle this, but if the problem specifies `modulo M`, all operations must be done `mod M`.

## Problem 03: Greatest Common Divisor (GCD) & Least Common Multiple (LCM)

**Goal:** Implement functions for GCD and LCM of two non-negative integers.

### GCD Approach 1: Brute-force

*   **Logic:**
    1.  Find the minimum of `a` and `b`.
    2.  Iterate downwards from `min(a, b)` to 1.
    3.  The first number that divides both `a` and `b` evenly is the GCD.

*   **Example (GCD(48, 18)):**
    *   min(48, 18) = 18
    *   Try 18: 48 % 18 != 0.
    *   Try 17: ...
    *   ...
    *   Try 6: 48 % 6 == 0 and 18 % 6 == 0. Return 6.

*   **Time Complexity:** O(min(a, b)).
*   **Space Complexity:** O(1).

### GCD Approach 2 & 3: Euclidean Algorithm (Recursive and Iterative)

This is the standard and most efficient algorithm for GCD.

*   **Logic (Euclidean Algorithm):**
    The core principle is `GCD(a, b) = GCD(b, a % b)`.
    The algorithm terminates when `b` becomes 0, at which point `a` is the GCD.

*   **Visual Diagram (GCD(48, 18)):**
    ```
    GCD(48, 18)
    = GCD(18, 48 % 18) = GCD(18, 12)
    = GCD(12, 18 % 12) = GCD(12, 6)
    = GCD(6, 12 % 6) = GCD(6, 0)
    = 6  (Base case: when second number is 0, first number is GCD)
    ```

*   **Time Complexity:** O(log(min(a, b))). Very fast. The number of steps is logarithmic with respect to the smaller number.
*   **Space Complexity:**
    *   **Recursive:** O(log(min(a, b))) for recursion stack.
    *   **Iterative:** O(1). More memory-efficient.

### LCM Approach: Using GCD

*   **Logic:**
    The Least Common Multiple (LCM) of two numbers `a` and `b` can be calculated using their GCD with the formula:
    `LCM(a, b) = |a * b| / GCD(a, b)`

*   **Example (LCM(4, 6)):**
    1.  `GCD(4, 6)`:
        *   `GCD(4, 6) = GCD(6, 4 % 6) = GCD(6, 4)`
        *   `GCD(6, 4) = GCD(4, 6 % 4) = GCD(4, 2)`
        *   `GCD(4, 2) = GCD(2, 4 % 2) = GCD(2, 0)`
        *   `GCD(2, 0) = 2`
        So, `GCD(4, 6) = 2`.
    2.  `LCM(4, 6) = (4 * 6) / 2 = 24 / 2 = 12`.

*   **Time Complexity:** O(log(min(a, b))) (dominated by GCD calculation).
*   **Space Complexity:** O(1).

*   **Edge Cases/Gotchas:**
    *   `GCD(0, x)`: Defined as `x`.
    *   `GCD(0, 0)`: Mathematically often `0` or undefined. Our implementation returns `0`.
    *   `LCM(0, x)`: Defined as `0`.
    *   Negative numbers: GCD/LCM are typically defined for positive integers. Our code raises a `ValueError` for negative inputs. If allowed, taking `abs()` of inputs is common.
    *   Overflow for `a * b`: For very large `a` and `b`, `a * b` might overflow in languages with fixed-size integers. Python's arbitrary precision integers mitigate this. A safer formula is `(a // GCD(a,b)) * b` or `a * (b // GCD(a,b))`.

## Problem 04: Power Function (x^n)

**Goal:** Implement `pow(x, n)` for floating-point `x` and integer `n` (positive, negative, or zero).

### Approach 1: Naive Iteration

*   **Logic:**
    1.  Handle `n=0`: `x^0 = 1`.
    2.  Handle `x=0`: `0^positive = 0`, `0^negative = infinity` (division by zero).
    3.  If `n` is negative, remember this, and convert `n` to `abs(n)`.
    4.  Initialize `result = 1.0`.
    5.  Multiply `result` by `x`, `abs(n)` times.
    6.  If original `n` was negative, return `1.0 / result`.

*   **Example (pow(2.0, 3)):**
    1.  `n=3` (positive). `result = 1.0`.
    2.  `i=1`: `result = 1.0 * 2.0 = 2.0`.
    3.  `i=2`: `result = 2.0 * 2.0 = 4.0`.
    4.  `i=3`: `result = 4.0 * 2.0 = 8.0`.
    5.  Return `8.0`.

*   **Time Complexity:** O(n) (or O(|n|)).
*   **Space Complexity:** O(1).

### Approach 2 & 3: Binary Exponentiation (Recursive and Iterative)

Also known as Exponentiation by Squaring, this is the optimal approach.

*   **Logic:**
    It exploits the properties:
    *   If `n` is even: `x^n = (x^(n/2))^2`
    *   If `n` is odd: `x^n = x * (x^((n-1)/2))^2` (or `x * (x^(n/2))^2` using integer division)

    This effectively halves the exponent in each step.

*   **Visual Diagram (pow(x, 10)):**
    ```
    pow(x, 10)
    = (pow(x, 5))^2                     (n is even, 10/2=5)
    = (x * (pow(x, 2))^2)^2             (n is odd, (5-1)/2=2)
    = (x * ( (pow(x, 1))^2 )^2)^2       (n is even, 2/2=1)
    = (x * ( (x * (pow(x, 0))^2 )^2)^2  (n is odd, (1-1)/2=0)
    = (x * ( (x * (1)^2 )^2)^2          (n=0 returns 1)
    = (x * (x^2)^2)^2
    = (x * x^4)^2
    = (x^5)^2
    = x^10
    ```

*   **Iterative Algorithm (Simplified Explanation):**
    ```
    result = 1.0
    If n < 0: x = 1/x, n = -n

    While n > 0:
        If n is odd:  result = result * x  (Include this 'x' factor)
        x = x * x                   (Square x for next iteration)
        n = n / 2                   (Halve n)
    Return result
    ```

*   **Time Complexity:** O(log n) (or O(log |n|)). Each step halves `n`.
*   **Space Complexity:**
    *   **Recursive:** O(log n) for recursion stack.
    *   **Iterative:** O(1). More memory-efficient.

*   **Edge Cases/Gotchas:**
    *   `n=0`: Always return `1.0`.
    *   `x=0, n>0`: `0^positive = 0.0`.
    *   `x=0, n<0`: Division by zero, results in `inf` for floats.
    *   Floating point precision: `float` has limited precision. For extremely large `n` or specific `x` values, results might become `inf` or `0.0`.
    *   Negative `n`: Convert `x` to `1/x` and `n` to `abs(n)`. This must be the first step after base cases.
    *   `n` is `-(2^31)`: This is a common integer minimum, which becomes `2^31` when negated. The largest positive `int` is `2^31 - 1`. This typically works fine with binary exponentiation.

## Problem 05: Sudoku Solver

**Goal:** Solve a 9x9 Sudoku puzzle by filling empty cells (represented by 0).

### Approach: Backtracking Algorithm

Sudoku is a classic problem for demonstrating backtracking.

*   **Logic (High-level Backtracking):**
    1.  **Find an empty cell:** Scan the board to find the next empty cell (a `0`).
    2.  **Base Case:** If no empty cells are found, the board is solved. Return `True`.
    3.  **Try candidates:** For the empty cell, try placing digits from 1 to 9.
        *   **Check Validity:** Before placing a digit, check if it's valid according to Sudoku rules (no repetition in row, column, or 3x3 box).
        *   **Place and Recurse:** If a digit is valid, place it in the cell. Then, recursively call the solver for the next empty cell.
        *   **Success:** If the recursive call returns `True`, it means a solution was found down that path. Propagate `True` upwards.
        *   **Backtrack:** If the recursive call returns `False` (meaning the current digit choice didn't lead to a solution), or if the digit was invalid, undo the placement (reset the cell to `0`) and try the next digit.
    4.  **Failure:** If all digits 1-9 have been tried for the current empty cell and none led to a solution, return `False`.

*   **Visual Diagram (Conceptual Backtracking Step for a cell (r, c)):**
    ```
    solve(board):
      find_empty_cell(r, c)
      if no_empty_cell: return true

      for num from 1 to 9:
        if is_valid(board, r, c, num):
          board[r][c] = num   <-- Make a choice
          if solve(board):     <-- Recurse
            return true       <-- Found solution
          board[r][c] = 0     <-- Backtrack (undo choice)
      return false            <-- No valid choice leads to solution
    ```

*   **Optimization with Sets (`OptimizedSudokuSolver`):**
    The `_is_valid` check can be made `O(1)` by using hash sets (or bitmasks) to track numbers already present in each row, column, and 3x3 box.
    *   Initialize `rows[9]`, `cols[9]`, `boxes[9]` as sets.
    *   When the board is initialized, populate these sets with existing numbers.
    *   When trying to place `num` at `(r, c)`: check `num not in rows[r]`, `num not in cols[c]`, `num not in boxes[(r//3)*3 + c//3]`.
    *   When placing `num`: add `num` to the respective sets.
    *   When backtracking: remove `num` from the respective sets.

*   **Time Complexity:**
    *   Worst case is effectively exponential `O(9^E)` where `E` is the number of empty cells, but this is a loose upper bound.
    *   Due to heavy pruning from the `is_valid` checks, practical performance is much better. For 9x9 Sudoku, typical performance is very fast for most puzzles.
    *   More precisely, an estimate is around `O(K^M)` where `K` is the number of possibilities for a cell (9) and `M` is the maximum depth of recursion, which is the number of empty cells. However, `M` is significantly reduced by constraint checking.
*   **Space Complexity:**
    *   O(1) for the board (modified in place).
    *   O(E) for the recursion stack depth (where `E` is the number of empty cells).
    *   `OptimizedSudokuSolver` adds `O(1)` (or `O(N)` where N is board size) space for the sets, but makes `_is_valid` `O(1)`.

*   **Edge Cases/Gotchas:**
    *   Input Format: Clarify whether 0 or '.' represents empty cells.
    *   Multiple solutions: This problem guarantees a unique solution. If multiple solutions were possible, the solver would need to collect all solutions instead of returning after the first `True`.
    *   No solution: The problem guarantees a unique solution. If an invalid board were given, the solver should return `False` (or `None` from the wrapper).
    *   Performance: For very large boards (e.g., 16x16 or beyond), simple backtracking can be slow. Constraint Propagation (e.g., Naked Singles, Hidden Singles) can significantly improve performance by making deterministic deductions before branching.

---
**Note:** This documentation uses ASCII diagrams and focuses on the core logic and complexity. More elaborate diagrams would typically be created with specialized tools.