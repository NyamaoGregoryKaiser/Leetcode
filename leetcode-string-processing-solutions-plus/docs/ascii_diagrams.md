# ASCII Diagrams for String Manipulation Algorithms

This document provides visual diagrams using ASCII art to illustrate the core concepts of the algorithms.

---

## 1. Reverse String - Two Pointers (In-Place)

**Concept:** Two pointers (left, right) start at opposite ends of the array. They move towards the center, swapping elements at their positions.

```
Initial state:
  left                     right
    |                        |
    V                        V
  [ h , e , l , l , o ]
    0   1   2   3   4

Step 1: Swap s[0] and s[4]
  left                     right
    |                        |
    V                        V
  [ o , e , l , l , h ]
    0   1   2   3   4

Step 2: Move pointers (left++, right--)
      left               right
        |                  |
        V                  V
  [ o , e , l , l , h ]
    0   1   2   3   4

Step 3: Swap s[1] and s[3]
      left               right
        |                  |
        V                  V
  [ o , l , l , e , h ]
    0   1   2   3   4

Step 4: Move pointers (left++, right--)
          left  right
            |   |
            V   V
  [ o , l , l , e , h ]
    0   1   2   3   4

Base case: left >= right (2 >= 2). Stop.
Result: `["o","l","l","e","h"]`
```

---

## 2. Valid Parentheses - Stack Usage

**Concept:** Use a stack to keep track of expected closing brackets. When an opening bracket is seen, push its corresponding closing bracket. When a closing bracket is seen, pop from the stack and compare.

```
String: "({[]})"

1. Scan '(':
   - It's an opening bracket. Push its closing counterpart ')'.
   Stack: [ ')' ]

2. Scan '{':
   - It's an opening bracket. Push its closing counterpart '}'.
   Stack: [ ')', '}' ]

3. Scan '[':
   - It's an opening bracket. Push its closing counterpart ']'.
   Stack: [ ')', '}', ']' ]

4. Scan ']':
   - It's a closing bracket.
   - Stack is NOT empty. Pop top: ']'
   - Does popped ']' match current ']'? Yes. Valid so far.
   Stack: [ ')', '}' ]

5. Scan '}':
   - It's a closing bracket.
   - Stack is NOT empty. Pop top: '}'
   - Does popped '}' match current '}'? Yes. Valid so far.
   Stack: [ ')' ]

6. Scan ')':
   - It's a closing bracket.
   - Stack is NOT empty. Pop top: ')'
   - Does popped ')' match current ')'? Yes. Valid so far.
   Stack: [ ]

End of string. Stack is empty.
Result: Valid (True)

---

Example: "([)]"

1. Scan '(': Stack: [')']
2. Scan '[': Stack: [')', ']']
3. Scan ')':
   - Pop: ']'
   - Does popped ']' match current ')'? No.
Result: Invalid (False)
```

---

## 3. Longest Substring Without Repeating Characters - Sliding Window with Set

**Concept:** Use two pointers (`left`, `right`) to define a window. A `Set` tracks unique characters in the window. Expand `right`. If a repeat is found, shrink `left`.

