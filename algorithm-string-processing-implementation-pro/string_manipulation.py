```python
def reverse_string(s):
    """Reverses a string (in-place)."""
    s = list(s)  # Convert to list for mutability
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return "".join(s)

def is_palindrome(s):
    """Checks if a string is a palindrome (case-insensitive, ignoring non-alphanumeric)."""
    processed_s = ''.join(c for c in s.lower() if c.isalnum())
    return processed_s == processed_s[::-1]

def longest_palindrome_substring(s):
    """Finds the longest palindromic substring using dynamic programming."""
    n = len(s)
    if n < 2:
        return s
    dp = [[False] * n for _ in range(n)]
    start, max_len = 0, 1
    for i in range(n):
        dp[i][i] = True
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j] and (length == 2 or dp[i + 1][j - 1]):
                dp[i][j] = True
                if length > max_len:
                    max_len = length
                    start = i
    return s[start:start + max_len]

def string_compression(s):
    """Performs basic string compression."""
    if not s:
        return s
    compressed = ""
    count = 1
    for i in range(len(s)):
        if i + 1 < len(s) and s[i] == s[i + 1]:
            count += 1
        else:
            compressed += s[i] + str(count)
            count = 1
    return compressed if len(compressed) < len(s) else s

def are_anagrams(s1, s2):
    """Checks if two strings are anagrams."""
    return sorted(s1) == sorted(s2)

```