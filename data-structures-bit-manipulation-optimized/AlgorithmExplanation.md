```markdown
# Bit Manipulation: Concepts, Algorithms, and Interview Guide

This document serves as a comprehensive guide to understanding and applying bit manipulation techniques. It covers fundamental concepts, detailed explanations of the problems solved in this project, common pitfalls, and interview strategies.

## Table of Contents

1.  [Core Bitwise Operations](#1-core-bitwise-operations)
    *   [AND (`&`)](#and--)
    *   [OR (`|`)](#or--)
    *   [XOR (`^`)](#xor--)
    *   [NOT (`~`)](#not--)
    *   [Left Shift (`<<`)](#left-shift---)
    *   [Right Shift (`>>` and `>>>`)](#right-shift---and----)
2.  [Common Bit Manipulation Patterns](#2-common-bit-manipulation-patterns)
    *   [Check if a bit is set](#check-if-a-bit-is-set)
    *   [Set a bit](#set-a-bit)
    *   [Clear a bit](#clear-a-bit)
    *   [Toggle a bit](#toggle-a-bit)
    *   [Isolate the Rightmost Set Bit](#isolate-the-rightmost-set-bit)
    *   [Turn Off the Rightmost Set Bit](#turn-off-the-rightmost-set-bit)
    *   [Turn On the Rightmost Clear Bit](#turn-on-the-rightmost-clear-bit)
    *   [Check if a Number is a Power of Two](#check-if-a-number-is-a-power-of-two)
3.  [Problem Explanations](#3-problem-explanations)
    *   [1. Count Set Bits (Hamming Weight)](#1-count-set-bits-hamming-weight)
        *   [Approach 1: Loop and Check LSB](#approach-1-loop-and-check-lsb)
        *   [Approach 2: Brian Kernighan's Algorithm](#approach-2-brian-kernighans-algorithm)
        *   [Approach 3: Lookup Table](#approach-3-lookup-table)
    *   [2. Single Number](#2-single-number)
    *   [3. Reverse Bits](#3-reverse-bits)
    *   [4. Power of Two](#4-power-of-two)
    *   [5. Insert M into N (Update Bits)](#5-insert-m-into-n-update-bits)
4.  [Edge Cases and Gotchas](#4-edge-cases-and-gotchas)
    *   [Signed vs. Unsigned Integers](#signed-vs-unsigned-integers)
    *   [Signed vs. Unsigned Right Shift (`>>` vs. `>>>`)](#signed-vs-unsigned-right-shift---vs----)
    *   [Integer Overflow/Underflow](#integer-overflowunderflow)
    *   [Negative Numbers](#negative-numbers)
    *   [Order of Operations and Parentheses](#order-of-operations-and-parentheses)
5.  [Interview Tips and Variations](#5-interview-tips-and-variations)
    *   [Approach Strategy](#approach-strategy)
    *   [Common Variations](#common-variations)
    *   [Questions to Ask the Interviewer](#questions-to-ask-the-interviewer)

---

## 1. Core Bitwise Operations

Bitwise operations work on individual bits of a number. Understanding these fundamental operations is crucial.

### AND (`&`)

The bitwise AND operator `&` compares two bits at corresponding positions. If both bits are 1, the corresponding result bit is 1. Otherwise, it is 0.

*   **Use Cases:**
    *   Checking if a bit is set.
    *   Clearing specific bits.
    *   Masking bits.

**Example:**
```
  0101 (5)
& 0011 (3)
------
  0001 (1)
```

### OR (`|`)

The bitwise OR operator `|` compares two bits at corresponding positions. If at least one of the bits is 1, the corresponding result bit is 1. Otherwise, it is 0.

*   **Use Cases:**
    *   Setting specific bits.
    *   Combining flags.

**Example:**
```
  0101 (5)
| 0011 (3)
------
  0111 (7)
```

### XOR (`^`)

The bitwise XOR (exclusive OR) operator `^` compares two bits at corresponding positions. If the bits are different, the corresponding result bit is 1. If the bits are the same, the corresponding result bit is 0.

*   **Key Properties:**
    *   `A ^ A = 0` (XORing a number with itself results in zero)
    *   `A ^ 0 = A` (XORing a number with zero results in the number itself)
    *   `A ^ B ^ A = B` (XOR is commutative and associative)
*   **Use Cases:**
    *   Finding the single unique number in an array where others appear twice.
    *   Swapping two numbers without a temporary variable.
    *   Toggling specific bits.

**Example:**
```
  0101 (5)
