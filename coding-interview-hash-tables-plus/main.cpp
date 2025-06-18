#include "hash_table.h"
#include <vector>
#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

//Two Sum (Optimized using Hash Table)
vector<int> twoSum(vector<int>& nums, int target) {
    HashTable<int, int> numMap;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (numMap.contains(complement)) {
            return {numMap.get(complement), i};
        }
        numMap.insert(nums[i], i);
    }
    return {}; //Should not reach here if there's always a solution
}

//Valid Anagram (Using Hash Table)
bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    HashTable<char, int> charCount;
    for (char c : s) charCount.insert(c, charCount.contains(c) ? charCount.get(c) + 1 : 1);
    for (char c : t) {
        if (!charCount.contains(c) || charCount.get(c) == 0) return false;
        charCount.get(c)--;
    }
    return true;
}


//Group Anagrams (Using Hash Table)
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    HashTable<string, vector<string>> anagramGroups;
    for (string& str : strs) {
        string sortedStr = str;
        sort(sortedStr.begin(), sortedStr.end());
        anagramGroups.insert(sortedStr, anagramGroups.contains(sortedStr) ? anagramGroups.get(sortedStr) : vector<string>());
        anagramGroups.get(sortedStr).push_back(str);
    }
    vector<vector<string>> result;
    for (auto const& [key, val] : anagramGroups.table) {
        result.push_back(val);
    }
    return result;
}

//Longest Consecutive Sequence (Using Hash Table)
int longestConsecutive(vector<int>& nums) {
    HashTable<int, int> numSet;
    for (int num : nums) numSet.insert(num, 0); //Store numbers for O(1) lookup

    int longestStreak = 0;
    for (int num : nums) {
        if (!numSet.contains(num - 1)) { //Start of a sequence
            int currentNum = num;
            int currentStreak = 1;
            while (numSet.contains(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            longestStreak = max(longestStreak, currentStreak);
        }
    }
    return longestStreak;
}


int main() {
    //Example usage (add your own test cases)
    cout << "Two Sum: " << endl;
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    for (int i : twoSum(nums1, target1)) cout << i << " ";
    cout << endl;


    cout << "\nValid Anagram: " << endl;
    cout << isAnagram("anagram", "nagaram") << endl;


    cout << "\nGroup Anagrams: " << endl;
    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    vector<vector<string>> groupedAnagrams = groupAnagrams(strs);
    //print grouped anagrams
    for(auto vec: groupedAnagrams){
        for(auto str: vec){
            cout << str << " ";
        }
        cout << endl;
    }

    cout << "\nLongest Consecutive Sequence: " << endl;
    vector<int> nums2 = {100, 4, 200, 1, 3, 2};
    cout << longestConsecutive(nums2) << endl;

    return 0;
}