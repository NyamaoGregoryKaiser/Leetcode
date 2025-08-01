```javascript
class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i); // Simple hash function
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.size;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    this.table[index].push([key, value]); //Handle collisions using chaining
  }

  get(key) {
    const index = this.hash(key);
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


// Problem 1: Two Sum (Optimal: Hash Table)
function twoSum(nums, target) {
  const numMap = new Map(); //Using Map for better performance in this case
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(nums[i], i);
  }
  return null; // No solution found
}


// Problem 2: Valid Anagram (Optimal: Hash Table)
function isValidAnagram(s, t) {
  if (s.length !== t.length) return false;
  const charCount = new Map();
  for (let char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  for (let char of t) {
    if (!charCount.has(char) || charCount.get(char) === 0) {
      return false;
    }
    charCount.set(char, charCount.get(char) - 1);
  }
  return true;
}

// Problem 3: Group Anagrams (Optimal: Hash Table)
function groupAnagrams(strs) {
    const anagramGroups = new Map();
    for (const str of strs) {
        const sortedStr = str.split('').sort().join(''); //Key is sorted string
        if (!anagramGroups.has(sortedStr)) {
            anagramGroups.set(sortedStr, []);
        }
        anagramGroups.get(sortedStr).push(str);
    }
    return Array.from(anagramGroups.values());
}


// Problem 4: Longest Consecutive Sequence (Optimal: Hash Set)
function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let longestStreak = 0;
    for (const num of numSet) {
        if (!numSet.has(num - 1)) { //Start of a sequence
            let currentNum = num;
            let currentStreak = 1;
            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    return longestStreak;
}


module.exports = { twoSum, isValidAnagram, groupAnagrams, longestConsecutive, HashTable };
```