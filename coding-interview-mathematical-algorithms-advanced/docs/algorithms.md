# Detailed Algorithm Explanations

This document provides in-depth explanations of the algorithms implemented in this project, including their mathematical basis, step-by-step logic, and detailed complexity analysis.

## 1. Greatest Common Divisor (GCD) and Least Common Multiple (LCM)

### Problem Description
Given two non-negative integers `a` and `b`, find their Greatest Common Divisor (GCD) and Least Common Multiple (LCM).

### 1.1 Greatest Common Divisor (GCD)

The GCD of two or more integers (not all zero) is the largest positive integer that divides each of the integers without leaving a remainder.

#### a) Euclidean Algorithm (Recursive)

**Mathematical Basis:**
The Euclidean algorithm is based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number. This process continues until one of the numbers becomes zero, and the other number is the GCD.
A more efficient variant uses the modulo operation: `gcd(a, b) = gcd(b, a % b)`. The base case is `gcd(a, 0) = a`.

**Algorithm Steps:**
1.  If `b` is 0, then `a` is the GCD.
2.  Otherwise, recursively call `gcd` with `b` and the remainder of `a` divided by `b` (`a % b`).

**ASCII Art Diagram (Euclidean Algorithm - Example gcd(48, 18)):**

```
gcd(48, 18)
  |
  +-- a=48, b=18
  |
  +-- a % b = 48 % 18 = 12
  |
  +-- gcd(18, 12)
        |
        +-- a=18, b=12
        |
        +-- a % b = 18 % 12 = 6
        |
        +-- gcd(12, 6)
              |
              +-- a=12, b=6
              |
              +-- a % b = 12 % 6 = 0
              |
              +-- gcd(6, 0)
                    |
                    +-- b is 0, return a = 6
                    |
              <-----+-- returns 6
        <---------+---- returns 6
<-----------------+------ returns 6

Result: gcd(48, 18) = 6
```

**Complexity Analysis:**
*   **Time Complexity:** O(log(min(a, b))). The number of steps is logarithmic with respect to the smaller of the two numbers. This is because the remainder `a % b` is always less than `b`, and each step roughly halves the numbers in the worst case (e.g., consecutive Fibonacci numbers).
*   **Space Complexity:** O(log(min(a, b))). This is due to the recursion call stack depth.

#### b) Euclidean Algorithm (Iterative)

**Algorithm Steps:**
1.  Initialize `a` and `b`.
2.  While `b` is not 0:
    *   Store `b` temporarily.
    *   Update `b` to `a % b`.
    *   Update `a` to the stored `b`.
3.  When the loop terminates (i.e., `b` becomes 0), `a` holds the GCD.

**Complexity Analysis:**
*   **Time Complexity:** O(log(min(a, b))). Same as the recursive version, as the number of operations is identical.
*   **Space Complexity:** O(1). This approach uses a constant amount of extra space, making it more memory-efficient and safer for extremely large numbers than the recursive version (due to potential stack overflow).

### 1.2 Least Common Multiple (LCM)

The LCM of two integers `a` and `b` is the smallest positive integer that is divisible by both `a` and `b`.

#### a) Using GCD

**Mathematical Basis:**
There's a fundamental relationship between GCD and LCM:
`LCM(a, b) = (|a * b|) / GCD(a, b)`

**Algorithm Steps:**
1.  Calculate `GCD(a, b)` using either the recursive or iterative Euclidean algorithm.
2.  Compute `(|a * b|) / GCD(a, b)`. Use integer division.
3.  Handle edge cases where `a` or `b` (or both) are 0; `LCM(0, x)` is typically defined as 0.

**Complexity Analysis:**
*   **Time Complexity:** O(log(min(a, b))). This is dominated by the GCD calculation.
*   **Space Complexity:** O(1). If using the iterative GCD. If recursive GCD is used, it will be O(log(min(a,b))).

## 2. Prime Numbers

### Problem Description
1.  Determine if a given integer `n` is a prime number.
2.  Generate all prime numbers up to a given limit `N`.

### 2.1 Primality Test

#### a) Trial Division

