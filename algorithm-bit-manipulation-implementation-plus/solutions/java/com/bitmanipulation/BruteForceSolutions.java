```java
package com.bitmanipulation;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * BruteForceSolutions.java
 *
 * This class provides alternative, typically less optimal (in the context of bit manipulation),
 * or more "brute-force" solutions to problems solved optimally using bit manipulation.
 * This is useful for comparison during an interview to discuss tradeoffs in
 * time, space, and readability.
 */
public class BruteForceSolutions {

    /**
     * Problem: Count Set Bits (Hamming Weight) - Brute Force / String Conversion
     * Converts the integer to its binary string representation and then counts the '1's.
     * This is generally much slower than bitwise operations due to string creation overhead.
     *
     * @param n The input integer.
     * @return The number of set bits.
     *
     * Time Complexity: O(k), where k is the number of bits (32 for int), due to string conversion and iteration.
     *                  String conversion itself can be O(k).
     * Space Complexity: O(k) for storing the binary string.
     */
    public int countSetBits_StringConversion(int n) {
        // Integer.toBinaryString treats input as signed and returns a string
        // without leading zeros for positive numbers. For negative numbers,
        // it returns the two's complement representation, also without leading 1s
        // unless it's necessary (e.g. for -1 it's "111...111").
        // To get a full 32-bit representation (useful for "unsigned" problems),
        // we use Integer.toUnsignedString and pad.
        String binaryString = String.format("%32s", Integer.toBinaryString(n)).replace(' ', '0');

        int count = 0;
        for (char c : binaryString.toCharArray()) {
            if (c == '1') {
                count++;
            }
        }
        return count;
    }

    /**
     * Problem: Single Number - Brute Force / Using HashMap
     * This approach uses a HashMap to store the frequency of each number.
     * It iterates through the array twice (or once if using `getOrDefault` and removing).
     *
     * @param nums The input array of integers.
     * @return The single number that appears only once.
     *
     * Time Complexity: O(N), where N is the number of elements in the array.
     *                  - One pass to populate the hash map.
     *                  - One pass to find the element with frequency 1.
     * Space Complexity: O(N), in the worst case, all numbers are unique (except one pair),
     *                   so the map stores N/2 + 1 elements.
     */
    public int singleNumber_HashMap(int[] nums) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            if (entry.getValue() == 1) {
                return entry.getKey();
            }
        }
        // This line should ideally not be reached based on problem constraints (non-empty array, exactly one single number).
        throw new IllegalArgumentException("No single number found.");
    }

    /**
     * Problem: Single Number - Alternative / Using HashSet
     * This approach uses a HashSet. When a number is encountered:
     * - If it's already in the set, remove it (it's a pair).
     * - If it's not in the set, add it (it might be the single number or part of a pair yet to be found).
     * At the end, the set will contain only the single number.
     *
     * @param nums The input array of integers.
     * @return The single number that appears only once.
     *
     * Time Complexity: O(N), where N is the number of elements in the array.
     *                  Each add/remove operation in a HashSet is O(1) on average.
     * Space Complexity: O(N), in the worst case, the set will store N/2 + 1 elements.
     */
    public int singleNumber_HashSet(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (!set.add(num)) { // if add returns false, element was already present
                set.remove(num);
            }
        }
        // The set will contain exactly one element, which is the single number.
        return set.iterator().next();
    }


    /**
     * Problem: Power of Two - Brute Force / Logarithmic approach (Floating point precision issues)
     * Checks if log base 2 of n is an integer.
     * This approach uses floating point arithmetic, which can introduce precision errors
     * for large numbers and is generally less performant and reliable than bitwise.
     *
     * @param n The input integer.
     * @return True if n is a power of two, false otherwise.
     *
     * Time Complexity: O(1) for Math.log.
     * Space Complexity: O(1).
     * Note: Not recommended due to potential floating-point inaccuracies.
     */
    public boolean isPowerOfTwo_Logarithm(int n) {
        if (n <= 0) {
            return false;
        }
        // Calculate log base 2. log2(N) = log10(N) / log10(2)
        double log2 = Math.log(n) / Math.log(2);
        // Check if log2 is an integer (within a small epsilon for precision)
        return Math.abs(log2 - Math.round(log2)) < 1e-9;
    }
}
```