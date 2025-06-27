#include <iostream>
#include <string>
#include <algorithm>
#include <unordered_set>
#include <chrono>


using namespace std;
using namespace chrono;


// Problem 1: Reverse String
string reverseString(string s) {
  reverse(s.begin(), s.end());
  return s;
}

// Problem 2: Palindrome Check
bool isPalindrome(string s) {
  string reversed_s = s;
  reverse(reversed_s.begin(), reversed_s.end());
  return s == reversed_s;
}

// Problem 3: Longest Palindromic Substring (Simplified - Optimized solution omitted for brevity)
string longestPalindromeSubstring(string s) {
    if (s.empty()) return "";
    int n = s.length();
    int start = 0, maxLen = 1;
    for (int i = 0; i < n; ++i) {
        // Odd length palindromes
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--;
            r++;
        }
        // Even length palindromes
        l = i;
        r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--;
            r++;
        }
    }
    return s.substr(start, maxLen);
}


// Problem 4: String Permutation
bool arePermutations(string s1, string s2) {
  if (s1.length() != s2.length()) return false;
  sort(s1.begin(), s1.end());
  sort(s2.begin(), s2.end());
  return s1 == s2;
}

// Problem 5: Remove Duplicate Characters (Maintaining Order)
string removeDuplicateChars(string s) {
  unordered_set<char> seen;
  string result = "";
  for (char c : s) {
    if (seen.find(c) == seen.end()) {
      result += c;
      seen.insert(c);
    }
  }
  return result;
}


int main() {
    auto start = high_resolution_clock::now();
    cout << "Reverse of hello: " << reverseString("hello") << endl;
    cout << "Is racecar a palindrome? " << (isPalindrome("racecar") ? "Yes" : "No") << endl;
    cout << "Longest palindromic substring of bananan: " << longestPalindromeSubstring("bananan") << endl;
    cout << "Are abc and bca permutations? " << (arePermutations("abc", "bca") ? "Yes" : "No") << endl;
    cout << "Remove duplicates from abbcdeff: " << removeDuplicateChars("abbcdeff") << endl;
    auto stop = high_resolution_clock::now();
    auto duration = duration_cast<microseconds>(stop - start);
    cout << "Time taken by function: " << duration.count() << " microseconds" << endl;
    return 0;
}