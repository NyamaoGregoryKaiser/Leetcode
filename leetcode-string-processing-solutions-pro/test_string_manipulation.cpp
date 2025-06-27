#include "string_manipulation.cpp"  // Include your implementation
#include <cassert>
#include <iostream>

void testReverseString() {
  assert(reverseString("hello") == "olleh");
  assert(reverseString("") == "");
  assert(reverseString("a") == "a");
}

void testIsPalindrome() {
  assert(isPalindrome("racecar") == true);
  assert(isPalindrome("hello") == false);
  assert(isPalindrome("") == true);
  assert(isPalindrome("a") == true);
}

void testLongestPalindromeSubstring(){
    assert(longestPalindromeSubstring("babad") == "bab" || longestPalindromeSubstring("babad") == "aba");
    assert(longestPalindromeSubstring("cbbd") == "bb");
    assert(longestPalindromeSubstring("a") == "a");
    assert(longestPalindromeSubstring("") == "");

}

void testArePermutations() {
  assert(arePermutations("abc", "bca") == true);
  assert(arePermutations("abc", "abcd") == false);
  assert(arePermutations("", "") == true);
  assert(arePermutations("a", "a") == true);
}

void testRemoveDuplicateChars() {
  assert(removeDuplicateChars("abbcdeff") == "abcdef");
  assert(removeDuplicateChars("") == "");
  assert(removeDuplicateChars("a") == "a");
  assert(removeDuplicateChars("aabbccddeeff") == "abcdef");

}


int main() {
  testReverseString();
  testIsPalindrome();
  testLongestPalindromeSubstring();
  testArePermutations();
  testRemoveDuplicateChars();
  std::cout << "All test cases passed!" << std::endl;
  return 0;
}