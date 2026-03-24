# Bit Manipulation Algorithms: Detailed Explanations

This document provides in-depth explanations of the bit manipulation algorithms implemented in this project, including their logic, different approaches, and time/space complexity analysis.

---

## 1. Count Set Bits (Hamming Weight)

**Problem:** Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

### Approach 1: Simple Loop and Check LSB (in `BitManipulationSolutions.cpp`)

**Logic:**
This is the most straightforward approach. We iterate through all the bits of the number, one by one. In each iteration, we check if the least significant bit (LSB) is `1` using the bitwise AND `&` operator with `1`. After checking, we right-shift the number by `1` (`n >>= 1`) to move the next bit to the LSB position. We repeat this 32 times for a 32-bit integer.

**Example (n = 10, binary 0...01010):**
1.  `n = 0...01010`. `n & 1` is `0`. Count = 0. `n` becomes `0...00101`.
2.  `n = 0...00101`. `n & 1` is `1`. Count = 1. `n` becomes `0...00010`.
3.  `n = 0...00010`. `n & 1` is `0`. Count = 1. `n` becomes `0...00001`.
4.  `n = 0...00001`. `n & 1` is `1`. Count = 2. `n` becomes `0...00000`.
5.  ... continues for 28 more iterations until `n` is completely processed.
Final Count = 2.

**Time Complexity:** O(B), where B is the number of bits in the integer (e.g., 32 for an `unsigned int`). We perform a constant number of operations for each bit.
**Space Complexity:** O(1).

### Approach 2: Brian Kernighan's Algorithm (Optimal General-Purpose) (in `BitManipulationSolutions.cpp`)

**Logic:**
This algorithm is more efficient than the simple loop when the number of set bits is small. The key insight is that `n & (n - 1)` unsets the least significant set bit (the rightmost '1' bit) in `n`. We repeatedly apply this operation and increment a counter until `n` becomes `0`. The number of times we perform the operation is equal to the number of set bits.

**Example (n = 10, binary 0...01010):**
1.  `n = 0...01010` (10). `n - 1 = 0...01001` (9).
    `n & (n - 1) = 0...01000` (8). Count = 1.
2.  `n = 0...01000` (8). `n - 1 = 0...00111` (7).
    `n & (n - 1) = 0...00000` (0). Count = 2.
3.  `n = 0`. Loop terminates.
Final Count = 2.

**Time Complexity:** O(k), where k is the number of set bits. In the worst case (all bits are 1s), k = B, so it becomes O(B). However, in many cases, k << B, making it faster than the simple loop.
**Space Complexity:** O(1).

### Approach 3: Lookup Table (Memory-Efficient) (in `additional_implementations/CountSetBits_Approaches.cpp`)

**Logic:**
For fixed-size integers (like 32-bit `unsigned int`), we can precompute the number of set bits for all possible byte values (0-255) and store them in an array (a lookup table). Then, to count set bits in a 32-bit integer, we break it into four 8-bit bytes, look up the set bit count for each byte from the table, and sum them up.

**Example (n = 0xABCD, binary 1010101111001101):**
1.  Initialize `byte_popcount_lookup[0...255]`
    `byte_popcount_lookup[0b1010]` = 2, `byte_popcount_lookup[0b1011]` = 3, etc.
2.  For `n = 0xABCD`:
    *   `n & 0xFF` (LSB): `0xCD` (11001101_2). Look up `byte_popcount_lookup[0xCD]` (which is 6).
    *   `(n >> 8) & 0xFF`: `0xAB` (10101011_2). Look up `byte_popcount_lookup[0xAB]` (which is 6).
    *   Sum = 6 + 6 = 12.

**Time Complexity:** O(B/8) or O(C), where C is the number of bytes in the integer (e.g., 4 for a 32-bit int). This is essentially constant time once the table is built.
**Space Complexity:** O(2^8) or O(256) for the lookup table. This is a constant memory overhead.

