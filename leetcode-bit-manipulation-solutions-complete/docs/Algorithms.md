```markdown
# Algorithms Explanation: Bit Manipulation

This document provides a detailed explanation of the bit manipulation algorithms implemented in this project, including their logic, multiple approaches, time/space complexity analysis, and ASCII diagrams where appropriate.

## Table of Contents

1.  [Introduction to Bitwise Operators](#1-introduction-to-bitwise-operators)
2.  [Problem 1: Count Set Bits (Hamming Weight)](#2-problem-1-count-set-bits-hamming-weight)
    *   [Approach 1: Iteration and Bitwise AND with 1 (LSB Check)](#approach-1-iteration-and-bitwise-and-with-1-lsb-check)
    *   [Approach 2: Brian Kernighan's Algorithm (Optimal)](#approach-2-brian-kernighans-algorithm-optimal)
    *   [Approach 3: Using a Lookup Table (Precomputation)](#approach-3-using-a-lookup-table-precomputation)
3.  [Problem 2: Power of Two](#3-problem-2-power-of-two)
    *   [Approach 1: Iterative Division](#approach-1-iterative-division)
    *   [Approach 2: Bit Manipulation (Optimal)](#approach-2-bit-manipulation-optimal)
4.  [Problem 3: Reverse Bits](#4-problem-3-reverse-bits)
    *   [Approach 1: Iterative Bit-by-Bit Reversal](#approach-1-iterative-bit-by-bit-reversal)
    *   [Approach 2: Grouped Bit Swapping](#approach-2-grouped-bit-swapping)
5.  [Problem 4: Single Number](#5-problem-4-single-number)
    *   [Approach 1: Hash Map (Suboptimal for constraints)](#approach-1-hash-map-suboptimal-for-constraints)
    *   [Approach 2: Bit Manipulation (XOR) - Optimal](#approach-2-bit-manipulation-xor---optimal)
6.  [Problem 5: Generate Subsets (Bitmasking)](#6-problem-5-generate-subsets-bitmasking)
    *   [Approach 1: Bitmasking (Optimal for bit manipulation context)](#approach-1-bitmasking-optimal-for-bit-manipulation-context)
    *   [Approach 2: Backtracking / Recursion (Alternative)](#approach-2-backtracking--recursion-alternative)

---

## 1. Introduction to Bitwise Operators

Bit manipulation involves operating on numbers at the bit level. Understanding these operators is fundamental:

*   **AND (`&`)**: Sets a bit if both corresponding bits are 1. Useful for masking (checking if a bit is set) or clearing bits.
    ```
    1010
  & 1100
  ------
    1000
    ```
*   **OR (`|`)**: Sets a bit if at least one corresponding bit is 1. Useful for setting bits.
    ```
    1010
  | 1100
  ------
    1110
    ```
*   **XOR (`^`)**: Sets a bit if the corresponding bits are different. Useful for toggling bits, finding unique elements, or swapping without a temporary variable.
    ```
    1010
  ^ 1100
  ------
    0110
    ```
*   **NOT (`~`)**: Inverts all bits. Note: In JavaScript, `~` operates on 32-bit signed integers and returns a signed 32-bit integer, which can result in negative numbers (two's complement).
    ```
    ~00000000000000000000000000001011 (11)
    -----------------------------------
     11111111111111111111111111110100 (-12)
    ```
*   **Left Shift (`<<`)**: Shifts all bits to the left by a specified number of positions. New bits on the right are filled with 0s. Equivalent to multiplying by `2^n`.
    ```
    00001011 (11) << 2  =>  00101100 (44)
    ```
*   **Signed Right Shift (`>>`)**: Shifts all bits to the right. New bits on the left are filled with the value of the most significant bit (sign extension). Equivalent to integer division by `2^n` for positive numbers, but handles negative numbers differently.
    ```
    00001011 (11) >> 2  =>  00000010 (2)
    11111100 (-4) >> 2  =>  11111111 (-1)
    ```
*   **Unsigned Right Shift (`>>>`)**: Shifts all bits to the right. New bits on the left are always filled with 0s. This operator treats the number as an unsigned 32-bit integer. It's crucial in JavaScript when dealing with bitwise operations, as JS numbers are 64-bit floats, but bitwise ops implicitly convert to 32-bit signed ints. `>>> 0` can be used to convert any number to its 32-bit unsigned representation.
    ```
    00001011 (11) >>> 2  =>  00000010 (2)
    11111100 (-4) >>> 2  =>  00111111111111111111111111111111 (1073741823, which is 2^30 + 2^29 + ... + 2^2)
    ```

---

## 2. Problem 1: Count Set Bits (Hamming Weight)

**Description:** Write a function that takes an unsigned integer and returns the number of '1' bits it has.

**Input:** `n` (e.g., 11, binary `0...01011`)
**Output:** 3

### Approach 1: Iteration and Bitwise AND with 1 (LSB Check)

**Logic:**
This method checks each bit of the number, starting from the Least Significant Bit (LSB).
1.  Initialize `count = 0`.
2.  In a loop, check if the LSB of `n` is 1 using `n & 1`.
3.  If it is, increment `count`.
4.  Right-shift `n` by 1 (`n >>>= 1`) to move the next bit to the LSB position.
5.  Repeat until `n` becomes 0.

**Diagram (for `n = 11` (01011)):**
```
n = 01011 (11), count = 0
---------------------------
1. (01011 & 1) = 1. count = 1.
   n = 00101 (n >>>= 1)

