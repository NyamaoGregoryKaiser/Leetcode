```markdown
# Algorithm Explanations for Math Problems

This document provides detailed explanations of the algorithms implemented in the `math-problems-interview` project. Each section covers a specific problem, its various solutions, complexity analysis, and illustrative diagrams (ASCII art where applicable).

## Table of Contents
1.  [Greatest Common Divisor (GCD) and Least Common Multiple (LCM)](#1-greatest-common-divisor-gcd-and-least-common-multiple-lcm)
    *   [Euclidean Algorithm (Iterative)](#euclidean-algorithm-iterative)
    *   [Euclidean Algorithm (Recursive)](#euclidean-algorithm-recursive)
    *   [Binary GCD (Stein's Algorithm)](#binary-gcd-steins-algorithm)
    *   [Least Common Multiple (LCM)](#least-common-multiple-lcm)
2.  [Prime Number Generation (Sieve of Eratosthenes) and Primality Test](#2-prime-number-generation-sieve-of-eratosthenes-and-primality-test)
    *   [Sieve of Eratosthenes](#sieve-of-eratosthenes)
    *   [Primality Test (Trial Division)](#primality-test-trial-division)
3.  [Fibonacci Sequence](#3-fibonacci-sequence)
    *   [Naive Recursive](#naive-recursive)
    *   [Iterative Dynamic Programming](#iterative-dynamic-programming)
    *   [Matrix Exponentiation](#matrix-exponentiation)

---

## 1. Greatest Common Divisor (GCD) and Least Common Multiple (LCM)

The GCD of two non-negative integers `a` and `b` is the largest positive integer that divides both `a` and `b` without leaving a remainder. The LCM is the smallest positive integer that is a multiple of both `a` and `b`.

### Euclidean Algorithm (Iterative)

This is the most common and efficient method for finding the GCD. It's based on the principle that the GCD of two numbers remains the same even if the larger number is replaced by its difference with the smaller number. A more optimized version uses the remainder operation.

**Algorithm:**
Given two numbers `a` and `b`:
1. If `b` is 0, then `a` is the GCD.
2. Otherwise, replace `a` with `b` and `b` with `a % b`, and repeat.

**Example: `gcd(48, 18)`**
```
gcd(48, 18)
a = 48, b = 18
temp = 18
b = 48 % 18 = 12
a = 18

gcd(18, 12)
a = 18, b = 12
temp = 12
b = 18 % 12 = 6
a = 12

gcd(12, 6)
a = 12, b = 6
temp = 6
b = 12 % 6 = 0
a = 6

gcd(6, 0)
b is 0, return a = 6
```
**Time Complexity:** O(log(min(a, b))). This is because the value of `b` (and `a`) decreases by at least half every two steps.
**Space Complexity:** O(1), as it uses a constant amount of extra space.

### Euclidean Algorithm (Recursive)

This is a direct recursive implementation of the Euclidean algorithm.

**Algorithm:**
```
gcd(a, b):
  if b == 0:
    return a
  else:
    return gcd(b, a % b)
```

**Example: `gcd(48, 18)`**
```
gcd(48, 18)
  -> gcd(18, 48 % 18 = 12)
    -> gcd(12, 18 % 12 = 6)
      -> gcd(6, 12 % 6 = 0)
        -> return 6
      <- 6
    <- 6
  <- 6
```
**Time Complexity:** O(log(min(a, b))), similar to the iterative version.
**Space Complexity:** O(log(min(a, b))) due to the recursion call stack.

### Binary GCD (Stein's Algorithm)

The Binary GCD algorithm, also known as Stein's algorithm, avoids division and multiplication operations, relying only on subtractions, comparisons, and shifts (which are faster on some processors).

**Algorithm:**
1.  `gcd(0, v) = v` and `gcd(u, 0) = u`. `gcd(0, 0) = 0`.
2.  If `u` and `v` are both even: `gcd(u, v) = 2 * gcd(u/2, v/2)`.
3.  If `u` is even and `v` is odd: `gcd(u, v) = gcd(u/2, v)`.
4.  If `u` is odd and `v` is even: `gcd(u, v) = gcd(u, v/2)`.
5.  If `u` and `v` are both odd: `gcd(u, v) = gcd((u-v)/2, v)` if `u >= v`, or `gcd((v-u)/2, u)` if `v > u`. Repeatedly apply step 5 until one number is 0.

The implementation iteratively factors out common powers of 2, then reduces odd numbers by subtraction and division by 2, finally multiplying back the common factors of 2.

**Example: `gcd(48, 18)`**
```
gcdBinary(48, 18)
u = 48 (110000_2), v = 18 (0010010_2)

1. Both are even. k=0.
   u | v = 48 | 18 = 111010_2 = 58
   (u | v) & 1 == 0  => true (lowest bit is 0)
   u >>= 1 => u = 24
   v >>= 1 => v = 9
   k++ => k = 1

   u | v = 24 | 9 = 11001_2 = 25
   (u | v) & 1 == 0  => false (lowest bit is 1)
   Loop ends. Current u=24, v=9, k=1.

