```javascript
/**
 * Reverses a given string.
 * @param {string} str The input string.
 * @returns {string} The reversed string.
 */
function reverseString(str) {
  //Optimal Solution: Using built-in reverse() method.  O(n) time, O(1) space.
  return str.split("").reverse().join("");

  //Alternative Solution: Iterative approach. O(n) time, O(1) space.
  // let reversed = "";
  // for (let i = str.length - 1; i >= 0; i--) {
  //   reversed += str[i];
  // }
  // return reversed;

  //Alternative Solution: Recursive approach. O(n) time, O(n) space due to call stack.
  // if (str === "") return "";
  // return reverseString(str.substring(1)) + str.charAt(0);
}


/**
 * Checks if a given string is a palindrome.
 * @param {string} str The input string.
 * @returns {boolean} True if the string is a palindrome, false otherwise.
 */
function isPalindrome(str) {
  //Optimal Solution: Two-pointer approach. O(n) time, O(1) space.
  str = str.toLowerCase().replace(/[^a-z0-9]/g, ""); //Ignore case and non-alphanumeric characters
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}


/**
 * Checks if two strings are anagrams of each other.
 * @param {string} str1 The first string.
 * @param {string} str2 The second string.
 * @returns {boolean} True if the strings are anagrams, false otherwise.
 */
function areAnagrams(str1, str2) {
  //Optimal Solution: Using character count map. O(n) time, O(1) space (assuming limited character set).
  if (str1.length !== str2.length) return false;
  const charCount = {};
  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }
  return true;
}


/**
 * Finds the longest palindromic substring within a given string.
 * @param {string} str The input string.
 * @returns {string} The longest palindromic substring.
 */
function longestPalindrome(str) {
  //Optimal Solution: Expand around center. O(n^2) time, O(1) space.
  if (str.length < 2) return str;
  let start = 0, end = 0;
  for (let i = 0; i < str.length; i++) {
    let len1 = expandAroundCenter(str, i, i);
    let len2 = expandAroundCenter(str, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return str.substring(start, end + 1);

  function expandAroundCenter(str, left, right) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
}


/**
 * Compresses a string using character counts.
 * @param {string} str The input string.
 * @returns {string} The compressed string.
 */
function stringCompression(str) {
    let compressed = "";
    let count = 1;
    for (let i = 0; i < str.length; i++) {
        if (i + 1 < str.length && str[i] === str[i+1]) {
            count++;
        } else {
            compressed += str[i] + count;
            count = 1;
        }
    }
    return compressed.length < str.length ? compressed : str; //Only compress if shorter
}


module.exports = { reverseString, isPalindrome, areAnagrams, longestPalindrome, stringCompression };
```