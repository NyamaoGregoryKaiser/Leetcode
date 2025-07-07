# Algorithm Explanations

This document details the algorithms used in the Hash Table project.

## Two Sum

**Approach:**  Uses a hash map (JavaScript Map) to store numbers and their indices.  For each number, it checks if the complement (target - number) exists in the map. If it does, it means we've found the pair.

**Time Complexity:** O(n) - We iterate through the array once.
**Space Complexity:** O(n) - In the worst case, the hash map stores all numbers.


## Valid Anagram

**Approach:** Uses a hash map to count the frequency of characters in the first string. Then, it iterates through the second string, decrementing the counts. If any count becomes negative or a character is not found, they are not anagrams.

**Time Complexity:** O(n), where n is the length of the strings.
**Space Complexity:** O(1) -  The hash map size is bounded by the number of unique characters in the alphabet (constant).


## Group Anagrams

**Approach:** Uses a hash map where the key is the sorted string (representing the anagram group) and the value is an array of strings belonging to that group.

**Time Complexity:** O(nk log k), where n is the number of strings and k is the maximum length of a string. Sorting dominates the time complexity.
**Space Complexity:** O(nk), where n is the number of strings and k is the maximum length of a string.


## Longest Consecutive Sequence

**Approach:** Uses a hash set for efficient lookups. It iterates through the numbers, checking if a number is the start of a sequence (it doesn't have a predecessor in the set). If it is, it extends the sequence until it finds the end.


**Time Complexity:** O(n), where n is the number of numbers.  Each number is visited at most twice.
**Space Complexity:** O(n) to store the numbers in the hash set.