# Detailed Algorithm Explanations

This document provides in-depth explanations of the mathematical algorithms implemented in the project. Each section covers the problem description, multiple approaches, their underlying logic, and a detailed analysis of their time and space complexity. ASCII art diagrams are used to visualize concepts where helpful.

---

## 1. Fibonacci Numbers

**Problem Description**: The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. (0, 1, 1, 2, 3, 5, 8, ...). Given an integer `n`, calculate the `n`-th Fibonacci number, `F(n)`.
*   `F(0) = 0`
*   `F(1) = 1`
*   `F(n) = F(n-1) + F(n-2)` for `n > 1`

### a) Recursive (Brute Force)

**Logic**: Directly applies the recursive definition `F(n) = F(n-1) + F(n-2)`.
```java
long fibonacciRecursive(int n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
```

**Recursion Tree Example (F(4))**:
```
        F(4)
       /    \
     F(3)   F(2)
    /  \    /  \
  F(2) F(1) F(1) F(0)
 /  \
F(1) F(0)
```
Notice `F(2)` is computed multiple times. This redundancy leads to poor performance.

**Time Complexity**: O(2^n)
*   Each call spawns two more calls (roughly), leading to an exponential growth in computations.
*   This is highly inefficient for `n > 20-30`.

**Space Complexity**: O(n)
*   Due to the maximum depth of the recursion stack.

### b) Recursive with Memoization (Top-Down Dynamic Programming)

**Logic**: To avoid recalculating the same subproblems, we store the results of `F(i)` in an array (memoization table) as they are computed. Before computing `F(n)`, we first check if its value is already in the table.
```java
// Simplified helper
long fibonacciMemoizedHelper(int n, long[] memo) {
    if (memo[n] != -1) return memo[n]; // Already computed
    memo[n] = fibonacciMemoizedHelper(n - 1, memo) + fibonacciMemoizedHelper(n - 2, memo);
    return memo[n];
}
```

**Recursion Tree with Memoization (F(4))**:
```
        F(4)
       /    \
     F(3)   F(2) (read from memo after first F(2) computed)
    /  \    /  \
  F(2) F(1) F(1) F(0)
 /  \
F(1) F(0)
```
Once `F(2)` is computed (e.g., from the left branch), its value is stored. When `F(2)` is needed again (from the right branch), it's simply retrieved from the memo table.

**Time Complexity**: O(n)
*   Each `F(i)` from 0 to `n` is computed only once.

**Space Complexity**: O(n)
*   For the memoization table (array) and the recursion stack depth.

### c) Iterative (Bottom-Up Dynamic Programming)

