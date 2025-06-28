```javascript
const { fractionalKnapsack, activitySelection, minCoinsGreedy } = require('./greedy');

test('Fractional Knapsack', () => {
    const items = [
        { weight: 10, value: 60 },
        { weight: 20, value: 100 },
        { weight: 30, value: 120 },
    ];
    const capacity = 50;
    expect(fractionalKnapsack(capacity, items)).toBeCloseTo(240);
});


test('Activity Selection', () => {
    const activities = [
        { start: 1, finish: 4 },
        { start: 3, finish: 5 },
        { start: 0, finish: 6 },
        { start: 5, finish: 7 },
        { start: 3, finish: 8 },
        { start: 5, finish: 9 },
        { start: 6, finish: 10 },
    ];
    const selected = activitySelection(activities);
    expect(selected.length).toBe(4); //example,  the exact activities selected may vary depending on the sorting
});

test('Min Coins Greedy (example)', () => {
    const coins = [25, 10, 5, 1];
    const amount = 63;
    expect(minCoinsGreedy(coins, amount)).toBe(4);
    expect(minCoinsGreedy([3,5,7], 13)).toBe(3);
    expect(minCoinsGreedy([2,5], 3)).toBe(-1);
});
```