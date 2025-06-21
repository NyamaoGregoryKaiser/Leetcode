```javascript
class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.size;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    if (this.table[index]) {
      for (const entry of this.table[index]) {
        if (entry[0] === key) {
          return entry[1];
        }
      }
    }
    return null;
  }
}


//Problem 1: Two Sum
function twoSum(nums, target) {
  const numMap = new Map(); //Using Map for better performance than custom HashTable here
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(nums[i], i);
  }
  return null; // No solution found
}

//Problem 2: Valid Anagram (Using Hash Table)
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const charCount = new HashTable(26); //Assuming lowercase English alphabet
  for (let char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  for (let char of t) {
    if (!charCount.get(char) || charCount.get(char) <=0) return false;
    charCount.set(char, charCount.get(char)-1)
  }
  return true;
}


// Problem 3: Group Anagrams (Illustrative - requires further implementation)
function groupAnagrams(strs) {
    //Implementation using HashTable for grouping - left as an exercise to the reader
    //This would involve hashing each string (perhaps using sorted string as key) and grouping accordingly.
    return [];
}

//Problem 4 & 5:  Longest Consecutive Sequence and Minimum Window Substring (require further implementation - left as an exercise)

//Time and Space Complexity (Illustrative for Two Sum):
//Two Sum: O(n) time, O(n) space.

```