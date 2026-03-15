import collections
from typing import List, Dict, Tuple, Set

class HashTableProblems:
    """
    A collection of classic coding interview problems solved using Hash Tables.
    Each problem includes optimal solutions, alternative approaches, and complexity analysis.
    """

    def two_sum(self, nums: List[int], target: int) -> List[int]:
        """
        Problem 1: Two Sum
        Given an array of integers `nums` and an integer `target`, return indices of the two
        numbers such that they add up to `target`.
        You may assume that each input would have exactly one solution, and you may not
        use the same element twice.

        Optimal Approach: Using a Hash Map (Dictionary)
        ------------------------------------------------
        Iterate through the array. For each number `num`, calculate the `complement` needed
        to reach the `target` (i.e., `complement = target - num`).
        Check if this `complement` already exists in our hash map.
        If it does, we've found our pair, return their indices.
        If not, add the current `num` and its index to the hash map.

        Why this works:
        A hash map allows O(1) average time complexity for lookups. By storing numbers
        we've already seen, we can quickly check if the required complement is present.

        Time Complexity: O(N)
        We iterate through the list once. Each dictionary operation (insertion, lookup)
        takes O(1) on average. In the worst case (hash collisions leading to a linked list
        or tree structure for buckets), it could degrade to O(N), but for typical hash
        table implementations (like Python's dict), it's amortized O(1).

        Space Complexity: O(N)
        In the worst case, we might store all N numbers in the hash map if no pair is
        found until the last element.

        Edge Cases / Considerations:
        - Exactly one solution is guaranteed, simplifying the logic.
        - Cannot use the same element twice (handled by storing index).
        - Empty array: The problem statement implies a valid solution, so nums won't be empty.
        - Duplicates: If `nums = [3, 3], target = 6`, it correctly returns `[0, 1]` because we store
          `num: index` pairs and only check `target - num` against *previously seen* numbers.
        """
        num_map: Dict[int, int] = {}  # Stores {number: index}

        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
        
        # According to problem constraints, a solution is guaranteed.
        return []

    def two_sum_brute_force(self, nums: List[int], target: int) -> List[int]:
        """
        Problem 1: Two Sum (Brute Force Approach)

        Alternative Approach: Brute Force
        ---------------------------------
        Iterate through all possible pairs of numbers in the array and check if their
        sum equals the target.

        Time Complexity: O(N^2)
        We use nested loops, leading to approximately N * N operations.

        Space Complexity: O(1)
        No additional data structures are used beyond a few variables.
        """
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):  # Start j from i+1 to avoid using same element twice
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []

    def group_anagrams(self, strs: List[str]) -> List[List[str]]:
        """
        Problem 2: Group Anagrams
        Given an array of strings `strs`, group the anagrams together.

        Optimal Approach: Using a Hash Map with Sorted String as Key
        -------------------------------------------------------------
        The core idea is that anagrams will have the same "canonical form". A simple
        canonical form for a string is its sorted version. For example, "eat", "tea",
        and "ate" all become "aet" when sorted.

        We can use a hash map where:
        - Keys are the sorted versions of strings (the canonical form).
        - Values are lists of strings that share that canonical form.

        Iterate through each string in the input list:
        1. Sort the string to get its canonical key.
        2. Use `collections.defaultdict(list)` to automatically handle new keys.
           Append the original string to the list associated with its sorted key.
        Finally, return all the values (lists of anagrams) from the hash map.

        Time Complexity: O(N * K log K)
        - N is the number of strings in the input list.
        - K is the maximum length of a string.
        - For each of N strings, we sort it, which takes O(K log K) time.
        - Hash map operations (insertion, lookup) take O(K) time on average because
          the key is a string of length K (hashing a string involves iterating through its characters).
        The sorting dominates the complexity.

        Space Complexity: O(N * K)
        - In the worst case, all strings are unique anagrams (e.g., ["a", "b", "c"]),
          or all strings are anagrams of each other but distinct (e.g., ["abc", "acb"]).
        - We store all N strings in the hash map, and each string has an average length K.
        - The sorted keys also take up space.

        Edge Cases / Considerations:
        - Empty input list: Returns `[]`.
        - List with empty strings: `[""]` -> `[[""]]`
        - List with single character strings: `["a", "b"]` -> `[["a"], ["b"]]`
        - Case sensitivity: The problem usually implies lowercase letters. If not,
          ensure consistency (e.g., convert all to lowercase before sorting).
        """
        # Using defaultdict simplifies adding elements to lists within the dictionary
        # If a key is not found, it automatically creates an empty list for it.
        anagram_groups: Dict[str, List[str]] = collections.defaultdict(list)

        for s in strs:
            # Create a canonical key by sorting the string
            # 'sorted(s)' returns a list of characters, so join it back to a string
            sorted_s = "".join(sorted(s))
            anagram_groups[sorted_s].append(s)

        # Return all the values (lists of anagrams) from the dictionary
        return list(anagram_groups.values())

    def group_anagrams_char_count(self, strs: List[str]) -> List[List[str]]:
        """
        Problem 2: Group Anagrams (Alternative: Character Count Tuple as Key)

        Alternative Approach: Using a Hash Map with Character Count Tuple as Key
        -----------------------------------------------------------------------
        Instead of sorting each string, we can create a frequency count for each
        character (a-z). Since there are 26 lowercase English letters, a tuple
        of 26 integers representing counts can serve as the canonical key.

        Example: "eat" -> (1,0,0,0,1,0...1...0) (1 'a', 1 'e', 1 't')

        Time Complexity: O(N * K)
        - N is the number of strings.
        - K is the maximum length of a string.
        - For each string, we iterate through its characters to build the count array/tuple.
          This takes O(K) time.
        - Creating the tuple (26 elements) takes O(1) time.
        - Hashing the tuple and dictionary operations take O(1) time (as the key size is constant 26).
        This approach is generally faster than sorting for longer strings (K).

        Space Complexity: O(N * K)
        - Similar to the sorted string approach, we store all N strings.
        - The keys (tuples of 26 integers) also consume space, but it's a constant
          factor per key, not dependent on K, only N.

        This approach avoids the `K log K` sorting factor, replacing it with `K` for counting.
        """
        anagram_groups: Dict[Tuple[int, ...], List[str]] = collections.defaultdict(list)

        for s in strs:
            # Create a character count array (or tuple) as the key
            # Assuming lowercase English letters 'a' through 'z'
            count = [0] * 26  # 'a' at index 0, 'b' at index 1, etc.
            for char_code in s:
                count[ord(char_code) - ord('a')] += 1
            
            # Convert the list to a tuple because lists are mutable and cannot be dict keys.
            # Tuples are immutable and hashable.
            anagram_groups[tuple(count)].append(s)

        return list(anagram_groups.values())

    def longest_consecutive_sequence(self, nums: List[int]) -> int:
        """
        Problem 3: Longest Consecutive Sequence
        Given an unsorted array of integers `nums`, return the length of the longest
        consecutive elements sequence. Must run in O(N) time.

        Optimal Approach: Using a Hash Set
        ----------------------------------
        The challenge is to find consecutive numbers efficiently in an unsorted array.
        A hash set (Python's `set`) allows O(1) average time complexity for checking
        membership.

        Algorithm:
        1. Store all numbers from `nums` into a hash set for O(1) lookups.
        2. Iterate through each `num` in the original `nums` array (or iterate through the set).
        3. For each `num`, check if `num - 1` exists in the hash set.
           - If `num - 1` *does not* exist, then `num` is the potential start of a consecutive sequence.
           - If `num - 1` *does* exist, then `num` is part of an existing sequence starting at an
             earlier number, so we can skip it. This is crucial for O(N) complexity to avoid
             re-evaluating sequences.
        4. If `num` is a sequence start:
           - Initialize `current_num = num` and `current_streak = 1`.
           - While `current_num + 1` exists in the hash set:
             - Increment `current_num` and `current_streak`.
           - Update `longest_streak = max(longest_streak, current_streak)`.

        Why this works (O(N) explanation):
        Each number is processed at most a constant number of times:
        - Once when added to the set.
        - Once when iterating through `num` in `num_set`.
        - At most once when extending a `current_streak` (only if it's part of a sequence,
          and only for the `num` that is the *start* of its sequence). The inner `while` loop
          traverses elements already present in `num_set`, but each element is visited
          as `current_num + 1` at most once across all sequence checks.

        Time Complexity: O(N)
        - O(N) to insert all elements into the hash set.
        - O(N) in the worst case for iterating through the numbers and extending sequences.
          Each number is checked if it's a sequence start, and then at most once within
          a `while` loop across all iterations.

        Space Complexity: O(N)
        - To store all numbers in the hash set.

        Edge Cases / Considerations:
        - Empty input array: Returns `0`.
        - Array with one element: Returns `1`.
        - Array with duplicates: Hash set handles this naturally, only unique elements are stored.
        - Negative numbers: Handled correctly.
        - Large numbers: Handled correctly as hash set supports arbitrary integers.
        """
        if not nums:
            return 0

        num_set: Set[int] = set(nums)
        longest_streak = 0

        for num in num_set:  # Iterate through the set for efficiency
            # Only consider `num` as a potential start of a sequence if `num - 1` is not in the set.
            # This ensures each sequence is processed only once, starting from its lowest element.
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1

                # Extend the sequence upwards
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                longest_streak = max(longest_streak, current_streak)

        return longest_streak

    def longest_consecutive_sequence_sort_first(self, nums: List[int]) -> int:
        """
        Problem 3: Longest Consecutive Sequence (Alternative: Sort First)

        Alternative Approach: Sort the Array First
        ------------------------------------------
        1. Sort the array.
        2. Iterate through the sorted array, keeping track of the current consecutive streak.
           - If `nums[i]` is the same as `nums[i-1]`, it's a duplicate, skip it.
           - If `nums[i]` is `nums[i-1] + 1`, extend the current streak.
           - Otherwise, reset the current streak to 1.
        Keep track of the maximum streak found.

        Time Complexity: O(N log N)
        - Dominated by the sorting step (e.g., Timsort in Python).
        - The linear scan after sorting is O(N).

        Space Complexity: O(N) or O(log N)
        - O(N) if the sorting algorithm requires additional space (e.g., merge sort).
        - O(log N) if an in-place sort with logarithmic space for recursion stack is used (e.g., quicksort).
        Python's `list.sort()` is Timsort, which is O(N) space in the worst case.

        This approach is less optimal than the hash set approach for the given
        O(N) time constraint.
        """
        if not nums:
            return 0

        nums.sort()  # O(N log N)
        longest_streak = 1
        current_streak = 1

        for i in range(1, len(nums)):
            if nums[i] == nums[i-1]:
                # Skip duplicates
                continue
            elif nums[i] == nums[i-1] + 1:
                current_streak += 1
            else:
                # Sequence broken
                current_streak = 1
            
            longest_streak = max(longest_streak, current_streak)
        
        return longest_streak

    def subarray_sum_equals_k(self, nums: List[int], k: int) -> int:
        """
        Problem 4: Subarray Sum Equals K
        Given an array of integers `nums` and an integer `k`, return the total number of
        subarrays whose sum equals `k`.

        Optimal Approach: Using Prefix Sums and a Hash Map
        --------------------------------------------------
        This problem can be efficiently solved using the concept of prefix sums combined
        with a hash map.

        Prefix Sum: A prefix sum `P[i]` is the sum of `nums[0]` through `nums[i]`.
        The sum of any subarray `nums[i...j]` can be expressed as `P[j] - P[i-1]`.

        Goal: Find `j` and `i` such that `P[j] - P[i-1] = k`.
        Rearranging this, we get `P[i-1] = P[j] - k`.

        Algorithm:
        1. Initialize `count = 0` (number of subarrays summing to k).
        2. Initialize `current_sum = 0`.
        3. Initialize a hash map `sum_counts` where keys are prefix sums and values are
           their frequencies. Store `{0: 1}` initially. This handles cases where a
           prefix sum itself equals `k` (meaning the subarray from index 0 to current
           index sums to `k`). `P[-1]` is effectively 0.
        4. Iterate through `num` in `nums`:
           a. Add `num` to `current_sum`.
           b. Check if `current_sum - k` exists in `sum_counts`.
              If it does, it means there's a previous prefix sum `P[i-1]` such that
              `P[j] - P[i-1] = k`. The number of times `current_sum - k` has appeared
              as a prefix sum `P[i-1]` is the number of subarrays ending at the
              current index `j` that sum to `k`. Add this count to `total_count`.
           c. Increment the count of `current_sum` in `sum_counts`.

        Time Complexity: O(N)
        We iterate through the array once. Each hash map operation (lookup, insertion,
        update) takes O(1) on average.

        Space Complexity: O(N)
        In the worst case, all prefix sums are distinct, requiring `N` entries in the
        hash map.

        Edge Cases / Considerations:
        - Empty array: Handled, returns `0`.
        - `k = 0`: Correctly handles subarrays that sum to zero (e.g., `[1, -1, 1, -1]`, `k=0`).
        - Negative numbers: Handled correctly by prefix sums.
        - Large numbers: Handled correctly as hash map supports arbitrary integers.
        - All elements are positive: Works the same.
        """
        count = 0
        current_sum = 0
        # sum_counts stores {prefix_sum: frequency}
        # Initialize with {0: 1} to handle cases where a subarray from the beginning
        # (index 0) to the current index sums up to `k`. This is equivalent to `prefix_sum - k = 0`.
        sum_counts: Dict[int, int] = {0: 1}

        for num in nums:
            current_sum += num
            
            # If (current_sum - k) exists in sum_counts, it means there are
            # `sum_counts[current_sum - k]` subarrays ending at the current position
            # that sum up to `k`.
            if current_sum - k in sum_counts:
                count += sum_counts[current_sum - k]
            
            # Increment the frequency of the current prefix sum
            sum_counts[current_sum] = sum_counts.get(current_sum, 0) + 1

        return count

    def subarray_sum_equals_k_brute_force(self, nums: List[int], k: int) -> int:
        """
        Problem 4: Subarray Sum Equals K (Brute Force Approach)

        Alternative Approach: Brute Force (Iterate all subarrays)
        ----------------------------------------------------------
        Iterate through all possible subarrays, calculate their sum, and check if it equals `k`.

        Time Complexity: O(N^2)
        - Outer loop iterates from `i = 0` to `N-1`.
        - Inner loop iterates from `j = i` to `N-1`.
        - Summing `nums[i...j]` takes `O(j-i+1)` time, which in the worst case is `O(N)`.
        - Total: `N` * `N` * `N` = `O(N^3)` if `sum` is recalculated each time.
        - Optimized Brute Force: `N` * `N` = `O(N^2)` if `current_sum` is updated incrementally.

        Space Complexity: O(1)
        No additional data structures are used.
        """
        count = 0
        n = len(nums)

        for i in range(n):  # Start of subarray
            current_sum = 0
            for j in range(i, n):  # End of subarray
                current_sum += nums[j]
                if current_sum == k:
                    count += 1
        return count

    def subarray_sum_equals_k_prefix_sum_array(self, nums: List[int], k: int) -> int:
        """
        Problem 4: Subarray Sum Equals K (Alternative: Prefix Sum Array)

        Alternative Approach: Using a Precomputed Prefix Sum Array
        -----------------------------------------------------------
        This approach first computes an array of prefix sums, then uses that array
        to find subarray sums.

        1. Create a `prefix_sums` array where `prefix_sums[i]` stores the sum of
           `nums[0...i-1]`. So, `prefix_sums[0] = 0`, `prefix_sums[1] = nums[0]`, etc.
           `prefix_sums` will have length `N+1`.
        2. Iterate through all possible starting indices `i` and ending indices `j`.
           The sum of `nums[i...j]` is `prefix_sums[j+1] - prefix_sums[i]`.
           Check if this sum equals `k`.

        Time Complexity: O(N^2)
        - O(N) to compute the prefix sums array.
        - O(N^2) for the nested loops to check all subarray sums.

        Space Complexity: O(N)
        - To store the `prefix_sums` array.

        This approach is an improvement over the O(N^3) brute force but less optimal
        than the O(N) hash map approach.
        """
        n = len(nums)
        prefix_sums = [0] * (n + 1) # prefix_sums[i] stores sum of nums[0...i-1]

        for i in range(n):
            prefix_sums[i+1] = prefix_sums[i] + nums[i]

        count = 0
        for i in range(n + 1): # Start index for subarray (corresponds to prefix_sums[i])
            for j in range(i + 1, n + 1): # End index for subarray (corresponds to prefix_sums[j])
                # sum of nums[i...j-1] is prefix_sums[j] - prefix_sums[i]
                if prefix_sums[j] - prefix_sums[i] == k:
                    count += 1
        return count

