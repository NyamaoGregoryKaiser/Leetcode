#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include "utils.h" // Include helper functions and data structures


using namespace std;

// Fractional Knapsack (Greedy)
double fractionalKnapsack(vector<Item>& items, int capacity) {
    // Sort items by value-to-weight ratio
    sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return (double)a.value / a.weight > (double)b.value / b.weight;
    });

    double totalValue = 0;
    int remainingCapacity = capacity;

    for (const Item& item : items) {
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


//Activity Selection (Greedy)
int activitySelection(vector<Activity>& activities) {
    //Sort activities by finish time
    sort(activities.begin(), activities.end(), [](const Activity& a, const Activity& b){
        return a.finish < b.finish;
    });

    int count = 0;
    int lastFinishTime = 0;
    for(const auto& activity : activities){
        if(activity.start >= lastFinishTime){
            count++;
            lastFinishTime = activity.finish;
        }
    }
    return count;
}


// ... Implement Huffman Coding and Coin Change (with both greedy and potentially DP solutions) ...

int main() {
    // Example usage (Fractional Knapsack)
    vector<Item> items = {{10, 60}, {20, 100}, {30, 120}};
    int capacity = 50;
    cout << "Fractional Knapsack Max Value: " << fractionalKnapsack(items, capacity) << endl;


    //Example Usage (Activity Selection)
    vector<Activity> activities = {{1,4},{3,5},{0,6},{5,7},{3,9},{5,9},{6,10},{8,11},{8,12},{2,14},{12,16}};
    cout << "Number of Non-overlapping Activities: " << activitySelection(activities) << endl;

    // ... Add example usage for Huffman Coding and Coin Change ...

    return 0;
}