```python
from hash_table import HashTable

def two_sum(nums, target):
    """O(n) time, O(n) space"""
    ht = HashTable()
    for i, num in enumerate(nums):
        complement = target - num
        if complement in ht:
            return [ht.get(complement), i]
        ht.insert(num, i)
    return None  # No solution found


def is_anagram(s, t):
    """O(n) time, O(1) space (assuming constant character set)"""
    if len(s) != len(t):
        return False
    ht = HashTable()
    for char in s:
        ht.insert(char, ht.get(char, 0) + 1)
    for char in t:
        count = ht.get(char)
        if count is None or count == 0:
            return False
        ht.insert(char, count - 1)
    return True


def group_anagrams(strs):
    """O(n*k) time, O(n*k) space, where n is number of strings, k is max string length"""
    ht = HashTable()
    for s in strs:
        sorted_s = "".join(sorted(s)) # key for anagrams
        if sorted_s in ht:
            ht.get(sorted_s).append(s)
        else:
            ht.insert(sorted_s, [s])
    return list(ht.table) # Note: this returns a list of lists (potentially with None)

def longest_consecutive(nums):
    """O(n) time, O(n) space"""
    num_set = set(nums)
    longest_streak = 0
    for num in num_set:
        if num - 1 not in num_set:  #potential start of a sequence
            current_num = num
            current_streak = 1
            while current_num + 1 in num_set:
                current_num += 1
                current_streak += 1
            longest_streak = max(longest_streak, current_streak)
    return longest_streak

# Add Minimum Window Substring here (more complex, requires sliding window technique and hash table for character counts)


```