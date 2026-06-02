```markdown
# Bit Manipulation Algorithms: Detailed Explanations

This document provides in-depth explanations for the bit manipulation problems and utilities implemented in this project. It covers the core logic, time/space complexity, ASCII diagrams for visual understanding, common edge cases, and interview tips.

## Table of Contents

1.  [General Bit Manipulation Concepts](#1-general-bit-manipulation-concepts)
    *   [Bitwise Operators](#bitwise-operators)
    *   [2's Complement for Negative Numbers](#2s-complement-for-negative-numbers)
    *   [Unsigned vs. Signed Bitwise Operations in JavaScript](#unsigned-vs-signed-bitwise-operations-in-javascript)
2.  [Problem 1: Counting Set Bits (Hamming Weight)](#2-problem-1-counting-set-bits-hamming-weight)
    *   [Approach 1.1: Simple Iteration (Bit Shifting)](#approach-11-simple-iteration-bit-shifting)
    *   [Approach 1.2: Brian Kernighan's Algorithm](#approach-12-brian-kernighans-algorithm)
    *   [Edge Cases & Gotchas](#edge-cases--gotchas)
    *   [Interview Tips & Variations](#interview-tips--variations)
3.  [Problem 2: Single Number](#3-problem-2-single-number)
    *   [Approach 2.1: XOR Property](#approach-21-xor-property)
    *   [Approach 2.2: Hash Map (Alternative)](#approach-22-hash-map-alternative)
    *   [Edge Cases & Gotchas](#edge-cases--gotchas-1)
    *   [Interview Tips & Variations](#interview-tips--variations-1)
4.  [Problem 3: Power of Two](#4-problem-3-power-of-two)
    *   [Approach 3.1: Bitwise AND Trick](#approach-31-bitwise-and-trick)
    *   [Approach 3.2: Iterative Division (Alternative)](#approach-32-iterative-division-alternative)
    *   [Edge Cases & Gotchas](#edge-cases--gotchas-2)
    *   [Interview Tips & Variations](#interview-tips--variations-2)
5.  [Problem 4: Reverse Bits](#5-problem-4-reverse-bits)
    *   [Approach 4.1: Iterative Shifting and Combining](#approach-41-iterative-shifting-and-combining)
    *   [Edge Cases & Gotchas](#edge-cases--gotchas-3)
    *   [Interview Tips & Variations](#interview-tips--variations-3)
6.  [Bit Utilities](#6-bit-utilities)
    *   [`getBit(num, i)`](#getbitnum-i)
    *   [`setBit(num, i)`](#setbitnum-i)
    *   [`clearBit(num, i)`](#clearbitnum-i)
    *   [`updateBit(num, i, bitValue)`](#updatebitnum-i-bitvalue)
    *   [`toggleBit(num, i)`](#togglebitnum-i)
    *   [`isEven(num)`](#isevennum)
    *   [`isOdd(num)`](#isoddnum)
    *   [`countLeadingZeros(num)`](#countleadingzerosnum)
    *   [`abs(num)`](#absnum)
    *   [`swap(a, b)`](#swapa-b)

---

## 1. General Bit Manipulation Concepts

Bit manipulation involves operating directly on the individual bits (binary digits) of a number. This can be highly efficient for certain tasks, especially when dealing with flags, compression, or cryptographic algorithms.

### Bitwise Operators

Here are the fundamental bitwise operators in most languages, including TypeScript/JavaScript:

| Operator | Name              | Description                                                                 | Example (8-bit)              |
| :------- | :---------------- | :-------------------------------------------------------------------------- | :--------------------------- |
| `&`      | AND               | Sets each bit to 1 if both bits are 1.                                      | `0b1010 & 0b1100 = 0b1000`   |
| `|`      | OR                | Sets each bit to 1 if at least one of the bits is 1.                        | `0b1010 \| 0b1100 = 0b1110`  |
| `^`      | XOR               | Sets each bit to 1 if only one of the bits is 1 (exclusive OR).             | `0b1010 ^ 0b1100 = 0b0110`   |
| `~`      | NOT               | Inverts all the bits (0 becomes 1, 1 becomes 0).                            | `~0b1010 = 0b0101` (for 8-bit, inverts all 32 bits for JS) |
| `<<`     | Left Shift        | Shifts bits to the left, filling with 0s on the right. Multiplies by powers of 2. | `0b0001 << 2 = 0b0100`       |
| `>>`     | Signed Right Shift| Shifts bits to the right, filling with the sign bit on the left. Divides by powers of 2, preserving sign. | `0b1000 >> 1 = 0b1100` (signed -8 to -4) |
| `>>>`    | Unsigned Right Shift| Shifts bits to the right, filling with 0s on the left. Divides by powers of 2, always resulting in positive. | `0b1000 >>> 1 = 0b0100` (unsigned 8 to 4) |

### 2's Complement for Negative Numbers

Most computers represent negative integers using two's complement. This system simplifies arithmetic operations for both positive and negative numbers.

*   To find the 2's complement of a number:
    1.  Invert all bits (1s complement / bitwise NOT `~`).
    2.  Add 1 to the result.

*   **Example (8-bit):**
    *   `5` (decimal) = `0000 0101` (binary)
    *   `~5`          = `1111 1010` (1s complement)
    *   `~5 + 1`      = `1111 1011` (2s complement, which represents -5)

This means that `~N + 1 = -N`. Consequently, `~N = -N - 1`.
These identities are useful in some bit manipulation tricks (e.g., `n & (n-1)`).

### Unsigned vs. Signed Bitwise Operations in JavaScript

JavaScript numbers are 64-bit floating-point numbers. However, bitwise operations (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`) treat their operands as 32-bit *signed* integers. The result of a bitwise operation is then converted back to a 64-bit floating-point number.