^ 0011 (3)
------
  0110 (6)
```

### NOT (`~`)

The bitwise NOT operator `~` inverts all bits of its operand. 0s become 1s, and 1s become 0s.

*   **Important Note (Java):** In Java, integers are signed. `~n` will result in `-(n + 1)`. For example, `~0` is `-1`. This is due to two's complement representation.
*   **Use Cases:**
    *   Creating masks (e.g., `~0` creates a mask of all 1s).
    *   Clearing a range of bits (e.g., `n & (~(mask << i))`).

**Example (for an 8-bit integer):**
```
~ 01010101 (85)
----------
  10101010 (-86 in two's complement)
```

### Left Shift (`<<`)

The left shift operator `<<` shifts the bits of a number to the left by a specified number of positions. Vacated bit positions on the right are filled with zeros.

*   **Effect:** Multiplies the number by `2^k` (for non-negative numbers, until overflow).
*   **Use Cases:**
    *   Creating masks (e.g., `1 << k` creates a number with only the k-th bit set).
    *   Efficient multiplication by powers of 2.

**Example:**
```
  00000101 (5)
<< 2
----------
  00010100 (20)
```

### Right Shift (`>>` and `>>>`)

There are two types of right shift operators in Java:

*   **Signed Right Shift (`>>`):** Shifts the bits to the right. The leftmost (most significant) bit is filled with the sign bit (0 for positive, 1 for negative). This preserves the sign of the number.
    *   **Effect:** Divides the number by `2^k` (integer division, rounds towards negative infinity).

**Example (positive):**
```
  00001000 (8)
>> 1
----------
  00000100 (4)
```
**Example (negative, two's complement 8-bit):**
```
  11111000 (-8)
>> 1
----------
  11111100 (-4)
```

*   **Unsigned Right Shift (`>>>`):** Shifts the bits to the right. The leftmost (most significant) bit is *always* filled with a zero, regardless of the original sign bit. This operator is particularly useful when you need to treat the number as an unsigned value, even if Java doesn't have native unsigned types for `int` or `long`.

**Example (positive):**
```
  00001000 (8)
>>> 1
----------
  00000100 (4)
```
**Example (negative, two's complement 8-bit):**
```
  11111000 (-8)
>>> 1
----------
  01111100 (124, treating it as unsigned)
```

## 2. Common Bit Manipulation Patterns

These are useful tricks and techniques derived from the core operations.

### Check if a bit is set

To check if the k-th bit (0-indexed) of a number `n` is set:

`boolean isSet = (n & (1 << k)) != 0;`

**Explanation:** `(1 << k)` creates a mask with only the k-th bit set. `&` with `n` will result in a non-zero value if and only if the k-th bit in `n` is also set.

### Set a bit

To set the k-th bit of a number `n`:

`n = n | (1 << k);`

**Explanation:** `(1 << k)` creates a mask with only the k-th bit set. `|` with `n` will ensure the k-th bit in `n` becomes 1, without affecting other bits.

### Clear a bit

To clear the k-th bit of a number `n`:

`n = n & ~(1 << k);`

**Explanation:** `(1 << k)` creates a mask with only the k-th bit set. `~(1 << k)` inverts this mask, resulting in a mask with all bits set EXCEPT the k-th bit. `&` with `n` will then clear the k-th bit.

### Toggle a bit

To toggle the k-th bit of a number `n`:

`n = n ^ (1 << k);`

**Explanation:** `(1 << k)` creates a mask. `^` with `n` will flip the k-th bit (0 becomes 1, 1 becomes 0) without affecting other bits.

### Isolate the Rightmost Set Bit

`n & (-n)` or `n & (~n + 1)`

**Explanation:**
*   `-n` in two's complement is equivalent to `(~n + 1)`.
*   Let `n` be `...XYZ10...0`, where `1` is the rightmost set bit.
*   Then `~n` will be `...X'Y'Z'01...1`.
*   `~n + 1` (which is `-n`) will be `...X'Y'Z'10...0`.
*   Performing `n & (-n)` will then yield `0...010...0` (only the rightmost set bit).

**Example:** `n = 12 (0...01100)`
*   `~n` = `...11110011`
*   `~n + 1` = `...11110100` (`-12` in 32-bit two's complement)
*   `12 & (-12)` = `0...01100 & 1...110100` = `0...00100` (4)

### Turn Off the Rightmost Set Bit

`n & (n - 1)`

**Explanation:**
*   Let `n` be `...XYZ10...0`, where `1` is the rightmost set bit.
*   `n - 1` will change the rightmost `1` to `0` and all trailing `0`s to `1`s.
    *   `...XYZ10...0`
    *   `...XYZ01...1` (this is `n-1`)
*   `n & (n - 1)` will effectively turn off the rightmost set bit. This is the core of Brian Kernighan's algorithm.

**Example:** `n = 12 (0...01100)`
*   `n - 1` = `11 (0...01011)`
*   `12 & 11` = `0...01100 & 0...01011` = `0...01000` (8)

### Turn On the Rightmost Clear Bit

`n | (n + 1)`

**Explanation:**
*   Let `n` be `...XYZ01...1`, where `0` is the rightmost clear bit.
*   `n + 1` will change the rightmost `0` to `1` and all trailing `1`s to `0`s.
    *   `...XYZ01...1`
    *   `...XYZ10...0` (this is `n+1`)
*   `n | (n + 1)` will effectively turn on the rightmost clear bit.

**Example:** `n = 11 (0...01011)`
*   `n + 1` = `12 (0...01100)`
*   `11 | 12` = `0...01011 | 0...01100` = `0...01111` (15)

### Check if a Number is a Power of Two

`n > 0 && (n & (n - 1)) == 0`

**Explanation:**
*   Powers of two in binary have exactly one bit set (e.g., `1` is `0001`, `2` is `0010`, `4` is `0100`, `8` is `1000`).
*   If `n` is a power of two, it looks like `0...010...0`.
*   Then `n - 1` will look like `0...001...1` (all bits to the right of the set bit are 1s).
*   Performing `n & (n - 1)` will result in `0` if and only if `n` has only one bit set.
*   The `n > 0` check handles the case of `0` (which `0 & -1` would be `0`) and negative numbers.

## 3. Problem Explanations

Here, we dive into the specific problems implemented in `BitManipulationAlgorithms.java`.

### 1. Count Set Bits (Hamming Weight)

**Problem:** Count the number of '1' bits in a 32-bit unsigned integer.

#### Approach 1: Loop and Check LSB

*   **Logic:** Iterate 32 times (for a 32-bit integer). In each iteration, check the least significant bit (LSB) using `n & 1`. If it's 1, increment a counter. Then, right shift `n` by 1 (`n >>>= 1`) to move the next bit to the LSB position. We use unsigned right shift `>>>` because the input is conceptually unsigned, ensuring leading zeros are filled regardless of `n`'s sign bit.
*   **Time Complexity:** O(k), where k is the number of bits (usually 32 for `int`).
*   **Space Complexity:** O(1)

#### Approach 2: Brian Kernighan's Algorithm

*   **Logic:** This algorithm is more efficient for numbers with a sparse number of set bits. It repeatedly turns off the rightmost set bit using the `n & (n - 1)` trick until `n` becomes 0. Each time a bit is turned off, the counter is incremented.
*   **Time Complexity:** O(S), where S is the number of set bits. In the worst case (all bits set), this is O(k). On average, it's faster than O(k).
*   **Space Complexity:** O(1)

#### Approach 3: Lookup Table

*   **Logic:** Precompute the number of set bits for all possible values of an 8-bit byte (0-255). Then, for a 32-bit integer, extract each of its four bytes (using masks and shifts) and sum up their precomputed set bit counts.
*   **Setup Time Complexity:** O(2^8) = O(256) for precomputation.
*   **Query Time Complexity:** O(1) (4 lookups and 3 additions). Extremely fast for repeated queries.
*   **Space Complexity:** O(2^8) for the lookup table.

### 2. Single Number

**Problem:** Find the single element that appears only once in an array where all other elements appear twice.

*   **Logic:** The core idea here is the XOR property: `A ^ A = 0` and `A ^ 0 = A`. If we XOR all elements in the array, all pairs of identical numbers will cancel each other out (result in 0). The only number remaining will be the unique one.
*   **Algorithm:** Initialize `result = 0`. Iterate through the array, and for each number `num`, perform `result = result ^ num`.
*   **Time Complexity:** O(N), where N is the number of elements in the array.
*   **Space Complexity:** O(1), as no extra data structures are used.

### 3. Reverse Bits

**Problem:** Reverse bits of a given 32-bit unsigned integer.

*   **Logic:** Iterate 32 times. In each iteration:
    1.  Shift the `result` left by 1 (to make space for the new bit).
    2.  Extract the least significant bit (LSB) from the input `n` using `(n & 1)`.
    3.  OR this LSB into `result`.
    4.  Right shift `n` by 1 (`n >>>= 1`) to process the next bit.
*   **Time Complexity:** O(k), where k is the number of bits (32).
*   **Space Complexity:** O(1)

### 4. Power of Two

**Problem:** Determine if a given integer `n` is a power of two.

*   **Approach 1: Bitwise AND Trick (Optimal)**
    *   **Logic:** As explained in "Common Bit Manipulation Patterns", a positive number `n` is a power of two if and only if it has exactly one bit set in its binary representation. The expression `(n & (n - 1))` clears the rightmost set bit. So, if `n` is a power of two, `(n & (n - 1))` will be `0`. We also need to ensure `n > 0` to handle `0` and negative numbers correctly.
    *   **Time Complexity:** O(1)
    *   **Space Complexity:** O(1)

*   **Approach 2: Loop and Division (Brute Force/Alternative)**
    *   **Logic:** Handle base cases (`n <= 0` is false, `n == 1` is true). For `n > 1`, repeatedly divide `n` by 2. If at any point `n` is not divisible by 2 (i.e., `n % 2 != 0`), it's not a power of two. If the loop completes and `n` becomes 1, then it is a power of two.
    *   **Time Complexity:** O(log n)
    *   **Space Complexity:** O(1)

### 5. Insert M into N (Update Bits)

**Problem:** Insert a 32-bit number `M` into another 32-bit number `N` from bit position `j` to `i` (inclusive).

*   **Logic:** This requires two main steps:
    1.  **Clear the bits** in `N` from position `j` to `i`.
    2.  **Insert `M`** into the cleared region by shifting `M` to the correct position and `OR`ing it with `N`.

*   **Step 1: Create a mask to clear bits `i` through `j` in `N`**
    *   Create a mask `allOnes = ~0` (all 1s).
    *   Create `left = allOnes << (j + 1)`: This mask has 1s from bit `j+1` to the MSB, and 0s from `j` to 0.
    *   Create `right = (1 << i) - 1`: This mask has 1s from bit `i-1` to 0, and 0s from `i` to MSB.
    *   Combine them: `mask = left | right`. This mask will have 1s everywhere *except* between `j` and `i`.
    *   Apply the mask to `N`: `n_cleared = N & mask`.

*   **Step 2: Shift M and OR into N**
    *   Shift `M` to the correct position: `m_shifted = M << i`.
    *   `OR` this `m_shifted` with `n_cleared`: `result = n_cleared | m_shifted`.

*   **Example (N=10000000000, M=10011, i=2, j=6):**
    *   `allOnes = 111...111`
    *   `j+1 = 7`, `left = 11...10000000` (1s from bit 7 to MSB, 0s from 6 to 0)
    *   `i = 2`, `(1 << i) = 0...00100`, `right = 0...00011` (1s at bit 0 and 1)
    *   `mask = left | right = 11...10000011`
    *   `N & mask`: Clears bits 2 through 6 in N, results in `10000000000 & 11...10000011 = 10000000000` (since N has 1 only at bit 10, it remains unchanged by clearing 2-6)
    *   `M << i`: `10011 << 2 = 1001100`
    *   `result = (N & mask) | (M << i) = 10000000000 | 1001100 = 10001001100`
*   **Time Complexity:** O(1)
*   **Space Complexity:** O(1)

## 4. Edge Cases and Gotchas

### Signed vs. Unsigned Integers

Java's `int` and `long` types are always signed. This means the most significant bit (MSB) indicates the sign (0 for positive, 1 for negative). Be mindful of this, especially when interpreting raw bit patterns or when problems specify "unsigned integers" (you'll need to simulate this behavior using `>>>` or `long` for 32-bit unsigned values).

### Signed vs. Unsigned Right Shift (`>>` vs. `>>>`)

*   **`>>` (Signed/Arithmetic Right Shift):** Fills the vacated MSB positions with the sign bit. `1000...0000 >> 1` (negative) remains negative.
*   **`>>>` (Unsigned/Logical Right Shift):** Always fills the vacated MSB positions with zeros. `1000...0000 >>> 1` (negative) becomes positive. This is crucial when you want to treat bits literally, without regard for sign, or when dealing with a problem that specifies "unsigned integer" input.

### Integer Overflow/Underflow

Bit shifts can cause numbers to become too large or too small for their data type, leading to unexpected results. For example, `1 << 31` for an `int` will result in `Integer.MIN_VALUE` (`-2147483648`) because the most significant bit becomes 1, indicating a negative number. Be cautious with large shifts. Sometimes using `long` intermediate values can prevent overflow for 32-bit operations.

### Negative Numbers

Bitwise operations on negative numbers (represented in two's complement) can be tricky.
For example, `~0` in Java is `-1`. If `n` is `-1` (`111...111`), then `n & 1` is `1`.
When a problem specifies "unsigned integer", it often implies that you should treat the 32-bit pattern as a positive value, which often necessitates using `>>>` for right shifts or `long` to store values that would be positive if unsigned (e.g., `(long)n & 0xFFFFFFFFL`).

### Order of Operations and Parentheses

Bitwise operators have lower precedence than arithmetic operators. For example, `1 << i + 1` evaluates to `1 << (i + 1)`. However, `n & 1 == 0` evaluates as `n & (1 == 0)` which is `n & false` (a compile-time error). Always use parentheses to ensure correct order of operations, e.g., `(n & 1) == 0`.

## 5. Interview Tips and Variations

### Approach Strategy

1.  **Clarify Constraints:** Are numbers signed/unsigned? What's the bit width (32-bit, 64-bit)? What are the valid ranges?
2.  **Look for Bitwise Patterns:** If a problem involves powers of 2, even/odd checks, grouping elements by occurrence, or specific bit positions, think bitwise.
3.  **Start Simple (Non-Bitwise):** If you're stuck, first solve the problem using a more straightforward (often arithmetic or loop-based) approach. Then, try to optimize it using bit manipulation. This demonstrates problem-solving ability.
4.  **Visualize:** Draw out the bits for a small example. This often helps in understanding how operations like `&`, `|`, `^`, and shifts affect the binary representation.
5.  **Leverage Properties:** Remember key properties like `X ^ X = 0`, `X ^ 0 = X`, and `n & (n-1)` for turning off the rightmost set bit.
6.  **Edge Cases First:** Always consider `0`, `1`, `Integer.MAX_VALUE`, `Integer.MIN_VALUE`, and negative numbers.

### Common Variations

*   **Counting Set Bits:**
    *   Count set bits in a range.
    *   Count set bits for all numbers up to `N`.
    *   Find the next number with the same number of set bits.
*   **Finding Unique Numbers:**
    *   Two numbers appear once, others twice.
    *   One number appears once, others three times.
    *   Find missing number in a sequence (using XOR or sum).
*   **Swapping:** Swapping two numbers without a temporary variable (`a = a ^ b; b = a ^ b; a = a ^ b;`).
*   **Checking Parity:** Determine if a number has an even or odd number of set bits.
*   **Bit Reversal/Rotation:** Rotate bits left/right.
*   **Bit Masks:** Creating and using masks for specific bit ranges.

### Questions to Ask the Interviewer

*   "Are the input integers signed or unsigned?"
*   "What is the maximum number of bits I should consider (e.g., 32-bit int, 64-bit long)?"
*   "Are there any constraints on time or space complexity that hint towards a bitwise solution?"
*   "Should I consider integer overflow?"
*   "What are the expected inputs for edge cases like zero, negative numbers, `MAX_VALUE`?"

By studying this documentation and practicing the problems, you'll build a strong foundation in bit manipulation, which is a valuable skill for any software engineer.
```