#include "gtest/gtest.h" //Requires Google Test framework
#include "greedy_algorithms.cpp" //Include your implementation

TEST(FractionalKnapsackTest, Test1) {
    vector<Item> items = {{60, 10}, {100, 20}, {120, 30}};
    double capacity = 50;
    EXPECT_NEAR(fractionalKnapsack(items, capacity), 240, 0.001); //Allowing for floating-point precision errors
}

// Add more test cases for Fractional Knapsack and other algorithms here...

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}