*   **Signed Right Shift (`>>`):** Fills the most significant bit (MSB) with the sign bit. For example, `-8 >> 1` results in `-4`.
*   **Unsigned Right Shift (`>>>`):** Fills the MSB with `0`, regardless of the sign. This means a negative number will become a large positive number when shifted right. For example, `-8 >>> 1` results in `2147483644`. This is crucial when you need to treat numbers as unsigned, like in the `reverseBits` problem or `countSetBits`. To explicitly treat a number as an unsigned 32-bit integer, you can use `n >>> 0`.

## 2. Problem 1: Counting Set Bits (Hamming Weight)

**Problem:** Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

### Approach 1.1: Simple Iteration (Bit Shifting)

**Logic:**
This approach iterates through each bit of the number, typically from the least significant bit (LSB) to the most significant bit (MSB).

1.  Initialize a `count` to 0.
2.  In a loop, check the LSB of the number. If `(num & 1)` is 1, increment `count`.
3.  Right-shift the number by one position (`num >>>= 1`) to move the next bit to the LSB position.
4.  Repeat until the number becomes 0.

**ASCII Diagram (for `n = 11`, binary `00001011`):**

```
n = 0000 1011, count = 0
-----------------------------------
Iteration 1:
  (n & 1) = 1  => count = 1
  n = n >>> 1 = 0000 0101

Iteration 2:
  (n & 1) = 1  => count = 2
  n = n >>> 1 = 0000 0010

Iteration 3:
  (n & 1) = 0
  n = n >>> 1 = 0000 0001

Iteration 4:
  (n & 1) = 1  => count = 3
  n = n >>> 1 = 0000 0000

Loop ends (n is 0).
Result: count = 3
```

**Time Complexity:** O(log N) where N is the value of the number, or O(1) if considering a fixed 32-bit integer (always 32 iterations).
**Space Complexity:** O(1)

### Approach 1.2: Brian Kernighan's Algorithm

**Logic:**
This algorithm is often more efficient than simple iteration, especially for numbers with few set bits. It works by repeatedly clearing the least significant set bit (the rightmost '1' bit) until the number becomes 0. Each time a bit is cleared, we increment our counter.

The key is the expression `num & (num - 1)`:
*   `num - 1` flips the rightmost '1' bit to '0' and all the '0' bits to its right to '1'.
*   `num & (num - 1)` effectively clears the rightmost '1' bit while leaving all other bits unchanged.

**ASCII Diagram (for `n = 11`, binary `00001011`):**