2. Make u odd (while (u & 1) == 0)
   u = 24 (even) -> u >>= 1 => u = 12
   u = 12 (even) -> u >>= 1 => u = 6
   u = 6 (even)  -> u >>= 1 => u = 3
   Now u=3 (odd).

3. Main loop (do while u != 0 && v != 0)
   Iteration 1: u=3, v=9
   - Make v odd (already odd).
   - u < v (3 < 9), swap: u=9, v=3.
   - u = u - v = 9 - 3 = 6.
   Current u=6, v=3.

   Iteration 2: u=6, v=3
   - Make v odd (already odd).
   - u >= v (6 > 3). No swap.
   - u = u - v = 6 - 3 = 3.
   Current u=3, v=3.

   Iteration 3: u=3, v=3
   - Make v odd (already odd).
   - u >= v (3 >= 3). No swap.
   - u = u - v = 3 - 3 = 0.
   Current u=0, v=3.

   Loop ends because u=0.

4. Return v << k
   v = 3, k = 1
   Result = 3 << 1 = 6.
```
**Time Complexity:** O(log(min(a, b))) or O((log a + log b)^2) in theoretical worst cases but often considered O(log(min(a, b))) for practical inputs. It depends on the number of bits.
**Space Complexity:** O(1).

### Least Common Multiple (LCM)

The LCM can be efficiently calculated using the GCD based on the fundamental relationship:
`LCM(a, b) = (|a * b|) / GCD(a, b)`

To prevent potential overflow when calculating `a * b` for very large numbers, the formula can be rearranged:
`LCM(a, b) = (a / GCD(a, b)) * b`
This works because `GCD(a, b)` is guaranteed to divide `a` (and `b`) evenly.

**Time Complexity:** O(log(min(a, b))) because it relies on the GCD calculation.
**Space Complexity:** O(1).

---

## 2. Prime Number Generation (Sieve of Eratosthenes) and Primality Test

### Sieve of Eratosthenes

The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to a specified integer `n`.

**Algorithm:**
1. Create a boolean list `isPrime[0...n]`, initialized to `true`.
2. Mark `isPrime[0]` and `isPrime[1]` as `false` (0 and 1 are not prime).
3. Iterate from `p = 2` up to `sqrt(n)`:
   a. If `isPrime[p]` is `true`, then `p` is a prime number.
   b. Mark all multiples of `p` (starting from `p*p`) as not prime: `isPrime[i] = false` for `i = p*p, p*p + p, p*p + 2p, ...` up to `n`. (We start from `p*p` because smaller multiples would have already been marked by smaller prime factors.)
4. After the loop, all numbers `i` for which `isPrime[i]` is `true` are prime.

**Example: Sieve up to `n = 10`**
```
Initial:
[F,F,T,T,T,T,T,T,T,T,T]  (Indices: 0,1,2,3,4,5,6,7,8,9,10)
  (0,1 marked F)

p = 2: isPrime[2] is T. Mark multiples of 2 from 2*2=4:
[F,F,T,T,F,T,F,T,F,T,F]
  Multiples: 4, 6, 8, 10

p = 3: isPrime[3] is T. Mark multiples of 3 from 3*3=9:
[F,F,T,T,F,T,F,T,F,F,F]
  Multiples: 9 (6 already F, 3*2=6)

p = 4: p*p=16 > n=10. Loop ends.
   (Actually, p=4 is skipped because isPrime[4] is F)
   Next p = 5: p*p=25 > n=10. Loop ends.

Primes: 2, 3, 5, 7 (indices where isPrime is T)
```
**Time Complexity:** O(n log log n). This is very efficient for generating many primes.
**Space Complexity:** O(n) for the boolean array.

### Primality Test (Trial Division)

This method checks if a single number `num` is prime by attempting to divide it by integers up to its square root.

**Algorithm:**
1. Handle base cases:
   *   Numbers less than 2 are not prime.
   *   2 and 3 are prime.
2. Check for divisibility by 2 or 3 (if `num % 2 == 0` or `num % 3 == 0`).
3. For numbers greater than 3, iterate from `i = 5` up to `sqrt(num)`:
   *   Check for divisibility by `i` and `i + 2`. (This optimization uses the fact that all primes greater than 3 can be expressed in the form `6k ± 1`).
4. If no divisors are found, the number is prime.

**Example: `isPrimeTrialDivision(23)`**
1. `23 > 3`. Not divisible by 2 or 3.
2. `i = 5`. `i*i = 25`. `25 > 23` is false.
   `23 % 5 != 0`. `23 % (5+2=7) != 0`.
3. `i = 5 + 6 = 11`. `i*i = 121`. `121 > 23` is true.
   Loop condition `i * i <= num` (121 <= 23) fails. Loop ends.
4. Return `true`.

**Time Complexity:** O(sqrt(num)).
**Space Complexity:** O(1).

---

## 3. Fibonacci Sequence

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.
`F(0) = 0`
`F(1) = 1`
`F(n) = F(n-1) + F(n-2)` for `n > 1`

### Naive Recursive

This is the most straightforward implementation, directly translating the recursive definition.

**Algorithm:**
```
fibonacci(n):
  if n == 0: return 0
  if n == 1: return 1
  return fibonacci(n-1) + fibonacci(n-2)
