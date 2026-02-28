# Interview Tips and Variations

This document provides general tips for approaching coding interviews, specific advice for math problems, and common variations/follow-up questions.

---

## General Interview Tips

1.  **Understand the Problem:**
    *   **Clarify:** Don't assume anything. Ask clarifying questions about input constraints (data types, ranges, negative numbers, zero, large numbers), output format, and specific definitions (e.g., `0^0`).
    *   **Examples:** Work through 1-2 simple examples manually.
    *   **Edge Cases:** Immediately think about edge cases (min/max values, empty inputs, zeros, single-element inputs, repeated elements, negative numbers).
2.  **Think Out Loud (Communicate!):**
    *   Verbalize your thought process: how you're approaching the problem, design choices, why you're rejecting certain solutions, assumptions you're making.
    *   This is crucial. Interviewers want to understand *how* you think, not just the final answer.
3.  **Propose Multiple Solutions:**
    *   Start with a brute-force or naive solution. Explain its limitations (e.g., high time complexity).
    *   Then, discuss how to optimize it. This shows your problem-solving progression.
4.  **Analyze Time and Space Complexity:**
    *   For every proposed solution, immediately discuss its time and space complexity (Big O notation). This is non-negotiable for most technical interviews.
    *   Explain *why* a particular complexity applies (e.g., "the loop runs `n` times, so it's `O(n)`").
5.  **Write Clean Code:**
    *   **Variable Names:** Use descriptive variable names.
    *   **Comments:** Add comments for complex logic, helper functions, and non-obvious parts.
    *   **Readability:** Structure your code logically.
6.  **Test Your Code:**
    *   **Walkthrough:** After writing code, manually walk through it with your examples and edge cases. Pretend you are the computer.
    *   **Identify Bugs:** This is your chance to catch errors before the interviewer points them out.
7.  **Be Humble and Open to Feedback:**
    *   If the interviewer gives hints or suggests a different approach, listen carefully and adapt. It's often a test of coachability.
    *   Don't be afraid to say "I don't know" or "I'm not sure how to optimize further right now, but I'd look into X/Y/Z".

---

## Specific Tips for Math Problems

*   **Know Your Fundamentals:** GCD, LCM, prime numbers, factorials, powers, Fibonacci sequence, modulo arithmetic, combinations/permutations. These are the building blocks.
*   **Modular Arithmetic:** For problems involving very large numbers where you need the result modulo `M`, remember that `(A + B) % M = ((A % M) + (B % M)) % M` and `(A * B) % M = ((A % M) * (B % M)) % M`. This applies to powers and matrix multiplications as well.
*   **Logarithmic Solutions:** Many math problems involving powers or exponents often have `O(log N)` solutions (e.g., Binary Exponentiation, Matrix Exponentiation, Euclidean Algorithm). Always look for these.
*   **Precomputation:** If you expect multiple queries for a range of numbers (e.g., prime factorization), consider precomputing values using techniques like Sieve of Eratosthenes. Discuss the trade-off between precomputation time/space and query time.
*   **BigInt:** For problems requiring exact large integer results in JavaScript, mention `BigInt` as a solution to overcome `Number.MAX_SAFE_INTEGER` limitations. Be aware that `BigInt` operations are generally slower than `Number` operations.
*   **Mathematical Properties:** Sometimes, there's a specific mathematical property or theorem that simplifies the problem. Knowing these (e.g., Fermat's Little Theorem, Euler's Totient Function) can be a bonus, but for common interview problems, it's usually about applying basic algorithmic patterns.

---

## Common Variations and Follow-up Questions

### 1. Greatest Common Divisor (GCD)
*   **LCM:** How would you calculate the Least Common Multiple (LCM) given your GCD function?
    *   `lcm(a, b) = (a * b) / gcd(a, b)`
*   **Multiple Numbers:** How to find GCD of an array of numbers?
    *   `gcd(a, b, c) = gcd(a, gcd(b, c))` - iterative application.
*   **Negative Inputs:** How would you handle negative inputs (e.g., `gcd(-48, 18)` should be 6)?
    *   Take absolute values: `gcd(|a|, |b|)`.
*   **Extended Euclidean Algorithm:** Can you find `x` and `y` such that `ax + by = gcd(a, b)`? (More advanced)

### 2. Prime Factorization
*   **Number of Divisors:** How many divisors does `n` have? (If `n = p1^a * p2^b * ...`, then number of divisors = `(a+1)(b+1)...`)
*   **Sum of Divisors:** How to calculate the sum of divisors?
*   **Unique Prime Factors:** Return only the unique prime factors (e.g., `[2,3]` for `12`).
*   **Factorization of very large N:** What if `N` is `10^18`? (Discuss Pollard's rho, Miller-Rabin primality test, limitations of `sqrt(N)` trial division, and Sieve limits).
*   **Primality Test:** How to check if a number is prime? (Trial division up to `sqrt(N)`, Miller-Rabin for very large numbers).

### 3. Power Function (x^n)
*   **Floating-point `n`:** What if `n` can be a floating-point number (e.g., `x^2.5`)?
    *   This usually requires `Math.pow()` or a numerical library and is less common in coding interview settings for implementation.
*   **Modular Exponentiation:** How to calculate `(x^n) % M` for a large `n`?
    *   Apply modulo operation at each multiplication step in binary exponentiation: `(result * currentX) % M` and `(currentX * currentX) % M`.
*   **Matrix Power:** How would you implement `Matrix^N`? (Connects to Fibonacci Matrix Exponentiation).
*   **`0^0` justification:** Be ready to explain why `0^0 = 1` is often a practical convention in programming and combinatorial math, even if ambiguous in pure calculus.

### 4. Nth Fibonacci Number
*   **Memoization/Caching:** (If you start with naive recursion) How to optimize the recursive solution? (Introduce memoization).
*   **Space Optimization:** How to reduce space from `O(N)` (for DP array) to `O(1)`? (Store only the last two values).
*   **Very Large `n` (modulo `M`):** How to calculate `F(n) % M` for `n` up to `10^18`?
    *   This requires Matrix Exponentiation with all matrix operations performed modulo `M`.
*   **Negative `n` (NegaFibonacci):** Define `F(-n)` using `F(n) = F(n-1) + F(n-2)` backward.
    *   `F(n-2) = F(n) - F(n-1)`.
    *   `F(-1) = F(1) - F(0) = 1 - 0 = 1`.
    *   `F(-2) = F(0) - F(-1) = 0 - 1 = -1`.
    *   `F(-n) = (-1)^(n+1) * F(n)`.
*   **Finding `n` for a given `F(n)`:** Given a Fibonacci number, find its index. (Binary search or log-based approximation).

By practicing these variations and follow-up questions, you can demonstrate flexibility and deeper understanding, elevating your interview performance.