# Algorithm Explanations

This document provides detailed explanations for the algorithms implemented in this project. Understanding the logic, time complexity, and space complexity is crucial for interviewing successfully.

---

## 1. Greatest Common Divisor (GCD)

### Problem Description
Given two non-negative integers `a` and `b`, find their greatest common divisor (GCD).

### a. Brute-Force Approach (`gcdBruteForce`)

*   **Logic:** The GCD of two numbers `a` and `b` cannot be greater than the smaller of the two numbers. This approach iterates downwards from `min(a, b)` to `1`. The first number `i` encountered that divides both `a` and `b` evenly is the GCD.
*   **Steps:**
    1.  Handle edge cases: If `a` is 0, GCD is `b`. If `b` is 0, GCD is `a`. (Conventionally, `gcd(0,0)=0`).
    2.  Find `minVal = min(a, b)`.
    3.  Loop `i` from `minVal` down to `1`.
    4.  In each iteration, check if `a % i === 0` AND `b % i === 0`.
    5.  If both conditions are true, `i` is the GCD, return `i`.
*   **Time Complexity:** `O(min(a, b))`
    *   In the worst case (e.g., `gcd(N, 1)` or `gcd(N, N-1)` for large N where N-1 is prime), the loop runs `min(a, b)` times.
*   **Space Complexity:** `O(1)`
    *   Only a few variables are used.

### b. Euclidean Algorithm (Recursive) (`gcdEuclideanRecursive`)

*   **Logic:** The Euclidean algorithm (also known as the "輾轉相除法" in Chinese, or "Algorithm of Euclid") is an efficient method for computing the GCD. It's based on the principle that the GCD of two numbers does not change if the larger number is replaced by its difference with the smaller number. This can be expressed more efficiently using the modulo operation: `gcd(a, b) = gcd(b, a % b)`. The recursion terminates when `b` becomes 0, at which point `a` is the GCD.
*   **Steps:**
    1.  Base case: If `b` is 0, return `a`. This is the termination condition.
    2.  Recursive step: Return `gcd(b, a % b)`.
*   **Time Complexity:** `O(log(min(a, b)))`
    *   The numbers decrease very rapidly, roughly by at least half every two steps. This logarithmic behavior makes it very efficient.
*   **Space Complexity:** `O(log(min(a, b)))`
    *   Due to the recursion call stack depth. Each recursive call adds a frame to the stack.

### c. Euclidean Algorithm (Iterative) (`gcdEuclideanIterative`)

*   **Logic:** This is the iterative version of the Euclidean algorithm, which follows the same mathematical principle as the recursive one but avoids the overhead of recursion.
*   **Steps:**
    1.  Handle edge cases for negative inputs (though our current implementation throws an error for them).
    2.  Use a `while` loop that continues as long as `b` is not 0.
    3.  Inside the loop:
        *   Store the current `b` in a temporary variable (`temp`).
        *   Update `b` to `a % b`.
        *   Update `a` to `temp` (the old `b`).
    4.  Once `b` becomes 0, `a` will hold the GCD. Return `a`.
*   **Time Complexity:** `O(log(min(a, b)))`
    *   Identical to the recursive version, as it performs the same number of arithmetic operations.
*   **Space Complexity:** `O(1)`
    *   Only a constant number of variables are used, making it more memory-efficient than the recursive version, especially for extremely large inputs (though for standard integer sizes, stack overflow for GCD recursion is rare).

---

## 2. Prime Factorization

### Problem Description
Given a positive integer `n`, find its prime factors.

### a. Trial Division (`primeFactorsTrialDivision`)

