package com.example.mathproblems.algorithms;

import com.example.mathproblems.utils.MathUtils;

/**
 * MathAlgorithms.java
 *
 * This class provides implementations for several common mathematical problems
 * frequently encountered in coding interviews. Each problem includes multiple
 * approaches, detailed comments, and complexity analysis.
 */
public class MathAlgorithms {

    // --- Problem 1: Fibonacci Number Calculation ---

    /**
     * Calculates the Nth Fibonacci number using a naive recursive approach.
     * The Fibonacci sequence is 0, 1, 1, 2, 3, 5, 8, ...
     * F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.
     *
     * This approach recalculates the same subproblems multiple times, leading to
     * poor performance for larger 'n'.
     *
     * @param n The index of the Fibonacci number to calculate (non-negative).
     * @return The Nth Fibonacci number.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(2^n) - Exponential, due to redundant computations.
     * Space Complexity: O(n) - Due to recursion stack depth.
     */
    public long fibonacciRecursive(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n <= 1) {
            return n;
        }
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    /**
     * Calculates the Nth Fibonacci number using recursion with memoization (top-down dynamic programming).
     * This approach stores the results of subproblems in a cache (array) to avoid
     * recomputing them.
     *
     * @param n The index of the Fibonacci number to calculate (non-negative).
     * @return The Nth Fibonacci number.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed once.
     * Space Complexity: O(n) - For the memoization cache and recursion stack depth.
     */
    public long fibonacciMemoized(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n <= 1) {
            return n;
        }

        // Initialize memoization table with -1 (or any indicator for not computed)
        long[] memo = new long[n + 1];
        java.util.Arrays.fill(memo, -1);
        memo[0] = 0;
        memo[1] = 1;