**Algorithm Steps:**
1.  If `n <= 1`, it's not prime.
2.  If `n <= 3`, it's prime (2 and 3 are prime).
3.  If `n` is divisible by 2 or 3, it's not prime.
4.  For numbers greater than 3, check for divisors from 5 up to `sqrt(n)`. We only need to check numbers of the form `6k ± 1` because all primes greater than 3 are of this form.
    *   Start a loop with `i = 5`.
    *   In each iteration, check if `n` is divisible by `i` or `i + 2`. If so, `n` is not prime.
    *   Increment `i` by 6.
5.  If no divisors are found, `n` is prime.

**Complexity Analysis:**
*   **Time Complexity:** O(sqrt(n)). In the worst case, the loop runs up to `sqrt(n)` iterations (or `sqrt(n)/6` with the 6k ± 1 optimization).
*   **Space Complexity:** O(1).

### 2.2 Generating Primes up to N (Sieve of Eratosthenes)

The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to any given limit.

#### a) Standard Sieve of Eratosthenes

**Algorithm Steps:**
1.  Create a boolean array `is_prime` of size `limit + 1` and initialize all entries to `True`.
2.  Mark `is_prime[0]` and `is_prime[1]` as `False` (0 and 1 are not prime).
3.  Start with `p = 2` (the first prime number).
4.  While `p * p <= limit`:
    *   If `is_prime[p]` is `True`, then `p` is a prime number.
    *   Mark all multiples of `p` as `False` in the `is_prime` array, starting from `p * p`. (Multiples smaller than `p * p` would have already been marked by smaller primes). For example, `2*3=6` is marked by `2`, so `3` doesn't need to mark `6` again.
    *   Increment `p` to the next number.
5.  After the loop, all indices `i` for which `is_prime[i]` is `True` are prime numbers. Collect them into a list.

**ASCII Art Diagram (Sieve of Eratosthenes - Example limit=20):**

```
Initial: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T] (Indices 0 to 20)
Primes:  [F, F, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T] (0,1 false)

p=2:
  Mark multiples of 2 (4, 6, 8, 10, 12, 14, 16, 18, 20) as False.
  [F, F, T, T, F, T, F, T, F, T, F, T, F, T, F, T, F, T, F, T, F]

p=3:
  is_prime[3] is True. Mark multiples of 3 from 3*3=9 (9, 15) as False.
  (6, 12, 18 already marked by 2)
  [F, F, T, T, F, T, F, T, F, F, F, T, F, T, F, F, F, T, F, T, F]

p=4:
  is_prime[4] is False. Skip.

p=5:
  is_prime[5] is True. Mark multiples of 5 from 5*5=25 (beyond limit).
  (10, 15, 20 already marked)
  [F, F, T, T, F, T, F, T, F, F, F, T, F, T, F, F, F, T, F, T, F]

Loop ends because p*p (5*5=25) > limit (20).

Resulting Primes (indices where value is True): [2, 3, 5, 7, 11, 13, 17, 19]
```

**Complexity Analysis:**
*   **Time Complexity:** O(N log log N). This is very efficient. The outer loop runs `sqrt(N)` times. The inner loop for marking multiples runs `N/p` times for each prime `p`. The sum of `N/p` for all primes `p <= N` is approximately `N log log N`.
*   **Space Complexity:** O(N). To store the boolean array `is_prime` of size `N+1`.

#### b) Optimized Space Sieve of Eratosthenes

**Algorithm Steps:**
1.  Initialize a boolean array `is_prime_odd` only for odd numbers. The index `i` in this array corresponds to the odd number `2*i + 1`. The size of this array will be `(limit + 1) // 2`.
2.  Handle `0` and `1` (if mapping covers them) and `2` separately: `2` is the only even prime.
3.  Iterate `p_val` (actual number) through odd numbers, starting from 3, up to `sqrt(limit)`.
4.  If `is_prime_odd[(p_val - 1) // 2]` is `True`:
    *   `p_val` is a prime.
    *   Mark its odd multiples as `False`. Start from `p_val * p_val`. The step size for marking should be `2 * p_val` to only hit odd multiples (e.g., for `p_val=3`, mark `9, 15, 21...`).
5.  Collect `2` and all odd numbers `2*i + 1` where `is_prime_odd[i]` is `True`.

