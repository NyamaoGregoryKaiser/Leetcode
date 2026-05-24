# Interview Tips & Variations for Bit Manipulation

Bit manipulation problems are common in coding interviews, especially for roles requiring low-level optimization, embedded systems, or high-performance computing. They test your understanding of integer representations and fundamental computer science principles.

## Table of Contents

1.  [General Strategies](#general-strategies)
2.  [Common Bit Manipulation Patterns](#common-bit-manipulation-patterns)
3.  [Edge Cases and Gotchas](#edge-cases-and-gotchas)
4.  [Problem Variations & Extensions](#problem-variations--extensions)
5.  [Interview Preparation Checklist](#interview-preparation-checklist)

---

## 1. General Strategies

*   **Binary Representation:** Always start by writing down numbers in binary. This often reveals patterns that are not obvious in decimal.
*   **Small Examples:** Work through small examples (e.g., 4-bit or 8-bit numbers) to understand how bits change with operations.
*   **Understand `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`:** Be intimately familiar with what each operator does.
*   **Masking:** Many bit manipulation problems involve creating specific "masks" to isolate, set, or clear bits.
    *   `1 << i`: Mask with `i`-th bit set.
    *   `(1 << k) - 1`: Mask with `k` LSBs set (e.g., `(1 << 3) - 1` is `0111_2`).
    *   `~((1 << k) - 1)`: Mask with `k` LSBs cleared.
*   **Know the "Tricks":**
    *   `n & (n - 1)`: Clears the least significant set bit.
    *   `n & (~n + 1)` or `n & (-n)`: Isolates the least significant set bit (useful for finding powers of 2, or iterating over set bits without modifying `n`).
    *   `n ^ m`: Flips bits in `n` where `m` has 1s.
*   **Practice:** The best way to get good at bit manipulation is consistent practice. Solve problems from various platforms.

## 2. Common Bit Manipulation Patterns

*   **Check `i`-th bit:** `(num >> i) & 1`
*   **Set `i`-th bit:** `num | (1 << i)`
*   **Clear `i`-th bit:** `num & (~(1 << i))`
*   **Toggle `i`-th bit:** `num ^ (1 << i)`
*   **Count set bits (Hamming Weight):** Brian Kernighan's algorithm (`n &= (n - 1)`) is essential.
*   **Check if power of 2:** `n > 0 && (n & (n - 1)) === 0`
*   **Parity Check:** Determine if a number has an even or odd number of set bits. Often solved with XORing halves of the number repeatedly or using a variation of counting set bits.
*   **Swap two numbers without a temporary variable:** `a = a ^ b; b = a ^ b; a = a ^ b;` (Careful with pointers/references to the same memory location, though less of an issue in JS).
*   **Sign of a number:** `(num >> 31) & 1` for 32-bit signed integer. (In JS, this gives `0` for positive, `1` for negative if using `>>`).
*   **Absolute value without branching:** `(x ^ (x >> 31)) - (x >> 31)` for 32-bit signed integer.

## 3. Edge Cases and Gotchas

*   **Integer Representation (Signed vs. Unsigned):**
    *   JavaScript numbers are 64-bit floating-point internally, but bitwise operations treat them as 32-bit *signed* integers.
    *   **Signed Right Shift (`>>`):** Preserves the sign bit. Shifting a negative number right will fill with 1s from the left.
    *   **Unsigned Right Shift (`>>>`):** Always fills with 0s from the left. This is crucial when you need to treat a number as unsigned 32-bit (e.g., for reversing bits, or problems that specify unsigned integers).
    *   Be mindful of results that might exceed 32 bits or become negative when you expect unsigned positive numbers. Explicitly using `>>> 0` can convert a signed 32-bit result to its unsigned equivalent.
*   **Zero:** Often an edge case. `0` is not a power of two. `0 & (0-1)` is `0`.
*   **Negative Numbers:** How should negative numbers be handled for a given problem? If the problem specifies unsigned integers, ensure your operations correctly convert or handle this. The two's complement representation of negative numbers is fundamental here.
*   **Off-by-one Errors:** Bit positions are usually 0-indexed. Be careful with loop bounds (e.g., 0 to 31 for 32 bits).
*   **Large Inputs:** For array-based problems, consider if bit manipulation can replace hash maps for better space complexity.

## 4. Problem Variations & Extensions

*   **Count Set Bits:**
    *   **Parity Bit:** Check if Hamming weight is even or odd.
    *   **Sum of Hamming Distances:** Given an array of numbers, find the total sum of Hamming distances between all pairs of numbers. (Hint: For each bit position, count how many numbers have 0 and how many have 1. Contribution for that bit is `count0 * count1 * 2`).
*   **Single Number:**
    *   **Single Number II:** All appear 3 times, one appears once. (Solved by counting bits modulo 3).
    *   **Single Number III:** Two elements appear once, all others appear twice. (XOR all elements, the result is `A ^ B`. Find a set bit in `A ^ B`, then partition the original array into two groups: those with that bit set, and those with that bit cleared. XOR elements in each group to find A and B).
    *   **Find Duplicate Number:** Array of `n+1` integers from 1 to `n`, find the duplicate. (Not strictly bit manipulation, but often solved with cycle detection similar to linked lists).
*   **Power of Two:**
    *   **Power of Four / Power of Eight:** Similar logic, but more specific bit patterns. E.g., for power of 4, it must be a power of 2 AND the single set bit must be at an even position. `n > 0 && (n & (n - 1)) === 0 && (n & 0xAAAAAAAA) === 0` (0xAAAAAAAA has 1s only at odd positions).
    *   **Power of Three:** Not easily solvable with bit manipulation; requires iterative division or logarithms.
*   **Reverse Bits:**
    *   **Reverse bytes:** Swap bytes within a 32-bit integer (e.g., first byte with fourth, second with third).
    *   **Bit rotation:** Circular shift (left or right).
    *   **Set bits in a range:** Given `N`, `M`, `i`, `j`, insert `M` into `N` such that `M` starts at bit `j` and ends at bit `i`. Requires creating masks to clear bits in `N` and then ORing `M` shifted into position.

## 5. Interview Preparation Checklist

*   **Understand fundamental operators:** `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`.
*   **Practice common tasks:** Get, Set, Clear, Toggle bits.
*   **Master `n & (n - 1)`:** Its uses in counting set bits and checking powers of two.
*   **Know XOR properties:** Identity, self-inverse, commutativity, associativity.
*   **Handle unsigned vs. signed:** Especially important in JS due to 32-bit signed behavior of bitwise ops. Use `>>>` for unsigned.
*   **Time and Space Complexity:** Analyze your solutions. Bit manipulation solutions are often O(1) space and O(W) or O(log W) time (where W is word size).
*   **Explain your logic clearly:** Walk through examples step-by-step for the interviewer. Use binary representation in your explanation.
*   **Discuss alternatives:** Even if you provide the optimal bitwise solution, briefly mention other approaches (e.g., hash map for Single Number) and their trade-offs.

By mastering these concepts and practicing regularly, you'll be well-prepared for bit manipulation questions in technical interviews.