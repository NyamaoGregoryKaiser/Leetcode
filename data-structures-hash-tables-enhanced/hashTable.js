```javascript
// utils.js (Helper functions -  replace with your actual implementation)
const hash = (key, size) => key.charCodeAt(0) % size; //Simple hash function


class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  set(key, value) {
    const index = hash(key, this.size);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = hash(key, this.size);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1];
        }
      }
    }
    return null;
  }
}


// Algorithm Implementations

// Two Sum (Optimal: Hash Table)
const twoSum = (nums, target) => {
  const numMap = new Map(); //Using Map for better performance than custom HashTable here
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(nums[i], i);
  }
  return null; //No solution found
};

// Valid Anagram (Optimal: Hash Table)
const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;
  const charCount = {};
  for (let char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (let char of t) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }
  return true;
};


// Group Anagrams (Optimal: Hash Table)
const groupAnagrams = (strs) => {
    const anagramGroups = {};
    for(let str of strs){
        const sortedStr = str.split('').sort().join(''); //Hash key is sorted string
        if(!anagramGroups[sortedStr]){
            anagramGroups[sortedStr] = [];
        }
        anagramGroups[sortedStr].push(str);
    }
    return Object.values(anagramGroups);
};


// Longest Consecutive Sequence (Optimal: Hash Set)
const longestConsecutive = (nums) => {
    const numSet = new Set(nums);
    let longestStreak = 0;
    for(let num of numSet){
        if(!numSet.has(num -1)){ //Start of a sequence
            let currentNum = num;
            let currentStreak = 1;
            while(numSet.has(currentNum + 1)){
                currentNum++;
                currentStreak++;
            }
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    return longestStreak;
};


module.exports = { twoSum, isAnagram, groupAnagrams, longestConsecutive };

```