```
String: "abcabcbb"
maxLength = 0
left = 0
right = 0
charSet = {}

Initial:
Window: []
charSet: {}
maxLength: 0

1. right = 0, char = 'a'
   'a' not in charSet. Add 'a'.
   charSet: {'a'}
   maxLength = max(0, 0 - 0 + 1) = 1
   right++ (right = 1)
Window: ['a']

2. right = 1, char = 'b'
   'b' not in charSet. Add 'b'.
   charSet: {'a', 'b'}
   maxLength = max(1, 1 - 0 + 1) = 2
   right++ (right = 2)
Window: ['a', 'b']

3. right = 2, char = 'c'
   'c' not in charSet. Add 'c'.
   charSet: {'a', 'b', 'c'}
   maxLength = max(2, 2 - 0 + 1) = 3
   right++ (right = 3)
Window: ['a', 'b', 'c']

4. right = 3, char = 'a'
   'a' IS in charSet. (Duplicate found!)
   Delete s[left] ('a') from charSet.
   charSet: {'b', 'c'}
   left++ (left = 1)
Window: ['b', 'c'] (s[0] removed)
   Still 'a' (s[3]) in current iteration. Check again.
   'a' not in charSet (it was deleted). This logic is for the Map version.
   For Set: loop will continue to shrink left until current right char is unique.
   Wait, the Set logic is: when a duplicate is found, *then* shrink left and *re-evaluate* current right.
   Let's refine:

Corrected Set Logic for step 4:

String: "abcabcbb"
maxLength = 0
left = 0
right = 0
charSet = {}

1. right = 0, char = 'a'
   !charSet.has('a'). Add 'a'. charSet: {'a'}. maxLength=1. right=1.
   Window: "a"
2. right = 1, char = 'b'
   !charSet.has('b'). Add 'b'. charSet: {'a','b'}. maxLength=2. right=2.
   Window: "ab"
3. right = 2, char = 'c'
   !charSet.has('c'). Add 'c'. charSet: {'a','b','c'}. maxLength=3. right=3.
   Window: "abc"
4. right = 3, char = 'a'
   charSet.has('a') is TRUE. Duplicate.
   Delete s[left] ('a'). charSet: {'b','c'}.
   left++ (left = 1).
   Window: "bca" (conceptually, actual window chars are `s[1], s[2], s[3]`).
   Loop continues, checking 'a' (s[3]) again with new window. (Actually, right just increments in next cycle).
   So for current iteration, 'a' is a duplicate. We shrank window. Next loop cycle will consider s[3] ('a') again,
   but with `left=1`, so `s[3]` is new w.r.t `{b,c}`.
   This means the `right` pointer *does not advance* when a duplicate is found and `left` is moved.
   Only when `!charSet.has(s[j])` is true does `right` advance.

Let's trace `lengthOfLongestSubstringSlidingWindowSet` more carefully:

String: "abcabcbb"
maxLength = 0
left = 0
right = 0
charSet = {}

Initial: right=0, left=0, maxLength=0, charSet={}

Iteration 1: right=0, s[right]='a'
   `!charSet.has('a')` is true.
   `charSet.add('a')`. `charSet = {'a'}`.
   `maxLength = max(0, 0 - 0 + 1) = 1`.
   `right++` => `right=1`.

Iteration 2: right=1, s[right]='b'
   `!charSet.has('b')` is true.
   `charSet.add('b')`. `charSet = {'a','b'}`.
   `maxLength = max(1, 1 - 0 + 1) = 2`.
   `right++` => `right=2`.

Iteration 3: right=2, s[right]='c'
   `!charSet.has('c')` is true.
   `charSet.add('c')`. `charSet = {'a','b','c'}`.
   `maxLength = max(2, 2 - 0 + 1) = 3`.
   `right++` => `right=3`.

Iteration 4: right=3, s[right]='a'
   `charSet.has('a')` is true. Duplicate.
   `charSet.delete(s[left])` => `charSet.delete(s[0])` => `charSet.delete('a')`. `charSet = {'b','c'}`.
   `left++` => `left=1`.
   (Right pointer does NOT advance in this branch).

Iteration 5: right=3, s[right]='a' (still the same 'a' at index 3)
   `!charSet.has('a')` is true now. (Because 'a' at index 0 was removed).
   `charSet.add('a')`. `charSet = {'b','c','a'}`.
   `maxLength = max(3, 3 - 1 + 1) = max(3, 3) = 3`.
   `right++` => `right=4`.

Iteration 6: right=4, s[right]='b'
   `charSet.has('b')` is true. Duplicate.
   `charSet.delete(s[left])` => `charSet.delete(s[1])` => `charSet.delete('b')`. `charSet = {'c','a'}`.
   `left++` => `left=2`.
   (Right pointer does NOT advance).

Iteration 7: right=4, s[right]='b' (still the same 'b' at index 4)
   `!charSet.has('b')` is true now.
   `charSet.add('b')`. `charSet = {'c','a','b'}`.
   `maxLength = max(3, 4 - 2 + 1) = max(3, 3) = 3`.
   `right++` => `right=5`.

Iteration 8: right=5, s[right]='b'
   `charSet.has('b')` is true. Duplicate.
   `charSet.delete(s[left])` => `charSet.delete(s[2])` => `charSet.delete('c')`. `charSet = {'a','b'}`.
   `left++` => `left=3`.
   (Right pointer does NOT advance).

Iteration 9: right=5, s[right]='b' (still the same 'b' at index 5)
   `charSet.has('b')` is true. Duplicate.
   `charSet.delete(s[left])` => `charSet.delete(s[3])` => `charSet.delete('a')`. `charSet = {'b'}`.
   `left++` => `left=4`.
   (Right pointer does NOT advance).

Iteration 10: right=5, s[right]='b' (still the same 'b' at index 5)
    `!charSet.has('b')` is false.
    `charSet.add('b')`. `charSet = {'b'}`.
    `maxLength = max(3, 5 - 4 + 1) = max(3, 2) = 3`.
    `right++` => `right=6`.

Loop ends as `right` (6) is not less than `N` (8).
Return `maxLength = 3`. Correct.

---

## 4. Group Anagrams - Sorting as Key

**Concept:** Anagrams have the same letters, just rearranged. Sorting the letters of an anagram always produces the same "canonical" string. This sorted string can be used as a key in a hash map.

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

Initialize anagramMap = {} (or new Map())

1. Process "eat":
   Sorted("eat") = "aet"
   anagramMap["aet"] = ["eat"]

   Map State:
   {
     "aet": ["eat"]
   }

2. Process "tea":
   Sorted("tea") = "aet"
   Key "aet" exists. Append "tea".
   anagramMap["aet"] = ["eat", "tea"]

   Map State:
   {
     "aet": ["eat", "tea"]
   }

3. Process "tan":
   Sorted("tan") = "ant"
   Key "ant" does not exist. Create new entry.
   anagramMap["ant"] = ["tan"]

   Map State:
   {
     "aet": ["eat", "tea"],
     "ant": ["tan"]
   }

4. Process "ate":
   Sorted("ate") = "aet"
   Key "aet" exists. Append "ate".
   anagramMap["aet"] = ["eat", "tea", "ate"]

   Map State:
   {
     "aet": ["eat", "tea", "ate"],
     "ant": ["tan"]
   }

5. Process "nat":
   Sorted("nat") = "ant"
   Key "ant" exists. Append "nat".
   anagramMap["ant"] = ["tan", "nat"]

   Map State:
   {
     "aet": ["eat", "tea", "ate"],
     "ant": ["tan", "nat"]
   }

6. Process "bat":
   Sorted("bat") = "abt"
   Key "abt" does not exist. Create new entry.
   anagramMap["abt"] = ["bat"]

   Map State:
   {
     "aet": ["eat", "tea", "ate"],
     "ant": ["tan", "nat"],
     "abt": ["bat"]
   }

End of input strings.
Extract values from map:
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
(Order of groups and elements within groups may vary)
```
---