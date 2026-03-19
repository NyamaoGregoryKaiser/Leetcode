# Math Problems: Interview Guide

This guide provides tips, common variations, and edge cases to consider when tackling mathematical problems in coding interviews.

## General Interview Tips for Math Problems

1.  **Understand the Problem Thoroughly:**
    *   Clarify constraints: Are inputs always positive? What's the maximum value? Can it be zero?
    *   Data types: Will numbers exceed standard integer limits? (Python handles large integers automatically, but other languages might require `long long` or custom big int implementations).
    *   Edge cases: What happens with 0, 1, negative numbers (if allowed), extremely large or small inputs?
    *   Return type: Single value, list, boolean?

2.  **Start with a Brute-Force/Naive Approach (if applicable):**
    *   It shows you can solve the problem, even if not optimally.
    *   Helps solidify understanding of the core logic.
    *   Provides a baseline for correctness and complexity comparison.

3.  **Optimize Systematically:**
    *   **Identify Redundancy:** Look for repeated calculations (e.g., in naive recursion). This often points to dynamic programming or memoization.
    *   **Exploit Mathematical Properties:** Can you use number theory theorems (e.g., Euclidean algorithm, Fermat's Little Theorem, properties of exponents)?
    *   **Reduce Search Space:** Instead of checking all numbers, can you check up to `sqrt(N)`? Can you skip even numbers?
    *   **Data Structures:** Can a hash map/set speed up lookups?
    *   **Algorithm Paradigm:** Think about Divide and Conquer, Greedy, Dynamic Programming.

4.  **Discuss Time and Space Complexity:**
    *   For each approach, clearly state its time and space complexity.
    *   Explain *why* it has that complexity (e.g., "log N because we halve the input in each step," "N because of a single loop," "2^N because of redundant subproblems").
    *   Compare complexities of different solutions.

5.  **Test Cases:**
    *   Start with simple examples.
    *   Include edge cases: 0, 1, small primes/composites, large numbers, max constraints.
    *   Ask the interviewer if they have specific test cases they want you to consider.

6.  **Code Quality:**
    *   **Readability:** Use clear variable names.
    *   **Comments:** Explain complex logic, especially for non-obvious optimizations.
    *   **Modularization:** Break down problems into smaller, testable functions (e.g., helper functions for matrix multiplication).
    *   **Error Handling:** Add checks for invalid inputs (e.g., negative exponent, non-integer inputs).

## Problem-Specific Interview Tips & Variations

### 1. Greatest Common Divisor (GCD) & Least Common Multiple (LCM)

*   **Core Concept:** Euclidean algorithm (iterative is generally preferred for interviews due to O(1) space).
*   **Variations:**
    *   GCD of *N* numbers: `gcd(a, b, c) = gcd(gcd(a, b), c)`.
    *   LCM of *N* numbers: `lcm(a, b, c) = lcm(lcm(a, b), c)`.
    *   GCD/LCM with negative numbers: Usually, the definition uses absolute values, so `gcd(-a, b) = gcd(a, b)`. Clarify with the interviewer.
    *   Extended Euclidean Algorithm: Find `x, y` such that `ax + by = gcd(a, b)`. Useful for modular inverse.
*   **Edge Cases:**
    *   `gcd(0, x) = x`
    *   `gcd(0, 0) = 0` (by convention)
    *   `lcm(0, x) = 0`

### 2. Prime Numbers

*   **Core Concept:** Primality testing (trial division up to `sqrt(N)` with `6k ± 1` optimization) and Sieve of Eratosthenes for generating primes up to a limit.
*   **Variations:**
    *   **Prime Factorization:** Given `N`, find all its prime factors.
        *   Trial division: Divide by 2, then by odd numbers up to `sqrt(N)`.
        *   For very large `N`, more advanced algorithms like Pollard's rho or Miller-Rabin primality test (probabilistic) might be mentioned.
    *   **Count Primes:** Count primes in a range `[L, R]`. A segment sieve or precomputed sieve might be needed.
    *   **Twin Primes/Goldbach Conjecture:** Discussing properties or related problems.
*   **Edge Cases:**
    *   `0, 1` are not prime.
    *   `2` is the only even prime.
    *   Negative numbers are not prime.
*   **Gotchas:** For `is_prime`, remember to handle `n=2, n=3` explicitly *before* `n % 2 == 0` check. For Sieve, start marking multiples from `p*p`.

### 3. Modular Exponentiation

*   **Core Concept:** Binary exponentiation (exponentiation by squaring). Both iterative and recursive forms are valuable.
*   **Variations:**
    *   **Modular Inverse:** Find `x` such that `(a * x) % m = 1`. If `m` is prime, `x = a^(m-2) % m` (Fermat's Little Theorem). Otherwise, use Extended Euclidean Algorithm.
    *   **Power of Matrix:** Similar concept, replace scalar multiplication with matrix multiplication. (Used in Fibonacci matrix method).
    *   **Large numbers in other bases:** Calculating `(X^Y) % Z` where `X, Y, Z` could be very large and possibly represented as strings.
*   **Edge Cases:**
    *   `exp = 0`: `base^0 = 1`.
    *   `base = 0`: `0^exp = 0` for `exp > 0`. `0^0` is usually 1 in this context.
    *   `mod = 1`: The result is always `0` for `exp > 0` (or `1` if `exp=0` is 1). My implementation for `mod<=0` raises ValueError, which is a common choice for interviews.
    *   Negative `base`: `(-b)^exp` needs careful handling, often `base % mod` will handle it correctly in Python for positive `mod`.
*   **Gotchas:** Don't forget to take modulo at *each* multiplication step to prevent overflow, especially for languages with fixed-size integers. Ensure `base % mod` is done initially.

### 4. Fibonacci Numbers

*   **Core Concept:** Recursive (naive, memoized), Iterative (DP, space-optimized), and Matrix Exponentiation.
*   **Variations:**
    *   **Nth Tribonacci Number:** Similar recurrence `T(n) = T(n-1) + T(n-2) + T(n-3)`. Extend DP/space-optimized methods.
    *   **Fibonacci-like sequences:** Any recurrence relation of the form `F(n) = a*F(n-1) + b*F(n-2)`. Matrix exponentiation can often be adapted.
    *   **Sum of first N Fibonacci numbers:** `sum(F(i) for i in 0..n) = F(n+2) - 1`.
    *   **Check if a number is Fibonacci:** A number `x` is a Fibonacci number if and only if `(5*x*x + 4)` or `(5*x*x - 4)` is a perfect square.
*   **Edge Cases:**
    *   `n = 0`, `n = 1`.
    *   Large `n`: Naive recursion is prohibitive. Emphasize DP or matrix exponentiation.
*   **Gotchas:**
    *   For naive recursion, be aware of the exponential time complexity and avoid running it for large `n` during the interview unless explicitly asked to demonstrate the problem.
    *   For memoization, remember to initialize the memo dictionary correctly.
    *   For matrix exponentiation, ensure correct matrix definition and multiplication.

By understanding these core concepts, variations, and potential pitfalls, you'll be well-prepared to tackle a wide range of math-related coding interview problems. Good luck!