### Approach 4: Compiler Intrinsic (`__builtin_popcount`)

**Logic:**
Modern compilers (like GCC and Clang) provide built-in functions that map directly to CPU instructions for counting set bits (e.g., `POPCOUNT` instruction on x86-64). This is typically the fastest method available in C++.

**Example:** `__builtin_popcount(n)`

**Time Complexity:** O(1) (hardware accelerated).
**Space Complexity:** O(1).

---

## 2. Reverse Bits

**Problem:** Reverse the bits of a 32-bit unsigned integer.

### Approach 1: Standard Loop and Shift (in `BitManipulationSolutions.cpp`)

**Logic:**
This approach constructs the reversed number bit by bit. We iterate 32 times. In each iteration:
1.  We left-shift the `reversed_n` by `1`. This effectively moves all bits in `reversed_n` one position to the left, making space for the new LSB.
2.  We check the LSB of the original number `n` using `n & 1`.
3.  If `n`'s LSB is `1`, we set `reversed_n`'s new LSB to `1` using `reversed_n |= 1`.
4.  We right-shift `n` by `1` (`n >>= 1`) to process the next bit.

**Example (n = 0...0101):**
1.  `n = 0...0101`, `reversed_n = 0`.
2.  `reversed_n` becomes `0`. `n & 1` is `1`. `reversed_n` becomes `1`. `n` becomes `0...0010`.
3.  `reversed_n` becomes `10`. `n & 1` is `0`. `reversed_n` remains `10`. `n` becomes `0...0001`.
4.  `reversed_n` becomes `100`. `n & 1` is `1`. `reversed_n` becomes `101`. `n` becomes `0...0000`.
... This continues for 32 iterations, padding with zeros on the right of `reversed_n` until all bits of original `n` are processed.

**Time Complexity:** O(B), where B is the number of bits (e.g., 32).
**Space Complexity:** O(1).

### Approach 2: Byte-by-Byte Reversal using Lookup Table (in `additional_implementations/ReverseBits_Approaches.cpp`)

**Logic:**
Similar to the lookup table approach for counting set bits, we can precompute the reversed version of every possible 8-bit byte (0-255). Then, to reverse a 32-bit integer, we extract its four bytes, reverse each byte using the lookup table, and then reassemble them in the reversed order. For example, if `n` is `B3 B2 B1 B0` (where `B0` is the least significant byte), its reversed version will be `(reversed(B0) << 24) | (reversed(B1) << 16) | (reversed(B2) << 8) | reversed(B3)`.

**Example (n = 0x12345678):**
1.  Initialize `byte_reverse_lookup[0...255]`
    `byte_reverse_lookup[0x01]` = `0x80`, `byte_reverse_lookup[0x02]` = `0x40`, etc.
2.  For `n = 0x12345678`:
    *   Extract LSB: `0x78`. Look up `byte_reverse_lookup[0x78]`. Let's say `rev_78`.
    *   Extract second byte: `0x56`. Look up `byte_reverse_lookup[0x56]`. Let's say `rev_56`.
    *   Extract third byte: `0x34`. Look up `byte_reverse_lookup[0x34]`. Let's say `rev_34`.
    *   Extract MSB: `0x12`. Look up `byte_reverse_lookup[0x12]`. Let's say `rev_12`.
3.  Combine: `(rev_78 << 24) | (rev_56 << 16) | (rev_34 << 8) | rev_12`.

**Time Complexity:** O(B/8) or O(C), where C is the number of bytes (e.g., 4). This is essentially constant time once the table is built.
**Space Complexity:** O(2^8) or O(256) for the lookup table. This is a constant memory overhead.

---

## 3. Single Number

**Problem:** Given a non-empty array of integers, every element appears twice except for one. Find that single one.

### Approach 1: XOR (Optimal) (in `BitManipulationSolutions.cpp`)

