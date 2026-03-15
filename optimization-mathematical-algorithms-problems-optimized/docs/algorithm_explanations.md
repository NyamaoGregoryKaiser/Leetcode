# Algorithm Explanations

This document provides detailed explanations for the algorithms implemented in the `math_problems_project`, along with their time and space complexity analyses and illustrative ASCII diagrams where applicable.

---

## 1. Greatest Common Divisor (GCD) & Least Common Multiple (LCM)

### Problem Description
Given two integers `a` and `b`, find their Greatest Common Divisor (GCD) and Least Common Multiple (LCM).

### 1.1 Naive GCD
This approach iterates from `min(|a|, |b|)` down to 1, checking if `i` divides both `a` and `b`. The first `i` that divides both is the GCD.

**Logic:**
1. Take absolute values of `a` and `b`.
2. Handle edge cases: `GCD(0, X) = X`, `GCD(X, 0) = X`, `GCD(0, 0) = 0`.
3. Iterate `i` from `min(a, b)` down to 1.
4. If `a % i == 0` and `b % i == 0`, then `i` is the GCD. Return `i`.

**Complexity:**
*   **Time:** `O(min(a, b))` in the worst case (e.g., for coprime numbers like 17, 5).
*   **Space:** `O(1)`

**Diagram:**
```
GCD(12, 18)
Iterate i from min(12,18)=12 down to 1:
i=12: 12%12=0, 18%12!=0 (No)
i=11: ... (No)
i=10: ... (No)
i=9:  ... (No)
i=8:  ... (No)
i=7:  ... (No)
i=6:  12%6=0, 18%6=0 (Yes!) -> Return 6
```

### 1.2 Euclidean Algorithm (Recursive & Iterative)

The Euclidean algorithm is a highly efficient method for computing the GCD. It's based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number. This process continues until one of the numbers is zero, and the other number is the GCD. More formally, `GCD(a, b) = GCD(b, a % b)`.

**Logic (Recursive):**
1. Take absolute values of `a` and `b`.
2. Base case: If `b` is 0, return `a`.
3. Recursive step: Return `GCD(b, a % b)`.

**Complexity (Recursive):**
*   **Time:** `O(log(min(a, b)))`. The numbers decrease rapidly (at least by half every two steps).
*   **Space:** `O(log(min(a, b)))` due to recursion stack depth.

**Logic (Iterative):**
1. Take absolute values of `a` and `b`.
2. While `b` is not 0:
    a. Store `b` in a temporary variable (`temp`).
    b. Update `b` to `a % b`.
    c. Update `a` to `temp`.
3. When `b` becomes 0, `a` holds the GCD. Return `a`.

**Complexity (Iterative):**
*   **Time:** `O(log(min(a, b)))`. Same as recursive.
*   **Space:** `O(1)` as no recursion stack is used.

**Diagram (Iterative GCD(48, 18)):**
```
a=48, b=18
Iteration 1:
  temp = 18
  b = 48 % 18 = 12
  a = 18
  (a=18, b=12)

Iteration 2:
  temp = 12
  b = 18 % 12 = 6
  a = 12
  (a=12, b=6)

Iteration 3:
  temp = 6
  b = 12 % 6 = 0
  a = 6
  (a=6, b=0)

b is 0. Return a = 6.
```

### 1.3 Least Common Multiple (LCM)

The LCM of two numbers `a` and `b` can be calculated using their GCD with the formula:
`LCM(a, b) = (|a * b|) / GCD(a, b)`

**Logic:**
1. Take absolute values of `a` and `b`.
2. Handle edge cases: If either `a` or `b` is 0, their LCM is 0.
3. Calculate `GCD(a, b)` using an efficient method (e.g., iterative Euclidean).
4. Compute `(a / GCD(a, b)) * b`. This order helps prevent potential overflow if `a * b` would exceed the maximum value for `long long`.

**Complexity:**
*   **Time:** `O(log(min(a, b)))` (dominated by GCD calculation).
*   **Space:** `O(1)`.

---

## 2. Prime Number Generation (Sieve of Eratosthenes)

### Problem Description
Find all prime numbers up to a given integer `N`.

### 2.1 Naive `is_prime` (Trial Division)
This method checks if a single number `n` is prime by attempting to divide it by all integers from 2 up to its square root.

**Logic:**
1. Handle base cases:
    *   `n <= 1`: Not prime.
    *   `n <= 3`: Prime (2 and 3).
2. Check for divisibility by 2 and 3.
3. Iterate from 5 with a step of 6 (`i`, `i+2`): check `n % i == 0` or `n % (i+2) == 0`. This covers all primes `>3` efficiently.
4. If no divisors are found, `n` is prime.

**Complexity:**
*   **Time:** `O(sqrt(N))`.
*   **Space:** `O(1)`.

**Diagram:**
```
is_prime_naive(29):
sqrt(29) approx 5.38
Check 29%2 != 0, 29%3 != 0.
i=5: 29%5 != 0, 29%(5+2)=29%7 != 0.
Loop ends as i*i (25) will exceed N (29) next iteration.
Return true.

is_prime_naive(91):
sqrt(91) approx 9.5
Check 91%2 != 0, 91%3 != 0.
i=5: 91%5 != 0, 91%(5+2)=91%7 == 0.
Return false.
```

