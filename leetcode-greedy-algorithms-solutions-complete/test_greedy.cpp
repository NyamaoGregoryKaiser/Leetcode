#include "gtest/gtest.h" //Requires Google Test Framework
#include "greedy_algorithms.cpp" //Include your main implementation


TEST(FractionalKnapsackTest, BasicTest) {
    vector<Item> items = {{10, 60}, {20, 100}, {30, 120}};
    int capacity = 50;
    EXPECT_NEAR(fractionalKnapsack(items, capacity), 240, 0.001); //Allowing for small floating-point errors
}


// ... Add more test cases for Fractional Knapsack, Huffman Coding, Activity Selection, and Coin Change...


int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}