**Logic:**
This approach leverages the unique properties of the XOR (`^`) bitwise operator:
*   **XOR with 0:** `A ^ 0 = A`. XORing any number with zero returns the number itself.
*   **XOR with self:** `A ^ A = 0`. XORing any number with itself results in zero.
*   **Commutativity and Associativity:** `A ^ B ^ C = A ^ (B ^ C) = (A ^ B) ^ C`. The order of XOR operations does not matter.

If we XOR all the numbers in the array together, all pairs of identical numbers will cancel each other out (resulting in `0`), leaving only the single unique number.

**Example (nums = {4, 1, 2, 1, 2}):**
1.  `result = 0`
2.  `result = 0 ^ 4 = 4`
3.  `result = 4 ^ 1 = 5` (`0100 ^ 0001 = 0101`)
4.  `result = 5 ^ 2 = 7` (`0101 ^ 0010 = 0111`)
5.  `result = 7 ^ 1 = 6` (`0111 ^ 0001 = 0110`)
6.  `result = 6 ^ 2 = 4` (`0110 ^ 0010 = 0100`)
Final result = 4.

**Time Complexity:** O(N), where N is the number of elements in the array. We iterate through the array once.
**Space Complexity:** O(1), as we only use a single variable to store the XOR sum.

### Approach 2: Hash Map (for comparison) (in `BitManipulationSolutions.cpp`)

**Logic:**
This is a general approach that works for finding unique elements even if elements appear `k` times and one appears `m` times. We use a hash map (or frequency array) to store the count of each number in the array. After populating the map, we iterate through it and return the number whose count is `1`.

**Example (nums = {4, 1, 2, 1, 2}):**
1.  Initialize `counts = {}`.
2.  Iterate:
    *   `4`: `counts = {4: 1}`
    *   `1`: `counts = {4: 1, 1: 1}`
    *   `2`: `counts = {4: 1, 1: 1, 2: 1}`
    *   `1`: `counts = {4: 1, 1: 2, 2: 1}`
    *   `2`: `counts = {4: 1, 1: 2, 2: 2}`
3.  Iterate through `counts`:
    *   `4`: count is `1`. Return `4`.

**Time Complexity:** O(N) on average, for iterating through the array and performing hash map operations. In the worst case (hash collisions), it can degrade to O(N^2).
**Space Complexity:** O(N), as we store up to N distinct elements in the hash map.

---

## 4. Check if a Number is a Power of 2

**Problem:** Given a positive integer `n`, determine if it is a power of 2.

### Approach 1: Bitwise AND with `n - 1` (Optimal) (in `BitManipulationSolutions.cpp`)

**Logic:**
A positive integer `n` is a power of 2 if and only if it has exactly one bit set to `1` in its binary representation.
The trick `n & (n - 1)` has a special property: it clears the least significant set bit of `n`.
*   If `n` is a power of 2 (e.g., `8` is `1000_2`), then `n - 1` will be all ones to the right of that single set bit (e.g., `7` is `0111_2`).
*   Performing `n & (n - 1)` will result in `0` if `n` has only one set bit.
    `1000_2 & 0111_2 = 0000_2`
*   If `n` is not a power of 2 (e.g., `6` is `0110_2`), then `n` will have multiple set bits. `n & (n - 1)` will clear the LSB but `n` will not become `0`.
    `0110_2 & 0101_2 = 0100_2` (not 0)

Therefore, the condition for `n` being a power of 2 is `n > 0` (to exclude `0`, which has no set bits) AND `(n & (n - 1)) == 0`.

**Example (n = 8):**
*   `n = 8` (binary `1000`)
*   `n - 1 = 7` (binary `0111`)
*   `n & (n - 1)`: `1000 & 0111 = 0000`. Since it's `0`, `8` is a power of 2.

**Example (n = 6):**
*   `n = 6` (binary `0110`)
*   `n - 1 = 5` (binary `0101`)
*   `n & (n - 1)`: `0110 & 0101 = 0100`. Since it's not `0`, `6` is not a power of 2.