# Example usage (for testing purposes, not part of the class itself)
if __name__ == "__main__":
    solver = HashTableProblems()

    # Two Sum
    print("--- Two Sum ---")
    print(f"nums=[2,7,11,15], target=9 => {solver.two_sum([2,7,11,15], 9)}") # Expected: [0, 1]
    print(f"nums=[3,2,4], target=6 => {solver.two_sum([3,2,4], 6)}") # Expected: [1, 2]
    print(f"nums=[3,3], target=6 => {solver.two_sum([3,3], 6)}") # Expected: [0, 1]
    print(f"nums=[1,5,9,13], target=18 => {solver.two_sum([1,5,9,13], 18)}") # Expected: [1, 3]

    # Group Anagrams
    print("\n--- Group Anagrams ---")
    strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"]
    print(f"strs={strs1} => {solver.group_anagrams(strs1)}")
    print(f"strs={strs1} (char_count) => {solver.group_anagrams_char_count(strs1)}")
    strs2 = [""]
    print(f"strs={strs2} => {solver.group_anagrams(strs2)}")
    strs3 = ["a"]
    print(f"strs={strs3} => {solver.group_anagrams(strs3)}")

    # Longest Consecutive Sequence
    print("\n--- Longest Consecutive Sequence ---")
    nums_lcs1 = [100, 4, 200, 1, 3, 2]
    print(f"nums={nums_lcs1} => {solver.longest_consecutive_sequence(nums_lcs1)}") # Expected: 4
    print(f"nums={nums_lcs1} (sort) => {solver.longest_consecutive_sequence_sort_first(nums_lcs1)}") # Expected: 4
    nums_lcs2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
    print(f"nums={nums_lcs2} => {solver.longest_consecutive_sequence(nums_lcs2)}") # Expected: 9
    nums_lcs3 = []
    print(f"nums={nums_lcs3} => {solver.longest_consecutive_sequence(nums_lcs3)}") # Expected: 0
    nums_lcs4 = [1, 2, 0, 1]
    print(f"nums={nums_lcs4} => {solver.longest_consecutive_sequence(nums_lcs4)}") # Expected: 3 ([0,1,2])

    # Subarray Sum Equals K
    print("\n--- Subarray Sum Equals K ---")
    nums_ssk1 = [1, 1, 1]
    k_ssk1 = 2
    print(f"nums={nums_ssk1}, k={k_ssk1} => {solver.subarray_sum_equals_k(nums_ssk1, k_ssk1)}") # Expected: 2
    print(f"nums={nums_ssk1}, k={k_ssk1} (brute force) => {solver.subarray_sum_equals_k_brute_force(nums_ssk1, k_ssk1)}") # Expected: 2
    print(f"nums={nums_ssk1}, k={k_ssk1} (prefix sum array) => {solver.subarray_sum_equals_k_prefix_sum_array(nums_ssk1, k_ssk1)}") # Expected: 2
    nums_ssk2 = [1, 2, 3]
    k_ssk2 = 3
    print(f"nums={nums_ssk2}, k={k_ssk2} => {solver.subarray_sum_equals_k(nums_ssk2, k_ssk2)}") # Expected: 2 ([1,2], [3])
    nums_ssk3 = [1, -1, 0]
    k_ssk3 = 0
    print(f"nums={nums_ssk3}, k={k_ssk3} => {solver.subarray_sum_equals_k(nums_ssk3, k_ssk3)}") # Expected: 3 ([1,-1], [0], [1,-1,0])
    nums_ssk4 = [0,0,0,0,0,0,0,0,0,0]
    k_ssk4 = 0
    # Formula for N choose 2 + N = N*(N+1)/2 subarrays, here 10*11/2 = 55
    print(f"nums={nums_ssk4}, k={k_ssk4} => {solver.subarray_sum_equals_k(nums_ssk4, k_ssk4)}") # Expected: 55