### 2.2 Sieve of Eratosthenes
This is an ancient algorithm for finding all prime numbers up to a specified integer. It works by iteratively marking as composite (i.e., not prime) the multiples of each prime, starting with the first prime number, 2.

**Logic:**
1. Create a boolean array `is_prime` of size `limit + 1` and initialize all entries to `true`.
2. Mark `is_prime[0]` and `is_prime[1]` as `false`.
3. Iterate from `p = 2` up to `sqrt(limit)`:
    a. If `is_prime[p]` is `true` (meaning `p` is a prime):
        i. Mark all multiples of `p` (starting from `p*p` up to `limit`) as `false`. `p*p` is the starting point because smaller multiples (`p*2`, `p*3`, etc.) would have already been marked by smaller prime factors.
4. After the loops, all indices `i` for which `is_prime[i]` is `true` are prime numbers.

**Complexity:**
*   **Time:** `O(N log log N)`. This is highly efficient for finding all primes up to N.
*   **Space:** `O(N)` for the boolean array. If storing the list of primes, an additional `O(N / log N)` space is needed (as per Prime Number Theorem, `pi(N) ~ N / log N`).

**Diagram (Sieve up to 10):**
```
Indices:  0  1  2  3  4  5  6  7  8  9 10
Boolean:  F  F  T  T  T  T  T  T  T  T  T   (Initial: 0,1 false, rest true)

p=2: (is_prime[2] is T)
  Mark multiples of 2: 4, 6, 8, 10 as F
Indices:  0  1  2  3  4  5  6  7  8  9 10
Boolean:  F  F  T  T  F  T  F  T  F  T  F

p=3: (is_prime[3] is T)
  Mark multiples of 3: (3*3=9) as F
Indices:  0  1  2  3  4  5  6  7  8  9 10
Boolean:  F  F  T  T  F  T  F  T  F  F  F

p=4: (is_prime[4] is F, skip)

p=5: (p*p = 25 > 10, loop ends)

Final primes (true indices): 2, 3, 5, 7
```

---

## 3. Power (x^n) Calculation

### Problem Description
Calculate `x` raised to the power of `n` (`x^n`), where `x` is a double and `n` is an integer.

### 3.1 Naive Iterative Power
This approach simply multiplies `x` by itself `|n|` times.

**Logic:**
1. Handle edge cases:
    *   `x = 0`: `0^positive = 0`, `0^0 = 1` (by convention), `0^negative` is undefined (return 0.0 or throw error).
    *   `n = 0`: `x^0 = 1`.
2. Store `abs(n)` in `long long` to handle `INT_MIN` safely.
3. Iterate `i` from 0 to `abs(n)-1`, multiplying `result` by `x`.
4. If `n` was negative, return `1.0 / result`. Otherwise, return `result`.

**Complexity:**
*   **Time:** `O(|n|)`. Linear with respect to the absolute value of the exponent.
*   **Space:** `O(1)`.

### 3.2 Binary Exponentiation (Exponentiation by Squaring) - Recursive & Iterative

This highly efficient algorithm computes `x^n` by breaking down the exponent `n` into its binary representation. It leverages the properties:
*   `x^n = (x^(n/2))^2` if `n` is even.
*   `x^n = x * (x^((n-1)/2))^2` if `n` is odd.

**Logic (Recursive):**
1. Handle edge cases as in naive approach.
2. Convert `n` to `long long` `exp_abs` and track if original `n` was negative.
3. Recursive function `calculate_power(base, e)`:
    a. Base case: `e = 0`, return `1.0`.
    b. `half_power = calculate_power(base, e / 2)`.
    c. If `e` is even, return `half_power * half_power`.
    d. If `e` is odd, return `half_power * half_power * base`.
4. If original `n` was negative, return `1.0 / result`.

**Complexity (Recursive):**
*   **Time:** `O(log |n|)`. Each recursive call roughly halves the exponent.
*   **Space:** `O(log |n|)` due to recursion stack depth.

**Logic (Iterative):**
1. Handle edge cases as in naive approach.
2. Convert `n` to `long long` `exp_abs` and track if original `n` was negative.
3. Initialize `result = 1.0` and `current_base = x`.
4. While `exp_abs > 0`:
    a. If `exp_abs` is odd (i.e., its last binary digit is 1), multiply `result` by `current_base`.
    b. Square `current_base`: `current_base = current_base * current_base`.
    c. Halve `exp_abs`: `exp_abs = exp_abs / 2` (equivalent to right-shifting binary exponent).
5. If original `n` was negative, return `1.0 / result`.

**Complexity (Iterative):**
*   **Time:** `O(log |n|)`. Iterates through the bits of the exponent.
*   **Space:** `O(1)`.

