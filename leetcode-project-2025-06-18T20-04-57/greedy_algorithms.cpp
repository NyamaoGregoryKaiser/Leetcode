#include <iostream>
#include <vector>
#include <algorithm>
#include "utils.h" //Assume this contains necessary data structures like Item, Activity etc.

using namespace std;

//Fractional Knapsack
double fractionalKnapsack(vector<Item>& items, double capacity) {
    //Sort items by value-to-weight ratio (descending)
    sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return (double)a.value / a.weight > (double)b.value / b.weight;
    });

    double totalValue = 0;
    double remainingCapacity = capacity;

    for (const auto& item : items) {
        if (item.weight <= remainingCapacity) {
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            totalValue += (double)item.value / item.weight * remainingCapacity;
            remainingCapacity = 0;
            break;
        }
    }
    return totalValue;
}


//Activity Selection (Simplified - assumes activities are already sorted by finish time)
int activitySelection(vector<Activity>& activities) {
    int count = 0;
    double lastFinishTime = 0;
    for (const auto& activity : activities) {
        if (activity.startTime >= lastFinishTime) {
            count++;
            lastFinishTime = activity.finishTime;
        }
    }
    return count;
}


// ... (Implement Huffman Coding and Coin Change here) ...


int main() {
    //Example usage (replace with comprehensive test cases from test_greedy.cpp)
    vector<Item> items = {{60, 10}, {100, 20}, {120, 30}};
    double capacity = 50;
    cout << "Fractional Knapsack Max Value: " << fractionalKnapsack(items, capacity) << endl;

    // ... (Add examples for other algorithms) ...

    return 0;
}