**Logic**: This approach builds the solution from the ground up. It starts with base cases `F(0)` and `F(1)`, then iteratively calculates `F(2), F(3), ...` up to `F(n)` using the previous two values.
```java
long fibonacciIterative(int n) {
    long[] dp = new long[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

**Time Complexity**: O(n)
*   A single loop runs `n` times.

**Space Complexity**: O(n)
*   For the DP array to store all intermediate results.

### d) Space-Optimized Iterative

**Logic**: Observing that `F(n)` only depends on `F(n-1)` and `F(n-2)`, we don't need to store the entire `dp` array. We can just keep track of the two most recent Fibonacci numbers.
```java
long fibonacciSpaceOptimized(int n) {
    long a = 0; // Represents F(i-2)
    long b = 1; // Represents F(i-1)
    for (int i = 2; i <= n; i++) {
        long current = a + b; // Calculate F(i)
        a = b;               // Update F(i-2) to F(i-1)
        b = current;         // Update F(i-1) to F(i)
    }
    return b; // For n=0, returns a (0). For n=1, returns b (1). For n>1, returns final b.
}
```

**Time Complexity**: O(n)
*   A single loop runs `n` times.

**Space Complexity**: O(1)
*   Only a constant number of variables are used. This is the most efficient solution in terms of space.

---

## 2. Greatest Common Divisor (GCD) and Least Common Multiple (LCM)

**Problem Description**:
*   **GCD (Greatest Common Divisor)**: The largest positive integer that divides two or more integers without leaving a remainder.
*   **LCM (Least Common Multiple)**: The smallest positive integer that is a multiple of two or more integers.

### a) Euclidean Algorithm (Iterative)

**Logic**: The Euclidean algorithm is an efficient method for computing the GCD of two integers. It is based on the principle that the GCD of two numbers does not change if the larger number is replaced by its difference with the smaller number. This process continues until one of the numbers is zero, at which point the other number is the GCD. More efficiently, it uses the modulo operator:
`GCD(a, b) = GCD(b, a % b)`
`GCD(a, 0) = a`

```java
int gcdIterative(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

**Example (GCD(48, 18))**:
```
a = 48, b = 18
Iteration 1: temp = 18, b = 48 % 18 = 12, a = 18
a = 18, b = 12
Iteration 2: temp = 12, b = 18 % 12 = 6, a = 12
a = 12, b = 6
Iteration 3: temp = 6, b = 12 % 6 = 0, a = 6
a = 6, b = 0
Loop terminates. Return a = 6.
```

**Time Complexity**: O(log(min(a, b)))
*   The number of steps is logarithmic with respect to the smaller of the two numbers. This is very efficient.

**Space Complexity**: O(1)
*   Constant extra space for variables.

### b) Euclidean Algorithm (Recursive)

**Logic**: Directly implements the recursive definition of the Euclidean algorithm.
```java
int gcdRecursive(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcdRecursive(b, a % b);
}
```

**Time Complexity**: O(log(min(a, b)))
*   Similar to the iterative version.

**Space Complexity**: O(log(min(a, b)))
*   Due to the recursion stack depth.

### c) LCM Calculation

**Logic**: The LCM of two numbers `a` and `b` can be calculated using their GCD with the formula:
`LCM(a, b) = |a * b| / GCD(a, b)`
To prevent potential integer overflow when `a * b` is large, it's safer to compute `(a / GCD(a, b)) * b`.

```java
long lcm(int a, int b) {
    if (a == 0 || b == 0) return 0; // LCM of any number with 0 is 0.
    return (long) a / gcdIterative(a, b) * b; // Use long cast to prevent overflow
}
```

**Time Complexity**: O(log(min(a, b)))
*   Dominated by the GCD calculation.

**Space Complexity**: O(1)
*   Constant extra space.

---

## 3. Power Function (x^n)

**Problem Description**: Implement `pow(x, n)`, which calculates `x` raised to the power `n` (`x^n`). `n` can be a positive, negative, or zero integer.

### a) Naive Iterative

**Logic**: Directly multiplies `x` by itself `n` times. If `n` is negative, we calculate `1/(x^-n)`.
```java
double powerNaive(double x, int n) {
    long N = n; // Use long to handle Integer.MIN_VALUE
    double result = 1.0;
    if (N < 0) {
        N = -N;
        x = 1 / x;
    }
    for (int i = 0; i < N; i++) {
        result *= x;
    }
    return result;
}
```

**Time Complexity**: O(|n|)
*   Linear in terms of the absolute value of `n`.

**Space Complexity**: O(1)
*   Constant extra space.

### b) Optimized Binary Exponentiation (Recursive)

**Logic**: Uses the property of exponents to reduce the number of multiplications:
*   If `n` is even: `x^n = (x^(n/2))^2`
*   If `n` is odd: `x^n = x * (x^(n/2))^2`
This is a divide-and-conquer approach, effectively halving the exponent in each step.
```java
double powerOptimizedRecursive(double x, int n) {
    long N = n;
    if (N < 0) {
        N = -N;
        x = 1 / x;
    }
    return powerOptimizedRecursiveHelper(x, N);
}

private double powerOptimizedRecursiveHelper(double x, long n) {
    if (n == 0) return 1.0;
    if (n == 1) return x;

    double half = powerOptimizedRecursiveHelper(x, n / 2);
    if (n % 2 == 0) {
        return half * half;
    } else {
        return x * half * half;
    }
}
```

**Example (2^10)**:
```
pow(2, 10)
  half = pow(2, 5)
    half = pow(2, 2)
      half = pow(2, 1) -> returns 2
    returns 2 * 2 = 4 (for 2^2)
  returns 2 * 4 * 4 = 32 (for 2^5)
returns 32 * 32 = 1024 (for 2^10)
```

**Time Complexity**: O(log|n|)
*   The exponent is halved in each recursive call, similar to binary search.

**Space Complexity**: O(log|n|)
*   Due to the recursion stack depth.

### c) Optimized Binary Exponentiation (Iterative)

**Logic**: This approach is also based on binary exponentiation but uses an iterative loop instead of recursion. It processes the exponent's binary representation. If the current bit is 1, we multiply the result by `x`; in each step, we square `x` and halve `n`.

```java
double powerOptimizedIterative(double x, int n) {
    long N = n;
    double result = 1.0;
    if (N < 0) {
        N = -N;
        x = 1 / x;
    }

    while (N > 0) {
        if (N % 2 == 1) { // If the current bit is 1 (N is odd)
            result *= x;
        }
        x *= x; // Square the base
        N /= 2; // Move to the next bit (divide N by 2)
    }
    return result;
}
```

**Example (2^10)**:
```
N = 10 (binary 1010)
x = 2.0, result = 1.0

1. N = 10 (even): result = 1.0, x = 2*2 = 4, N = 5
2. N = 5 (odd): result = 1.0 * 4 = 4.0, x = 4*4 = 16, N = 2
3. N = 2 (even): result = 4.0, x = 16*16 = 256, N = 1
4. N = 1 (odd): result = 4.0 * 256 = 1024.0, x = 256*256 = 65536, N = 0
Loop ends. Return 1024.0.
```

**Time Complexity**: O(log|n|)
*   The loop runs as many times as there are bits in `N`.

**Space Complexity**: O(1)
*   Constant extra space. This is generally the most preferred solution for interview settings.

---

## 4. Integer Square Root

**Problem Description**: Implement `int sqrt(int x)`. Compute and return the square root of `x`. Since the return type is an integer, the decimal digits are truncated. `x` will be a non-negative integer.

### a) Binary Search

**Logic**: The integer square root of `x` (for `x > 1`) will lie between `1` and `x`. We can use binary search to find the largest integer `mid` such that `mid * mid <= x`.
The search space can be refined to `[0, x/2 + 1]` for `x > 1` (since `sqrt(x)` cannot be larger than `x/2` if `x >= 4`, but `x` itself for `x=0,1,2,3`). A simpler bound is `[0, x]` or `[0, Integer.MAX_VALUE / 2]` to cover all cases.

```java
int mySqrtBinarySearch(int x) {
    if (x == 0 || x == 1) return x;

    int low = 1;
    int high = x; // A reasonable upper bound. Can be x/2 for x > 1.
    int ans = 0;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if ((long) mid * mid == x) { // Use long to prevent overflow for mid * mid
            return mid;
        } else if ((long) mid * mid < x) {
            ans = mid; // mid could be the answer, try larger
            low = mid + 1;
        } else {
            high = mid - 1; // mid is too large, try smaller
        }
    }
    return ans;
}
```

**Time Complexity**: O(log x)
*   Binary search reduces the search space by half in each step.

**Space Complexity**: O(1)
*   Constant extra space.

### b) Newton's Method (Newton-Raphson)

**Logic**: Newton's method is an iterative approach to find successively better approximations to the roots (or zeroes) of a real-valued function. For square root of `x`, we are looking for a `root` such that `root^2 - x = 0`.
The iterative formula is: `guess = (guess + x / guess) / 2`.
We start with an initial guess (e.g., `x` itself or `x/2`) and repeatedly apply the formula until the `guess * guess` is close enough to `x` or `guess` converges. For integer square root, we stop when `guess * guess <= x` and `(guess+1) * (guess+1) > x`. A simpler check is just `r*r > x`.

```java
int mySqrtNewtonMethod(int x) {
    if (x == 0) return 0;

    long r = x; // Initial guess, use long to prevent overflow
    while (r * r > x) {
        r = (r + x / r) / 2;
    }
    return (int) r;
}
```

**Example (sqrt(8))**:
```
x = 8, r = 8 (initial guess)

Iteration 1: r*r = 64 > 8. r = (8 + 8/8) / 2 = (8 + 1) / 2 = 4
Iteration 2: r*r = 16 > 8. r = (4 + 8/4) / 2 = (4 + 2) / 2 = 3
Iteration 3: r*r = 9 > 8. r = (3 + 8/3) / 2 = (3 + 2) / 2 = 2 (integer division)
Iteration 4: r*r = 4 <= 8. Loop terminates. Return r = 2.
```

**Time Complexity**: O(log x) (very fast convergence, often considered nearly constant for typical integer sizes).
*   Newton's method converges quadratically, meaning the number of correct digits roughly doubles with each iteration.

**Space Complexity**: O(1)
*   Constant extra space.

---

## 5. Primality Test & Prime Factorization

**Problem Description**:
*   **Primality Test**: Determine if a given positive integer `n` is a prime number.
*   **Prime Factorization**: Find all prime factors of a given positive integer `n` and their corresponding exponents.

### a) `isPrime` - Naive Trial Division

**Logic**: A prime number is only divisible by 1 and itself. This method checks for divisibility by all integers from 2 up to `n-1`.
```java
boolean isPrimeNaive(int n) {
    if (n <= 1) return false;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

**Time Complexity**: O(n)
*   Checks up to `n-2` divisors in the worst case (for prime numbers).

**Space Complexity**: O(1)
*   Constant extra space.

### b) `isPrime` - Optimized Trial Division

**Logic**: We can optimize the trial division method:
1.  Numbers less than or equal to 3 are handled as special cases (2 and 3 are prime, 0 and 1 are not).
2.  Any even number greater than 2 is not prime.
3.  Any multiple of 3 greater than 3 is not prime.
4.  For numbers `n > 3`, we only need to check for divisibility up to `sqrt(n)`. If `n` has a divisor `d > sqrt(n)`, then it must also have a divisor `n/d < sqrt(n)`.
5.  After checking for 2 and 3, all remaining prime numbers must be of the form `6k ± 1`. This allows us to check only `i` and `i+2` in steps of `6` (i.e., `5, 7, 11, 13, 17, 19, ...`).

```java
boolean isPrimeOptimized(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true; // 2 and 3 are prime
    if (n % 2 == 0 || n % 3 == 0) return false; // Multiples of 2 or 3

    for (int i = 5; (long) i * i <= n; i = i + 6) { // Check 6k +/- 1
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}
```

**Time Complexity**: O(sqrt(n) / 6) which is effectively O(sqrt(n)).
*   Significantly faster than O(n).

**Space Complexity**: O(1)
*   Constant extra space.

### c) `primeFactorization` - Optimized Trial Division

**Logic**: To find prime factors, we iteratively divide `n` by the smallest possible prime factors.
1.  Handle factor 2: Repeatedly divide `n` by 2 until it's no longer divisible, counting occurrences.
2.  Handle factor 3: Repeatedly divide `n` by 3.
3.  Handle factors from 5 onwards: Iterate with `i` and `i+2` (like optimized `isPrime`) up to `sqrt(n)`. Repeatedly divide `n` by `i` then by `i+2`.
4.  If after all divisions, `n` is still greater than 1, the remaining `n` must be a prime factor itself (larger than `sqrt(original n)`).

```java
Map<Integer, Integer> primeFactorization(int n) {
    Map<Integer, Integer> factors = new HashMap<>();

    while (n % 2 == 0) { // Handle factor 2
        factors.put(2, factors.getOrDefault(2, 0) + 1);
        n /= 2;
    }
    while (n % 3 == 0) { // Handle factor 3
        factors.put(3, factors.getOrDefault(3, 0) + 1);
        n /= 3;
    }

    for (int i = 5; (long) i * i <= n; i = i + 6) { // Handle 6k +/- 1
        while (n % i == 0) {
            factors.put(i, factors.getOrDefault(i, 0) + 1);
            n /= i;
        }
        while (n % (i + 2) == 0) {
            factors.put(i + 2, factors.getOrDefault(i + 2, 0) + 1);
            n /= (i + 2);
        }
    }

    if (n > 1) { // Remaining n is a prime factor
        factors.put(n, factors.getOrDefault(n, 0) + 1);
    }
    return factors;
}
```

**Time Complexity**: O(sqrt(n))
*   In the worst case (when `n` is prime), we check up to `sqrt(n)`.

**Space Complexity**: O(log n)
*   The number of distinct prime factors is logarithmic relative to `n`.

---

## 6. Sieve of Eratosthenes

**Problem Description**: Generate all prime numbers up to a given limit `n`.

### a) Boolean Array Sieve

**Logic**: The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to any given limit.
1.  Create a boolean array `isPrime[0...n]` and initialize all entries to `true`.
2.  Mark `isPrime[0]` and `isPrime[1]` as `false` (0 and 1 are not prime).
3.  Start with `p = 2`. If `isPrime[p]` is `true`, then `p` is a prime number.
4.  Mark all multiples of `p` (starting from `p*p`) as `false`. We start from `p*p` because smaller multiples (`p*2, p*3, ...`) would have already been marked by smaller primes (e.g., `2*p` by `2`, `3*p` by `3`).
5.  Increment `p` and repeat step 3 until `p*p > n`.

```java
boolean[] sieveOfEratosthenesBooleanArray(int n) {
    boolean[] isPrime = new boolean[n + 1];
    Arrays.fill(isPrime, true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (int p = 2; (long) p * p <= n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }
    return isPrime;
}
```

**Example (Sieve up to 10)**:
```
Initialize: [F, F, T, T, T, T, T, T, T, T, T] (0-10)

p = 2: isPrime[2] is T. Mark multiples of 2: 4, 6, 8, 10 as F.
        [F, F, T, T, F, T, F, T, F, T, F]

p = 3: isPrime[3] is T. Mark multiples of 3: 9 as F (3*3). 6 already F.
        [F, F, T, T, F, T, F, T, F, F, F]

p = 4: isPrime[4] is F. Skip.

p = 5: p*p = 25 > 10. Loop terminates.

Result: Primes up to 10 are 2, 3, 5, 7.
```

**Time Complexity**: O(n log log n)
*   This is highly efficient, close to O(n), because the inner loop `i += p` runs fewer times for larger `p`.
*   Sum of (n/p) for p primes = n * (1/2 + 1/3 + 1/5 + ...) which is approximately `n * log(log n)`.

**Space Complexity**: O(n)
*   For the boolean array.

### b) List-based Sieve

**Logic**: This method simply calls the boolean array sieve and then iterates through the array to collect all numbers marked `true` into a `List<Integer>`.

```java
List<Integer> sieveOfEratosthenesToList(int n) {
    List<Integer> primesList = new ArrayList<>();
    if (n < 2) return primesList;
    boolean[] isPrime = sieveOfEratosthenesBooleanArray(n);
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primesList.add(i);
        }
    }
    return primesList;
}
```

**Time Complexity**: O(n log log n)
*   Dominated by the boolean array sieve computation.

**Space Complexity**: O(n)
*   For the boolean array and the list of primes.
---