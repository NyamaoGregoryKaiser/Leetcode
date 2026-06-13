const MyQueue = require('../src/problems/Problem3_QueueUsingStacks');
const Queue = require('../src/data-structures/Queue'); // For comparison

console.log('--- Benchmarking Queue Using Stacks vs Native Queue ---');

const numOperations = [10000, 100000, 1000000]; // Number of push/pop operations

numOperations.forEach(n => {
    console.log(`\n--- Testing with ${n} operations ---`);

    // --- MyQueue (using two stacks) ---
    let myQueue;
    let ops = [];

    // Prepare operations: alternating push and pop, with some peek
    for (let i = 0; i < n; i++) {
        ops.push({ type: 'push', value: i });
        if (i % 2 === 0 && i > 0) { // Every second op is a pop
            ops.push({ type: 'pop' });
        }
        if (i % 3 === 0 && i > 0) { // Every third op is a peek
            ops.push({ type: 'peek' });
        }
    }

    console.time(`MyQueue (2 stacks) - ${n} operations`);
    myQueue = new MyQueue();
    for (const op of ops) {
        if (op.type === 'push') {
            myQueue.push(op.value);
        } else if (op.type === 'pop') {
            myQueue.pop();
        } else if (op.type === 'peek') {
            myQueue.peek();
        }
    }
    console.timeEnd(`MyQueue (2 stacks) - ${n} operations`);


    // --- Native Queue (our array-based Queue class) ---
    let nativeQueue;

    console.time(`NativeQueue (array-based) - ${n} operations`);
    nativeQueue = new Queue(); // Our custom Queue class
    for (const op of ops) {
        if (op.type === 'push') { // Maps to enqueue
            nativeQueue.enqueue(op.value);
        } else if (op.type === 'pop') { // Maps to dequeue
            nativeQueue.dequeue();
        } else if (op.type === 'peek') { // Maps to peek
            nativeQueue.peek();
        }
    }
    console.timeEnd(`NativeQueue (array-based) - ${n} operations`);
});

console.log('\n--- Benchmarking Complete ---');