**Diagram (Iterative 2^10):**
```
base=2, exp=10, result=1
current_base=2, exp_abs=10

Iteration 1: exp_abs=10 (even)
  exp_abs % 2 != 1 (skip result*=current_base)
  current_base = 2*2 = 4
  exp_abs = 10/2 = 5
  (result=1, current_base=4, exp_abs=5)

Iteration 2: exp_abs=5 (odd)
  result = 1 * 4 = 4
  current_base = 4*4 = 16
  exp_abs = 5/2 = 2
  (result=4, current_base=16, exp_abs=2)

Iteration 3: exp_abs=2 (even)
  exp_abs % 2 != 1 (skip)
  current_base = 16*16 = 256
  exp_abs = 2/2 = 1
  (result=4, current_base=256, exp_abs=1)

Iteration 4: exp_abs=1 (odd)
  result = 4 * 256 = 1024
  current_base = 256*256 = 65536
  exp_abs = 1/2 = 0
  (result=1024, current_base=65536, exp_abs=0)

exp_abs is 0. Loop ends. Return result = 1024.
```

---

## 4. Nth Fibonacci Number

### Problem Description
Calculate the Nth Fibonacci number, where the sequence is defined as `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n > 1`.

### 4.1 Naive Recursive Fibonacci
This is the direct translation of the Fibonacci definition into a recursive function.

**Logic:**
1. Base cases:
    *   `n < 0`: Invalid input (return -1).
    *   `n = 0`: Return 0.
    *   `n = 1`: Return 1.
2. Recursive step: Return `fibonacci(n-1) + fibonacci(n-2)`.

**Complexity:**
*   **Time:** `O(2^n)`. Exponential, as many subproblems are recomputed repeatedly (e.g., `F(2)` is calculated multiple times when computing `F(5)`).
*   **Space:** `O(n)` due to the maximum depth of the recursion stack.

**Diagram (F(5)):**
```
           F(5)
          /    \
        F(4)    F(3)
       /  \    /  \
     F(3) F(2) F(2) F(1)
    /  \  / \  / \
  F(2) F(1) F(1) F(0) F(1) F(0)
 / \
F(1) F(0)
```
Notice `F(3)` is computed twice, `F(2)` three times.

### 4.2 Recursive Fibonacci with Memoization (Dynamic Programming - Top-Down)
This approach stores the results of expensive function calls and returns the cached result when the same inputs occur again, avoiding redundant computations.

**Logic:**
1. Create a `memo_table` (e.g., `std::vector`) initialized with a sentinel value (e.g., -1) to indicate uncomputed values.
2. The recursive function works similarly to the naive one:
    a. Handle base cases.
    b. Check `memo_table[n]`. If it's not the sentinel value, return the stored result.
    c. Otherwise, compute `fibonacci(n-1) + fibonacci(n-2)`, store the result in `memo_table[n]`, and then return it.

**Complexity:**
*   **Time:** `O(n)`. Each Fibonacci number from 2 to `n` is computed only once.
*   **Space:** `O(n)` for the memoization table and `O(n)` for the recursion stack.

**Diagram (F(5) with Memoization):**
```
           F(5)
          /    \
        F(4)    F(3) (computed once, result stored)
       /  \    /  \
     F(3) F(2) F(2) (retrieved from memo) F(1)
    /  \  / \
  F(2) F(1) F(1) F(0)
 / \
F(1) F(0)
```
Subsequent calls to F(3), F(2), etc. will retrieve the value from the memo table.

### 4.3 Iterative Fibonacci (Dynamic Programming - Bottom-Up)
This is the most efficient and preferred method for calculating Fibonacci numbers in most interview settings. It avoids recursion and builds the sequence from the bottom up.

**Logic:**
1. Handle base cases: `n < 0` (return -1), `n = 0` (return 0), `n = 1` (return 1).
2. Initialize two variables: `a = 0` (representing `F(i-2)`) and `b = 1` (representing `F(i-1)`).
3. Loop from `i = 2` to `n`:
    a. Calculate `current_fib = a + b`.
    b. Update `a = b`.
    c. Update `b = current_fib`.
4. After the loop, `current_fib` holds `F(n)`.

**Complexity:**
*   **Time:** `O(n)`. Linear, as it iterates once from 2 up to `n`.
*   **Space:** `O(1)`. Only a few variables are used to store the last two Fibonacci numbers.

**Diagram (F(5) Iterative):**
```
n=0: a=0, b=1  (return 0 for n=0)
n=1: a=0, b=1  (return 1 for n=1)

n=5:
Initial: a=0 (F0), b=1 (F1)

i=2:
  current_fib = a+b = 0+1 = 1 (F2)
  a = b = 1
  b = current_fib = 1
  (a=1, b=1)

i=3:
  current_fib = a+b = 1+1 = 2 (F3)
  a = b = 1
  b = current_fib = 2
  (a=1, b=2)

i=4:
  current_fib = a+b = 1+2 = 3 (F4)
  a = b = 2
  b = current_fib = 3
  (a=2, b=3)

i=5:
  current_fib = a+b = 2+3 = 5 (F5)
  a = b = 3
  b = current_fib = 5
  (a=3, b=5)

Loop ends. Return current_fib = 5.
```

---

This covers the detailed explanations of the algorithms and their complexities.