2. (00101 & 1) = 1. count = 2.
   n = 00010 (n >>>= 1)

3. (00010 & 1) = 0.
   n = 00001 (n >>>= 1)

4. (00001 & 1) = 1. count = 3.
   n = 00000 (n >>>= 1)

n is 0. Loop ends. Return 3.
```

**Time Complexity:** O(K) where K is the number of bits (e.g., 32 for a 32-bit integer). In the worst case, it iterates 32 times.
**Space Complexity:** O(1)

### Approach 2: Brian Kernighan's Algorithm (Optimal)

**Logic:**
This is an optimization. Instead of checking each bit, it repeatedly "unsets" the least significant set bit and increments a counter. The trick `n & (n - 1)` effectively clears the rightmost set bit.
1.  Initialize `count = 0`.
2.  In a loop, while `n > 0`:
    a.  Perform `n = n & (n - 1)`. This clears the LSB of `n`.
    b.  Increment `count`.
3.  Repeat until `n` becomes 0.

**Diagram (for `n = 11` (01011)):**
```
n = 01011 (11), count = 0
---------------------------
1. n-1 = 01010
   n = 01011 & 01010 = 01010. count = 1.

2. n-1 = 01001
   n = 01010 & 01001 = 01000. count = 2.

3. n-1 = 00111
   n = 01000 & 00111 = 00000. count = 3.

n is 0. Loop ends. Return 3.
```

**Time Complexity:** O(K) where K is the number of set bits. In the best case (e.g., n=0 or n=1), it's O(1). In the worst case (all bits set), it's O(32), similar to the LSB method, but generally faster on average if numbers have few set bits.
**Space Complexity:** O(1)

### Approach 3: Using a Lookup Table (Precomputation)

**Logic:**
This approach is ideal when you need to count set bits many times. You precompute the popcount for all possible byte values (0-255). Then, for a 32-bit number, you split it into 4 bytes and sum up the precomputed counts.

1.  Initialize a `lookupTable` for 256 entries, where `lookupTable[i]` stores the number of set bits in `i`.
2.  Populate this table using any simple method (e.g., Brian Kernighan's for bytes).
3.  For a given `n`:
    a.  Extract the least significant byte using `n & 0xFF`.
    b.  Add `lookupTable[byte]` to a total count.
    c.  Right shift `n` by 8 bits (`n >>>= 8`) to get the next byte.
    d.  Repeat 4 times.

**Diagram (for `n = 0xDEADBEEF` (example bytes)):**
```
n = 11011110 10101101 10111110 11101111 (0xDE AD BE EF)

lookupTable[0xEF]  (11101111) = 7
lookupTable[0xBE]  (10111110) = 6
lookupTable[0xAD]  (10101101) = 5
lookupTable[0xDE]  (11011110) = 6

