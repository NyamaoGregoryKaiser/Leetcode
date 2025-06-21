#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include "utils.h" // Assume utils.h contains necessary data structures and helper functions

using namespace std;

// Fractional Knapsack
double fractionalKnapsack(vector<Item>& items, double capacity) {
  // Sort items by value-to-weight ratio
  sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
    return (double)a.value / a.weight > (double)b.value / b.weight;
  });

  double totalValue = 0;
  double remainingCapacity = capacity;

  for (const Item& item : items) {
    if (remainingCapacity >= item.weight) {
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


// Huffman Coding (Simplified -  builds the tree but doesn't generate codes)
// Requires a more complex implementation for actual code generation.
struct Node {
  char ch;
  int freq;
  Node *left, *right;
};

Node* buildHuffmanTree(map<char, int>& freq) {
  // Implementation omitted for brevity.  Requires a priority queue based approach.
  return nullptr; // Placeholder
}


// Activity Selection
int activitySelection(vector<Activity>& activities) {
  // Sort activities by finish time
  sort(activities.begin(), activities.end(), [](const Activity& a, const Activity& b) {
    return a.finish < b.finish;
  });

  int count = 0;
  double lastFinishTime = 0;

  for (const Activity& activity : activities) {
    if (activity.start >= lastFinishTime) {
      count++;
      lastFinishTime = activity.finish;
    }
  }
  return count;
}

// Coin Change (Minimum Coins) - Greedy approach (may not always find optimal solution)
int minCoinsGreedy(vector<int>& coins, int amount) {
  sort(coins.begin(), coins.end(), greater<int>()); //Sort in descending order
  int count = 0;
  for (int coin : coins) {
    while (amount >= coin) {
      amount -= coin;
      count++;
    }
  }
  if (amount == 0) return count;
  else return -1; //Solution not found
}


int main() {
    //Example usage (replace with your own test cases)
    vector<Item> items = {{10, 60}, {20, 100}, {30, 120}};
    cout << "Fractional Knapsack: " << fractionalKnapsack(items, 50) << endl;


    return 0;
}