package com.example.mathproblems;

import com.example.mathproblems.algorithms.MathAlgorithms;
import com.example.mathproblems.algorithms.PrimeNumberAlgorithms;
import com.example.mathproblems.utils.MathUtils;

import java.util.List;
import java.util.Map;

/**
 * Main.java
 *
 * This class serves as an entry point to demonstrate the usage of the
 * mathematical algorithms implemented in this project.
 * It provides example calls and prints results for various problems.
 */
public class Main {

    public static void main(String[] args) {
        MathAlgorithms mathAlgorithms = new MathAlgorithms();
        PrimeNumberAlgorithms primeAlgorithms = new PrimeNumberAlgorithms();

        System.out.println("--- Math Algorithms Demonstration ---");
        System.out.println("\n--- Fibonacci Numbers ---");
        int fibN = 10;
        System.out.printf("F(%d) (Recursive): %d%n", fibN, mathAlgorithms.fibonacciRecursive(fibN));
        System.out.printf("F(%d) (Memoized): %d%n", fibN, mathAlgorithms.fibonacciMemoized(fibN));
        System.out.printf("F(%d) (Iterative): %d%n", fibN, mathAlgorithms.fibonacciIterative(fibN));
        System.out.printf("F(%d) (Space Optimized): %d%n", fibN, mathAlgorithms.fibonacciSpaceOptimized(fibN));

        fibN = 40; // For demonstrating performance difference for recursive
        // System.out.printf("F(%d) (Recursive - will be slow): %d%n", fibN, mathAlgorithms.fibonacciRecursive(fibN));
        System.out.printf("F(%d) (Memoized): %d%n", fibN, mathAlgorithms.fibonacciMemoized(fibN));
        System.out.printf("F(%d) (Iterative): %d%n", fibN, mathAlgorithms.fibonacciIterative(fibN));

        System.out.println("\n--- GCD and LCM ---");
        int a = 48, b = 18;
        System.out.printf("GCD(%d, %d) (Iterative): %d%n", a, b, mathAlgorithms.gcdIterative(a, b));
        System.out.printf("GCD(%d, %d) (Recursive): %d%n", a, b, mathAlgorithms.gcdRecursive(a, b));
        System.out.printf("LCM(%d, %d): %d%n", a, b, mathAlgorithms.lcm(a, b));

        a = 101; b = 103; // Primes
        System.out.printf("GCD(%d, %d): %d%n", a, b, mathAlgorithms.gcdIterative(a, b));
        System.out.printf("LCM(%d, %d): %d%n", a, b, mathAlgorithms.lcm(a, b));


        System.out.println("\n--- Power Function (x^n) ---");
        double x = 2.0;
        int n = 10;
        System.out.printf("%.1f^%d (Naive): %.2f%n", x, n, mathAlgorithms.powerNaive(x, n));
        System.out.printf("%.1f^%d (Optimized Recursive): %.2f%n", x, n, mathAlgorithms.powerOptimizedRecursive(x, n));
        System.out.printf("%.1f^%d (Optimized Iterative): %.2f%n", x, n, mathAlgorithms.powerOptimizedIterative(x, n));

        x = 0.5; n = -3;
        System.out.printf("%.1f^%d (Optimized Iterative): %.2f%n", x, n, mathAlgorithms.powerOptimizedIterative(x, n));

        x = 0.0; n = 0;
        System.out.printf("%.1f^%d (Optimized Iterative): %.2f%n", x, n, mathAlgorithms.powerOptimizedIterative(x, n));

        // System.out.printf("0^-1 (should throw error): %.2f%n", mathAlgorithms.powerOptimizedIterative(0.0, -1));


        System.out.println("\n--- Integer Square Root ---");
        int numSqrt = 16;
        System.out.printf("sqrt(%d) (Binary Search): %d%n", numSqrt, mathAlgorithms.mySqrtBinarySearch(numSqrt));
        System.out.printf("sqrt(%d) (Newton's Method): %d%n", numSqrt, mathAlgorithms.mySqrtNewtonMethod(numSqrt));

        numSqrt = 8;
        System.out.printf("sqrt(%d) (Binary Search): %d%n", numSqrt, mathAlgorithms.mySqrtBinarySearch(numSqrt));
        System.out.printf("sqrt(%d) (Newton's Method): %d%n", numSqrt, mathAlgorithms.mySqrtNewtonMethod(numSqrt));

        numSqrt = 2147395599; // Max int where sqrt fits in int
        System.out.printf("sqrt(%d) (Binary Search): %d%n", numSqrt, mathAlgorithms.mySqrtBinarySearch(numSqrt));
        System.out.printf("sqrt(%d) (Newton's Method): %d%n", numSqrt, mathAlgorithms.mySqrtNewtonMethod(numSqrt));


        System.out.println("\n--- Prime Number Algorithms Demonstration ---");
        System.out.println("\n--- Primality Test ---");
        int primeTestNum = 29;
        System.out.printf("%d is prime (Naive): %b%n", primeTestNum, primeAlgorithms.isPrimeNaive(primeTestNum));
        System.out.printf("%d is prime (Optimized): %b%n", primeTestNum, primeAlgorithms.isPrimeOptimized(primeTestNum));

        primeTestNum = 100;
        System.out.printf("%d is prime (Optimized): %b%n", primeTestNum, primeAlgorithms.isPrimeOptimized(primeTestNum));

        primeTestNum = 997; // A large prime
        System.out.printf("%d is prime (Optimized): %b%n", primeTestNum, primeAlgorithms.isPrimeOptimized(primeTestNum));


        System.out.println("\n--- Prime Factorization ---");
        int factorNum = 120;
        Map<Integer, Integer> factors = primeAlgorithms.primeFactorization(factorNum);
        System.out.printf("Prime factors of %d: %s%n", factorNum, factors);

        factorNum = 997; // A prime number
        factors = primeAlgorithms.primeFactorization(factorNum);
        System.out.printf("Prime factors of %d: %s%n", factorNum, factors);

        factorNum = 72;
        factors = primeAlgorithms.primeFactorization(factorNum);
        System.out.printf("Prime factors of %d: %s%n", factorNum, factors);

        factorNum = 1;
        factors = primeAlgorithms.primeFactorization(factorNum);
        System.out.printf("Prime factors of %d: %s%n", factorNum, factors);


        System.out.println("\n--- Sieve of Eratosthenes ---");
        int sieveLimit = 30;
        boolean[] isPrimeArray = primeAlgorithms.sieveOfEratosthenesBooleanArray(sieveLimit);
        System.out.printf("Primes up to %d (Boolean Array):%n", sieveLimit);
        System.out.print("  ");
        for (int i = 0; i <= sieveLimit; i++) {
            if (isPrimeArray[i]) {
                System.out.print(i + " ");
            }
        }
        System.out.println();

        List<Integer> primesList = primeAlgorithms.sieveOfEratosthenesToList(sieveLimit);
        System.out.printf("Primes up to %d (List): %s%n", sieveLimit, primesList);

        sieveLimit = 1;
        primesList = primeAlgorithms.sieveOfEratosthenesToList(sieveLimit);
        System.out.printf("Primes up to %d (List): %s%n", sieveLimit, primesList);


        System.out.println("\n--- Math Utilities Demonstration ---");
        int utilNum = 10;
        System.out.printf("%d is even: %b%n", utilNum, MathUtils.isEven(utilNum));
        System.out.printf("%d is odd: %b%n", utilNum, MathUtils.isOdd(utilNum));
        System.out.printf("Sum up to %d: %d%n", utilNum, MathUtils.sumUpToN(utilNum));

        utilNum = 7;
        System.out.printf("%d is even: %b%n", utilNum, MathUtils.isEven(utilNum));
        System.out.printf("%d is odd: %b%n", utilNum, MathUtils.isOdd(utilNum));
        System.out.printf("Sum up to %d: %d%n", utilNum, MathUtils.sumUpToN(utilNum));

        System.out.printf("Clamp 15 between 5 and 10: %d%n", MathUtils.clamp(15, 5, 10));
        System.out.printf("Absolute difference between 10 and 25: %d%n", MathUtils.absDifference(10, 25));
    }
}