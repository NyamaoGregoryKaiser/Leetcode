```typescript
/**
 * src/algorithms/countSetBits.ts
 *
 * Problem: Counting Set Bits (Hamming Weight)
 *
 * Write a function that takes an unsigned integer and returns the number of '1' bits it has
 * (also known as the Hamming weight).
 *
 * For example, the 32-bit integer 11 (in binary) is 00000000000000000000000000001011,
 * so the function should return 3.
 */

/**
 * Approach 1: Iteration and Bitwise AND with 1 (Right Shift)
 *
 * This approach checks the least significant bit (LSB) of the number.
 * If the LSB is 1, it increments a counter.
 * Then, it right-shifts the number by 1 to process the next bit.
 * This process continues until the number becomes 0.
 *
 * Time Complexity: O(log N) or O(K) where K is the number of bits in the integer
 *                  (e.g., 32 for a 32-bit integer).
 *                  In the worst case, we iterate 32 times for a 32-bit number.
 * Space Complexity: O(1)
 *
 * @param n The unsigned integer.
 * @returns The number of set bits.
 */
export function countSetBits_LSB(n: number): number {
    let count = 0;
    // Use unsigned right shift (>>>) to ensure numbers are treated as unsigned
    // and to handle potential negative inputs gracefully by converting them
    // to their unsigned 32-bit representation first.
    let num = n >>> 0;

    while (num > 0) {
        // Check if the least significant bit is 1
        if ((num & 1) === 1) {
            count++;
        }
        // Right shift by 1 to examine the next bit
        num >>>= 1;
    }
    return count;
}

/**
 * Approach 2: Brian Kernighan's Algorithm
 *
 * This is an optimized approach. It repeatedly flips the least significant set bit
 * to 0 and increments a counter until the number becomes 0.
 * The key idea is that `n & (n - 1)` unsets the least significant set bit of `n`.
 *
 * Example:
 * n = 11 (0...01011)
 * 1. n = 0...01011, count = 0
 *    n-1 = 0...01010
 *    n & (n-1) = 0...01010  (LSB 1 is unset)
 *    n = 0...01010, count = 1
 * 2. n = 0...01010, count = 1
 *    n-1 = 0...01001
 *    n & (n-1) = 0...01000  (LSB 1 is unset)
 *    n = 0...01000, count = 2
 * 3. n = 0...01000, count = 2
 *    n-1 = 0...00111
 *    n & (n-1) = 0...00000  (LSB 1 is unset)
 *    n = 0...00000, count = 3
 * 4. Loop terminates as n is 0. Return 3.
 *
 * Time Complexity: O(K) where K is the number of set bits.
 *                  In the best case (n=0), it's O(1).
 *                  In the worst case (n has all bits set), it's still O(log N) or O(32).
 *                  This is generally faster than the LSB approach if the number of set bits is small.
 * Space Complexity: O(1)
 *
 * @param n The unsigned integer.
 * @returns The number of set bits.
 */
export function countSetBits_BrianKernighan(n: number): number {
    let count = 0;
    let num = n >>> 0; // Ensure unsigned 32-bit interpretation

    while (num > 0) {
        // Unset the least significant set bit
        num = num & (num - 1);
        count++;
    }
    return count;
}

/**
 * Approach 3: Using a Lookup Table (Precomputation)
 *
 * This approach is useful when `countSetBits` needs to be called many times
 * for numbers within a certain range, or for specific byte values.
 * We can precompute the number of set bits for all 256 possible 8-bit values (0-255).
 * Then, for a 32-bit number, we can break it into 4 bytes and sum up the precomputed values.
 *
 * This implementation precomputes the table lazily for efficiency.
 *
 * Time Complexity:
 *   - Precomputation: O(2^B) where B is the byte size (e.g., O(256) for 8-bit table).
 *   - Per query: O(N/B) where N is total bits and B is byte size (e.g., O(4) for 32-bit num, 8-bit table).
 * Space Complexity: O(2^B) for the lookup table.
 *
 * @param n The unsigned integer.
 * @returns The number of set bits.
 */
let _byteLookupTable: number[] | null = null;

function initializeLookupTable(): void {
    if (_byteLookupTable === null) {
        _byteLookupTable = new Array(256);
        for (let i = 0; i < 256; i++) {
            _byteLookupTable[i] = countSetBits_BrianKernighan(i); // Using a simpler method to compute for bytes
        }
    }
}

export function countSetBits_LookupTable(n: number): number {
    initializeLookupTable(); // Ensure table is initialized

    if (!_byteLookupTable) {
        throw new Error("Lookup table not initialized.");
    }

    let count = 0;
    let num = n >>> 0; // Ensure unsigned 32-bit interpretation

    // Sum the set bits for each byte
    // 0xFF (255) is 00000000000000000000000011111111 in binary
    // Using & 0xFF isolates the least significant 8 bits (a byte).

    // Byte 0 (LSB)
    count += _byteLookupTable[num & 0xFF];
    num >>>= 8; // Shift right by 8 bits to get the next byte

    // Byte 1
    count += _byteLookupTable[num & 0xFF];
    num >>>= 8;

    // Byte 2
    count += _byteLookupTable[num & 0xFF];
    num >>>= 8;

    // Byte 3 (MSB)
    count += _byteLookupTable[num & 0xFF];

    return count;
}

/**
 * Approach 4: Built-in Function (Concept)
 *
 * Many languages (like Java, Python, C++) have built-in functions
 * to count set bits (e.g., `Integer.bitCount()` in Java, `__builtin_popcount` in C++).
 * JavaScript does not have a direct `popcount` intrinsic for numbers.
 * The closest is using a `BigInt` and converting to string, but that's not efficient
 * for 32-bit integers.
 *
 * For practical purposes in JS interviews, one of the above bit manipulation
 * methods is expected. However, understanding that highly optimized hardware
 * instructions exist for this operation is important.
 *
 * This function serves as a conceptual placeholder. In a real scenario, you'd use
 * `countSetBits_BrianKernighan` or similar.
 *
 * @param n The unsigned integer.
 * @returns The number of set bits.
 */
export function countSetBits_BuiltInConcept(n: number): number {
    // This is purely for demonstration of the concept.
    // In a real JavaScript interview, this would not be a "bit manipulation" solution.
    // However, it's good to know such functions exist in other languages and at hardware level.
    return countSetBits_BrianKernighan(n); // Fallback to an implemented solution
}

/**
 * Main function to export the preferred/most optimal solution.
 * Brian Kernighan's algorithm is generally preferred for its efficiency
 * and elegance when a lookup table isn't justified by heavy repeated calls.
 */
export const hammingWeight = countSetBits_BrianKernighan;
```