```
n = 0000 1011, count = 0
-----------------------------------
Iteration 1:
  n        = 0000 1011
  n - 1    = 0000 1010
  n & (n-1) = 0000 1010  (Rightmost '1' at pos 0 is cleared)
  count = 1
  n becomes 0000 1010

Iteration 2:
  n        = 0000 1010
  n - 1    = 0000 1001
  n & (n-1) = 0000 1000  (Rightmost '1' at pos 1 is cleared)
  count = 2
  n becomes 0000 1000

Iteration 3:
  n        = 0000 1000
  n - 1    = 0000 0111
  n & (n-1) = 0000 0000  (Rightmost '1' at pos 3 is cleared)
  count = 3
  n becomes 0000 0000

Loop ends (n is 0).
Result: count = 3
```

**Time Complexity:** O(k) where k is the number of set bits. In the worst case (all bits are 1), it's still O(log N) or O(32).
**Space Complexity:** O(1)

### Edge Cases & Gotchas

*   **`n = 0`**: Both algorithms correctly return 0.
*   **Negative Numbers**: The problem statement specifies "unsigned integer". In JavaScript, bitwise operations implicitly convert to 32-bit *signed* integers. Using `>>> 0` on the input ensures it's treated as a 32-bit unsigned integer, preventing unexpected behavior with negative inputs or numbers whose 31st bit (0-indexed) is set. Our implementations use `num >>> 0` for this purpose.

### Interview Tips & Variations

*   **Why Brian Kernighan is preferred**: It performs fewer operations when the number of set bits is small compared to the total number of bits (e.g., a 32-bit number with only 1 set bit vs. 32 iterations for simple shifting).
*   **Built-in functions**: In C++/Java, there are usually compiler intrinsics (e.g., `__builtin_popcount` in GCC/Clang) or language functions (e.g., `Integer.bitCount` in Java) that are highly optimized for this. Mentioning these is good, but interviewers usually want you to implement the logic yourself.
*   **Lookup Table**: For very frequent calls on small numbers (e.g., 8-bit or 16-bit), a precomputed lookup table can be even faster (O(1) access).
*   **Count bits in a range**: Count set bits for numbers from `A` to `B`.

## 3. Problem 2: Single Number

**Problem:** Given a non-empty array of integers, every element appears twice except for one. Find that single one.

### Approach 2.1: XOR Property

**Logic:**
This is the most elegant and efficient solution. It leverages the following properties of the XOR (`^`) bitwise operator:

1.  **Identity:** `a ^ 0 = a` (XORing any number with zero yields the number itself).
2.  **Self-Inverse:** `a ^ a = 0` (XORing any number with itself yields zero).
3.  **Commutativity & Associativity:** `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b` (The order of XOR operations doesn't matter).

By XORing all numbers in the array, all elements that appear an even number of times will effectively cancel each other out (resulting in 0), leaving only the unique number that appears an odd number of times.

**ASCII Diagram (for `nums = [2, 2, 1]`):**

```
uniqueNum = 0

nums[0] = 2 (0010)
  uniqueNum = 0 ^ 2 = 2  (0000 ^ 0010 = 0010)

nums[1] = 2 (0010)
  uniqueNum = 2 ^ 2 = 0  (0010 ^ 0010 = 0000)

nums[2] = 1 (0001)
  uniqueNum = 0 ^ 1 = 1  (0000 ^ 0001 = 0001)

Result: uniqueNum = 1
```

**Time Complexity:** O(N) where N is the number of elements in the array. We iterate through the array once.
**Space Complexity:** O(1) as no extra memory is used beyond a single variable for the XOR sum.

### Approach 2.2: Hash Map (Alternative - Not optimal for constraints)

**Logic:**
This approach uses a hash map (or a `Set` in JavaScript) to keep track of numbers encountered.
1.  Iterate through the array.
2.  For each number:
    *   If it's already in the set, remove it (it's the second occurrence).
    *   If it's not in the set, add it (it's the first occurrence).
3.  After iterating through the entire array, the only number remaining in the set will be the unique one.

**Time Complexity:** O(N) on average, due to map insertions/deletions. Worst case for hash collisions could be O(N^2) but rare.
**Space Complexity:** O(N) in the worst case (if all numbers are unique until the end), as the map stores elements. This violates the "without using extra memory" constraint.

### Edge Cases & Gotchas

