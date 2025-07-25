#include "gtest/gtest.h" //Requires Google Test framework
#include "stack_queue.cpp"


TEST(StackQueueTest, ValidParenthesesTest) {
  ASSERT_TRUE(isValidParentheses("()"));
  ASSERT_TRUE(isValidParentheses("()[]{}"));
  ASSERT_FALSE(isValidParentheses("(]"));
  ASSERT_FALSE(isValidParentheses("([)]"));
  ASSERT_TRUE(isValidParentheses("{[]}"));
}

// Add more test cases for other problems here...

int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}