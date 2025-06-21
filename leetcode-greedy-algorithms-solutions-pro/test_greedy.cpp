#include "gtest/gtest.h" //Requires Google Test framework
#include "greedy_algorithms.cpp"

TEST(GreedyAlgorithmsTest, FractionalKnapsackTest) {
  vector<Item> items = {{10, 60}, {20, 100}, {30, 120}};
  EXPECT_DOUBLE_EQ(fractionalKnapsack(items, 50), 240);
  // Add more test cases
}

//Add more test cases for other functions.

int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}