        return fibonacciMemoizedHelper(n, memo);
    }

    private long fibonacciMemoizedHelper(int n, long[] memo) {
        if (memo[n] != -1) {
            return memo[n]; // Return cached result
        }

        // Compute and store
        memo[n] = fibonacciMemoizedHelper(n - 1, memo) + fibonacciMemoizedHelper(n - 2, memo);
        return memo[n];
    }

    /**
     * Calculates the Nth Fibonacci number using an iterative approach (bottom-up dynamic programming).
     * This method builds up the solution from the base cases F(0) and F(1) to F(n).
     * It's generally preferred over recursive solutions for large 'n' due to less
     * overhead and no risk of stack overflow.
     *
     * @param n The index of the Fibonacci number to calculate (non-negative).
     * @return The Nth Fibonacci number.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(n) - A single loop runs 'n' times.
     * Space Complexity: O(n) - For the DP array.
     */
    public long fibonacciIterative(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n <= 1) {
            return n;
        }

        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    /**
     * Calculates the Nth Fibonacci number using an iterative approach with space optimization.
     * This method only keeps track of the previous two Fibonacci numbers, reducing
     * space complexity from O(n) to O(1).
     *
     * @param n The index of the Fibonacci number to calculate (non-negative).
     * @return The Nth Fibonacci number.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(n) - A single loop runs 'n' times.
     * Space Complexity: O(1) - Only a few variables are used.
     */
    public long fibonacciSpaceOptimized(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n <= 1) {
            return n;
        }

        long a = 0; // F(i-2)
        long b = 1; // F(i-1)
        long current = 0; // F(i)

        for (int i = 2; i <= n; i++) {
            current = a + b;
            a = b;
            b = current;
        }

        return current;
    }


    // --- Problem 2: Greatest Common Divisor (GCD) and Least Common Multiple (LCM) ---

    /**
     * Calculates the Greatest Common Divisor (GCD) of two non-negative integers
     * using the Euclidean Algorithm (iterative version).
     * The Euclidean algorithm is based on the principle that the GCD of two
     * numbers does not change if the larger number is replaced by its difference
     * with the smaller number. This process continues until one of the numbers is zero,
     * at which point the other number is the GCD. More efficiently, it uses the modulo operator.
     *
     * gcd(a, b) = gcd(b, a mod b)
     * gcd(a, 0) = a
     *
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The GCD of a and b.
     * @throws IllegalArgumentException if a or b is negative.
     *
     * Time Complexity: O(log(min(a, b))) - The number of steps is logarithmic with respect to the smaller number.
     * Space Complexity: O(1) - Constant extra space.
     */
    public int gcdIterative(int a, int b) {
        if (a < 0 || b < 0) {
            throw new IllegalArgumentException("GCD inputs must be non-negative.");
        }
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     * Calculates the Greatest Common Divisor (GCD) of two non-negative integers
     * using the Euclidean Algorithm (recursive version).
     *
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The GCD of a and b.
     * @throws IllegalArgumentException if a or b is negative.
     *
     * Time Complexity: O(log(min(a, b))) - Similar to the iterative version.
     * Space Complexity: O(log(min(a, b))) - Due to recursion stack depth.
     */
    public int gcdRecursive(int a, int b) {
        if (a < 0 || b < 0) {
            throw new IllegalArgumentException("GCD inputs must be non-negative.");
        }
        if (b == 0) {
            return a;
        }
        return gcdRecursive(b, a % b);
    }

    /**
     * Calculates the Least Common Multiple (LCM) of two non-negative integers
     * using the formula: LCM(a, b) = |a * b| / GCD(a, b).
     * This method utilizes the iterative GCD function.
     *
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The LCM of a and b.
     * @throws IllegalArgumentException if a or b is negative.
     * @throws ArithmeticException if a * b overflows or if GCD is zero (which means a and b are both zero).
     *
     * Time Complexity: O(log(min(a, b))) - Dominated by the GCD calculation.
     * Space Complexity: O(1) - Constant extra space.
     */
    public long lcm(int a, int b) {
        if (a < 0 || b < 0) {
            throw new IllegalArgumentException("LCM inputs must be non-negative.");
        }
        if (a == 0 || b == 0) {
            return 0; // LCM of any number with 0 is 0.
        }

        // To prevent potential overflow during (a * b), divide by GCD first.
        // It's safe because (a * b) is divisible by GCD(a, b).
        long product = (long) a / gcdIterative(a, b) * b;

        // Check for potential overflow if product exceeds Long.MAX_VALUE
        // Note: Java automatically promotes to long for `(long)a * b`
        // if the operation `a * b` itself would overflow before division,
        // it needs explicit casting: `(long)a * b / gcd(...)`
        // The current way is safer: `(long)a / gcd * b`
        if (product < 0 && (a != 0 && b != 0)) { // Check for overflow due to large numbers. product becomes negative.
            throw new ArithmeticException("LCM calculation resulted in overflow.");
        }

        return product;
    }


    // --- Problem 3: Power Function (x^n) ---

    /**
     * Calculates x raised to the power of n (x^n) using a naive iterative approach.
     * This method directly multiplies x by itself 'n' times.
     * Handles positive, negative, and zero exponents.
     *
     * @param x The base.
     * @param n The exponent.
     * @return x raised to the power of n.
     * @throws ArithmeticException if 0^negative is attempted (undefined).
     *
     * Time Complexity: O(n) - Linear in terms of the absolute value of n.
     * Space Complexity: O(1) - Constant extra space.
     */
    public double powerNaive(double x, int n) {
        if (x == 0 && n == 0) {
            return 1.0; // By convention, 0^0 is 1.
        }
        if (x == 0 && n < 0) {
            throw new ArithmeticException("Cannot calculate 0 raised to a negative power (undefined).");
        }

        long N = n; // Use long for N to handle Integer.MIN_VALUE correctly
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

    /**
     * Calculates x raised to the power of n (x^n) using optimized binary exponentiation (divide and conquer, recursive).
     * This method uses the property that x^n = (x^(n/2))^2 if n is even, and x^n = x * (x^(n/2))^2 if n is odd.
     * This significantly reduces the number of multiplications.
     * Handles positive, negative, and zero exponents.
     *
     * @param x The base.
     * @param n The exponent.
     * @return x raised to the power of n.
     * @throws ArithmeticException if 0^negative is attempted (undefined).
     *
     * Time Complexity: O(log|n|) - The exponent is halved in each recursive call.
     * Space Complexity: O(log|n|) - Due to recursion stack depth.
     */
    public double powerOptimizedRecursive(double x, int n) {
        if (x == 0 && n == 0) {
            return 1.0; // By convention, 0^0 is 1.
        }
        if (x == 0 && n < 0) {
            throw new ArithmeticException("Cannot calculate 0 raised to a negative power (undefined).");
        }

        long N = n; // Use long for N to handle Integer.MIN_VALUE correctly
        if (N < 0) {
            N = -N;
            x = 1 / x;
        }
        return powerOptimizedRecursiveHelper(x, N);
    }

    private double powerOptimizedRecursiveHelper(double x, long n) {
        if (n == 0) {
            return 1.0;
        }
        if (n == 1) {
            return x;
        }

        double half = powerOptimizedRecursiveHelper(x, n / 2);
        if (n % 2 == 0) {
            return half * half;
        } else {
            return x * half * half;
        }
    }

    /**
     * Calculates x raised to the power of n (x^n) using optimized binary exponentiation (iterative).
     * This method also uses the binary representation of the exponent, performing multiplications
     * only when a bit in the exponent is 1. It's often preferred for large exponents as it avoids
     * recursion stack overhead.
     * Handles positive, negative, and zero exponents.
     *
     * @param x The base.
     * @param n The exponent.
     * @return x raised to the power of n.
     * @throws ArithmeticException if 0^negative is attempted (undefined).
     *
     * Time Complexity: O(log|n|) - The loop runs as many times as there are bits in N.
     * Space Complexity: O(1) - Constant extra space.
     */
    public double powerOptimizedIterative(double x, int n) {
        if (x == 0 && n == 0) {
            return 1.0; // By convention, 0^0 is 1.
        }
        if (x == 0 && n < 0) {
            throw new ArithmeticException("Cannot calculate 0 raised to a negative power (undefined).");
        }

        long N = n; // Use long for N to handle Integer.MIN_VALUE correctly
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


    // --- Problem 4: Integer Square Root ---

    /**
     * Computes the integer part of the square root of a non-negative integer 'x'
     * using Binary Search.
     * The square root of x will lie between 0 and x/2 + 1 (for x > 1).
     * We search for a number 'mid' such that mid * mid <= x and (mid+1) * (mid+1) > x.
     *
     * @param x The non-negative integer.
     * @return The integer part of the square root of x.
     * @throws IllegalArgumentException if x is negative.
     *
     * Time Complexity: O(log x) - Binary search performs logarithmic comparisons.
     * Space Complexity: O(1) - Constant extra space.
     */
    public int mySqrtBinarySearch(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Square root of negative numbers is not defined for integers.");
        }
        if (x == 0 || x == 1) {
            return x;
        }

        int low = 1;
        int high = x; // The maximum possible integer square root is x (for x=1) or x/2 (for x>1)
        int ans = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2; // Avoids potential overflow of (low+high)

            // Check if mid*mid == x, using long to prevent overflow for mid*mid
            if ((long) mid * mid == x) {
                return mid;
            } else if ((long) mid * mid < x) {
                ans = mid; // mid could be the answer, try a larger number
                low = mid + 1;
            } else {
                high = mid - 1; // mid is too large, try a smaller number
            }
        }
        return ans;
    }

    /**
     * Computes the integer part of the square root of a non-negative integer 'x'
     * using Newton's Method (also known as Newton-Raphson method).
     * The formula for iteration is: guess = (guess + x / guess) / 2.
     * We start with an initial guess (e.g., x or x/2) and refine it until it converges.
     *
     * @param x The non-negative integer.
     * @return The integer part of the square root of x.
     * @throws IllegalArgumentException if x is negative.
     *
     * Time Complexity: O(log x) - Converges quadratically, which is very fast. Effectively O(log x) in terms of bits.
     * Space Complexity: O(1) - Constant extra space.
     */
    public int mySqrtNewtonMethod(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Square root of negative numbers is not defined for integers.");
        }
        if (x == 0) {
            return 0;
        }

        // Initial guess can be x itself or x/2 for better convergence.
        // If x is large, x/2 is better. If x is small (1, 2, 3), x is fine.
        // Using `x` as initial guess works for all positive x.
        long r = x; // Use long to prevent overflow during r*r for initial guess.

        while (r * r > x) {
            r = (r + x / r) / 2;
        }
        return (int) r;
    }
}