**Complexity Analysis:**
*   **Time Complexity:** O(N log log N). Similar to the standard sieve.
*   **Space Complexity:** O(N/2) = O(N). Roughly half the space of the standard sieve, as it only stores information for odd numbers.

## 3. Modular Exponentiation

### Problem Description
Calculate `(base^exp) % mod`, where `base`, `exp`, and `mod` are integers, and `exp` is non-negative, `mod` is positive. This is crucial in cryptography (e.g., RSA) and number theory.

### a) Naive Approach

**Algorithm Steps:**
1.  Initialize `result = 1`.
2.  Reduce `base` modulo `mod` once: `base = base % mod`. This ensures intermediate products don't overflow (for smaller `base` and `mod`).
3.  Loop `exp` times:
    *   In each iteration, update `result = (result * base) % mod`.
4.  Return `result`.

**Complexity Analysis:**
*   **Time Complexity:** O(exp). The loop runs `exp` times. For very large exponents, this is highly inefficient.
*   **Space Complexity:** O(1).

### b) Binary Exponentiation (Iterative / Exponentiation by Squaring)

**Mathematical Basis:**
This method exploits the binary representation of the exponent.
*   If `exp` is even, `base^exp = (base^2)^(exp/2)`.
*   If `exp` is odd, `base^exp = base * (base^2)^((exp-1)/2)`.

By repeatedly squaring the base and halving the exponent, we can compute `base^exp` in logarithmic time.

**Algorithm Steps:**
1.  Initialize `result = 1`.
2.  Reduce `base` modulo `mod`: `base = base % mod`.
3.  While `exp > 0`:
    *   If `exp` is odd (i.e., its last binary digit is 1), multiply `result` by `base` (and take modulo): `result = (result * base) % mod`.
    *   Square the `base` (and take modulo): `base = (base * base) % mod`.
    *   Halve the `exp`: `exp = exp // 2`.
4.  Return `result`.

**ASCII Art Diagram (Binary Exponentiation - Example (3^5) % 7):**

```
(base=3, exp=5, mod=7)
Initial: result = 1, base = 3, exp = 5

Iteration 1 (exp=5, odd):
  result = (1 * 3) % 7 = 3
  base = (3 * 3) % 7 = 9 % 7 = 2
  exp = 5 // 2 = 2

Iteration 2 (exp=2, even):
  result = 3 (no change)
  base = (2 * 2) % 7 = 4
  exp = 2 // 2 = 1

Iteration 3 (exp=1, odd):
  result = (3 * 4) % 7 = 12 % 7 = 5
  base = (4 * 4) % 7 = 16 % 7 = 2
  exp = 1 // 2 = 0

Loop ends (exp=0).

Result: 5
```

**Complexity Analysis:**
*   **Time Complexity:** O(log exp). The exponent `exp` is roughly halved in each iteration, so the number of iterations is proportional to the number of bits in `exp`.
*   **Space Complexity:** O(1).

### c) Binary Exponentiation (Recursive)

This is the recursive formulation of the same mathematical principle.

**Algorithm Steps:**
1.  Base case: If `exp == 0`, return 1.
2.  Reduce `base` modulo `mod`: `base = base % mod`.
3.  Recursively calculate `half_power = (base^(exp // 2)) % mod`.
4.  Calculate `half_power_squared = (half_power * half_power) % mod`.
5.  If `exp` is even, return `half_power_squared`.
6.  If `exp` is odd, return `(base * half_power_squared) % mod`.

**Complexity Analysis:**
*   **Time Complexity:** O(log exp). Each recursive call reduces the exponent by half, leading to logarithmic depth.
*   **Space Complexity:** O(log exp). Due to the recursion stack depth.

### d) Python's Built-in `pow()`

Python's `pow(base, exp, mod)` function is implemented in C and is highly optimized. It typically uses an efficient binary exponentiation algorithm internally. It serves as a benchmark and a quick solution for real-world scenarios.

*   **Time Complexity:** O(log exp) (highly optimized C implementation).
*   **Space Complexity:** O(1).

## 4. Fibonacci Numbers

### Problem Description
Calculate the nth Fibonacci number. The Fibonacci sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.

### a) Naive Recursive