*   **Empty array**: The problem statement guarantees a non-empty array.
*   **Single element array**: The XOR solution works correctly (e.g., `[5]` -> `0 ^ 5 = 5`).
*   **Negative numbers**: XOR works correctly with negative numbers as well, as bitwise operations are applied to their 2's complement representation.
*   **Zero**: If 0 is the single number, it's also handled correctly.

### Interview Tips & Variations

*   **"Find two unique numbers"**: If two numbers appear once and all others twice.
    1.  XOR all numbers. The result `X` will be `unique1 ^ unique2`.
    2.  Find any set bit in `X`. This bit must be different between `unique1` and `unique2`.
    3.  Partition the original array into two groups: those with that bit set, and those with that bit cleared.
    4.  XOR all numbers in each group. Each group will yield one of the unique numbers.
*   **"Find one number appearing once, others thrice"**: This is more complex and usually involves counting bits at each position or using a finite state machine.
*   Emphasize the **space complexity** benefit of the XOR solution.

## 4. Problem 3: Power of Two

**Problem:** Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.

### Approach 3.1: Bitwise AND Trick

**Logic:**
A positive integer `n` is a power of two if and only if it has exactly one set bit in its binary representation.
For example:
*   `1 (2^0)` = `0001`
*   `2 (2^1)` = `0010`
*   `4 (2^2)` = `0100`
*   `8 (2^3)` = `1000`

If `n` has only one set bit, then `n - 1` will have all bits to the right of that set bit as 1s, and that set bit itself will be 0.
Therefore, `n & (n - 1)` will be 0.

This property `n & (n - 1) === 0` is a very efficient way to check for powers of two.

**ASCII Diagram (for `n = 8`, binary `00001000`):**

```
n   = 0000 1000
n-1 = 0000 0111
-----------------
n & (n-1) = 0000 0000  (Result is 0, so 8 is a power of two)
```

**ASCII Diagram (for `n = 6`, binary `00000110`):**

```
n   = 0000 0110
n-1 = 0000 0101
-----------------
n & (n-1) = 0000 0100  (Result is not 0, so 6 is NOT a power of two)
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

### Approach 3.2: Iterative Division (Alternative)

**Logic:**
This approach repeatedly divides `n` by 2. If `n` is a power of two, it will eventually become 1 after successive divisions by 2. If at any point `n` is not divisible by 2 (i.e., it's odd and not 1), then it's not a power of two.

1.  Handle `n <= 0` as powers of two are strictly positive.
2.  While `n` is even and `n > 1`, divide `n` by 2.
3.  If `n` is 1 at the end, it was a power of two.

**Time Complexity:** O(log N) where N is the value of the number.
**Space Complexity:** O(1)

### Edge Cases & Gotchas

*   **`n <= 0`**: Powers of two are always positive. `isPowerOfTwo(0)` should return `false`. Our code handles `n > 0` explicitly.
    *   `0 & (0 - 1)` is `0 & -1`. In 32-bit two's complement, `-1` is all ones (`0xFFFFFFFF`). So `0 & 0xFFFFFFFF` is `0`. Without the `n > 0` check, `isPowerOfTwo(0)` would incorrectly return `true`.
*   **`n = 1`**: This is `2^0`, which is a power of two. The bitwise trick `1 & (1 - 1)` evaluates to `1 & 0`, which is `0`, so it correctly returns `true`.
*   **Negative numbers**: Bitwise operations on negative numbers behave based on 2's complement. `n & (n-1)` might still be 0 for some negative numbers, but they are not considered powers of two by definition. The `n > 0` check filters them out. For example, `n = -2147483648` (smallest 32-bit signed int, binary `1000...0000`) would pass `n & (n-1) === 0` (as `n-1` is `0111...1111` for JavaScript's 32-bit signed interpretation), but it's not a power of two.

### Interview Tips & Variations

*   **Recognize the trick**: The `n & (n-1)` trick is a very common bit manipulation interview question. Knowing it instantly demonstrates expertise.
*   **"Isolate the rightmost set bit"**: The expression `n & (-n)` (or `n & (~n + 1)`) isolates the rightmost set bit of `n`. For powers of two, this will be `n` itself. This is another way to check: `n > 0 && (n & (-n)) === n`.
*   **`Number.isInteger(Math.log2(n))`**: A non-bitwise way to check if `n` is an integer power of 2. It's less performant and potentially has floating-point precision issues for very large numbers.

## 5. Problem 4: Reverse Bits

**Problem:** Reverse bits of a given 32-bit unsigned integer.

### Approach 4.1: Iterative Shifting and Combining

**Logic:**
The goal is to take the bits of the input number `n` one by one, starting from its least significant bit (LSB), and append them to the most significant bit (MSB) side of a `result` variable.

1.  Initialize `result = 0`.
2.  Loop 32 times (since it's a 32-bit integer). In each iteration `i`:
    *   **Shift `result` left**: `result = result << 1`. This makes space for the next bit from `n` at the LSB position of `result`.
    *   **Extract LSB of `n`**: `lsb = n & 1`. This isolates the rightmost bit of `n`.
    *   **Add LSB to `result`**: `result = result | lsb`. This places the extracted bit into the newly created LSB position of `result`.
    *   **Shift `n` right**: `n = n >>> 1`. This discards the LSB of `n` that has just been processed and brings the next bit to the LSB position for the next iteration.

**ASCII Diagram (for `n = 00000101` (5) for 8-bit demonstration):**

```
Initial: result = 00000000, n = 00000101
-----------------------------------------------------
i = 0:
  result = result << 1 = 00000000
  lsb    = n & 1       = 1
  result = result | lsb = 00000001
  n      = n >>> 1     = 00000010

