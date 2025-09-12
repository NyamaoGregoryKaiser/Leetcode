```javascript
const { reverseString, isPalindrome, areAnagrams, longestPalindrome, stringCompression } = require('./string_manipulation');
const test = require('tape');


test('Reverse String', t => {
  t.equal(reverseString("hello"), "olleh");
  t.equal(reverseString(""), "");
  t.equal(reverseString("a"), "a");
  t.end();
});

test('Palindrome Check', t => {
  t.equal(isPalindrome("racecar"), true);
  t.equal(isPalindrome("hello"), false);
  t.equal(isPalindrome("A man, a plan, a canal: Panama"), true); //Handles case and non-alphanumeric
  t.end();
});

test('Anagram Check', t => {
  t.equal(areAnagrams("listen", "silent"), true);
  t.equal(areAnagrams("hello", "world"), false);
  t.equal(areAnagrams("", ""), true);
  t.end();
});

test('Longest Palindrome Substring', t => {
  t.equal(longestPalindrome("babad"), "bab" || "aba"); //Multiple possibilities
  t.equal(longestPalindrome("cbbd"), "bb");
  t.equal(longestPalindrome("a"), "a");
  t.end();
});

test('String Compression', t => {
    t.equal(stringCompression("aabcccccaaa"), "a2b1c5a3");
    t.equal(stringCompression("abc"), "abc");
    t.equal(stringCompression(""), "");
    t.end();
})

```