*   **Logic:** This is the most intuitive method. It systematically checks for divisibility by small prime numbers.
*   **Steps:**
    1.  Handle `n=1`: returns an empty array.
    2.  **Handle factor 2:** Repeatedly divide `n` by `2` and add `2` to the factors list as long as `n` is divisible by `2`. This simplifies subsequent checks to only odd numbers.
    3.  **Handle odd factors:** Loop `i` from `3` up to `sqrt(n)`, incrementing `i` by `2` in each step (only checking odd numbers).
        *   Inside the loop, repeatedly divide `n` by `i` and add `i` to the factors list as long as `n` is divisible by `i`.
        *   The loop condition `i * i <= n` is crucial: if `n` has a prime factor greater than `sqrt(n)`, it must also have one smaller than `sqrt(n)` (which would have been found already) or `n` itself must be prime.
    4.  **Handle remaining factor:** If, after the loop, `n` is still greater than `2` (it cannot be `1` at this point unless it was initially `1`, and it's not `2` because that was handled), then the remaining `n` is a prime factor itself. Add it to the list.
*   **Time Complexity:** `O(sqrt(N))`
    *   The outer loop runs up to `sqrt(N)`. The inner `while` loop runs `log N` times in total for a given prime factor. The dominant factor is `sqrt(N)`.
*   **Space Complexity:** `O(log N)`
    *   To store the list of prime factors. For `N = 2^k`, there are `k` factors, and `k = log2(N)`.

### b. Sieve-based Factorization (`primeFactorsSieve`)

*   **Logic:** This method uses a precomputed array, generated by a modified Sieve of Eratosthenes, to store the Smallest Prime Factor (SPF) for every number up to a certain limit (`MAX_SIEVE_LIMIT`). Once the SPF array is built, factorizing any number `n` within the limit becomes very fast.
*   **Precomputation (Sieve):**
    1.  Initialize `spf[i] = i` for all `i` from `2` to `MAX_SIEVE_LIMIT`.
    2.  Mark all even numbers: `spf[i] = 2` for `i = 4, 6, 8, ...`.
    3.  Loop `i` from `3` up to `sqrt(MAX_SIEVE_LIMIT)`, incrementing by `2`.
    4.  If `spf[i]` is still `i` (meaning `i` is prime):
        *   For all multiples `j` of `i` (starting from `i*i`) up to `MAX_SIEVE_LIMIT`, if `spf[j]` is still `j`, set `spf[j] = i`. This ensures `spf[j]` stores the *smallest* prime factor.
*   **Factorization Query:**
    1.  Once `spf` array is ready, to factorize `n`:
    2.  Repeatedly add `spf[n]` to the factors list and update `n = n / spf[n]` until `n` becomes `1`.
*   **Time Complexity:**
    *   **Precomputation (Sieve):** `O(MAX_SIEVE_LIMIT * log(log MAX_SIEVE_LIMIT))`
        *   Similar to the standard Sieve of Eratosthenes.
    *   **Per Query:** `O(log N)`
        *   Because at each step, `n` is divided by its smallest prime factor, `n` decreases multiplicatively. The number of divisions is at most `log N`.
*   **Space Complexity:**
    *   **Precomputation (Sieve):** `O(MAX_SIEVE_LIMIT)`
        *   To store the `spf` array.
    *   **Per Query:** `O(log N)`
        *   To store the factors for a single query.

*   **When to use:** The Sieve-based approach is superior when you need to factorize *many* numbers within a fixed range, as the precomputation cost is amortized over multiple queries. For a single factorization of a very large number, trial division or more advanced algorithms (e.g., Pollard's rho) might be necessary.

---

## 3. Power Function (x^n)

### Problem Description
Implement `pow(x, n)`, which calculates `x` raised to the power `n` (`x^n`). `x` can be a floating-point number, and `n` can be a positive, negative, or zero integer.

### a. Naive Iterative Approach (`powerNaiveIterative`)

*   **Logic:** The simplest approach is to multiply `x` by itself `|n|` times.
*   **Steps:**
    1.  Handle `n = 0`: Return `1` (by mathematical convention, `x^0 = 1`).
    2.  Determine `exponent = abs(n)`.
    3.  Initialize `result = 1.0`.
    4.  Loop `i` from `0` to `exponent - 1`, multiplying `result` by `x` in each iteration.
    5.  If the original `n` was negative, return `1 / result`.
    6.  **Edge case:** If `x = 0` and `n < 0`, this would lead to `1 / 0`, which is undefined. Throw an error.
*   **Time Complexity:** `O(|n|)`
    *   The loop runs `|n|` times.
*   **Space Complexity:** `O(1)`
    *   Only a few variables are used.

### b. Binary Exponentiation (Exponentiation by Squaring) (`powerBinaryExponentiation`)

*   **Logic:** This optimized algorithm reduces the number of multiplications significantly by leveraging the binary representation of the exponent `n`.
    *   If `n` is even: `x^n = (x^(n/2))^2`
    *   If `n` is odd: `x^n = x * x^(n-1) = x * (x^((n-1)/2))^2`
    *   This can be implemented iteratively by examining the bits of `n` from right to left (least significant to most significant).
*   **Steps:**
    1.  Handle `n = 0`: Return `1`.
    2.  Handle `n < 0`:
        *   If `x = 0`, throw an error (division by zero).
        *   Set `currentN = -n` (work with a positive exponent) and remember to take the reciprocal at the end.
    3.  Initialize `result = 1.0` and `currentX = x`.
    4.  Loop while `currentN > 0`:
        *   If `currentN` is odd (i.e., its least significant bit is 1): `result = result * currentX`.
        *   Square `currentX`: `currentX = currentX * currentX`. This prepares `currentX` for the next bit position (next higher power of 2).
        *   Divide `currentN` by `2` (integer division): `currentN = floor(currentN / 2)`. This effectively shifts to the next bit.
    5.  If the original `n` was negative, return `1 / result`.
    6.  Return `result`.
*   **Time Complexity:** `O(log |n|)`
    *   The loop runs for each bit in `|n|`, performing a constant number of operations (multiplication, squaring, division by 2). The number of bits in `|n|` is `log2(|n|)`.
*   **Space Complexity:** `O(1)`
    *   Only a few variables are used.

---

## 4. Nth Fibonacci Number

### Problem Description
Given an integer `n`, calculate the `n`-th Fibonacci number. The Fibonacci sequence is defined as `F(0) = 0`, `F(1) = 1`, `F(n) = F(n-1) + F(n-2)` for `n > 1`.

### a. Dynamic Programming (O(1) Space) (`fibonacciDynamicProgramming`)

*   **Logic:** This is an iterative bottom-up approach. Instead of recomputing Fibonacci numbers repeatedly (as in a naive recursive solution), we build up the sequence from the beginning. We only need to store the previous two Fibonacci numbers to calculate the next one, allowing for O(1) space optimization.
*   **Steps:**
    1.  Handle base cases: `F(0) = 0`, `F(1) = 1`.
    2.  Initialize `a = 0` (representing `F(i-2)`) and `b = 1` (representing `F(i-1)`).
    3.  Loop `i` from `2` up to `n`:
        *   Calculate `temp = a + b` (this is `F(i)`).
        *   Update `a = b` (old `F(i-1)` becomes new `F(i-2)`).
        *   Update `b = temp` (new `F(i)` becomes new `F(i-1)`).
    4.  After the loop, `b` will contain `F(n)`. Return `b`.
*   **Time Complexity:** `O(n)`
    *   The loop runs `n-1` times (for `n >= 2`).
*   **Space Complexity:** `O(1)`
    *   Only three variables (`a`, `b`, `temp`) are used, regardless of `n`.

### b. Matrix Exponentiation (`fibonacciMatrixExponentiation`)

*   **Logic:** This is an advanced technique that leverages linear algebra to compute `F(n)` in logarithmic time. The core idea is that the Fibonacci sequence can be represented by a matrix power.
    The fundamental recurrence `F(n) = F(n-1) + F(n-2)` can be expressed as a matrix multiplication:
    ```
    | F(n)   |   | 1  1 |   | F(n-1) |
    | F(n-1) | = | 1  0 | * | F(n-2) |
    ```
    By repeatedly applying this, we get:
    ```
    | F(n)   |   | 1  1 |^(n-1)   | F(1) |
    | F(n-1) | = | 1  0 |        * | F(0) |
    ```
    Given `F(0)=0` and `F(1)=1`:
    ```
    | F(n)   |   | 1  1 |^(n-1)   | 1 |
    | F(n-1) | = | 1  0 |        * | 0 |
    ```
    So, if `M = | 1  1 |`, then `M^(n-1) = | A B |`.
    `            | 1  0 |                | C D |`
    Then `F(n) = A*1 + B*0 = A`.
    Thus, to find `F(n)`, we compute `M^(n-1)` using binary exponentiation (just like `x^n`), and the element at `[0][0]` of the resulting matrix will be `F(n)`.

*   **Steps:**
    1.  Handle base cases: `F(0) = 0`, `F(1) = 1`.
    2.  Define the base matrix `M = [[1, 1], [1, 0]]`.
    3.  Compute `M^(n-1)` using a matrix power function (which itself uses binary exponentiation logic).
    4.  The `F(n)` will be the element at `resultMatrix[0][0]`.
*   **Time Complexity:** `O(log n)`
    *   Computing `M^(n-1)` takes `O(log n)` matrix multiplications. For 2x2 matrices, each multiplication is `O(1)` (constant number of arithmetic operations).
*   **Space Complexity:** `O(log n)`
    *   If the `powerMatrix` function is implemented recursively, the call stack depth is `O(log n)`. If implemented iteratively, it would be `O(1)`. Our implementation uses a recursive `powerMatrix`.

*   **When to use:** Matrix exponentiation is highly efficient for very large values of `n` (e.g., `n` up to `10^18`), where `O(N)` solutions would be too slow. However, it involves matrix operations, which might be overkill for smaller `n` where `O(N)` DP is perfectly fine and simpler to implement.

---
**Note:** For all problems, edge cases like `n=0`, `n=1`, negative inputs, and large inputs are considered and handled appropriately, as detailed in the code comments and the dedicated `edge-cases-gotchas.md` document.