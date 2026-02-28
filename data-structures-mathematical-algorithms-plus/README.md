# Math Problems Interview Project

This project is a comprehensive guide and implementation for several common math-related coding interview problems. It provides multiple approaches for each problem, including brute-force and optimized solutions, detailed explanations, performance analysis, and extensive test cases.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: Greatest Common Divisor (GCD)](#problem-1-greatest-common-divisor-gcd)
    *   [Problem 2: Prime Factorization](#problem-2-prime-factorization)
    *   [Problem 3: Power Function (x^n)](#problem-3-power-function-xn)
    *   [Problem 4: Nth Fibonacci Number](#problem-4-nth-fibonacci-number)
4.  [Setup and Installation](#setup-and-installation)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Edge Cases and Gotchas](#edge-cases-and-gotchas)
    *   [Interview Tips](#interview-tips)

## Features

*   **Multiple Solutions:** Each problem offers several implementations, from naive to highly optimized, showcasing different algorithmic paradigms.
*   **TypeScript:** All code is written in TypeScript for type safety and better maintainability.
*   **Detailed Comments:** Explanations of logic, time, and space complexity directly within the code.
*   **Comprehensive Tests:** Extensive Jest test suites cover various scenarios, including edge cases.
*   **Performance Benchmarking:** Compare the execution time of different solutions for each problem.
*   **In-depth Documentation:** Dedicated markdown files explain algorithms, provide visual aids, discuss common pitfalls, and offer interview strategies.

## Problem Descriptions

### Problem 1: Greatest Common Divisor (GCD)

**Description:**
Given two non-negative integers `a` and `b`, find their greatest common divisor (GCD). The GCD of two integers is the largest positive integer that divides both numbers without leaving a remainder.

**Examples:**
*   `gcd(48, 18)` = 6
*   `gcd(101, 103)` = 1 (101 and 103 are prime)
*   `gcd(0, 5)` = 5
*   `gcd(0, 0)` = 0 (conventionally)

**Implementations:**
*   `gcd-bruteforce.ts`: Iterates from `min(a, b)` down to 1.
*   `gcd-euclidean-recursive.ts`: Classic Euclidean algorithm using recursion.
*   `gcd-euclidean-iterative.ts`: Classic Euclidean algorithm using iteration.

### Problem 2: Prime Factorization

**Description:**
Given a positive integer `n`, find its prime factors. A prime factor is a prime number that divides `n` exactly.

**Examples:**
*   `primeFactors(12)` = [2, 2, 3]
*   `primeFactors(100)` = [2, 2, 5, 5]
*   `primeFactors(7)` = [7]
*   `primeFactors(1)` = []

**Implementations:**
*   `primeFactors-trial-division.ts`: Divides `n` by prime numbers up to `sqrt(n)`.
*   `primeFactors-sieve.ts`: Uses a precomputed Sieve of Eratosthenes to find the smallest prime factor (SPF) for all numbers up to a limit, then efficiently factorizes `n` using SPF. This is highly efficient for multiple queries.

### Problem 3: Power Function (x^n)

**Description:**
Implement `pow(x, n)`, which calculates `x` raised to the power `n` (`x^n`). `x` can be a floating-point number, and `n` can be a positive, negative, or zero integer.

**Examples:**
*   `power(2, 10)` = 1024
*   `power(2.1, 3)` = 9.261
*   `power(2, -2)` = 0.25 (1/4)
*   `power(5, 0)` = 1
*   `power(0, 0)` = 1 (conventionally)

**Implementations:**
*   `power-naive-iterative.ts`: Simple multiplication loop.
*   `power-binary-exponentiation.ts`: Optimized solution using "exponentiation by squaring" (binary exponentiation), reducing multiplications to `O(log n)`.

### Problem 4: Nth Fibonacci Number

**Description:**
Given an integer `n`, calculate the `n`-th Fibonacci number. The Fibonacci sequence is defined as `F(0) = 0`, `F(1) = 1`, `F(n) = F(n-1) + F(n-2)` for `n > 1`.

**Examples:**
*   `fibonacci(0)` = 0
*   `fibonacci(1)` = 1
*   `fibonacci(2)` = 1
*   `fibonacci(6)` = 8
*   `fibonacci(10)` = 55

**Implementations:**
*   `fibonacci-dynamic-programming.ts`: Iterative bottom-up dynamic programming with O(1) space optimization.
*   `fibonacci-matrix-exponentiation.ts`: Advanced solution using matrix exponentiation to achieve O(log n) time complexity.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/math-problems-interview.git
    cd math-problems-interview
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    This will install TypeScript and Jest.

## Running Tests

To run all test suites:

```bash
npm test
# or
yarn test
```

To run tests for a specific problem (e.g., GCD):

```bash
npm test tests/problem1-gcd.test.ts
# or
yarn test tests/problem1-gcd.test.ts
```

## Running Benchmarks

To compare the performance of different algorithms for each problem:

```bash
npm run benchmark
# or
yarn benchmark
```

The output will show execution times for various inputs, demonstrating the efficiency gains of optimized solutions.

## Documentation

Dive deeper into the `docs/` directory for detailed explanations:

### Algorithm Explanations
*   `docs/algorithms.md`: Provides in-depth discussions of the logic behind each algorithm, including step-by-step breakdowns and rationale for optimization.

### Visual Diagrams
*   `docs/diagrams.txt`: Contains ASCII art illustrations for key concepts, such as the Euclidean algorithm or binary exponentiation, to aid understanding.

### Edge Cases and Gotchas
*   `docs/edge-cases-gotchas.md`: Highlights common pitfalls, tricky inputs, and important considerations for each problem that interviewers often look for.

### Interview Tips
*   `docs/interview-tips.md`: Offers general advice for tackling coding interviews, how to articulate your thought process, discuss trade-offs, and handle follow-up questions.

---
**Note:** This project serves as a comprehensive educational resource. While the code is functional, it's encouraged to understand the underlying principles rather than just copying solutions.
---

---
### File Content
---