const { MinStackTwoStacks, MinStackCustomObject } = require('../src/problems/Problem2_MinStack');

console.log('--- Benchmarking Min Stack ---');

const numOperations = [10000, 100000, 1000000]; // Number of push/pop operations

numOperations.forEach(n => {
    console.log(`\n--- Testing with ${n} operations ---`);

    // --- MinStackTwoStacks ---
    let minStackTwoStacks;
    let ops = [];

    // Prepare operations: alternating push and pop, with some getMin
    for (let i = 0; i < n; i++) {
        ops.push({ type: 'push', value: Math.floor(Math.random() * 2000) - 1000 }); // Random values
        if (i % 5 === 0 && i > 0) { // Every 5th op is a pop
            ops.push({ type: 'pop' });
        }
        if (i % 10 === 0 && i > 0) { // Every 10th op is a getMin
            ops.push({ type: 'getMin' });
        }
    }

    console.time(`MinStackTwoStacks - ${n} operations`);
    minStackTwoStacks = new MinStackTwoStacks();
    for (const op of ops) {
        if (op.type === 'push') {
            minStackTwoStacks.push(op.value);
        } else if (op.type === 'pop') {
            minStackTwoStacks.pop();
        } else if (op.type === 'getMin') {
            minStackTwoStacks.getMin();
        }
    }
    console.timeEnd(`MinStackTwoStacks - ${n} operations`);

    // --- MinStackCustomObject ---
    let minStackCustomObject;

    console.time(`MinStackCustomObject - ${n} operations`);
    minStackCustomObject = new MinStackCustomObject();
    for (const op of ops) {
        if (op.type === 'push') {
            minStackCustomObject.push(op.value);
        } else if (op.type === 'pop') {
            minStackCustomObject.pop();
        } else if (op.type === 'getMin') {
            minStackCustomObject.getMin();
        }
    }
    console.timeEnd(`MinStackCustomObject - ${n} operations`);
});

console.log('\n--- Benchmarking Complete ---');