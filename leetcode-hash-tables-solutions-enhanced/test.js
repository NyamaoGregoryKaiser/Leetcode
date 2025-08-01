```javascript
const { twoSum, isValidAnagram, groupAnagrams, longestConsecutive } = require('./hash_table');

// Test cases for Two Sum
console.log("Two Sum Tests:");
console.log(twoSum([2, 7, 11, 15], 9), "Expected: [0, 1]");
console.log(twoSum([3, 2, 4], 6), "Expected: [1, 2]");
console.log(twoSum([3, 3], 6), "Expected: [0, 1]");


// Test cases for Valid Anagram
console.log("\nValid Anagram Tests:");
console.log(isValidAnagram("anagram", "nagaram"), "Expected: true");
console.log(isValidAnagram("rat", "car"), "Expected: false");


// Test cases for Group Anagrams
console.log("\nGroup Anagrams Tests:");
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]), "Expected: [['eat','tea','ate'],['tan','nat'],['bat']]");


// Test cases for Longest Consecutive Sequence
console.log("\nLongest Consecutive Sequence Tests:");
console.log(longestConsecutive([100,4,200,1,3,2]), "Expected: 4");
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]), "Expected: 9");

```