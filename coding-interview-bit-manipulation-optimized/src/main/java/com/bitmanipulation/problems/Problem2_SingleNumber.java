```java
package com.bitmanipulation.problems;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem 2: Single Number
 * Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.
 *
 * Constraints:
 * - Your algorithm should have a linear runtime complexity.
 * - Could you implement it without using extra memory?
 *
 * Examples:
 * Input: nums = [2,2,1]
 * Output: 1
 *
 * Input: nums = [4,1,2,1,2]
 * Output: 4
 *
 * Input: nums = [1]
 * Output: 1
 */
public class Problem2_SingleNumber {

    /**
     * Approach 1: XOR Operation (Optimal and Memory-Efficient)
     * The XOR (exclusive OR) operation has a few key properties that make it perfect for this problem:
     * 1. `a ^ 0 = a` (XORing with zero yields the number itself)
     * 2. `a ^ a = 0` (XORing a number with itself yields zero)
     * 3. `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b` (Commutative and associative property)
     *
     * If we XOR all elements in the array, all numbers that appear twice will cancel each other out
     * (their XOR will result in 0), leaving only the single number.
     *
     * Example: nums = [4,1,2,1,2]
     * result = 0
     * result = 0 ^ 4 = 4
     * result = 4 ^ 1 = 5 (binary 100 ^ 001 = 101)
     * result = 5 ^ 2 = 7 (binary 101 ^ 010 = 111)
     * result = 7 ^ 1 = 6 (binary 111 ^ 001 = 110)
     * result = 6 ^ 2 = 4 (binary 110 ^ 010 = 100)
     *
     * Time Complexity: O(n), where n is the number of elements in the array. We iterate through the array once.
     * Space Complexity: O(1), as we only use a single variable to store the XOR sum. This is highly memory-efficient.
     *
     * @param nums The input array of integers.
     * @return The single number that appears only once.
     */
    public int singleNumber_XOR(int[] nums) {
        int single = 0; // Initialize with 0, as a ^ 0 = a
        for (int num : nums) {
            single ^= num; // XOR each number with the running result
        }
        return single;
    }

    /**
     * Approach 2: Using a HashSet (Less Optimal, but common approach)
     * This approach uses a HashSet to keep track of numbers encountered.
     * If a number is encountered for the first time, it's added to the set.
     * If a number is encountered again, it means it has appeared twice, so it's removed from the set.
     * At the end, the set will contain only the single number.
     *
     * Time Complexity: O(n) on average, because adding/removing from a HashSet takes O(1) on average.
     *                  In the worst case (hash collisions), it could be O(n) per operation, leading to O(n^2) total,
     *                  but this is rare with good hash functions.
     * Space Complexity: O(n) in the worst case (e.g., if the single number is the last one, all `n/2 + 1` unique
     *                   numbers might be in the set before removals).
     *                   This does not meet the "without using extra memory" constraint.
     *
     * @param nums The input array of integers.
     * @return The single number that appears only once.
     */
    public int singleNumber_HashSet(int[] nums) {
        Set<Integer> uniqueNumbers = new HashSet<>();
        for (int num : nums) {
            if (!uniqueNumbers.add(num)) { // If add returns false, num was already in the set
                uniqueNumbers.remove(num); // So, remove it (it appeared twice)
            }
        }
        // The remaining element in the set is the single number
        return uniqueNumbers.iterator().next();
    }

    /**
     * Approach 3: Using a HashMap (Even Less Optimal, but demonstrates frequency counting)
     * This approach uses a HashMap to store the frequency of each number.
     * After counting frequencies, iterate through the map to find the number with a count of 1.
     *
     * Time Complexity: O(n) for iterating through the array to populate the map, and O(k) for iterating
     *                  through the map (where k is the number of unique elements, k <= n/2 + 1). So, O(n) overall.
     * Space Complexity: O(n) in the worst case (similar to HashSet, if all numbers are distinct until the end).
     *                   This also does not meet the "without using extra memory" constraint.
     *
     * @param nums The input array of integers.
     * @return The single number that appears only once.
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
        // Should not reach here as problem guarantees a single number exists.
        throw new IllegalArgumentException("No single number found in the array.");
    }

    // Helper method for demonstration
    public void demonstrate() {
        System.out.println("\n--- Problem 2: Single Number ---");
        int[][] testCases = {
            {2, 2, 1},        // Expected: 1
            {4, 1, 2, 1, 2},  // Expected: 4
            {1},              // Expected: 1
            {0, 0, 1},        // Expected: 1
            {-1, -1, 2, 2, 3} // Expected: 3
        };

        for (int[] nums : testCases) {
            System.out.println("Input: " + Arrays.toString(nums));
            System.out.println("  XOR Solution: " + singleNumber_XOR(nums));
            System.out.println("  HashSet Solution: " + singleNumber_HashSet(nums));
            System.out.println("  HashMap Solution: " + singleNumber_HashMap(nums));
            System.out.println("---------------------------------");
        }
    }
}
```