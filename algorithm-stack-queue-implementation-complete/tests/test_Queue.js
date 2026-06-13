const assert = require('assert');
const Queue = require('../src/data-structures/Queue');

console.log('--- Running Queue Tests ---');

function runTest(name, testFunction) {
    try {
        testFunction();
        console.log(`✅ ${name}`);
    } catch (error) {
        console.error(`❌ ${name}`);
        console.error(error.message);
        process.exit(1); // Exit with error code
    }
}

runTest('Should initialize an empty queue', () => {
    const queue = new Queue();
    assert.strictEqual(queue.isEmpty(), true, 'Queue should be empty');
    assert.strictEqual(queue.size(), 0, 'Queue size should be 0');
    assert.strictEqual(queue.peek(), undefined, 'Peek on empty queue should return undefined');
    assert.strictEqual(queue.dequeue(), undefined, 'Dequeue on empty queue should return undefined');
});

runTest('Should enqueue elements correctly', () => {
    const queue = new Queue();
    queue.enqueue(10);
    assert.strictEqual(queue.size(), 1, 'Size should be 1 after one enqueue');
    assert.strictEqual(queue.peek(), 10, 'Peek should return 10');

    queue.enqueue(20);
    assert.strictEqual(queue.size(), 2, 'Size should be 2 after two enqueues');
    assert.strictEqual(queue.peek(), 10, 'Peek should still return 10 (FIFO)');
});

runTest('Should dequeue elements in FIFO order', () => {
    const queue = new Queue();
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    assert.strictEqual(queue.dequeue(), 10, 'First dequeue should return 10');
    assert.strictEqual(queue.size(), 2, 'Size should be 2 after first dequeue');
    assert.strictEqual(queue.peek(), 20, 'Peek should return 20');

    assert.strictEqual(queue.dequeue(), 20, 'Second dequeue should return 20');
    assert.strictEqual(queue.size(), 1, 'Size should be 1 after second dequeue');
    assert.strictEqual(queue.peek(), 30, 'Peek should return 30');

    assert.strictEqual(queue.dequeue(), 30, 'Third dequeue should return 30');
    assert.strictEqual(queue.size(), 0, 'Size should be 0 after third dequeue');
    assert.strictEqual(queue.isEmpty(), true, 'Queue should be empty');
});

runTest('Should handle mixed operations correctly', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    assert.strictEqual(queue.dequeue(), 1);
    queue.enqueue(3);
    assert.strictEqual(queue.peek(), 2);
    queue.enqueue(4);
    assert.strictEqual(queue.dequeue(), 2);
    assert.strictEqual(queue.dequeue(), 3);
    assert.strictEqual(queue.dequeue(), 4);
    assert.strictEqual(queue.isEmpty(), true);
    assert.strictEqual(queue.dequeue(), undefined); // Dequeue from empty
});

runTest('Should clear the queue', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    assert.strictEqual(queue.size(), 2);
    queue.clear();
    assert.strictEqual(queue.isEmpty(), true, 'Queue should be empty after clear');
    assert.strictEqual(queue.size(), 0, 'Queue size should be 0 after clear');
    assert.strictEqual(queue.peek(), undefined, 'Peek on cleared queue should be undefined');
});

runTest('Should convert to string correctly', () => {
    const queue = new Queue();
    assert.strictEqual(queue.toString(), '', 'Empty queue toString');
    queue.enqueue(1);
    assert.strictEqual(queue.toString(), '1', 'Single element toString');
    queue.enqueue(2);
    queue.enqueue(3);
    assert.strictEqual(queue.toString(), '1,2,3', 'Multiple elements toString');
});

console.log('All Queue tests passed!');