#include "hash_table.h"
#include "main.cpp"
#include <cassert>
#include <iostream>


int main() {
    //Two Sum Tests
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    vector<int> expected1 = {0, 1};
    assert(twoSum(nums1, target1) == expected1);

    vector<int> nums2 = {3,2,4};
    int target2 = 6;
    vector<int> expected2 = {1,2};
    assert(twoSum(nums2, target2) == expected2);

    //Valid Anagram Tests
    assert(isAnagram("anagram", "nagaram") == true);
    assert(isAnagram("rat", "car") == false);

    //Group Anagrams Tests
    // Add more comprehensive tests here...

    //Longest Consecutive Sequence Tests
    vector<int> nums3 = {100, 4, 200, 1, 3, 2};
    assert(longestConsecutive(nums3) == 4);
    vector<int> nums4 = {0,3,7,2,5,8,4,6,0,1};
    assert(longestConsecutive(nums4) == 9);

    cout << "All test cases passed!" << endl;
    return 0;
}