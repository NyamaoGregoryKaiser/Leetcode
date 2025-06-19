#include <iostream>
#include <vector>
#include <cassert>
#include "dp_algorithms.cpp"

using namespace std;

int main() {
    //Fibonacci Tests
    assert(fibonacci_dp(0) == 0);
    assert(fibonacci_dp(1) == 1);
    assert(fibonacci_dp(5) == 5);
    assert(fibonacci_dp(10) == 55);

    //Knapsack Tests
    vector<int> weights = {10, 20, 30};
    vector<int> values = {60, 100, 120};
    int capacity = 50;
    assert(knapsack_dp(weights, values, capacity) == 220);


    //LCS Tests
    assert(lcs_dp("AGGTAB", "GXTXAYB") == 4);
    assert(lcs_dp("ABCDGH", "AEDFHR") == 3);

    //Coin Change Tests
    vector<int> coins = {1, 2, 5};
    assert(coinChange_dp(coins, 11) == 3);
    assert(coinChange_dp(coins, 7) == 2);
    assert(coinChange_dp(coins, 0) == 0);
    assert(coinChange_dp(coins, 3) == 1);
    assert(coinChange_dp(coins, 6) == 2);
    assert(coinChange_dp({2}, 3) == -1); //impossible


    cout << "All test cases passed!" << endl;
    return 0;
}