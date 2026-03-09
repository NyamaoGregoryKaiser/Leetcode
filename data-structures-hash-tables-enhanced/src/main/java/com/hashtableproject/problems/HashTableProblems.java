```java
package com.hashtableproject.problems;

import java.util.*;

/**
 * This class contains implementations for several common Hash Table-related
 * interview problems. Each problem includes its optimal hash table solution
 * along with detailed comments, time/space complexity analysis, and
 * discussions of alternative (often less optimal) approaches.
 */
public class HashTableProblems {

    /**
     * Problem 1: Two Sum
     * Given an array of integers `nums` and an integer `target`,
     * return indices of the two numbers such that they add up to `target`.
     * You may assume that each input would have exactly one solution,
     * and you may not use the same element twice.
     *
     * <p>Example:
     * Input: nums = [2,7,11,15], target = 9
     * Output: [0,1]
     * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
     * </p>
     */
    public static class TwoSum {

        /**
         * Optimal Solution: Using a HashMap (one-pass).
         * This approach iterates through the array once. For each number `nums[i]`,
         * it calculates the `complement` needed (`target - nums[i]`).
         * It then checks if this `complement` already exists in the HashMap.
         * If it does, we've found our pair. If not, we add `nums[i]` and its index `i`
         * to the HashMap for future lookups.
         *
         * <p>Time Complexity: O(N)
         * - We iterate through the array once.
         * - HashMap `put` and `containsKey` operations take O(1) on average.
         * </p>
         * <p>Space Complexity: O(N)
         * - In the worst case, we might store all N elements in the HashMap before finding a pair.
         * </p>
         *
         * @param nums   The array of integers.
         * @param target The target sum.
         * @return An array containing the indices of the two numbers.
         * @throws IllegalArgumentException if no two sum solution exists.
         */
        public int[] twoSum_Optimal(int[] nums, int target) {
            // HashMap to store (number -> index)
            // Key: The number itself
            // Value: The index of that number in the `nums` array
            Map<Integer, Integer> numMap = new HashMap<>();

            for (int i = 0; i < nums.length; i++) {
                int currentNum = nums[i];
                int complement = target - currentNum;

                // Check if the complement exists in the map
                if (numMap.containsKey(complement)) {
                    // If it exists, we found the pair.
                    // Return the index of the complement and the current index.
                    return new int[]{numMap.get(complement), i};
                }

                // If complement not found, add the current number and its index to the map
                numMap.put(currentNum, i);
            }

            // If the loop finishes without finding a solution (problem statement says there's exactly one)
            throw new IllegalArgumentException("No two sum solution found");
        }

        /**
         * Brute Force Solution: Using nested loops.
         * This approach checks every possible pair of numbers in the array.
         * For each `nums[i]`, it iterates through the rest of the array (`nums[j]` where j > i)
         * to see if `nums[i] + nums[j]` equals `target`.
         *
         * <p>Time Complexity: O(N^2)
         * - The outer loop runs N times.
         * - The inner loop runs N-1, N-2, ..., 1 times, roughly N/2 on average.
         * - Total operations approximately N * N/2 = O(N^2).
         * </p>
         * <p>Space Complexity: O(1)
         * - Only a few variables are used, independent of input size.
         * </p>
         *
         * @param nums   The array of integers.
         * @param target The target sum.
         * @return An array containing the indices of the two numbers.
         * @throws IllegalArgumentException if no two sum solution exists.
         */
        public int[] twoSum_BruteForce(int[] nums, int target) {
            for (int i = 0; i < nums.length; i++) {
                for (int j = i + 1; j < nums.length; j++) { // Start j from i+1 to avoid using same element twice
                    if (nums[i] + nums[j] == target) {
                        return new int[]{i, j};
                    }
                }
            }
            throw new IllegalArgumentException("No two sum solution found");
        }
    }

    /**
     * Problem 2: Longest Consecutive Sequence
     * Given an unsorted array of integers `nums`, return the length of the longest
     * consecutive elements sequence.
     *
     * <p>You must write an algorithm that runs in O(n) time.</p>
     *
     * <p>Example:
     * Input: nums = [100,4,200,1,3,2]
     * Output: 4
     * Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.
     * </p>
     */
    public static class LongestConsecutiveSequence {

        /**
         * Optimal Solution: Using a HashSet.
         * The key idea is to store all numbers in a HashSet for O(1) average time lookups.
         * Then, iterate through the numbers. For each number `num`, check if `num - 1`
         * exists in the set. If `num - 1` does NOT exist, it means `num` is the potential
         * start of a consecutive sequence.
         *
         * From this starting `num`, incrementally check `num + 1`, `num + 2`, etc.,
         * in the set to find the length of the current consecutive sequence.
         * Update the maximum length found so far.
         *
         * This ensures each number is processed as a "start of sequence" only once,
         * and subsequent checks (`num+1`, `num+2`...) are part of extending an already
         * identified sequence. Each number is thus visited (checked or extended) a constant
         * number of times on average.
         *
         * <p>Time Complexity: O(N)
         * - Initial insertion of all N elements into the HashSet: O(N) average.
         * - Iterating through `nums` array: O(N).
         * - For each `num`, HashSet `contains` is O(1) average.
         * - The inner `while` loop (checking `currentNum + 1`, `currentNum + 2`...)
         *   runs a total of N times across all sequences. Each element is visited at most twice:
         *   once as part of iterating `nums` and once as `currentNum + 1` (or similar)
         *   within an extending sequence.
         * - Total: O(N).
         * </p>
         * <p>Space Complexity: O(N)
         * - To store all unique elements in the HashSet.
         * </p>
         *
         * @param nums The array of integers.
         * @return The length of the longest consecutive elements sequence.
         */
        public int longestConsecutive_Optimal(int[] nums) {
            if (nums == null || nums.length == 0) {
                return 0;
            }

            // Store all numbers in a HashSet for O(1) average time lookups.
            Set<Integer> numSet = new HashSet<>();
            for (int num : nums) {
                numSet.add(num);
            }

            int maxLength = 0;

            // Iterate through each number in the original array (or numSet, it doesn't matter)
            for (int num : numSet) { // Using numSet to avoid redundant checks for duplicates
                // Check if 'num' is the potential start of a sequence.
                // A number 'num' is the start of a sequence if 'num - 1' is NOT in the set.
                if (!numSet.contains(num - 1)) {
                    int currentNum = num;
                    int currentLength = 1;

                    // While the next number in the sequence exists in the set, extend the sequence.
                    while (numSet.contains(currentNum + 1)) {
                        currentNum++;
                        currentLength++;
                    }
                    // Update the maximum length found so far.
                    maxLength = Math.max(maxLength, currentLength);
                }
            }
            return maxLength;
        }

        /**
         * Alternative Approach: Sorting.
         * Sort the array first, then iterate through the sorted array to find consecutive sequences.
         * Handles duplicates by skipping them.
         *
         * <p>Time Complexity: O(N log N)
         * - Sorting takes O(N log N).
         * - Iterating through the sorted array takes O(N).
         * - Total: O(N log N).
         * </p>
         * <p>Space Complexity: O(1) or O(N)
         * - O(1) if in-place sort (e.g., heapsort) is used and array modification is allowed.
         * - O(N) if a non-in-place sort (e.g., merge sort) is used or a copy is made.
         * </p>
         * This is less optimal than the HashSet approach if O(N) time is required.
         *
         * @param nums The array of integers.
         * @return The length of the longest consecutive elements sequence.
         */
        public int longestConsecutive_Sorting(int[] nums) {
            if (nums == null || nums.length == 0) {
                return 0;
            }

            Arrays.sort(nums); // O(N log N)

            int maxLength = 1;
            int currentLength = 1;

            for (int i = 1; i < nums.length; i++) {
                if (nums[i] != nums[i - 1]) { // Skip duplicates
                    if (nums[i] == nums[i - 1] + 1) { // Current number is consecutive
                        currentLength++;
                    } else { // Sequence broken, reset current length
                        maxLength = Math.max(maxLength, currentLength);
                        currentLength = 1;
                    }
                }
            }
            maxLength = Math.max(maxLength, currentLength); // Check one last time after loop
            return maxLength;
        }
    }

    /**
     * Problem 3: Group Anagrams
     * Given an array of strings `strs`, group the anagrams together.
     * You can return the answer in any order.
     *
     * <p>An Anagram is a word or phrase formed by rearranging the letters of a
     * different word or phrase, typically using all the original letters exactly once.</p>
     *
     * <p>Example:
     * Input: strs = ["eat","tea","tan","ate","nat","bat"]
     * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
     * </p>
     */
    public static class GroupAnagrams {

        /**
         * Optimal Solution: Using a HashMap with a sorted string as key.
         * The core idea is that anagrams will have the same sorted form.
         * For each string in the input array, sort its characters to create a "canonical form" (key).
         * Use this canonical form as the key in a HashMap, and the value will be a list
         * of strings that share this canonical form (i.e., are anagrams).
         *
         * <p>Time Complexity: O(N * K log K)
         * - N is the number of strings in the input array.
         * - K is the maximum length of a string.
         * - For each string, we convert it to a char array (O(K)), sort it (O(K log K)),
         *   and convert it back to a string (O(K)).
         * - HashMap operations (put, get) take O(1) on average.
         * - Total: N * (K + K log K + K) = O(N * K log K).
         * </p>
         * <p>Space Complexity: O(N * K)
         * - In the worst case, all strings are unique anagram groups, and we store all N strings.
         * - The HashMap stores N entries, and each key (sorted string) could be up to K length.
         * </p>
         *
         * @param strs The array of input strings.
         * @return A list of lists of strings, where each inner list contains anagrams.
         */
        public List<List<String>> groupAnagrams_SortedStringKey(String[] strs) {
            if (strs == null || strs.length == 0) {
                return new ArrayList<>();
            }

            // HashMap: Key = sorted string (canonical form), Value = List of original anagram strings
            Map<String, List<String>> anagramGroups = new HashMap<>();

            for (String str : strs) {
                // Convert string to char array, sort it, and convert back to string.
                // This sorted string will be the unique key for all its anagrams.
                char[] charArray = str.toCharArray();
                Arrays.sort(charArray); // O(K log K) where K is the length of str
                String sortedStr = new String(charArray);

                // If the sorted string (key) is not yet in the map, create a new list for it.
                // Then, add the original string to the list associated with this key.
                anagramGroups.computeIfAbsent(sortedStr, k -> new ArrayList<>()).add(str);
            }

            // Return all the lists of anagrams (values from the map).
            return new ArrayList<>(anagramGroups.values());
        }

        /**
         * Alternative Optimal Solution: Using a HashMap with a character count array as key.
         * Instead of sorting strings, we can count the frequency of each character for a string.
         * This frequency array (or a string representation of it) can serve as the key.
         * For example, "eat" -> [1,1,1,0,...] (a for 1, e for 1, t for 1).
         * "tea" -> [1,1,1,0,...].
         *
         * To use an array as a HashMap key, it must be immutable and implement hashCode/equals correctly.
         * A simple way is to convert the count array into a string (e.g., "#1#0#0#1..." for char counts).
         *
         * <p>Time Complexity: O(N * K)
         * - N is the number of strings.
         * - K is the maximum length of a string.
         * - For each string, we iterate through its characters to build the count array (O(K)).
         * - Converting the count array to a string (e.g., using a StringBuilder) takes O(alpha)
         *   where alpha is the size of the alphabet (26 for lowercase English letters). This is constant.
         * - HashMap operations are O(1) on average.
         * - Total: N * (K + alpha) = O(N * K). This is generally faster than O(N * K log K)
         *   for larger K, as log K grows slower than K.
         * </p>
         * <p>Space Complexity: O(N * K + N * alpha) -> O(N * K)
         * - The HashMap stores N entries.
         * - Each value is a list of strings, total O(N * K) for all strings.
         * - Each key (count string) is of length `alpha` (26 + separators), which is constant.
         * </p>
         *
         * @param strs The array of input strings.
         * @return A list of lists of strings, where each inner list contains anagrams.
         */
        public List<List<String>> groupAnagrams_CharCountKey(String[] strs) {
            if (strs == null || strs.length == 0) {
                return new ArrayList<>();
            }

            Map<String, List<String>> anagramGroups = new HashMap<>();

            for (String str : strs) {
                // Create a frequency count array for characters 'a' through 'z'.
                // There are 26 lowercase English letters.
                int[] charCounts = new int[26];
                for (char c : str.toCharArray()) {
                    charCounts[c - 'a']++; // Increment count for the corresponding character
                }

                // Convert the count array into a unique string representation to use as a HashMap key.
                // E.g., for "eat", charCounts might be [1,0,0,0,1,0,...,1,...] for 'a','e','t'.
                // The key could be "#1#0#0#0#1#0...#1".
                StringBuilder keyBuilder = new StringBuilder();
                for (int count : charCounts) {
                    keyBuilder.append('#').append(count);
                }
                String key = keyBuilder.toString();

                anagramGroups.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
            }

            return new ArrayList<>(anagramGroups.values());
        }
    }

    /**
     * Problem 4: Subarray Sum Equals K
     * Given an array of integers `nums` and an integer `k`, return the total
     * number of continuous subarrays whose sum equals to `k`.
     *
     * <p>A subarray is a contiguous non-empty sequence of elements within an array.</p>
     *
     * <p>Example:
     * Input: nums = [1,1,1], k = 2
     * Output: 2
     * Explanation: The two subarrays are [1,1] and [1,1].
     * </p>
     */
    public static class SubarraySumEqualsK {

        /**
         * Optimal Solution: Using a HashMap for prefix sums.
         * This problem can be efficiently solved using the concept of prefix sums.
         * A prefix sum `P[i]` is the sum of elements from `nums[0]` to `nums[i-1]`.
         * The sum of a subarray `nums[j...i]` can be calculated as `P[i+1] - P[j]`.
         *
         * We are looking for `nums[j...i]` such that its sum is `k`.
         * So, we need `P[i+1] - P[j] = k`.
         * This can be rewritten as `P[j] = P[i+1] - k`.
         *
         * We iterate through the array, maintaining a running `currentSum` (which is `P[i+1]` if `i` is current index).
         * For each `currentSum`, we check if `currentSum - k` exists as a prefix sum in our HashMap.
         * If `currentSum - k` exists, it means there's a subarray ending at the current index `i`
         * whose sum is `k`. The number of times `currentSum - k` appeared as a prefix sum
         * tells us how many such subarrays exist.
         *
         * The HashMap stores `(prefix_sum -> count)`:
         * - `Key`: A prefix sum encountered so far.
         * - `Value`: The number of times that prefix sum has been encountered.
         * Initialize `prefixSumCounts.put(0, 1)` to handle cases where the subarray itself starts from index 0
         * and its sum is `k`. This simulates a prefix sum of 0 existing before the array starts.
         *
         * <p>Time Complexity: O(N)
         * - We iterate through the array once.
         * - HashMap `get` and `put` operations take O(1) on average.
         * </p>
         * <p>Space Complexity: O(N)
         * - In the worst case, we might store N distinct prefix sums in the HashMap.
         * </p>
         *
         * @param nums The array of integers.
         * @param k    The target sum.
         * @return The total number of continuous subarrays whose sum equals to `k`.
         */
        public int subarraySum_Optimal(int[] nums, int k) {
            if (nums == null || nums.length == 0) {
                return 0;
            }

            int count = 0; // Stores the total number of subarrays whose sum is k
            int currentSum = 0; // Stores the prefix sum up to the current element

            // HashMap to store (prefix_sum -> count of occurrences of that prefix_sum)
            Map<Integer, Integer> prefixSumCounts = new HashMap<>();

            // Initialize with prefix sum 0 occurring once. This handles cases where a subarray
            // starting from index 0 itself sums to k. For example, if currentSum = k, then
            // currentSum - k = 0, and we find `0` in the map, correctly counting this subarray.
            prefixSumCounts.put(0, 1);

            for (int num : nums) {
                currentSum += num; // Update current prefix sum

                // If `currentSum - k` exists in the map, it means there is a previous prefix sum `P[j]`
                // such that `currentSum - P[j] = k`. The number of times `P[j]` occurred tells us
                // how many subarrays ending at the current index sum to `k`.
                if (prefixSumCounts.containsKey(currentSum - k)) {
                    count += prefixSumCounts.get(currentSum - k);
                }

                // Add or update the count for the current prefix sum in the map.
                prefixSumCounts.put(currentSum, prefixSumCounts.getOrDefault(currentSum, 0) + 1);
            }

            return count;
        }

        /**
         * Brute Force Solution: Using nested loops to check all possible subarrays.
         * This approach generates every possible subarray, calculates its sum, and
         * checks if the sum equals `k`.
         *
         * The outer loop `i` defines the starting point of the subarray.
         * The inner loop `j` defines the ending point of the subarray.
         * For each subarray `nums[i...j]`, we sum its elements.
         *
         * <p>Time Complexity: O(N^2)
         * - The outer loop runs N times.
         * - The inner loop also runs N times in the worst case (for `i=0`).
         * - Calculating the sum of `nums[i...j]` itself takes `j-i+1` steps, which is up to N.
         * - Thus, N * N * N in a naive implementation, but can be optimized to N*N
         *   by accumulating sum in the inner loop:
         *   Outer loop (i from 0 to N-1): N iterations
         *     Inner loop (j from i to N-1): N iterations (max)
         *       sum calculation: O(1) in inner loop.
         * - Total: O(N^2).
         * </p>
         * <p>Space Complexity: O(1)
         * - Only a few variables are used, independent of input size.
         * </p>
         *
         * @param nums The array of integers.
         * @param k    The target sum.
         * @return The total number of continuous subarrays whose sum equals to `k`.
         */
        public int subarraySum_BruteForce(int[] nums, int k) {
            int count = 0;
            if (nums == null || nums.length == 0) {
                return 0;
            }

            // Iterate over all possible starting points `i`
            for (int i = 0; i < nums.length; i++) {
                int currentSum = 0; // Reset sum for each new starting point
                // Iterate over all possible ending points `j` for the current starting point `i`
                for (int j = i; j < nums.length; j++) {
                    currentSum += nums[j]; // Add current element to subarray sum
                    if (currentSum == k) {
                        count++; // Found a subarray with sum k
                    }
                }
            }
            return count;
        }
    }
}
```