```markdown
# Algorithm Explanations

This document provides detailed explanations for each mathematical problem covered in this project. It includes the problem statement, a discussion of naive/brute-force approaches, an in-depth look at optimal solutions, time and space complexity analysis, considerations for edge cases, and tips relevant for coding interviews.

---

## 1. Greatest Common Divisor (GCD) & Least Common Multiple (LCM)

### Problem Statement

*   **GCD**: Find the largest positive integer that divides two given non-negative integers `a` and `b` without leaving a remainder.
*   **LCM**: Find the smallest positive integer that is a multiple of both `a` and `b`.

---

### GCD

#### Naive / Brute-Force Approach (`gcdBruteForce`)

*   **Concept**: Iterate downwards from `min(a, b)` to 1. The first number encountered that divides both `a` and `b` is the GCD.
*   **Example**: `gcd(48, 18)`
    *   `min(48, 18) = 18`
    *   Check 18: `48 % 18 != 0`
    *   Check 17: `48 % 17 != 0`
    *   ...
    *   Check 6: `48 % 6 == 0` AND `18 % 6 == 0`. So, 6 is the GCD.
*   **Time Complexity**: O(min(a, b)). In the worst case (e.g., `gcd(large_prime, 1)` or `gcd(large_number, 1)`), it might iterate almost `min(a, b)` times.
*   **Space Complexity**: O(1).

#### Optimal Approach: Euclidean Algorithm (`gcd`)

*   **Concept**: Based on the principle that `gcd(a, b) = gcd(b, a % b)`. This process is repeated until the remainder is 0. When the remainder becomes 0, the other number is the GCD.
    *   If `a = 0`, `gcd(0, b) = b`.
    *   If `b = 0`, `gcd(a, 0) = a`.
*   **Example**: `gcd(48, 18)`
    1.  `gcd(48, 18)`
    2.  `a = 48, b = 18`. `remainder = 48 % 18 = 12`. New call: `gcd(18, 12)`
    3.  `a = 18, b = 12`. `remainder = 18 % 12 = 6`. New call: `gcd(12, 6)`
    4.  `a = 12, b = 6`. `remainder = 12 % 6 = 0`. New call: `gcd(6, 0)`
    5.  `b` is 0. Return `a`, which is 6.
*   **Implementation**: Can be recursive or iterative. Iterative is often preferred in interviews to avoid stack overflow for very large inputs.
*   **Time Complexity**: O(log(min(a, b))). This is significantly faster than the brute-force approach, especially for large numbers. The number of steps is logarithmic because the remainder decreases rapidly.
*   **Space Complexity**: O(1) for iterative version. O(log(min(a, b))) for recursive due to call stack.

#### Edge Cases / Gotchas

*   **`gcd(0, N)` or `gcd(N, 0)`**: The GCD is N. The Euclidean algorithm handles this gracefully, returning the non-zero number.
*   **`gcd(0, 0)`**: Mathematically undefined or sometimes defined as 0. Our implementation returns 0, which is a common convention in programming contexts.
*   **Negative numbers**: The standard GCD definition is for positive integers. Our `gcd` function throws an error for negative inputs, requiring callers to handle absolute values if needed.
*   **Non-integers**: Our implementation throws an error.

#### Interview Tips & Variations

*   **Extended Euclidean Algorithm**: Find `x, y` such that `ax + by = gcd(a, b)`.
*   **GCD of an array**: `gcd(a, b, c) = gcd(gcd(a, b), c)`.
*   **LCM of an array**: Similar to GCD, `lcm(a, b, c) = lcm(lcm(a, b), c)`.

---

### LCM

#### Relationship to GCD

The Least Common Multiple (LCM) of two numbers `a` and `b` can be efficiently calculated using their GCD:

`LCM(a, b) = |a * b| / GCD(a, b)`

This formula works because `a * b = GCD(a, b) * LCM(a, b)`.

#### Optimal Approach (`lcm`)

*   **Concept**: Directly apply the formula using the optimized `gcd` function. To prevent potential integer overflow for very large `a * b`, it's often safer to compute `(a / gcd(a, b)) * b`.
*   **Time Complexity**: O(log(min(a, b))), dominated by the GCD calculation.
*   **Space Complexity**: O(1).

#### Edge Cases / Gotchas

*   **`lcm(0, N)` or `lcm(N, 0)`**: The LCM is 0. Our implementation handles this directly.
*   **Negative numbers**: Similar to GCD, `lcm` is typically defined for non-negative integers. Our `lcm` function throws an error for negative inputs.

---

## 2. Sieve of Eratosthenes

### Problem Statement

Find all prime numbers up to a given non-negative integer `limit`.

---

#### Naive / Brute-Force Approach (`sieveOfEratosthenesBruteForce`)

*   **Concept**: Iterate from `i = 2` up to `limit`. For each `i`, check if `i` is prime using trial division (divide `i` by all numbers from 2 up to `sqrt(i)`). If it's prime, add it to the result list.
*   **Time Complexity**: O(limit * sqrt(limit)). Each primality test takes `O(sqrt(i))` time, and this is done for `limit` numbers.
*   **Space Complexity**: O(limit) to store the primes.

#### Optimal Approach: Sieve of Eratosthenes (`sieveOfEratosthenes`)

*   **Concept**:
    1.  Create a boolean array `isPrime` of size `limit + 1`, initialized to `true`.
    2.  Mark `isPrime[0]` and `isPrime[1]` as `false` (0 and 1 are not prime).
    3.  Iterate from `p = 2` up to `sqrt(limit)`:
        *   If `isPrime[p]` is `true` (meaning `p` is a prime):
            *   Mark all multiples of `p` (starting from `p*p`) as `false`. We start from `p*p` because any smaller multiple `k*p` (where `k < p`) would have already been marked by a prime factor of `k`.
    4.  Finally, collect all indices `i` where `isPrime[i]` is `true`.
*   **Example**: `sieveOfEratosthenes(10)`
    1.  `isPrime = [T, T, T, T, T, T, T, T, T, T, T]` (indices 0 to 10)
    2.  `isPrime[0]=F, isPrime[1]=F`. Array: `[F, F, T, T, T, T, T, T, T, T, T]`
    3.  `p = 2`: `isPrime[2]` is T. Mark multiples of 2 (starting from `2*2=4`) as F:
        `[F, F, T, T, F, T, F, T, F, T, F]`
    4.  `p = 3`: `isPrime[3]` is T. Mark multiples of 3 (starting from `3*3=9`) as F:
        `[F, F, T, T, F, T, F, T, F, F, F]`
    5.  `p = 4`: `isPrime[4]` is F (already marked by 2). Skip.
    6.  `p = sqrt(10) ~= 3.16`. So loop ends after `p=3`.
    7.  Collect primes: `[2, 3, 5, 7]`
*   **Visual Diagram**: See `docs/diagrams.txt` for an ASCII art representation.
*   **Time Complexity**: O(limit * log(log(limit))). This is highly efficient and very close to O(limit) for practical purposes.
*   **Space Complexity**: O(limit) for the boolean array.

#### Edge Cases / Gotchas

*   **`limit < 2`**: No primes exist. The implementation correctly returns an empty array.
*   **Invalid input**: Handles non-integer or negative `limit` by throwing an error.
*   **Memory**: For extremely large `limit` (e.g., 10^9), the boolean array might exceed memory limits. In such cases, a segmented sieve or other advanced methods might be needed.

#### Interview Tips & Variations

*   **Optimization**: Starting marking from `p*p` is a key optimization.
*   **Segmented Sieve**: If `limit` is very large, compute primes in segments to reduce memory usage.
*   **Pre-computation**: Sieve is excellent for pre-computing primes when many queries for primality are expected within a range.
*   **Primality Test for a single number**: For a very large single number, Miller-Rabin primality test is probabilistic but much faster than trial division.

---

## 3. Power Function (x^n)

### Problem Statement

Calculate `x` raised to the power of `n` (`x^n`), where `x` is a number and `n` is an integer (positive, negative, or zero).

---

#### Naive / Brute-Force Approach (`powerBruteForce`)

*   **Concept**: Multiply `x` by itself `|n|` times. If `n` is negative, calculate `1 / (x^|n|)`.
*   **Example**: `power(2, 3)`
    *   `result = 1`
    *   `result = 1 * 2 = 2` (1st iteration)
    *   `result = 2 * 2 = 4` (2nd iteration)
    *   `result = 4 * 2 = 8` (3rd iteration)
*   **Time Complexity**: O(|n|). Performs `|n|` multiplications.
*   **Space Complexity**: O(1).

#### Optimal Approach: Binary Exponentiation (Exponentiation by Squaring) (`power`)

*   **Concept**: This method significantly reduces the number of multiplications by exploiting the binary representation of the exponent.
    *   If `n` is even: `x^n = (x^2)^(n/2)`
    *   If `n` is odd: `x^n = x * x^(n-1) = x * (x^2)^((n-1)/2)`
    This can be implemented iteratively by processing the exponent's bits from right to left.
    *   Initialize `result = 1`, `currentBase = x`, `currentExp = |n|`.
    *   While `currentExp > 0`:
        *   If `currentExp` is odd (rightmost bit is 1), multiply `result` by `currentBase`.
        *   Square `currentBase` (`currentBase = currentBase * currentBase`).
        *   Halve `currentExp` (`currentExp = floor(currentExp / 2)`).
    *   If original `n` was negative, return `1 / result`.
*   **Example**: `power(2, 10)`
    | currentExp (binary) | currentExp (decimal) | currentBase | result | Operation                                |
    | :------------------ | :------------------- | :---------- | :----- | :--------------------------------------- |
    | 1010                | 10                   | 2           | 1      |                                          |
    | 0101                | 5                    | 4           | 1      | `exp` is even, square base               |
    | 0010                | 2                    | 16          | 4      | `exp` is odd, `result = 1*4=4`; square base |
    | 0001                | 1                    | 256         | 4      | `exp` is even, square base               |
    | 0000                | 0                    | 65536       | 1024   | `exp` is odd, `result = 4*256=1024`; square base |
    Result: 1024
*   **Visual Diagram**: See `docs/diagrams.txt` for an ASCII art representation.
*   **Time Complexity**: O(log(|n|)). The exponent is halved in each step, similar to binary search.
*   **Space Complexity**: O(1).

#### Edge Cases / Gotchas

*   **`x^0 = 1`**: Handled. This includes `0^0 = 1` which is a common convention in combinatorics and computing (though mathematically indeterminate).
*   **`0^n`**: `0` for `n > 0`. `1` for `n = 0`. `Infinity` for `n < 0` (1/0).
*   **Negative exponents**: `x^-n = 1 / x^n`. Handled by inverting the final positive-exponent result.
*   **Floating-point precision**: Results for non-integer `x` or large negative `n` might suffer from floating-point precision issues, but the algorithm itself is correct.
*   **Overflow/Underflow**: For very large `x` or `n`, results might exceed `Number.MAX_VALUE` (Infinity) or become too small (`0`). JavaScript handles this with `Infinity` and `0`.

#### Interview Tips & Variations

*   **Modular Exponentiation**: `(x^n) % M`. Used in cryptography. The same binary exponentiation logic applies, but with `% M` at each multiplication step to keep numbers small.
*   **Matrix Exponentiation**: Used to solve linear recurrences (like Fibonacci) in O(log N) time by representing the recurrence as a matrix multiplication and using binary exponentiation on matrices.
*   **Fractional exponents**: `x^(1/2)` (square root). Not covered by this integer exponent function.

---

## 4. Nth Fibonacci Number

### Problem Statement

Calculate the Nth term of the Fibonacci sequence. The sequence starts `F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)` for `n > 1`.

---

#### Naive / Brute-Force Approach: Recursive (`nthFibonacciRecursive`)

*   **Concept**: Directly implement the recursive definition `F(n) = F(n-1) + F(n-2)` with base cases `F(0) = 0` and `F(1) = 1`.
*   **Example**: `nthFibonacciRecursive(5)`
    ```
    fib(5)
    ├── fib(4)
    │   ├── fib(3)
    │   │   ├── fib(2)
    │   │   │   ├── fib(1) (returns 1)
    │   │   │   └── fib(0) (returns 0)
    │   │   └── fib(1) (returns 1)
    │   └── fib(2) (repeated calculation)
    │       ├── fib(1) (returns 1)
    │       └── fib(0) (returns 0)
    └── fib(3) (repeated calculation)
        ├── fib(2) (repeated calculation)
        │   ├── fib(1) (returns 1)
        │   └── fib(0) (returns 0)
        └── fib(1) (returns 1)
    ```
*   **Time Complexity**: O(2^N). This is exponential due to redundant calculations of the same Fibonacci numbers multiple times (e.g., `fib(3)` is calculated twice, `fib(2)` three times, etc.).
*   **Space Complexity**: O(N) due to the maximum depth of the recursive call stack. Can lead to stack overflow for even moderately large `N` (e.g., `N > 40-50`).

#### Optimal Approach: Iterative Dynamic Programming (`nthFibonacci`)

*   **Concept**: Build the sequence from the bottom up. Instead of re-calculating, store the necessary previous values. Since `F(n)` only depends on `F(n-1)` and `F(n-2)`, we only need to keep track of the last two Fibonacci numbers.
*   **Example**: `nthFibonacci(5)`
    1.  `n=0`: `a=0`, `b=1`
    2.  `i=2`: `temp = a+b = 0+1 = 1`. `a=1`, `b=1` (F(2)=1)
    3.  `i=3`: `temp = a+b = 1+1 = 2`. `a=1`, `b=2` (F(3)=2)
    4.  `i=4`: `temp = a+b = 1+2 = 3`. `a=2`, `b=3` (F(4)=3)
    5.  `i=5`: `temp = a+b = 2+3 = 5`. `a=3`, `b=5` (F(5)=5)
    Returns `b = 5`.
*   **Time Complexity**: O(N). A single loop iterates `N-1` times.
*   **Space Complexity**: O(1). Only a few variables are used.

#### Alternative (More Optimal for very large N): Matrix Exponentiation

*   **Concept**: The Fibonacci sequence can be represented by matrix multiplication:
    `[[F(n+1)], [F(n)]] = [[1, 1], [1, 0]]^n * [[F(1)], [F(0)]]`
    By using binary exponentiation on the 2x2 matrix, `[[1, 1], [1, 0]]^n` can be computed in O(log N) time. This is typically used when N is extremely large (e.g., 10^18).
*   **Time Complexity**: O(log N).
*   **Space Complexity**: O(1) or O(log N) for recursive matrix power.

#### Edge Cases / Gotchas

*   **`n = 0`**: `F(0) = 0`. Handled.
*   **`n = 1`**: `F(1) = 1`. Handled.
*   **Negative `n`**: Not defined in the standard non-negative sequence. Our implementation throws an error. (Can be extended to negative indices, `F(-n) = (-1)^(n+1) * F(n)`, but usually not required in interviews).
*   **Integer Overflow**: Fibonacci numbers grow very rapidly. For `N > 78`, `F(N)` will exceed JavaScript's `Number.MAX_SAFE_INTEGER` (2^53 - 1). For larger N, `BigInt` would be required in JavaScript. Our implementation returns `Infinity` for such large numbers.

#### Interview Tips & Variations

*   **Memoization (Top-down DP)**: A recursive solution with a cache (memoization table) to store computed values. Improves naive recursion to O(N) time, O(N) space.
*   **General linear recurrences**: Problems that follow a pattern like `T(n) = a*T(n-1) + b*T(n-2) + ...` can often be solved with DP or matrix exponentiation.
*   **Finding the index of a Fibonacci number**: Given `F(N)`, find `N`.
*   **Check if a number is Fibonacci**: Often involves checking `5*n^2 + 4` or `5*n^2 - 4` is a perfect square.

---

## 5. Combinations (N choose K)

### Problem Statement

Calculate the number of ways to choose `k` items from a set of `n` distinct items, without regard to the order of selection. Denoted as `C(n, k)` or `nCk`.
Formula: `C(n, k) = n! / (k! * (n-k)!)`

---

#### Naive / Brute-Force Approach (`combinationsBruteForce`)

*   **Concept**: Directly apply the formula `n! / (k! * (n-k)!)` using a `factorial` helper function.
*   **Time Complexity**: O(n) due to factorial calculations.
*   **Space Complexity**: O(1) (ignoring recursion stack for `factorial`).
*   **Problem**: `n!` grows extremely fast. Even for relatively small `n` (e.g., `n=20`, `20! = 2.43 * 10^18`), intermediate factorial results can quickly exceed `Number.MAX_SAFE_INTEGER` in JavaScript, leading to incorrect results, even if the final `C(n, k)` value would fit.

#### Optimal Approach: Iterative Calculation with Cancellation (`combinations`)

*   **Concept**: Avoid large intermediate factorial products by simplifying the formula through cancellation.
    `C(n, k) = (n * (n-1) * ... * (n-k+1)) / (k * (k-1) * ... * 1)`
    This can be calculated iteratively by multiplying and dividing terms. Crucially, at each step `i`, `result * (n-i)` will be divided by `(i+1)`, ensuring the number remains manageable.
    Also, utilize the property `C(n, k) = C(n, n-k)`. We can choose `k = min(k, n-k)` to minimize the number of iterations.
*   **Example**: `combinations(5, 2)`
    1.  `n=5, k=2`. `k = min(2, 5-2) = min(2, 3) = 2`.
    2.  `result = 1`
    3.  `i = 0`: `result = 1 * (5-0) / (0+1) = 1 * 5 / 1 = 5`
    4.  `i = 1`: `result = 5 * (5-1) / (1+1) = 5 * 4 / 2 = 10`
    Loop finishes (runs `k` times, `i` goes from `0` to `k-1`). Returns 10.
*   **Time Complexity**: O(min(k, n-k)). The loop runs `min(k, n-k)` times.
*   **Space Complexity**: O(1).

#### Edge Cases / Gotchas

*   **`k > n`**: Cannot choose more items than available. Returns 0.
*   **`k = 0` or `k = n`**: `C(n, 0) = 1` (one way to choose nothing), `C(n, n) = 1` (one way to choose all). Handled.
*   **Negative `n` or `k`**: Not defined in standard combinatorics. Our implementation throws an error.
*   **Integer Overflow**: While the optimal approach greatly reduces intermediate overflow risk, for extremely large `n` and `k` (where `C(n, k)` itself exceeds `Number.MAX_SAFE_INTEGER`), `BigInt` would be required. JavaScript's numbers automatically become `Infinity` in such cases.
*   **Floating point precision**: Although `C(n, k)` is always an integer, `result * (n-i) / (i+1)` involves division. JavaScript's floating-point arithmetic might introduce tiny inaccuracies, so `Math.round()` at the end is a good safeguard, though typically not strictly necessary for exact divisions.

#### Interview Tips & Variations

*   **Pascal's Triangle**: `C(n, k) = C(n-1, k-1) + C(n-1, k)`. This recursive relation can be used for dynamic programming solutions (often used when you need many combinations up to `n`).
*   **Permutations**: `P(n, k) = n! / (n-k)! = C(n, k) * k!`. Can be derived from combinations.
*   **Combinations with Repetition**: `C(n+k-1, k)`.
*   **Stars and Bars**: A combinatorial technique to solve problems like "distribute `k` identical items into `n` distinct bins."

---

## Visual Diagrams (`docs/diagrams.txt`)

### 1. Euclidean Algorithm (GCD) - Flowchart Representation

```
      +-------------+
      | START: gcd(A, B) |
      +-------------+
             |
             v
      +-------------+
      |  Is B == 0? |----+ Yes
      +-------------+     |
             | No         |
             v            |
      +-------------+     |
      |  remainder = A % B |
      +-------------+     |
             |            |
             v            |
      +-------------+     |
      |     A = B   |     |
      +-------------+     |
             |            |
             v            |
      +-------------+     |
      |  B = remainder |     |
      +-------------+     |
             |            |
             +------------+
             |
             v
      +-------------+
      | RETURN A    |
      +-------------+
             |
             v
           END