Total count = 7 + 6 + 5 + 6 = 24
```

**Time Complexity:**
*   **Initialization:** O(2^B) where B is the byte size (e.g., O(256) for 8-bit table). This is a one-time cost.
*   **Per query:** O(N/B) where N is total bits and B is byte size (e.g., O(4) for a 32-bit number, 8-bit table). This is effectively O(1) as N/B is constant.
**Space Complexity:** O(2^B) for the lookup table.

---

## 3. Problem 2: Power of Two

**Description:** Given an integer `n`, return `true` if it is a power of two.

**Input:** `n` (e.g., 8)
**Output:** `true`

### Approach 1: Iterative Division

**Logic:**
A positive integer `n` is a power of two if it can be repeatedly divided by 2 until it reaches 1.
1.  Handle edge cases: if `n <= 0`, return `false` (powers of two are positive).
2.  While `n` is even (`n % 2 === 0`):
    a.  Divide `n` by 2 (`n /= 2`).
3.  After the loop, if `n` is 1, return `true`; otherwise, return `false`.

**Diagram (for `n = 8`):**
```
n = 8
---------------------------
1. n > 0 (true).
2. 8 % 2 == 0 (true). n = 4.
3. 4 % 2 == 0 (true). n = 2.
4. 2 % 2 == 0 (true). n = 1.
5. 1 % 2 == 0 (false). Loop terminates.
6. n === 1 (true). Return true.
```

**Time Complexity:** O(log N) because `n` is repeatedly divided by 2.
**Space Complexity:** O(1)

### Approach 2: Bit Manipulation (Optimal)

**Logic:**
This is the most efficient and common bit manipulation trick for powers of two.
A positive integer `n` is a power of two if and only if it has exactly one '1' bit in its binary representation.
*   `8` (binary: `1000`) - one '1' bit
*   `7` (binary: `0111`) - three '1' bits
*   `6` (binary: `0110`) - two '1' bits

Consider `n` and `n - 1`:
*   If `n` is a power of two (e.g., `1000` for 8), then `n - 1` will have all bits to the right of the leading '1' set to '1', and the leading '1' will become '0' (e.g., `0111` for 7).
*   Therefore, `n & (n - 1)` will always be `0` if `n` is a power of two.

1.  Handle edge cases: `n` must be positive (`n > 0`).
2.  Return `n > 0 && (n & (n - 1)) === 0`.

**Diagram (for `n = 8` (1000) vs. `n = 6` (0110)):**
```
For n = 8 (Power of Two):
   1000 (n)
 & 0111 (n - 1)
 --------
   0000  => 0, so true.

For n = 6 (Not Power of Two):
   0110 (n)
 & 0101 (n - 1)
 --------
   0100  => 4, not 0, so false.
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

---

## 4. Problem 3: Reverse Bits

**Description:** Reverse the bits of a given 32-bit unsigned integer.

**Input:** `n = 00000010100101000001111010011100` (43261596)
**Output:** `00111001011110000010100101000000` (964176192)

### Approach 1: Iterative Bit-by-Bit Reversal

**Logic:**
This is the most straightforward way. We iterate 32 times, taking one bit from the original number (`n`) at a time, and placing it into the `reversed` result.
1.  Initialize `reversed = 0`.
2.  Loop 32 times (for a 32-bit integer):
    a.  Left-shift `reversed` by 1 (`reversed <<= 1`). This prepares `reversed` to accept the next bit from `n` at its LSB position.
    b.  Extract the LSB of `n` using `n & 1`.
    c.  Set this extracted bit in `reversed` using bitwise OR (`reversed |= (n & 1)`).
    d.  Unsigned right-shift `n` by 1 (`n >>>= 1`) to discard the bit just processed and move the next bit to the LSB position.
3.  After 32 iterations, `reversed` will contain the fully reversed bits.
    Note: The final `return reversed >>> 0;` is important in JavaScript to ensure the value is treated as an unsigned 32-bit integer, preventing potential negative interpretation if the 31st bit is set.

