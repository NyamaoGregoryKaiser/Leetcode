```javascript
// Helper function to swap elements in an array
const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

// Fractional Knapsack (Greedy Approach)
const fractionalKnapsack = (capacity, items) => {
    // Sort items by value-to-weight ratio in descending order
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0;
    let remainingCapacity = capacity;

    for (const item of items) {
        if (item.weight <= remainingCapacity) {
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            // Take a fraction of the item
            const fraction = remainingCapacity / item.weight;
            totalValue += item.value * fraction;
            remainingCapacity = 0;
            break;
        }
    }
    return totalValue;
};

// Activity Selection (Greedy Approach)
const activitySelection = (activities) => {
    // Sort activities by finish time
    activities.sort((a, b) => a.finish - b.finish);

    const selectedActivities = [];
    let lastSelectedFinishTime = 0;

    for (const activity of activities) {
        if (activity.start >= lastSelectedFinishTime) {
            selectedActivities.push(activity);
            lastSelectedFinishTime = activity.finish;
        }
    }
    return selectedActivities;
};

//Coin Change (Greedy Approach - may not always be optimal)
const minCoinsGreedy = (coins, amount) => {
    coins.sort((a, b) => b - a); //Sort in descending order
    let numCoins = 0;
    let remainingAmount = amount;
    for (const coin of coins) {
        while (remainingAmount >= coin) {
            remainingAmount -= coin;
            numCoins++;
        }
    }
    if (remainingAmount === 0) return numCoins;
    else return -1; //No solution found
};


module.exports = { fractionalKnapsack, activitySelection, minCoinsGreedy };
```