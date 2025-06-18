#include <chrono>
#include <iostream>
#include "greedy_algorithms.cpp"

using namespace std;
using namespace std::chrono;


int main() {
    //Example Benchmarking for Fractional Knapsack
    vector<Item> items;
    //Generate large random item set here...

    auto start = high_resolution_clock::now();
    fractionalKnapsack(items, 1000);
    auto stop = high_resolution_clock::now();
    auto duration = duration_cast<microseconds>(stop - start);

    cout << "Fractional Knapsack Time: " << duration.count() << " microseconds" << endl;

    //Add benchmarking for other algorithms similarly...
    return 0;
}