**Diagram (Simplified for an 8-bit example, `n = 00001011` (11)):**
```
n = 00001011, reversed = 00000000

i=0:
  reversed <<= 1  => 00000000
  n & 1           => 1
  reversed |= 1   => 00000001
  n >>>= 1        => 00000101

i=1:
  reversed <<= 1  => 00000010
  n & 1           => 1
  reversed |= 1   => 00000011
  n >>>= 1        => 00000010

i=2:
  reversed <<= 1  => 00000110
  n & 1           => 0
  reversed |= 0   => 00000110
  n >>>= 1        => 00000001

i=3:
  reversed <<= 1  => 00001100
  n & 1           => 1
  reversed |= 1   => 00001101
  n >>>= 1        => 00000000

... (continue for 8 iterations for 8-bit, or 32 for 32-bit)

Final reversed (for 8-bit example): 11010000 (208)
```

**Time Complexity:** O(1) (exactly 32 iterations for a 32-bit integer).
**Space Complexity:** O(1)

### Approach 2: Grouped Bit Swapping

**Logic:**
This method performs swaps on groups of bits. It's like a merge sort applied to bits. For a 32-bit number, it takes 5 steps:
1.  Swap adjacent 1-bit groups (i.e., swap bit 0 with 1, bit 2 with 3, etc.).
2.  Swap adjacent 2-bit groups.
3.  Swap adjacent 4-bit groups (nibbles).
4.  Swap adjacent 8-bit groups (bytes).
5.  Swap adjacent 16-bit groups (words).

Each step uses a pair of masks and shifts: `((n & mask1) >>> shift) | ((n & mask2) << shift)`.

**Example Masks and Shifts for 32-bit:**
*   **1-bit swaps:** `num = ((num & 0xAAAAAAAA) >>> 1) | ((num & 0x55555555) << 1);`
    *   `0xAAAAAAAA` (1010...1010) isolates bits at odd positions (1, 3, 5...).
    *   `0x55555555` (0101...0101) isolates bits at even positions (0, 2, 4...).
*   **2-bit swaps:** `num = ((num & 0xCCCCCCCC) >>> 2) | ((num & 0x33333333) << 2);`
    *   `0xCCCCCCCC` (1100...1100)
    *   `0x33333333` (0011...0011)
*   ...and so on for 4-bit, 8-bit, 16-bit groups.

**Diagram (Conceptual for 8 bits, 2-bit groups):**
```
Original:    ABCDEFGH (00 01 10 11)
Swap 1-bit:  BADCFEHG (01 00 11 10)
Swap 2-bit:  CDABGHEF (10 01 11 00)
Swap 4-bit:  EFGHABCD (11 10 00 01)
```

**Time Complexity:** O(log K) where K is the total number of bits. For 32 bits, it's 5 steps, so O(1).
**Space Complexity:** O(1)

---

## 5. Problem 4: Single Number

**Description:** Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.

**Input:** `nums = [4, 1, 2, 1, 2]`
**Output:** `4`

### Approach 1: Hash Map (Suboptimal for constraints)

**Logic:**
This is often an initial thought but doesn't meet the "constant extra space" constraint.
1.  Use a hash map (or frequency counter) to store the count of each number.
2.  Iterate through `nums`, incrementing counts in the map.
3.  Iterate through the map's entries. The number with a count of 1 is the single number.

**Time Complexity:** O(N) (two passes over the array in worst case, hash map operations are O(1) on average).
**Space Complexity:** O(N) (in the worst case, if all numbers were unique, though problem implies one unique).

### Approach 2: Bit Manipulation (XOR) - Optimal

