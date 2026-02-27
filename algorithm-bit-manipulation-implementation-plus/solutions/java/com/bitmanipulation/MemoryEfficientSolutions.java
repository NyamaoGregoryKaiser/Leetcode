```java
package com.bitmanipulation;

/**
 * MemoryEfficientSolutions.java
 *
 * This class highlights solutions that are particularly memory-efficient,
 * often achieving O(1) auxiliary space complexity by leveraging bit manipulation.
 * This contrasts with solutions that might use HashMaps or other data structures
 * that consume O(N) or O(log N) space.
 *
 * For many basic bit manipulation problems, the default bitwise solutions are already
 * memory-efficient (O(1) space). This file serves to explicitly showcase such instances
 * or problems where memory efficiency is a primary concern.
 */
public class MemoryEfficientSolutions {

    /**
     * Problem: Single Number - Memory Efficient (XOR)
     * This is the same XOR solution as in `BitManipulationProblems.java` but is re-iterated
     * here to emphasize its memory efficiency.
     *
     * By using the XOR property (A ^ A = 0, A ^ 0 = A), we can find the unique number
     * without storing any element frequencies or visiting history.
     *
     * @param nums The input array of integers.
     * @return The single number that appears only once.
     *
     * Time Complexity: O(N), as we iterate through the array once.
     * Space Complexity: O(1), as only a single integer variable (`single`) is used for auxiliary storage.
     *                   This is superior to HashMap (O(N) space) or sorting (O(log N) or O(N) space depending on algorithm).
     */
    public int singleNumber_MemoryEfficient(int[] nums) {
        int single = 0; // Initialize with 0, as X ^ 0 = X
        for (int num : nums) {
            single ^= num; // XOR each number with the running result
        }
        return single;
    }

    /**
     * Problem: Find two non-repeating elements in an array where all other elements appear twice.
     * This is a classic memory-efficient bit manipulation problem, extending the "Single Number" concept.
     *
     * Given an array of numbers `nums` containing `2n + 2` numbers, in which `2n` numbers appear twice
     * and two numbers appear once. Find the two numbers that appear only once.
     *
     * Example: nums = [1,2,1,3,2,5] -> Output: [3,5] or [5,3]
     *
     * Algorithm:
     * 1. XOR all numbers: `xor_sum = num1 ^ num2 ^ num1 ^ num3 ^ ...`
     *    All numbers appearing twice will cancel out, leaving `xor_sum = A ^ B`, where A and B are the two unique numbers.
     * 2. Find a distinguishing bit: Since A != B, `A ^ B` must be non-zero, meaning there's at least one bit position
     *    where A and B differ. Find any such bit (e.g., the rightmost set bit in `xor_sum`). Let this be `distinguishing_bit`.
     * 3. Partition and XOR: Iterate through the original array again.
     *    - If a number has `distinguishing_bit` set, XOR it into `group1`.
     *    - If a number does NOT have `distinguishing_bit` set, XOR it into `group2`.
     *    Because A and B differ at `distinguishing_bit`, A will fall into one group and B into the other.
     *    All other duplicate numbers will fall into the same group as their pair and cancel out.
     *    Thus, `group1` will end up being A (or B), and `group2` will be B (or A).
     *
     * @param nums The input array of integers.
     * @return An array containing the two numbers that appear only once.
     *
     * Time Complexity: O(N), two passes through the array.
     * Space Complexity: O(1), as only a few integer variables are used.
     */
    public int[] singleNumber_TwoUnique_MemoryEfficient(int[] nums) {
        // Step 1: XOR all numbers to get XOR_sum = A ^ B
        int xor_sum = 0;
        for (int num : nums) {
            xor_sum ^= num;
        }

        // Step 2: Find a distinguishing bit (e.g., the rightmost set bit)
        // This bit is 1 in A ^ B, meaning A and B have different values at this bit position.
        // `xor_sum & (-xor_sum)` isolates the rightmost set bit.
        // Example: xor_sum = 0110 (6)
        // -xor_sum = 1010 (-6 in 2's complement, if considering 4-bit)
        // xor_sum & (-xor_sum) = 0010 (2)
        int distinguishingBit = xor_sum & (-xor_sum);

        // Step 3: Partition numbers into two groups based on the distinguishing bit
        // XOR numbers within each group to find A and B.
        int num1 = 0; // Will eventually hold one unique number (A)
        int num2 = 0; // Will eventually hold the other unique number (B)

        for (int num : nums) {
            if ((num & distinguishingBit) != 0) {
                // Number has the distinguishing bit set
                num1 ^= num;
            } else {
                // Number does NOT have the distinguishing bit set
                num2 ^= num;
            }
        }

        return new int[]{num1, num2};
    }
}
```