```

### 2. Sieve of Eratosthenes - Marking Multiples Example (for limit=10)

```
Initial Array (isPrime):
Index: 0  1  2  3  4  5  6  7  8  9 10
Value: T  T  T  T  T  T  T  T  T  T  T

Step 1: Mark 0, 1 as False
Index: 0  1  2  3  4  5  6  7  8  9 10
Value: F  F  T  T  T  T  T  T  T  T  T

Step 2: p = 2 (isPrime[2] is T)
        Mark multiples of 2 (start from 2*2=4): 4, 6, 8, 10 as False
Index: 0  1  2  3  4  5  6  7  8  9 10
Value: F  F  T  T  F  T  F  T  F  T  F

Step 3: p = 3 (isPrime[3] is T)
        Mark multiples of 3 (start from 3*3=9): 9 as False
Index: 0  1  2  3  4  5  6  7  8  9 10
Value: F  F  T  T  F  T  F  T  F  F  F

Step 4: p*p > limit. Loop ends.
        (p=4: isPrime[4] is F, so skip)

Resulting Primes (indices where value is T): [2, 3, 5, 7]
```

### 3. Binary Exponentiation (Power Function) - Example: `2^10`

```
Calculate 2^10:

Initial: result = 1, currentBase = 2, currentExp = 10 (binary: 1010)

Iteration 1:
  currentExp = 10 (even)
  currentBase = 2 * 2 = 4
  currentExp = floor(10 / 2) = 5 (binary: 0101)
  result = 1

Iteration 2:
  currentExp = 5 (odd)
  result = 1 * 4 = 4
  currentBase = 4 * 4 = 16
  currentExp = floor(5 / 2) = 2 (binary: 0010)

Iteration 3:
  currentExp = 2 (even)
  currentBase = 16 * 16 = 256
  currentExp = floor(2 / 2) = 1 (binary: 0001)
  result = 4

Iteration 4:
  currentExp = 1 (odd)
  result = 4 * 256 = 1024
  currentBase = 256 * 256 = 65536
  currentExp = floor(1 / 2) = 0 (binary: 0000)

currentExp is 0. Loop ends.

Final Result: 1024
```