**Algorithm Steps:**
1.  Base cases: If `n = 0`, return 0. If `n = 1`, return 1.
2.  Recursive step: Return `fib(n-1) + fib(n-2)`.

**ASCII Art Diagram (Naive Recursive - Example F(4)):**

```
          F(4)
         /    \
      F(3)     F(2)
     /  \     /  \
   F(2) F(1) F(1) F(0)
  /  \
F(1) F(0)

Notice F(2) is computed multiple times.
```

**Complexity Analysis:**
*   **Time Complexity:** O(2^n). Exponential. This is very inefficient due to redundant calculations of subproblems (e.g., F(2) is calculated multiple times when computing F(4)).
*   **Space Complexity:** O(n). Due to the recursion stack depth.

### b) Recursive with Memoization (Top-Down Dynamic Programming)

**Algorithm Steps:**
1.  Initialize a dictionary or array (`memo`) to store computed Fibonacci numbers.
2.  If `n` is already in `memo`, return `memo[n]`.
3.  Base cases: If `n = 0`, return 0. If `n = 1`, return 1.
4.  Recursive step: Calculate `result = fib(n-1) + fib(n-2)`.
5.  Store `result` in `memo[n]`.
6.  Return `result`.

**Complexity Analysis:**
*   **Time Complexity:** O(n). Each Fibonacci number from 0 to n is computed only once.
*   **Space Complexity:** O(n). For the memoization dictionary/array and the recursion stack depth.

### c) Iterative Dynamic Programming (Bottom-Up)

**Algorithm Steps:**
1.  Handle base cases: If `n = 0`, return 0. If `n = 1`, return 1.
2.  Create an array `dp` of size `n+1`.
3.  Initialize `dp[0] = 0` and `dp[1] = 1`.
4.  Iterate from `i = 2` to `n`:
    *   `dp[i] = dp[i-1] + dp[i-2]`.
5.  Return `dp[n]`.

**Complexity Analysis:**
*   **Time Complexity:** O(n). A single loop runs `n` times.
*   **Space Complexity:** O(n). To store the `n+1` Fibonacci numbers in the `dp` array.

### d) Iterative with Space Optimization

This is an improvement over the iterative DP, reducing space.

**Algorithm Steps:**
1.  Handle base cases: If `n = 0`, return 0. If `n = 1`, return 1.
2.  Initialize `a = 0` and `b = 1`. These represent `F(0)` and `F(1)`.
3.  Iterate from `i = 2` to `n`:
    *   Calculate `next_fib = a + b`.
    *   Update `a = b`.
    *   Update `b = next_fib`.
4.  Return `b` (which now holds `F(n)`).

**Complexity Analysis:**
*   **Time Complexity:** O(n). A single loop runs `n` times.
*   **Space Complexity:** O(1). Only a constant number of variables are used.

### e) Matrix Exponentiation

**Mathematical Basis:**
Fibonacci numbers have a matrix representation:
`| F(n+1) |   | 1  1 |^n   | F(1) |`
`| F(n)   | = | 1  0 |   * | F(0) |`

Let `M = [[1, 1], [1, 0]]`. Then `M^n = [[F(n+1), F(n)], [F(n), F(n-1)]]`.
We can calculate `M^n` efficiently using binary exponentiation for matrices.

**Algorithm Steps:**
1.  Handle base cases: `n = 0` return 0, `n = 1` return 1.
2.  Define the base matrix `T = [[1, 1], [1, 0]]`.
3.  Compute `T^(n-1)` using binary exponentiation for matrices.
    *   A helper function `_multiply_matrices(A, B)` multiplies two 2x2 matrices.
    *   A helper function `_matrix_power(M, p)` raises matrix `M` to power `p` using iterative binary exponentiation.
4.  The result `F(n)` will be found at `(T^(n-1))[0][0]` (or `[0][1]`).

**Complexity Analysis:**
*   **Time Complexity:** O(log n). Matrix multiplication for 2x2 matrices is constant time. Raising a matrix to the power `n-1` using binary exponentiation takes `log(n-1)` matrix multiplications.
*   **Space Complexity:** O(log n). If `_matrix_power` is implemented recursively (for the call stack). If `_matrix_power` is iterative (as implemented in the project), it's O(1).

---