**Time Complexity:** O(1). This is a single bitwise operation.
**Space Complexity:** O(1).

### Approach 2: Loop and Divide (for comparison) (in `BitManipulationSolutions.cpp`)

**Logic:**
A positive integer `n` is a power of 2 if it can be repeatedly divided by 2 until it becomes `1`, without any remainder at any step.
We start with `n`. If `n` is less than or equal to `0`, it's not a power of 2. While `n` is even (i.e., `n % 2 == 0`), we divide `n` by `2`. If after this process, `n` becomes `1`, then the original number was a power of 2.

**Example (n = 8):**
1.  `n = 8`. `8 % 2 == 0`. `n = 8 / 2 = 4`.
2.  `n = 4`. `4 % 2 == 0`. `n = 4 / 2 = 2`.
3.  `n = 2`. `2 % 2 == 0`. `n = 2 / 2 = 1`.
4.  `n = 1`. Loop terminates. `n == 1` is true. So, `8` is a power of 2.

**Time Complexity:** O(log N), as we repeatedly divide `n` by `2`.
**Space Complexity:** O(1).

---

## 5. Insert M into N (Bit Insertion)

**Problem:** Given two 32-bit numbers, `N` and `M`, and two bit positions, `i` and `j`, insert `M` into `N` such that `M` starts at bit `i` and ends at bit `j`. You can assume that `M` will fit within bits `j` through `i`.

### Approach 1: Create Mask, Clear, then OR (Optimal) (in `BitManipulationSolutions.cpp`)

**Logic:**
The goal is to replace the bits in `N` from `i` to `j` with the bits from `M`. This can be broken down into three main steps:
1.  **Create a mask** to clear the bits in `N` from position `i` to `j` (inclusive). This mask will have `0`s in the `[i, j]` range and `1`s everywhere else.
    *   To create `1`s for bits `j+1` to `31`: `(~0U) << (j + 1)`. If `j` is 31, this becomes `0`.
    *   To create `1`s for bits `0` to `i-1`: `(1U << i) - 1`. If `i` is 0, this becomes `0`.
    *   Combine these two: `mask_left | mask_right`.
2.  **Clear the target bits in N:** Perform `N = N & clear_mask`. This sets bits `i` through `j` in `N` to `0`.
3.  **Shift M and insert:** Left-shift `M` by `i` positions (`M <<= i`) to align its least significant bit with position `i` in `N`. Then, perform a bitwise OR (`|`) with the modified `N`: `N | M_shifted`. This effectively inserts `M` into the cleared slot in `N`.

**Example (N = 0b10000000000, M = 0b10011, i = 2, j = 6):**

*   `N = 0...010000000000` (2048)
*   `M = 0...00000010011` (19)
*   `i = 2`, `j = 6`

1.  **Create Clear Mask:**
    *   `mask_left`: `~0U << (6 + 1)` which is `~0U << 7`. Binary: `11...1111111111111111111110000000`
    *   `mask_right`: `(1U << 2) - 1`. Binary: `00...00000000000000000000000000000011`
    *   `clear_mask = mask_left | mask_right`: `11...1111111111111111111110000011`
        (This mask has `1`s everywhere except positions `2` through `6`).

2.  **Clear bits in N:**
    *   `N_cleared = N & clear_mask`
        `0...010000000000`
        `& 1...10000011`
        `= 0...010000000000` (In this specific case, N's '1' bit at pos 10 is outside the [2,6] range, so N effectively remains the same).

3.  **Shift M and Insert:**
    *   `M_shifted = M << i` which is `0b10011 << 2`. Binary: `0...00001001100` (76)
    *   `result = N_cleared | M_shifted`
        `0...010000000000`
        `| 0...00001001100`
        `= 0...010001001100` (2204)

**Time Complexity:** O(1). All operations are constant-time bitwise operations.
**Space Complexity:** O(1).

---