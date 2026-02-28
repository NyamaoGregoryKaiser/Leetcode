# Edge Cases and Gotchas

Handling edge cases and being aware of potential pitfalls is a hallmark of a robust solution and often a focus point in interviews.

---

## 1. Greatest Common Divisor (GCD)

*   **Zero Inputs:**
    *   `gcd(X, 0) = X` (and `gcd(0, X) = X`): If one number is zero, the GCD is the other number. This is correctly handled by the Euclidean algorithm base case (`if (b === 0) return a;`).
    *   `gcd(0, 0) = 0`: Conventionally, the GCD of zero and zero is defined as zero. The Euclidean algorithm (both recursive and iterative) correctly returns 0 for `gcd(0, 0)` because the `if (b === 0) return a;` case fires, returning the initial `a` which is `0`.
*   **Negative Inputs:**
    *   The problem statement usually specifies non-negative integers. Our implementations explicitly throw an error for negative inputs. If negative inputs were allowed, the standard approach is to take the absolute values: `gcd(a, b) = gcd(|a|, |b|)`.
*   **Prime Numbers / Relatively Prime:**
    *   `gcd(prime1, prime2) = 1` (e.g., `gcd(7, 13) = 1`).
    *   `gcd(N, 1) = 1`.
    *   These cases can be "worst-case" for brute-force (looping all the way down to 1), but Euclidean algorithm handles them efficiently.
*   **Identical Inputs:**
    *   `gcd(X, X) = X`. Correctly handled.

---

## 2. Prime Factorization

*   **`n = 1`:**
    *   The number 1 has no prime factors. The `primeFactorsTrialDivision` and `primeFactorsSieve` functions correctly return an empty array `[]`.
*   **Prime Numbers as Input:**
    *   If `n` is a prime number (e.g., `7`), the output should be `[n]`. Both methods correctly handle this.
        *   Trial Division: The loop `i*i <= n` will complete, and the final `if (n > 2)` check will add the remaining prime `n` to the factors.
        *   Sieve: `spf[n]` will be `n` itself, leading to `[n]`.
*   **Numbers out of `MAX_SIEVE_LIMIT` (for Sieve-based):**
    *   The `primeFactorsSieve` implementation has a predefined `MAX_SIEVE_LIMIT`. If `n` exceeds this limit, it throws an error. This is a crucial constraint for sieve-based methods, and a common interview point: discuss limitations and alternative approaches (like trial division for larger numbers).
*   **Large Composite Numbers (e.g., `2^k`):**
    *   Numbers like `1024` (`2^10`) will result in an array with many identical factors `[2, 2, 2, 2, 2, 2, 2, 2, 2, 2]`. This is correct.
*   **Floating-point / Non-integer / Negative Inputs:**
    *   Prime factorization is typically defined for positive integers. Our implementations throw errors for `n < 1` or non-integer `n`.

---

## 3. Power Function (x^n)

*   **`n = 0` (Zero Exponent):**
    *   `x^0 = 1` for any `x`. This is a standard mathematical convention. Both `powerNaiveIterative` and `powerBinaryExponentiation` correctly return 1.
    *   This includes `0^0 = 1`, which is often a specific interview question. While mathematically ambiguous in some contexts, for programming, 1 is the most common convention.
*   **`x = 0` (Zero Base):**
    *   `0^positive = 0` (e.g., `0^5 = 0`).
    *   `0^negative` is undefined (division by zero, `1 / 0`). Both implementations correctly throw an error.
*   **`x = 1` or `x = -1` (Unit Bases):**
    *   `1^n = 1` for any `n`.
    *   `(-1)^even = 1`, `(-1)^odd = -1`. These are handled correctly.
*   **Negative Exponents:**
    *   `x^-n = 1 / x^n`. Both implementations compute `x^|n|` and then take the reciprocal if `n` was negative.
*   **Floating-point Base `x`:**
    *   Both implementations handle floating-point `x` correctly. Precision issues with large results are a general concern with JavaScript numbers (which are 64-bit floats), not specific to the algorithm logic itself.
*   **Integer Overflow/Precision Limits:**
    *   For very large `x` or `n`, the result `x^n` can quickly exceed JavaScript's `Number.MAX_SAFE_INTEGER` (`2^53 - 1`) or even `Number.MAX_VALUE`. When results exceed `MAX_SAFE_INTEGER`, JavaScript numbers may lose precision (become approximations). For results exceeding `Number.MAX_VALUE` (`~1.79e+308`), they will become `Infinity`. Be prepared to discuss these limitations and potential solutions (e.g., BigInt for integer arithmetic, or returning results as strings for arbitrary precision). Our current implementation does not use `BigInt`.

---

## 4. Nth Fibonacci Number

*   **`n = 0` and `n = 1` (Base Cases):**
    *   `F(0) = 0`, `F(1) = 1`. Both implementations handle these correctly.
*   **Negative `n`:**
    *   The Fibonacci sequence is typically defined for non-negative integers. Our implementations throw an error for negative `n`. Sometimes a "negafibonacci" sequence is introduced for negative indices, but this is usually a follow-up question.
*   **Large `n` and Integer Overflow/Precision:**
    *   Fibonacci numbers grow exponentially. `F(78)` is the largest Fibonacci number that can be represented *exactly* as a JavaScript `Number` (which is a 64-bit float, IEEE 754 double precision).
    *   `F(78) = 8,944,394,323,791,464`
    *   `F(79) = 14,472,334,024,676,221` (starts losing precision, `Number.MAX_SAFE_INTEGER` is `9,007,199,254,740,991`).
    *   Beyond `n=78`, both DP and Matrix Exponentiation will return approximate values due to JavaScript's floating-point representation.
    *   **Gotcha:** An interviewer might ask for very large `n` (e.g., `F(10^9)`). For such cases, you'd need `BigInt` for arbitrary-precision integers, and often the problem asks for the result modulo some large prime `M` (e.g., `10^9 + 7`). This significantly changes the problem, as matrix multiplication and addition would then be performed modulo `M`. Our current implementations do not include modular arithmetic.
*   **Non-integer `n`:**
    *   Fibonacci sequence is defined for integers. Our implementations throw an error for non-integer inputs.
*   **Recursion Depth (for a naive recursive solution):**
    *   (Not implemented here, but relevant to DP discussion) A naive recursive `F(n) = F(n-1) + F(n-2)` without memoization would lead to `O(2^N)` time complexity and `O(N)` space (due to recursion stack depth). For `n` as small as ~40-50, it would cause a stack overflow in many languages due to excessive recursion depth. DP solves this.

---
By understanding these specific nuances, you can demonstrate a thorough understanding of the problem space beyond just writing correct code.