**Logic:**
This solution is highly elegant and perfectly meets the constraints by utilizing the properties of the XOR operator (`^`):
*   `a ^ 0 = a` (XOR with zero leaves the number unchanged)
*   `a ^ a = 0` (XOR a number with itself results in zero)
*   `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b` (XOR is commutative and associative, so order doesn't matter)

If you XOR all numbers in the array:
*   Every number that appears twice will cancel itself out (resulting in `0`).
*   The single unique number will be XORed with `0` (the cumulative result of all pairs), leaving itself as the final result.

1.  Initialize `single = 0`.
2.  Iterate through each `num` in `nums`:
    a.  `single = single ^ num`.
3.  Return `single`.

**Diagram (for `nums = [4, 1, 2, 1, 2]`):**
```
Initial: single = 0 (0000)

num = 4 (0100):
  single = 0000 ^ 0100 = 0100 (4)

num = 1 (0001):
  single = 0100 ^ 0001 = 0101 (5)

num = 2 (0010):
  single = 0101 ^ 0010 = 0111 (7)

num = 1 (0001):
  single = 0111 ^ 0001 = 0110 (6)

num = 2 (0010):
  single = 0110 ^ 0010 = 0100 (4)

Final Result: 4
```

**Time Complexity:** O(N) (single pass through the array).
**Space Complexity:** O(1) (only one variable `single` is used).

---

## 6. Problem 5: Generate Subsets (Bitmasking)

**Description:** Given an integer array `nums` of unique elements, return all possible subsets (the power set).

**Input:** `nums = [1, 2, 3]`
**Output:** `[[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]` (order may vary)

### Approach 1: Bitmasking (Optimal for bit manipulation context)

**Logic:**
This problem can be elegantly solved using bitmasks. For a set of `n` elements, there are `2^n` possible subsets. Each subset can be uniquely represented by a binary number (a bitmask) from `0` to `2^n - 1`.

*   If the `j`-th bit of the bitmask is set (`1`), it means the `j`-th element from `nums` is included in the current subset.
*   If the `j`-th bit is unset (`0`), it means the `j`-th element is excluded.

1.  Let `n = nums.length`.
2.  The total number of subsets will be `2^n` (which is `1 << n`).
3.  Iterate `i` from `0` to `(1 << n) - 1`. Each `i` is a unique bitmask.
    a.  For each `i`, initialize an empty `currentSubset`.
    b.  Iterate `j` from `0` to `n - 1` (representing indices of `nums`).
    c.  Check if the `j`-th bit of `i` is set using `(i >> j) & 1`.
    d.  If it is set, add `nums[j]` to `currentSubset`.
    e.  After checking all `j` bits for `i`, add `currentSubset` to the `allSubsets` result list.

**Diagram (for `nums = [A, B, C]`, n=3):**
```
n = 3, numSubsets = 2^3 = 8. Iterate i from 0 to 7.

i | Binary | j=0 (A) | j=1 (B) | j=2 (C) | Resulting Subset
--|--------|---------|---------|---------|------------------
0 | 000    | 0       | 0       | 0       | []
1 | 001    | 1       | 0       | 0       | [A]
2 | 010    | 0       | 1       | 0       | [B]
3 | 011    | 1       | 1       | 0       | [A, B]
4 | 100    | 0       | 0       | 1       | [C]
5 | 101    | 1       | 0       | 1       | [A, C]
6 | 110    | 0       | 1       | 1       | [B, C]
7 | 111    | 1       | 1       | 1       | [A, B, C]
```

**Time Complexity:** O(N * 2^N). We generate `2^N` subsets, and for each subset, we potentially iterate `N` times to construct it.
**Space Complexity:** O(N * 2^N). To store all `2^N` subsets, each potentially containing up to `N` elements.

### Approach 2: Backtracking / Recursion (Alternative)

**Logic:**
This is a common recursive approach for generating combinations. It works by making a choice at each step: include the current element or not.

1.  Initialize an empty `allSubsets` list and an empty `currentSubset` list.
2.  Define a recursive helper function `backtrack(start_index)`:
    a.  **Base Case:** Add a copy of `currentSubset` to `allSubsets`. This represents a complete subset.
    b.  **Recursive Step:** For `i` from `start_index` to `n - 1`:
        i.  **Include:** Add `nums[i]` to `currentSubset`.
        ii. **Recurse:** Call `backtrack(i + 1)` to explore further subsets with `nums[i]` included.
        iii. **Exclude (Backtrack):** Remove `nums[i]` from `currentSubset`. This "undoes" the choice and allows exploring paths where `nums[i]` is not included.
3.  Call `backtrack(0)` to start the process.

**Diagram (Conceptual for `nums = [1, 2, 3]`):**
```
                []
               /  \
             [1]   []
            /  \    / \
          [1,2] [1] [2] []
         / \     |   |   |
      [1,2,3][1,2][1,3][1]...
```
*(This diagram is simplified and only shows a few paths, but illustrates the branching.)*

**Time Complexity:** O(N * 2^N). Each of the `2^N` subsets is generated, and copying a subset takes O(N) time.
**Space Complexity:** O(N * 2^N) for storing the results, plus O(N) for the recursion stack depth.

---
```