i = 1:
  result = result << 1 = 00000010
  lsb    = n & 1       = 0
  result = result | lsb = 00000010
  n      = n >>> 1     = 00000001

i = 2:
  result = result << 1 = 00000100
  lsb    = n & 1       = 1
  result = result | lsb = 00000101
  n      = n >>> 1     = 00000000

i = 3:
  result = result << 1 = 00001010
  lsb    = n & 1       = 0
  result = result | lsb = 00001010
  n      = n >>> 1     = 00000000

... (continue 4 more times for 8-bit, with lsb=0 for remaining empty bits of n) ...

i = 4:
  result = result << 1 = 00010100
  lsb    = 0
  result = result | lsb = 00010100
  n      = 0

... (i=5,6,7, all lsb=0, just shift result left) ...

Final for 8-bit, if n=00000101, reversed would be 10100000
Result: result = 10100000
```

**Time Complexity:** O(1) (fixed 32 iterations).
**Space Complexity:** O(1)

### Edge Cases & Gotchas

*   **`n = 0`**: The loop will run 32 times, always shifting `result` and ORing with `0`, correctly returning `0`.
*   **`n = 1`**: (binary `0...0001`). This should reverse to `2^31` (binary `1000...0000`). The logic correctly places the `1` at the MSB position.
*   **JavaScript's 32-bit signed behavior**: JavaScript's bitwise operators treat numbers as 32-bit signed. For `n = 2147483648` (`1000...0000` binary, which is `2^31`), `n` would be interpreted as `-2147483648`. However, `>>> 1` ensures that the most significant bit is filled with 0, maintaining an "unsigned" interpretation for the shift. The final `result >>> 0` ensures the output value is correctly treated as unsigned. The problem expects the mathematical value of the unsigned number.

### Interview Tips & Variations

*   **Precomputation**: For competitive programming, if the function is called many times, one could precompute reversed values for all 256 possible 8-bit integers, then reverse a 32-bit integer by reversing its four 8-bit chunks and rearranging them.
*   **Different bit lengths**: Ask about reversing for 16-bit or 64-bit integers. The core loop logic remains the same, just adjust the iteration count.
*   **Reverse bytes vs. bits**: Distinguish between reversing the order of bytes within an integer versus reversing the individual bits.

## 6. Bit Utilities

The `src/bitUtils.ts` file contains several fundamental helper functions for manipulating individual bits or checking bit properties. These are crucial building blocks for many bit manipulation problems.

### `getBit(num, i)`

*   **Purpose**: Checks if the `i`-th bit of `num` is set (1) or cleared (0).
*   **Logic**: Creates a mask `(1 << i)` which has a '1' at position `i` and '0's elsewhere. Bitwise ANDing `num` with this mask will yield a non-zero value only if the `i`-th bit of `num` is also '1'.
*   **Example**: `getBit(0b10110, 2)` -> `(0b10110 & 0b00100) = 0b00100` (non-zero) -> `1`

### `setBit(num, i)`

*   **Purpose**: Sets the `i`-th bit of `num` to 1.
*   **Logic**: Creates a mask `(1 << i)`. Bitwise ORing `num` with this mask will force the `i`-th bit to 1 without affecting other bits.
*   **Example**: `setBit(0b10100, 0)` -> `(0b10100 | 0b00001) = 0b10101`

### `clearBit(num, i)`

*   **Purpose**: Clears the `i`-th bit of `num` to 0.
*   **Logic**: Creates a mask `(1 << i)`. Then inverts it `~(1 << i)`, which results in a mask with a '0' at position `i` and '1's everywhere else. Bitwise ANDing `num` with this inverted mask will force the `i`-th bit to 0 without affecting other bits.
*   **Example**: `clearBit(0b10111, 1)` -> `(0b10111 & ~(0b00010))` -> `(0b10111 & 0b11101)` -> `0b10101`

### `updateBit(num, i, bitValue)`

*   **Purpose**: Sets the `i`-th bit of `num` to `bitValue` (true for 1, false for 0).
*   **Logic**: First, clears the `i`-th bit using the `clearBit` logic. Then, if `bitValue` is true, sets the `i`-th bit using the `setBit` logic.
*   **Example**: `updateBit(0b10110, 0, true)` -> `clearBit(0b10110, 0)` becomes `0b10110`. Then `0b10110 | (1 << 0)` becomes `0b10111`.

### `toggleBit(num, i)`

*   **Purpose**: Flips the `i`-th bit of `num` (0 becomes 1, 1 becomes 0).
*   **Logic**: Creates a mask `(1 << i)`. Bitwise XORing `num` with this mask will flip the `i`-th bit.
*   **Example**: `toggleBit(0b10110, 0)` -> `(0b10110 ^ 0b00001) = 0b10111`

### `isEven(num)`

*   **Purpose**: Checks if `num` is an even number.
*   **Logic**: An even number always has its LSB (0th bit) as 0. `(num & 1)` will be 0 for even numbers and 1 for odd numbers.
*   **Example**: `isEven(4)` -> `(0b100 & 1) = 0` -> `true`

### `isOdd(num)`

*   **Purpose**: Checks if `num` is an odd number.
*   **Logic**: An odd number always has its LSB (0th bit) as 1. `(num & 1)` will be 1 for odd numbers and 0 for even numbers.
*   **Example**: `isOdd(7)` -> `(0b111 & 1) = 1` -> `true`

### `countLeadingZeros(num)`

*   **Purpose**: Counts the number of leading zero bits in the 32-bit binary representation of `num`.
*   **Logic**: Utilizes `Math.clz32(num)`, a built-in JavaScript function that efficiently performs this operation.
*   **Example**: `countLeadingZeros(1)` -> `31` (00...01)

### `abs(num)`

*   **Purpose**: Computes the absolute value of an integer without using conditional statements or `Math.abs`.
*   **Logic**: Uses properties of two's complement. For a 32-bit signed integer, `(num >> 31)` extracts the sign bit (0 for positive, -1 for negative). This `sign` value is then used in `(num ^ sign) - sign`.
    *   If `num` is positive (`sign` is 0): `(num ^ 0) - 0 = num`.
    *   If `num` is negative (`sign` is -1, which is `0xFFFFFFFF` in 32-bit): `(num ^ 0xFFFFFFFF) - 0xFFFFFFFF` which simplifies to `(~num) - (-1)` or `~num + 1`, which is the 2's complement negation, i.e., `abs(num)`.
*   **Example**: `abs(-5)` -> `5`

### `swap(a, b)`

*   **Purpose**: Swaps two integers `a` and `b` without using a temporary variable.
*   **Logic**: Leverages the XOR properties:
    *   `a = a ^ b` (stores `a^b` in `a`)
    *   `b = a ^ b` (now `a` holds `a_old ^ b_old`, so `(a_old ^ b_old) ^ b_old = a_old`). Thus, `b` now has the original value of `a`.
    *   `a = a ^ b` (now `a` holds `a_old ^ b_old`, and `b` holds `a_old`. So `(a_old ^ b_old) ^ a_old = b_old`). Thus, `a` now has the original value of `b`.
*   **Example**: `swap(5, 10)` -> `[10, 5]`

```
```