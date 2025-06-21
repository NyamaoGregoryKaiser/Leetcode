```typescript
// Fractional Knapsack
function fractionalKnapsack(capacity: number, items: { weight: number; value: number }[]): number {
  // Sort items by value-to-weight ratio (descending)
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

  let totalValue = 0;
  let remainingCapacity = capacity;

  for (const item of items) {
    if (item.weight <= remainingCapacity) {
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      // Take a fraction of the item
      totalValue += item.value * (remainingCapacity / item.weight);
      remainingCapacity = 0;
      break;
    }
  }
  return totalValue;
}

// Huffman Coding (Simplified -  Full implementation is complex)
// ... (Implementation omitted for brevity. Requires a priority queue data structure) ...

// Activity Selection
function activitySelection(activities: { start: number; finish: number }[]): number[] {
    activities.sort((a, b) => a.finish - b.finish); // Sort by finish time
    const selectedActivities: number[] = [];
    let lastSelectedFinishTime = -1;
    for(let i = 0; i < activities.length; i++) {
        if(activities[i].start >= lastSelectedFinishTime) {
            selectedActivities.push(i);
            lastSelectedFinishTime = activities[i].finish;
        }
    }
    return selectedActivities;
}


// Coin Change (Greedy - works only with specific coin denominations)
function minCoinsGreedy(amount: number, denominations: number[]): number {
  denominations.sort((a, b) => b - a); // Sort in descending order
  let numCoins = 0;
  let remainingAmount = amount;

  for (const coin of denominations) {
    while (remainingAmount >= coin) {
      remainingAmount -= coin;
      numCoins++;
    }
  }
  return numCoins;
}

export { fractionalKnapsack, activitySelection, minCoinsGreedy };
```