```

**Example: `fibonacci(5)`**
```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   │   ├── fib(1) -> 1
│   │   │   └── fib(0) -> 0
│   │   └── fib(1) -> 1
│   └── fib(2)
│       ├── fib(1) -> 1
│       └── fib(0) -> 0
└── fib(3)
    ├── fib(2)
    │   ├── fib(1) -> 1
    │   └── fib(0) -> 0
    └── fib(1) -> 1
```
Notice the redundant calculations (e.g., `fib(3)` is computed twice, `fib(2)` thrice).

**Time Complexity:** O(2^n). Exponential, due to overlapping subproblems.
**Space Complexity:** O(n) for the recursion stack depth.

### Iterative Dynamic Programming

This method avoids redundant calculations by building up the solution from the base cases. It's a bottom-up approach.

**Algorithm:**
1. Handle base cases `F(0)=0`, `F(1)=1`.
2. Initialize `a = F(0)` and `b = F(1)`.
3. Iterate from `i = 2` to `n`:
   a. Calculate `next = a + b`.
   b. Update `a = b`.
   c. Update `b = next`.
4. The final `b` will be `F(n)`.

**Example: `fibonacci(5)`**
```
n=0: a=0, b=1
n=1: a=0, b=1
Loop i=2 to 5:
i=2: next=a+b=0+1=1. a=1, b=1  (F(2)=1)
i=3: next=a+b=1+1=2. a=1, b=2  (F(3)=2)
i=4: next=a+b=1+2=3. a=2, b=3  (F(4)=3)
i=5: next=a+b=2+3=5. a=3, b=5  (F(5)=5)
Return b=5.
```
**Time Complexity:** O(n). Linear, as each Fibonacci number is computed once.
**Space Complexity:** O(1). Constant space, as only a few variables are used. This is memory-efficient.

### Matrix Exponentiation

This is the most optimized method for calculating the n-th Fibonacci number, especially for very large `n` (e.g., up to 10^18). It's based on the following matrix property:

```
| F(n+1)  F(n)   |   =   | 1  1 | ^ n
| F(n)    F(n-1) |       | 1  0 |
```

To find `F(n)`, we need to compute the `n-1`th power of the base matrix `M = {{1, 1}, {1, 0}}`.
Then, `F(n)` will be the element `[0][0]` of the resulting matrix `M^(n-1)`.
(Specifically, `M^(n-1)` applied to `{{F(1)}, {F(0)}}` which is `{{1},{0}}` results in `{{F(n)}, {F(n-1)}}`.)
If we use `M^n`, then the top-right `[0][1]` element of `M^n` would be `F(n)`.

The key is to compute `M^n` efficiently using **binary exponentiation** (also known as exponentiation by squaring). This technique reduces the number of multiplications from `n` to `log n`.

**Binary Exponentiation for `A^p`:**
To compute `A^p`:
1. If `p = 0`, result is Identity matrix `I`.
2. If `p` is even, `A^p = (A^(p/2))^2`.
3. If `p` is odd, `A^p = A * (A^((p-1)/2))^2`.

This is typically implemented iteratively to save stack space.

**Example: `fibonacci(5)` (computing `M^4`)**
Base matrix `M = {{1,1},{1,0}}`.
Identity `I = {{1,0},{0,1}}`.
We want to compute `M^4`.

`matrixPower(M, 4)`:
   `result = I`, `currentMatrix = M`, `p = 4`
   `p = 4` (even): `currentMatrix = M * M = {{2,1},{1,1}}`, `p = 2`
   `p = 2` (even): `currentMatrix = {{2,1},{1,1}} * {{2,1},{1,1}} = {{5,3},{3,2}}`, `p = 1`
   `p = 1` (odd):  `result = result * currentMatrix = I * {{5,3},{3,2}} = {{5,3},{3,2}}`
                   `currentMatrix = {{5,3},{3,2}} * {{5,3},{3,2}} = {{34,21},{21,13}}` (not used further)
                   `p = 0`
Loop ends. Return `result = {{5,3},{3,2}}`.
The element `result[0][0]` is 5, which is `F(5)`.

**Time Complexity:** O(log n). Each matrix multiplication is a constant number of arithmetic operations (for 2x2 matrices). The number of matrix multiplications is logarithmic.
**Space Complexity:** O(log n) for recursive binary exponentiation (stack depth), or O(1) for iterative binary exponentiation (which is implemented in the project). Uses `BigInteger` to handle very large Fibonacci numbers.

---
```